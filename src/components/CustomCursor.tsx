import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [hoverType, setHoverType] = useState<"default" | "link" | "view">("default");
  const [isTouch, setIsTouch] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { stiffness: 300, damping: 28, mass: 0.3 };
  const ringX = useSpring(mouseX, springConfig);
  const ringY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    setIsTouch(!mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setIsTouch(!e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const trigger = target.closest("a, button, [data-cursor]");
      if (trigger) {
        const cursorVal = trigger.getAttribute("data-cursor");
        if (cursorVal === "view") {
          setHoverType("view");
        } else {
          setHoverType("link");
        }
      } else {
        setHoverType("default");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouch, isVisible, mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Subtle Inner Pin Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99999] size-1.5 rounded-full bg-white mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      {/* Outer Follower Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[99998] flex items-center justify-center rounded-full border border-white/20"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hoverType === "view" ? 64 : hoverType === "link" ? 44 : 28,
          height: hoverType === "view" ? 64 : hoverType === "link" ? 44 : 28,
          borderColor:
            hoverType === "view"
              ? "rgba(255, 255, 255, 0.7)"
              : hoverType === "link"
              ? "rgba(137, 170, 204, 0.6)"
              : "rgba(255, 255, 255, 0.2)",
          backgroundColor:
            hoverType === "view"
              ? "rgba(255, 255, 255, 0.08)"
              : hoverType === "link"
              ? "rgba(137, 170, 204, 0.05)"
              : "transparent",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      >
        <AnimatePresence>
          {hoverType === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.12 }}
              className="font-mono text-[9px] uppercase tracking-widest text-white/90"
            >
              View
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
