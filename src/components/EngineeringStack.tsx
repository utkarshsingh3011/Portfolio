import { motion } from "framer-motion";
import { useState } from "react";
import { EASING, editorialFadeUp } from "../utils/motion";

interface StackCategory {
  id: string;
  name: string;
  role: string;
  description: string;
  technologies: string[];
}

const STACK_LAYERS: StackCategory[] = [
  {
    id: "frontend",
    name: "Frontend & Interfaces",
    role: "User experience & browser state",
    description:
      "Crafting performant interfaces, interactive state lifecycles, and responsive layouts.",
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5 / CSS3"],
  },
  {
    id: "backend",
    name: "Backend & APIs",
    role: "Services & data endpoints",
    description:
      "Building asynchronous ingestion services, REST APIs, and authentication flows.",
    technologies: ["Python", "FastAPI", "Node.js", "Express", "REST APIs"],
  },
  {
    id: "security",
    name: "Web Security",
    role: "Vulnerability analysis & defenses",
    description:
      "Studying attack vectors, input sanitization, output encoding, and defensive headers in sandboxed environments.",
    technologies: ["Web security", "Stored XSS", "OWASP concepts", "Input sanitization", "JWT auth"],
  },
  {
    id: "hardware",
    name: "Hardware & Embedded",
    role: "Microcontrollers & telemetry",
    description:
      "Programming microcontrollers, polling sensor hardware, and transmitting live telemetry over WiFi.",
    technologies: ["Arduino Uno", "ESP32", "C / C++", "Sensors", "Hardware telemetry"],
  },
  {
    id: "data",
    name: "Databases",
    role: "Storage & data models",
    description:
      "Structuring relational database schemas with integrity constraints alongside document stores.",
    technologies: ["PostgreSQL", "MongoDB", "SQL", "Mongoose ORM"],
  },
  {
    id: "tools",
    name: "Tools & Workflow",
    role: "Development environment",
    description:
      "Containerized environments, Linux system administration, and version control workflows.",
    technologies: ["Git", "GitHub", "Docker", "Linux / Bash", "Postman", "Vercel"],
  },
];

export default function EngineeringStack() {
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <section id="stack" className="relative bg-bg py-24 md:py-32 border-t border-stroke/60 overflow-hidden">
      <div className="tech-grid absolute inset-0 opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div
          className="mb-16 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={editorialFadeUp}
        >
          <p className="text-xs uppercase tracking-[0.2em] font-mono text-muted mb-3">
            Skills & tools
          </p>
          <h2 className="text-balance font-display text-4xl italic text-text-primary sm:text-6xl md:text-7xl">
            What I work with.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base max-w-2xl">
            The languages, frameworks, and hardware tools I use to turn ideas into working software and connected devices.
          </p>
        </motion.div>

        {/* Detailed Layers Grid */}
        <div className="space-y-4">
          {STACK_LAYERS.map((layer, idx) => {
            const isHovered = activeLayer === layer.id;

            return (
              <motion.div
                key={layer.id}
                onMouseEnter={() => setActiveLayer(layer.id)}
                onMouseLeave={() => setActiveLayer(null)}
                className={`group relative rounded-2xl border transition-all duration-300 p-6 md:p-8 ${
                  isHovered
                    ? "border-white/25 bg-surface/80 shadow-xl shadow-black/40"
                    : "border-stroke/60 bg-surface/25 hover:border-stroke hover:bg-surface/40"
                }`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={{
                  hidden: { opacity: 0, y: 14 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.4, ease: EASING.editorial, delay: idx * 0.05 },
                  },
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  {/* Category Title & Role */}
                  <div className="md:col-span-4">
                    <h3 className="font-body text-xl font-medium text-text-primary md:text-2xl transition-transform duration-300 group-hover:translate-x-1">
                      {layer.name}
                    </h3>
                    <span className="text-xs text-muted block mt-1">
                      {layer.role}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="md:col-span-4">
                    <p className="text-xs md:text-sm text-muted leading-relaxed">
                      {layer.description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="md:col-span-4 flex flex-wrap gap-1.5 md:justify-end">
                    {layer.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-stroke/70 bg-bg/80 px-3 py-1 text-xs font-mono text-text-primary/90 transition-colors group-hover:border-white/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
