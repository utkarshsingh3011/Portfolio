import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Milestone {
  role: string;
  category: string;
  period: string;
  institutionOrContext: string;
  description: string[];
  skills: string[];
}

const MILESTONES: Milestone[] = [
  {
    role: "B.Tech in Electronics & Communication Engineering",
    category: "Education",
    institutionOrContext: "Jaypee Institute of Information Technology (JIIT), Noida",
    period: "2025 – Present",
    description: [
      "Studying Electronics & Communication Engineering with a focus on computer systems, software development, and cybersecurity.",
      "Building practical foundations across digital electronics, computer networks, data structures, and hardware-software interfacing.",
      "Applying classroom fundamentals directly to software projects, vulnerability labs, and microcontroller telemetry.",
    ],
    skills: ["ECE", "Digital Electronics", "Computer Networks", "C / C++", "Microcontrollers", "Data Structures"],
  },
  {
    role: "Cybersecurity Platforms & Interactive Labs",
    category: "Cybersecurity",
    institutionOrContext: "Sentinel & XSS-Guard-Lab",
    period: "2026",
    description: [
      "Built Sentinel, an interactive learning platform that simulates cyber attack scenarios using state machines and guided hints.",
      "Developed XSS-Guard-Lab, an educational Stored XSS sandbox contrasting vulnerable endpoints with secure sanitization and CSP headers.",
      "Focused on making security concepts clear and visual without exposing real infrastructure to risks.",
    ],
    skills: ["Web Security", "Stored XSS", "Next.js", "Python", "Flask", "OWASP", "Framer Motion"],
  },
  {
    role: "Full-Stack Web Applications",
    category: "Full-Stack",
    institutionOrContext: "EdgeKart & PortFlow",
    period: "2026",
    description: [
      "Created EdgeKart, an e-commerce platform for electronics parts and sensors with user authentication and cart management.",
      "Built PortFlow, a customs broker onboarding platform with multi-step form workflows, document verification, and PostgreSQL schemas.",
      "Focused on clean component architecture, reliable authentication, and REST API design.",
    ],
    skills: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "FastAPI", "PostgreSQL", "Docker"],
  },
  {
    role: "ESP32 Hardware & Cloud Telemetry",
    category: "Embedded & IoT",
    institutionOrContext: "Sentinel Edge",
    period: "2026",
    description: [
      "Built Sentinel Edge, an end-to-end IoT monitoring pipeline connecting ESP32 environmental sensors to a live web dashboard.",
      "Wrote microcontroller firmware for sensor polling and an asynchronous FastAPI backend for real-time data ingestion.",
      "Designed a live dashboard with metric charts, visual gauges, and threshold alerts.",
    ],
    skills: ["ESP32", "Sensors", "Python", "FastAPI", "Next.js", "IoT Telemetry", "REST APIs"],
  },
  {
    role: "Ongoing Projects & Exploration",
    category: "Current Focus",
    institutionOrContext: "Independent Exploration",
    period: "Present",
    description: [
      "Continuing to explore web security, defensive coding practices, and distributed systems.",
      "Building practical tools at the intersection of embedded microcontrollers, cybersecurity, and modern full-stack web applications.",
    ],
    skills: ["Web Security", "System Architecture", "Linux", "Git", "Algorithms", "Cloud Deployment"],
  },
];

export default function ResumeTimeline() {
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState<number>(0);

  const stats = [
    { number: "2025", label: "Started B.Tech", detail: "ECE @ JIIT Noida" },
    { number: "6", label: "Projects Built", detail: "Web, Security, IoT" },
    { number: "15+", label: "Technologies", detail: "Software & Hardware" },
    { number: "ECE", label: "Degree Focus", detail: "Hardware + Software" },
  ];

  return (
    <section id="journey" className="relative bg-bg py-20 md:py-28 border-t border-stroke overflow-hidden">
      <div className="tech-dots absolute inset-0 opacity-20 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-muted mb-3">Background</p>
            <h2 className="text-balance font-body text-4xl font-medium tracking-normal text-text-primary md:text-6xl">
              My <span className="font-display italic">journey</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted md:text-base">
              A timeline of my studies at JIIT Noida, personal software projects, cybersecurity labs, and hardware builds.
            </p>
          </div>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Utkarsh_Singh_Resume.pdf"
            className="group relative inline-flex self-start md:self-auto rounded-full p-[2px]"
            data-cursor="link"
            aria-label="Download Utkarsh Singh resume PDF"
          >
            <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
            <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-3 font-mono text-xs text-text-primary backdrop-blur-md transition group-hover:border-transparent">
              Download résumé ↓
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Side: Stats */}
          <div className="flex flex-col gap-6 lg:col-span-4 lg:sticky lg:top-28 lg:h-fit">
            {stats.map((stat, sIdx) => (
              <motion.div
                key={stat.label}
                className="rounded-2xl border border-stroke bg-surface/30 p-5 md:p-6 backdrop-blur-sm transition-colors hover:border-white/20 hover:bg-surface/50"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sIdx * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, margin: "-60px" }}
              >
                <div className="flex items-baseline justify-between">
                  <p className="font-display text-4xl italic text-text-primary md:text-5xl">{stat.number}</p>
                  <span className="font-mono text-[10px] text-muted tracking-wider uppercase">{stat.detail}</span>
                </div>
                <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-muted">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Right Side: Timeline */}
          <div className="lg:col-span-8">
            <div className="relative border-l border-stroke/70 pl-6 md:pl-8 space-y-6">
              {MILESTONES.map((item, idx) => {
                const isActive = activeMilestoneIndex === idx;

                return (
                  <div key={item.role} className="relative group/item">
                    {/* Node Dot */}
                    <div
                      onClick={() => setActiveMilestoneIndex(idx)}
                      className={`absolute -left-[31px] md:-left-[39px] top-2 size-4 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-[#89aacc] border-[#89aacc] scale-125 shadow-[0_0_14px_rgba(137,170,204,0.6)]"
                          : "bg-bg border-stroke hover:border-text-primary"
                      }`}
                    />

                    {/* Milestone Card */}
                    <div
                      onClick={() => setActiveMilestoneIndex(idx)}
                      className={`rounded-2xl border p-5 md:p-6 transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-surface/90 border-white/20 shadow-xl shadow-black/30"
                          : "bg-surface/20 border-stroke/60 hover:bg-surface/40 hover:border-stroke"
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <span className="font-mono text-[11px] tracking-wider text-[#89aacc] block mb-1">
                            {item.category}
                          </span>
                          <h3 className="text-lg font-medium text-text-primary md:text-xl">
                            {item.role}
                          </h3>
                          <p className="mt-1 text-sm text-muted">
                            <span className="font-medium text-text-primary/90">{item.institutionOrContext}</span>
                          </p>
                        </div>
                        <span className="font-mono text-xs text-muted shrink-0 md:text-right">
                          {item.period}
                        </span>
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="mt-5 border-t border-stroke/60 pt-4 space-y-3">
                              <ul className="list-none space-y-2.5">
                                {item.description.map((bullet, bIdx) => (
                                  <li key={bIdx} className="flex items-start gap-2.5 text-sm leading-6 text-muted">
                                    <span className="font-mono text-[#89aacc] text-xs mt-1 shrink-0">▸</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>

                              <div className="mt-5 flex flex-wrap gap-2 pt-3 border-t border-stroke/40">
                                {item.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="rounded-full border border-stroke bg-surface/60 px-3 py-1 text-[11px] font-mono text-text-primary/80"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
