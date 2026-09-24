"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { MEMBERSHIPS, TiltCard } from "./Clubdetail";

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompareModal({ isOpen, onClose }: CompareModalProps) {
  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-10 z-[100] flex justify-center"
          >
            {/* Modal Content */}
            <div className="relative w-full max-w-7xl h-full bg-white rounded-2xl md:rounded-3xl shadow-2xl overflow-y-auto overflow-x-hidden border border-neutral-200 hide-scrollbar">
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 bg-neutral-100 hover:bg-neutral-200 text-neutral-600 rounded-full flex items-center justify-center transition-colors z-50"
                aria-label="Close Comparison"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="py-12 md:py-20 px-6 md:px-12 w-full flex flex-col items-center">
                {/* Heading (Same as second image) */}
                <div className="text-sm tracking-[0.4em] text-black uppercase font-light mb-6 text-center">
                  EXPLORE MEMBERSHIPS
                </div>
                <h3 className="text-3xl md:text-5xl lg:text-6xl font-serif tracking-tight text-black mb-4 text-center">
                  Your Key to Unlock Privileged Experiences
                </h3>
                <p className="text-xs md:text-sm max-w-xl leading-relaxed text-neutral-600 mb-14 text-center">
                  Select from Signature, Diamond, and Imperial cards and enter a world of seamless vacations.
                </p>

                {/* Grid of Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch w-full max-w-6xl mx-auto">
                  {MEMBERSHIPS.map((card, idx) => (
                    <TiltCard key={idx} card={card} />
                  ))}
                </div>
                
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
