"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, X, Copy, Check } from "lucide-react";
import Image from "next/image";

const EMAIL = "leongudmundssonekelund@gmail.com";

const PHONE = "+46709752924";

const contactOptions = [
  {
    label: "Mail",
    icon: Mail,
    action: () => window.location.href = `mailto:${EMAIL}`,
  },
  {
    label: "Call",
    icon: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    action: () => window.location.href = `tel:${PHONE}`,
  },
];

// Mobile tap version
function MobileCtaCard() {
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleOptionClick = (action: () => void) => {
    action();
    setShowOptions(false);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setShowOptions(false);
    }, 1000);
  };

  return (
    <div className="relative flex items-center justify-center h-full w-full">
      <AnimatePresence mode="wait">
        {!showOptions ? (
          <motion.button
            key="contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={() => setShowOptions(true)}
            className="flex items-center gap-2 px-4 py-2 touch-manipulation"
          >
            <span className="text-lg font-medium text-foreground/60">Tap to connect</span>
          </motion.button>
        ) : (
          <motion.div
            key="options"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="flex items-center gap-2 sm:gap-3 px-2"
          >
            {contactOptions.map((option, index) => (
              <motion.button
                key={option.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.05 }}
                onClick={() => handleOptionClick(option.action)}
                className="flex flex-col items-center gap-1.5 px-3 sm:px-4 py-2 active:text-foreground transition-colors touch-manipulation"
              >
                <option.icon />
                <span className="text-xs text-muted-foreground">{option.label}</span>
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: contactOptions.length * 0.05 }}
              onClick={handleCopyEmail}
              className="flex flex-col items-center gap-1.5 px-3 sm:px-4 py-2 active:text-foreground transition-colors touch-manipulation"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              <span className="text-xs text-muted-foreground">{copied ? "Copied!" : "Copy Email"}</span>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: (contactOptions.length + 1) * 0.05 }}
              onClick={() => setShowOptions(false)}
              className="p-2 rounded-lg active:bg-white/15 transition-colors text-muted-foreground touch-manipulation"
            >
              <X className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Desktop slide version
function DesktopCtaCard() {
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
    const timer = setTimeout(updateMaxDrag, 100);

    return () => {
      window.removeEventListener("resize", updateMaxDrag);
      clearTimeout(timer);
    };
  }, []);

  const textOpacity = useTransform(x, [0, 100], [1, 0]);

  const handleDragEnd = () => {
    const currentX = x.get();
    if (currentX >= maxDrag * 0.7) {
      animate(x, maxDrag, { duration: 0.1 });
      setTimeout(() => setShowOptions(true), 100);
    } else {
      animate(x, 0, { duration: 0.15 });
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
    animate(x, 0, { duration: 0.15 });
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
      {!showOptions && (
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: maxDrag }}
          dragElastic={0}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          style={{ x }}
          className="relative z-10 flex items-center justify-center ml-2 w-14 h-[calc(100%-16px)] bg-white/10 hover:bg-white/15 rounded-xl cursor-grab active:cursor-grabbing select-none"
        >
          <ArrowRight className="h-5 w-5 text-foreground" />
        </motion.div>
      )}

      {/* Options overlay */}
      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute inset-0 flex items-center justify-center gap-3 backdrop-blur-sm z-20"
          >
            {contactOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => handleOptionClick(option.action)}
                className="flex flex-col items-center gap-1.5 px-4 py-2 hover:text-foreground transition-colors"
              >
                <option.icon />
                <span className="text-xs text-muted-foreground">{option.label}</span>
              </button>
            ))}
            <button
              onClick={handleCopyEmail}
              className="flex flex-col items-center gap-1.5 px-4 py-2 hover:text-foreground transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              <span className="text-xs text-muted-foreground">{copied ? "Copied!" : "Copy Email"}</span>
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
          color: rgba(0, 0, 0, 0.3);
          background: linear-gradient(
            90deg,
            rgba(0, 0, 0, 0.3) 0%,
            rgba(0, 0, 0, 0.3) 40%,
            rgba(0, 0, 0, 0.7) 50%,
            rgba(0, 0, 0, 0.3) 60%,
            rgba(0, 0, 0, 0.3) 100%
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

// Main component that switches based on device
export function CtaCard() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // Prevent hydration mismatch - render nothing until mounted
  if (!mounted) {
    return <div className="relative flex items-center justify-center h-full w-full" />;
  }

  return isMobile ? <MobileCtaCard /> : <DesktopCtaCard />;
}
