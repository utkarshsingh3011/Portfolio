import { motion } from "framer-motion";

interface SkillCategory {
  title: string;
  description: string;
  skills: string[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Programming Languages",
    description: "Languages I use for backend logic, web interfaces, algorithms, and microcontrollers.",
    skills: ["Python", "TypeScript", "JavaScript", "C / C++", "SQL"],
  },
  {
    title: "Frontend Development",
    description: "Building responsive, accessible web interfaces and interactive visual simulations.",
    skills: ["React", "Next.js", "Tailwind CSS", "HTML5 & CSS3", "Framer Motion"],
  },
  {
    title: "Backend & APIs",
    description: "Creating asynchronous services, REST endpoints, and secure authentication flows.",
    skills: ["FastAPI", "Flask", "Node.js", "Express", "REST APIs", "JWT"],
  },
  {
    title: "Databases",
    description: "Designing relational schemas and managing document-based data storage.",
    skills: ["PostgreSQL", "MongoDB", "SQL Schemas", "Mongoose ORM"],
  },
  {
    title: "Cybersecurity Labs",
    description: "Hands-on vulnerability labs, attack mechanics, and practical defensive remediation.",
    skills: ["Web Security", "Stored XSS", "Security Education", "Vulnerability Labs", "OWASP"],
  },
  {
    title: "Embedded Systems & IoT",
    description: "Microcontroller programming, sensor telemetry, and hardware-to-cloud integration.",
    skills: ["ESP32", "Sensor Interfacing", "Embedded Systems", "IoT Telemetry"],
  },
  {
    title: "Tools & Workflow",
    description: "Version control, containerization, local development, and deployment platforms.",
    skills: ["Git & GitHub", "Docker", "Vercel", "Linux / Bash", "Postman"],
  },
];

export default function EngineeringStack() {
  return (
    <section id="stack" className="relative bg-bg py-20 md:py-28 border-t border-stroke overflow-hidden">
      <div className="tech-grid absolute inset-0 opacity-30 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          viewport={{ once: true, margin: "-60px" }}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted mb-3">Toolbox</p>
            <h2 className="text-balance font-body text-4xl font-medium tracking-normal text-text-primary md:text-6xl">
              What I <span className="font-display italic">work with</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted md:text-base">
              Languages, frameworks, databases, and hardware tools I use to build complete applications and systems.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.title}
              className={`group relative overflow-hidden rounded-3xl border border-stroke bg-surface/40 p-6 md:p-7 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-surface/70 hover:shadow-xl hover:shadow-black/30 ${
                idx === 6 ? "md:col-span-2 lg:col-span-3" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <h3 className="font-body text-xl font-medium text-text-primary md:text-2xl mb-2">
                {cat.title}
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-6">
                {cat.description}
              </p>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-stroke/50">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-stroke bg-surface/60 px-3 py-1.5 text-xs text-text-primary/90 transition-colors duration-200 group-hover:border-white/15 hover:border-[#89aacc]/50 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
