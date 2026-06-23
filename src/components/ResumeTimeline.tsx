import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface Job {
  company: string;
  role: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
}

const EXPERIENCES: Job[] = [
  {
    company: "Stealth AI Startup",
    role: "Lead Fullstack Engineer & Founder",
    period: "2024 — Present",
    location: "Chicago, IL (Hybrid)",
    description: [
      "Architected and built a real-time collaborative canvas for generative design using React, Next.js, and WebSockets.",
      "Optimized WebGL-based vector rendering, reducing latency by 45% and supporting 10,000+ simultaneous elements.",
      "Designed and deployed a serverless backend API in Go, orchestrating asynchronous GPU inference pipelines.",
    ],
    skills: ["React", "Next.js", "Go", "WebGL", "TypeScript", "Tailwind", "WebRTC", "PostgreSQL"],
  },
  {
    company: "Vortex Creative Agency",
    role: "Senior Creative Developer",
    period: "2022 — 2024",
    location: "Chicago, IL",
    description: [
      "Led front-end development for award-winning immersive marketing campaigns and luxury brand portfolios.",
      "Specialized in high-fidelity 3D interactive graphics (Three.js/GLSL) and GSAP scroll animations, earning 4 Awwwards site-of-the-day recognitions.",
      "Mentored 4 junior engineers on animation standards, motion design, and semantic HTML best practices.",
    ],
    skills: ["Three.js", "GSAP", "GLSL", "React", "TypeScript", "Vite", "Framer Motion", "Tailwind"],
  },
  {
    company: "Apex Tech Corp",
    role: "Product Engineer",
    period: "2020 — 2022",
    location: "Remote",
    description: [
      "Owned client-facing dashboard features for an enterprise analytics suite with over 150k monthly active users.",
      "Built and co-maintained the company's internal Tailwind-based design system, facilitating rapid component assembly.",
      "Improved Lighthouse performance scores by 35 points through bundle splitting, dynamic imports, and asset optimization.",
    ],
    skills: ["React", "Redux Toolkit", "TypeScript", "GraphQL", "Sass", "Cypress", "Webpack"],
  },
  {
    company: "InnoLab Research",
    role: "Software Developer",
    period: "2018 — 2020",
    location: "Champaign, IL",
    description: [
      "Engineered prototypes and visual interfaces for spatial datasets using D3.js and Leaflet.",
      "Collaborated with UX researchers to design and execute interface usability studies, resulting in a 20% increase in task completion rates.",
      "Developed a Python/Flask microservice for parsing high-resolution geospatial logs, saving 12 hours of manual analysis per week.",
    ],
    skills: ["Vue.js", "D3.js", "Python", "Flask", "Docker", "Sass", "Git"],
  },
];

export default function ResumeTimeline() {
  const [activeJobIndex, setActiveJobIndex] = useState<number>(0);

  const stats = [
    ["20+", "Years Experience"],
    ["95+", "Projects Done"],
    ["200%", "Satisfied Clients"],
  ];

  return (
    <section id="resume" className="bg-bg py-20 md:py-28 border-t border-stroke">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        
        {/* Section Header */}
        <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="mb-4 flex items-center gap-4">
              <span className="h-px w-8 bg-stroke" />
              <p className="text-xs uppercase tracking-[0.3em] text-muted">Resume</p>
            </div>
            <h2 className="text-balance font-body text-4xl font-medium tracking-normal text-text-primary md:text-6xl">
              Professional <span className="font-display italic">experience</span>
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-7 text-muted md:text-base">
              A timeline of my professional experience, key achievements, and core technologies.
            </p>
          </div>
          <a
            href="mailto:ustsingh@gmail.com"
            className="group relative inline-flex self-start md:self-auto rounded-full p-[2px]"
            data-cursor="link"
          >
            <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
            <span className="relative flex items-center gap-1.5 rounded-full bg-surface px-5 py-3 text-sm text-text-primary backdrop-blur-md">
              Download CV <span aria-hidden="true">↓</span>
            </span>
          </a>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          
          {/* Left Column: Stats Sidebar */}
          <div className="flex flex-col gap-8 lg:col-span-4 lg:sticky lg:top-28 lg:h-fit">
            {stats.map(([number, label]) => (
              <motion.div
                key={label}
                className="border-t border-stroke pt-6"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                viewport={{ once: true, margin: "-60px" }}
              >
                <p className="font-display text-5xl italic text-text-primary md:text-6xl">{number}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.22em] text-muted">{label}</p>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Interactive Timeline */}
          <div className="lg:col-span-8">
            <div className="relative border-l border-stroke pl-6 md:pl-8 space-y-8">
              
              {/* Timeline Items */}
              {EXPERIENCES.map((job, idx) => {
                const isActive = activeJobIndex === idx;

                return (
                  <div key={job.company} className="relative group/item">
                    
                    {/* Glowing Bullet Dot */}
                    <div
                      onClick={() => setActiveJobIndex(idx)}
                      className={`absolute -left-[31px] md:-left-[39px] top-1.5 size-4 rounded-full border-2 transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-text-primary border-text-primary scale-125 shadow-[0_0_12px_rgba(255,255,255,0.4)]"
                          : "bg-bg border-stroke hover:border-text-primary"
                      }`}
                    />

                    {/* Timeline Card */}
                    <div 
                      onClick={() => setActiveJobIndex(idx)}
                      className={`rounded-2xl border p-5 md:p-6 transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? "bg-surface border-stroke shadow-xl shadow-black/20" 
                          : "bg-surface/10 border-transparent hover:bg-surface/30 hover:border-stroke/50"
                      }`}
                    >
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                        <div>
                          <h3 className="text-lg font-medium text-text-primary md:text-xl">
                            {job.role}
                          </h3>
                          <p className="mt-1 text-sm font-light text-muted">
                            <span className="font-medium text-text-primary/95">{job.company}</span> &middot; {job.location}
                          </p>
                        </div>
                        <span className="text-xs uppercase tracking-wider text-muted shrink-0 md:text-right">
                          {job.period}
                        </span>
                      </div>

                      {/* Detail Collapsible Section */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="mt-5 border-t border-stroke pt-4 space-y-3">
                              {/* Achievements List */}
                              <ul className="list-none space-y-2.5">
                                {job.description.map((bullet, bIdx) => (
                                  <li key={bIdx} className="flex items-start gap-2.5 text-sm leading-6 text-muted">
                                    <span className="text-text-primary/40 mt-2 font-display italic text-[11px] shrink-0">•</span>
                                    <span>{bullet}</span>
                                  </li>
                                ))}
                              </ul>

                              {/* Tech Tags */}
                              <div className="mt-6 flex flex-wrap gap-2 pt-2">
                                {job.skills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="rounded-full border border-stroke bg-surface/50 px-3 py-1 text-[11px] text-text-primary/80 transition-colors duration-200 hover:border-text-primary hover:text-text-primary"
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
