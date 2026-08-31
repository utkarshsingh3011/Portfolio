import { motion, useMotionValue, useSpring } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";
import { EASING } from "../utils/motion";

interface MagneticProps {
  children: React.ReactNode;
  className?: string;
  maxMovement?: number; // max movement in pixels (defaults to 8px)
}

export default function MagneticButton({
  children,
  className = "",
  maxMovement = 8,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [canHover, setCanHover] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // High-frequency damped spring for immediate, restrained magnetic attraction
  const springConfig = { stiffness: 250, damping: 20, mass: 0.2 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)");
    setCanHover(mq.matches);

    const handler = (e: MediaQueryListEvent) => setCanHover(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!canHover || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();

    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Normalize and scale to maxMovement (max 8px)
    const moveX = Math.max(-maxMovement, Math.min(maxMovement, deltaX * 0.25));
    const moveY = Math.max(-maxMovement, Math.min(maxMovement, deltaY * 0.25));

    x.set(moveX);
    y.set(moveY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: canHover ? smoothX : 0,
        y: canHover ? smoothY : 0,
      }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}
