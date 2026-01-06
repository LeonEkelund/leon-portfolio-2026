"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence, PanInfo } from "framer-motion";
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
    const timer = setTimeout(updateMaxDrag, 100);

    return () => {
      window.removeEventListener("resize", updateMaxDrag);
      clearTimeout(timer);
    };
  }, []);

  const textOpacity = useTransform(x, [0, 100], [1, 0]);

  const handleDragEnd = (_: never, info: PanInfo) => {
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
        <span className="text-lg font-medium text-white/40">
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
          className="relative z-10 flex items-center justify-center ml-2 w-14 h-[calc(100%-16px)] bg-white/10 rounded-xl cursor-grab active:cursor-grabbing select-none touch-none"
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
            className="absolute inset-0 flex items-center justify-center gap-3 bg-background z-20"
          >
            {emailOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => handleOptionClick(option.action)}
                className="flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 active:bg-white/10"
              >
                <option.icon />
                <span className="text-xs text-muted-foreground">{option.label}</span>
              </button>
            ))}
            <button
              onClick={handleCopyEmail}
              className="flex flex-col items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 active:bg-white/10"
            >
              {copied ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
              <span className="text-xs text-muted-foreground">{copied ? "Copied!" : "Copy"}</span>
            </button>
            <button
              onClick={closeOptions}
              className="absolute right-2 top-2 sm:right-3 sm:top-1/2 sm:-translate-y-1/2 p-1.5 rounded-lg active:bg-white/10 text-muted-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
