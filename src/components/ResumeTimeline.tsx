import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { EASING, editorialFadeUp } from "../utils/motion";
import MagneticButton from "./MagneticButton";

interface JourneyStep {
  period: string;
  headline: string;
  narrative: string;
  focusAreas: string[];
}

const JOURNEY_STEPS: JourneyStep[] = [
  {
    period: "2025",
    headline: "Started engineering at JIIT Noida",
    narrative:
      "Began B.Tech in Electronics & Communication Engineering. Focused on foundational engineering concepts: digital circuits, computer architecture, C/C++ programming, and data structures.",
    focusAreas: ["Electronics & Communication", "C / C++", "Computer Networks", "Digital Logic"],
  },
  {
    period: "2026",
    headline: "Building software and hardware projects",
    narrative:
      "Applied engineering fundamentals to real-world software and hardware. Built interactive cybersecurity learning tools (Sentinel, XSS Guard Lab), full-stack web applications (EdgeKart, PortFlow), and embedded IoT telemetry pipelines (Sentinel Edge).",
    focusAreas: ["Cybersecurity Labs", "Full-Stack Development", "ESP32 & IoT", "FastAPI & Python"],
  },
  {
    period: "Now",
    headline: "Learning by building",
    narrative:
      "Deepening exploration of web security, distributed backend systems, and hardware-software interfacing. Building practical tools where software interacts with physical sensors and complex network protocols.",
    focusAreas: ["Web Security", "System Architecture", "Hardware-to-Cloud Telemetry", "Practical Labs"],
  },
];

export default function ResumeTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll-linked progression line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 75%"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    mass: 0.1,
  });

  return (
    <section id="journey" className="relative bg-bg py-24 md:py-32 border-t border-stroke/60 overflow-hidden">
      <div className="tech-dots absolute inset-0 opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.div
            className="max-w-2xl"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={editorialFadeUp}
          >
            <p className="text-xs uppercase tracking-[0.2em] font-mono text-muted mb-3">
              Background
            </p>
            <h2 className="text-balance font-display text-4xl italic text-text-primary sm:text-6xl md:text-7xl">
              My journey so far.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-muted md:text-base">
              A record of learning through engineering coursework at JIIT Noida, independent projects, and hands-on experiments.
            </p>
          </motion.div>

          {/* Resume Actions with Magnetic Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <MagneticButton maxMovement={6}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full border border-stroke bg-surface px-5 py-2.5 font-mono text-xs text-text-primary transition hover:border-white/30 hover:bg-stroke"
                aria-label="View Utkarsh Singh resume in new tab"
              >
                View résumé ↗
              </a>
            </MagneticButton>

            <MagneticButton maxMovement={6}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Utkarsh_Singh_Resume.pdf"
                className="inline-block rounded-full bg-text-primary px-5 py-2.5 font-mono text-xs font-medium text-bg transition hover:bg-white"
                aria-label="Download Utkarsh Singh resume PDF"
              >
                Download résumé ↓
              </a>
            </MagneticButton>
          </div>
        </div>

        {/* Education Highlight Card */}
        <motion.div
          className="mb-16 rounded-2xl border border-stroke/70 bg-surface/30 p-6 md:p-8 backdrop-blur-sm"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={editorialFadeUp}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stroke/60 pb-6 mb-6">
            <div>
              <span className="text-xs text-muted block mb-1">
                Undergraduate Education
              </span>
              <h3 className="font-display text-2xl md:text-3xl italic text-text-primary">
                B.Tech in Electronics & Communication Engineering
              </h3>
              <p className="mt-1 text-sm text-muted">
                Jaypee Institute of Information Technology (JIIT), Noida
              </p>
            </div>
            <span className="text-xs text-text-primary/80 shrink-0 md:text-right">
              2025 — Present
            </span>
          </div>

          <p className="text-xs md:text-sm text-muted leading-relaxed max-w-3xl">
            Studying core ECE curriculum with focus on microcontroller architectures, communication systems, digital electronics, and computer science fundamentals. Bridging hardware concepts directly with full-stack software and cybersecurity sandboxes.
          </p>
        </motion.div>

        {/* Scroll-Growing Narrative Progression Track */}
        <div ref={containerRef} className="relative pl-6 md:pl-10 space-y-12">
          {/* Static Background Rail */}
          <div className="absolute left-[3px] md:left-[5px] top-3 bottom-3 w-[2px] bg-stroke/50" />

          {/* Dynamic Scroll-Growing Active Rail */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-[3px] md:left-[5px] top-3 bottom-3 w-[2px] bg-gradient-to-b from-[#89aacc] via-text-primary to-[#89aacc]/40"
          />

          {JOURNEY_STEPS.map((step, idx) => (
            <motion.div
              key={step.period}
              className="relative group"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: { opacity: 0, x: -12 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { duration: 0.45, ease: EASING.editorial, delay: idx * 0.08 },
                },
              }}
            >
              {/* Timeline marker node */}
              <div className="absolute -left-[27px] md:-left-[43px] top-1.5 size-3.5 rounded-full border-2 border-stroke bg-bg transition-all duration-300 group-hover:border-[#89aacc] group-hover:bg-[#89aacc] group-hover:scale-110" />

              <div className="max-w-3xl">
                <span className="text-xs text-[#89aacc] font-medium block mb-1">
                  {step.period}
                </span>

                <h3 className="font-body text-xl md:text-2xl font-medium text-text-primary mb-2">
                  {step.headline}
                </h3>

                <p className="text-xs md:text-sm text-muted leading-relaxed mb-4">
                  {step.narrative}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {step.focusAreas.map((area) => (
                    <span
                      key={area}
                      className="rounded-full border border-stroke/70 bg-surface/50 px-3 py-1 font-mono text-xs text-text-primary/80 transition-colors group-hover:border-white/20"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
