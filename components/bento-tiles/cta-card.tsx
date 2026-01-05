"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, X, Copy, Check } from "lucide-react";

const EMAIL = "leongudmundssonekelund@gmail.com";

const emailOptions = [
  {
    label: "Gmail",
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
      </svg>
    ),
    action: () => window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`, "_blank"),
  },
  {
    label: "Outlook",
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M24 7.387v10.478c0 .23-.08.424-.238.576-.158.154-.352.23-.58.23h-8.547v-6.959l1.6 1.229c.102.086.227.129.377.129.148 0 .273-.043.377-.129l6.773-5.207c.057-.04.091-.072.1-.098a.199.199 0 0 0 .015-.078.177.177 0 0 0-.023-.09.156.156 0 0 0-.062-.072l-.135-.09a.304.304 0 0 0-.168-.048H14.635V5.33h8.547c.228 0 .422.076.58.228.158.152.238.346.238.576v1.253zM8.17 7.406c1.275 0 2.296.46 3.063 1.381.767.921 1.15 2.134 1.15 3.639 0 1.52-.389 2.747-1.166 3.68-.777.933-1.792 1.4-3.047 1.4-1.26 0-2.272-.457-3.035-1.371-.763-.914-1.145-2.136-1.145-3.664 0-1.548.393-2.779 1.179-3.691.786-.912 1.798-1.369 3.035-1.374h-.034zm.057 1.828c-.632 0-1.122.263-1.47.788-.348.526-.522 1.27-.522 2.233 0 .965.176 1.714.528 2.246.352.532.84.798 1.464.798.628 0 1.114-.258 1.458-.775.344-.517.516-1.262.516-2.235 0-.992-.17-1.752-.51-2.281-.34-.529-.828-.794-1.464-.794v.02zM14.635 21V11.672l-2.389-1.863V21H1.636A1.636 1.636 0 0 1 0 19.364V4.636C0 3.732.732 3 1.636 3h10.61v5.809L14.635 11V3.774l-.957-.752 1.023-.799c.32-.28.594-.42.82-.42.228 0 .5.14.82.42l7.422 5.752c.159.127.237.293.237.498v.143L14.635 21z" />
      </svg>
    ),
    action: () => window.open(`https://outlook.live.com/mail/0/deeplink/compose?to=${EMAIL}`, "_blank"),
  },
  {
    label: "Default",
    icon: Mail,
    action: () => window.location.href = `mailto:${EMAIL}`,
  },
];

export function CtaCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [maxDrag, setMaxDrag] = useState(300);
  const x = useMotionValue(0);

  useEffect(() => {
    const updateMaxDrag = () => {
      if (containerRef.current) {
        setMaxDrag(containerRef.current.offsetWidth - 80);
      }
    };

    updateMaxDrag();
    window.addEventListener("resize", updateMaxDrag);

    // Recalculate after a short delay to ensure layout is complete
    const timer = setTimeout(updateMaxDrag, 100);

    return () => {
      window.removeEventListener("resize", updateMaxDrag);
      clearTimeout(timer);
    };
  }, []);

  const textOpacity = useTransform(x, [0, maxDrag * 0.3], [1, 0]);

  const handleDragEnd = () => {
    const currentX = x.get();
    if (currentX >= maxDrag * 0.7) {
      animate(x, maxDrag, { duration: 0.2 });
      setTimeout(() => {
        setShowOptions(true);
      }, 200);
    } else {
      animate(x, 0, { duration: 0.3, type: "spring", stiffness: 400, damping: 30 });
    }
  };

  const handleOptionClick = (action: () => void) => {
    action();
    closeOptions();
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      closeOptions();
    }, 1000);
  };

  const closeOptions = () => {
    setShowOptions(false);
    animate(x, 0, { duration: 0.3 });
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center h-full w-full overflow-hidden"
    >
      {/* Shimmer text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ opacity: textOpacity }}
      >
        <span className="shimmer-text text-lg font-medium">
          Slide to contact
        </span>
      </motion.div>

      {/* Draggable handle */}
      <motion.div
        drag={showOptions ? false : "x"}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0}
        onDragEnd={handleDragEnd}
        style={{ x }}
        className="relative z-10 flex items-center justify-center ml-2 w-14 h-[calc(100%-16px)] bg-white/10 hover:bg-white/15 rounded-xl cursor-grab active:cursor-grabbing transition-colors"
      >
        {showOptions ? (
          <Mail className="h-5 w-5 text-foreground" />
        ) : (
          <ArrowRight className="h-5 w-5 text-foreground" />
        )}
      </motion.div>

      {/* Options overlay */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center gap-3 bg-background/80 backdrop-blur-sm z-20"
          >
            {emailOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => handleOptionClick(option.action)}
                className="flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <option.icon />
                <span className="text-xs text-muted-foreground">{option.label}</span>
              </button>
            ))}
            <button
              onClick={handleCopyEmail}
              className="flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              <span className="text-xs text-muted-foreground">{copied ? "Copied!" : "Copy"}</span>
            </button>
            <button
              onClick={closeOptions}
              className="absolute right-2 top-2 sm:right-3 sm:top-1/2 sm:-translate-y-1/2 p-1.5 rounded-lg hover:bg-white/10 transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .shimmer-text {
          color: rgba(255, 255, 255, 0.4);
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.4) 0%,
            rgba(255, 255, 255, 0.4) 40%,
            rgba(255, 255, 255, 1) 50%,
            rgba(255, 255, 255, 0.4) 60%,
            rgba(255, 255, 255, 0.4) 100%
          );
          background-size: 300% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 2.5s linear infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
    </div>
  );
}
