import { motion } from "framer-motion";
import { imageClipReveal } from "../utils/motion";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: string;
  imgClassName?: string;
}

export default function ImageReveal({
  src,
  alt,
  className = "",
  aspectRatio = "aspect-[16/10]",
  imgClassName = "",
}: ImageRevealProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-2xl border border-stroke/80 bg-surface/30 ${aspectRatio} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={imageClipReveal}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`h-full w-full object-cover transition-transform duration-700 ease-editorial group-hover:scale-[1.03] ${imgClassName}`}
      />
    </motion.div>
  );
}
