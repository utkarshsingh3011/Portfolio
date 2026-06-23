import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [hoverType, setHoverType] = useState<"default" | "link" | "view" | "close">("default");
  const [isMobile, setIsMobile] = useState(true);

  // Position values for the cursor
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the outer lag ring
  const springConfig = { stiffness: 220, damping: 28, mass: 0.4 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports hover/coarse pointer
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    setIsMobile(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const trigger = target.closest("a, button, [data-cursor]");
      if (trigger) {
        const cursorVal = trigger.getAttribute("data-cursor");
        if (cursorVal === "view") {
          setHoverType("view");
        } else if (cursorVal === "close") {
          setHoverType("close");
        } else {
          setHoverType("link");
        }
      } else {
        setHoverType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isMobile, mouseX, mouseY]);

  if (isMobile) return null;

  // Variants for outer ring sizing and style based on hover type
  const ringVariants = {
    default: {
      width: 36,
      height: 36,
      backgroundColor: "transparent",
      borderColor: "rgba(255, 255, 255, 0.25)",
      borderWidth: 1,
    },
    link: {
      width: 56,
      height: 56,
      backgroundColor: "rgba(137, 170, 204, 0.1)",
      borderColor: "rgba(137, 170, 204, 0.7)",
      borderWidth: 1,
      scale: 1.05,
    },
    view: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(137, 170, 204, 0.95)",
      borderColor: "rgba(137, 170, 204, 0.95)",
      borderWidth: 0,
    },
    close: {
      width: 80,
      height: 80,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      borderColor: "rgba(255, 255, 255, 0.95)",
      borderWidth: 0,
    },
  };

  return (
    <>
      {/* Inner Pin Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999] size-2 rounded-full bg-text-primary/70 mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }}
      />

      {/* Smooth Outer Follower Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99998] flex items-center justify-center rounded-full border border-solid text-center mix-blend-normal"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={hoverType}
        variants={ringVariants}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      >
        <AnimatePresence>
          {hoverType === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="font-body text-[10px] font-bold tracking-widest text-[#0a0a0a]"
            >
              VIEW
            </motion.span>
          )}
          {hoverType === "close" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              className="font-body text-[10px] font-bold tracking-widest text-[#0a0a0a]"
            >
              CLOSE
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
