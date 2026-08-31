import { Variants } from "framer-motion";

/**
 * Editorial & Cinematic Motion System
 * Inspired by Apple, Linear, and Readymag design principles.
 * All transitions are kept under 500ms and use precise cubic-bezier curves.
 */

// Precise cubic-bezier easing curves
export const EASING = {
  editorial: [0.22, 1, 0.36, 1] as const, // Apple/Linear smooth deceleration
  cinematic: [0.16, 1, 0.3, 1] as const,  // Deep, authoritative easing
  snappy: [0.25, 0.1, 0.25, 1] as const,   // Crisp micro-interactions
  exit: [0.4, 0, 1, 1] as const,
};

// Reusable Framer Motion Variants

export const editorialFadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    transition: {
      duration: 0.35,
      ease: EASING.editorial,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: EASING.editorial,
    },
  },
};

export const editorialStagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.05,
    },
  },
};

export const maskReveal: Variants = {
  hidden: {
    clipPath: "inset(100% 0% 0% 0%)",
    y: 12,
    opacity: 0,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.48,
      ease: EASING.editorial,
    },
  },
};

export const imageClipReveal: Variants = {
  hidden: {
    clipPath: "inset(12% 0% 12% 0%)",
    filter: "grayscale(100%)",
    scale: 1.05,
    opacity: 0.4,
  },
  visible: {
    clipPath: "inset(0% 0% 0% 0%)",
    filter: "grayscale(0%)",
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: EASING.cinematic,
    },
  },
};

export const lineReveal: Variants = {
  hidden: {
    scaleX: 0,
    originX: 0,
  },
  visible: {
    scaleX: 1,
    transition: {
      duration: 0.45,
      ease: EASING.editorial,
    },
  },
};
