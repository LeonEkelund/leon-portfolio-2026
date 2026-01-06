"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const handleRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const handle = handleRef.current;
    const text = textRef.current;
    if (!container || !handle || !text) return;

    let isDragging = false;
    let startX = 0;
    let currentX = 0;
    let maxDrag = container.offsetWidth - 80;

    const updatePosition = (x: number) => {
      handle.style.transform = `translateX(${x}px)`;
      text.style.opacity = String(Math.max(0, 1 - x / (maxDrag * 0.3)));
    };

    const onStart = (clientX: number) => {
      if (showOptions) return;
      isDragging = true;
      startX = clientX - currentX;
      maxDrag = container.offsetWidth - 80;
    };

    const onMove = (clientX: number) => {
      if (!isDragging) return;
      const newX = Math.max(0, Math.min(maxDrag, clientX - startX));
      currentX = newX;
      updatePosition(newX);
    };

    const onEnd = () => {
      if (!isDragging) return;
      isDragging = false;

      if (currentX >= maxDrag * 0.7) {
        // Animate to end
        handle.style.transition = 'transform 0.15s ease-out';
        handle.style.transform = `translateX(${maxDrag}px)`;
        currentX = maxDrag;
        setTimeout(() => {
          handle.style.transition = '';
          setShowOptions(true);
        }, 150);
      } else {
        // Snap back
        handle.style.transition = 'transform 0.2s ease-out';
        handle.style.transform = 'translateX(0px)';
        text.style.transition = 'opacity 0.2s ease-out';
        text.style.opacity = '1';
        currentX = 0;
        setTimeout(() => {
          handle.style.transition = '';
          text.style.transition = '';
        }, 200);
      }
    };

    // Touch events
    const onTouchStart = (e: TouchEvent) => onStart(e.touches[0].clientX);
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      onMove(e.touches[0].clientX);
    };
    const onTouchEnd = () => onEnd();

    // Mouse events
    const onMouseDown = (e: MouseEvent) => onStart(e.clientX);
    const onMouseMove = (e: MouseEvent) => onMove(e.clientX);
    const onMouseUp = () => onEnd();

    handle.addEventListener('touchstart', onTouchStart, { passive: true });
    handle.addEventListener('touchmove', onTouchMove, { passive: false });
    handle.addEventListener('touchend', onTouchEnd);
    handle.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Reset on showOptions change
    if (!showOptions) {
      currentX = 0;
      handle.style.transform = 'translateX(0px)';
      text.style.opacity = '1';
    }

    return () => {
      handle.removeEventListener('touchstart', onTouchStart);
      handle.removeEventListener('touchmove', onTouchMove);
      handle.removeEventListener('touchend', onTouchEnd);
      handle.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [showOptions]);

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
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center h-full w-full overflow-hidden"
    >
      {/* Shimmer text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span ref={textRef} className="shimmer-text text-lg font-medium">
          Slide to contact
        </span>
      </div>

      {/* Draggable handle */}
      {!showOptions && (
        <div
          ref={handleRef}
          className="relative z-10 flex items-center justify-center ml-2 w-14 h-[calc(100%-16px)] bg-white/10 rounded-xl cursor-grab active:cursor-grabbing select-none"
          style={{ touchAction: 'none' }}
        >
          <ArrowRight className="h-5 w-5 text-foreground" />
        </div>
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
