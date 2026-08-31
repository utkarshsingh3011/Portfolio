import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  overview: string;
  whatIBuilt: string;
  whyIBuiltIt: string;
  howItWorks: string;
  keyFeatures: string[];
  engineeringFocus: string;
  tech: string[];
  image: string;
  github?: string;
  demo?: string;
  disclaimer?: string;
}

export const PROJECT_DETAILS: ProjectDetail[] = [
  {
    id: "sentinel",
    title: "Sentinel",
    subtitle: "A hands-on way to understand how cyber attacks unfold.",
    category: "Cybersecurity platform",
    year: "2026",
    role: "Frontend & simulation engine",
    whyIBuiltIt:
      "Security education often gets stuck between passive video lectures and dry theory. I built Sentinel to make web attack vectors visual and interactive through guided browser simulations.",
    overview:
      "Sentinel is an interactive platform where learners investigate simulated attacks instead of simply reading about them. Users step through vulnerability scenarios, inspect browser state changes, and apply mitigations in real time.",
    whatIBuilt:
      "Engineered browser-based attack simulations using client-side finite state machines, interactive inspection checkpoints, and contextual guidance powered by the Gemini API.",
    howItWorks:
      "A Next.js and TypeScript frontend renders interactive state machines, using Framer Motion for step animations and a local emulation engine to keep simulations completely safe and contained.",
    keyFeatures: [
      "Interactive attack and defense simulations for common web security scenarios.",
      "Step-by-step vulnerability investigations with real-time state inspection.",
      "AI-assisted conceptual hints and explanations when learners get stuck.",
      "Hands-on challenges with immediate remediation feedback.",
    ],
    engineeringFocus:
      "Creating intuitive visual abstractions for security concepts while keeping simulations safe and client-contained.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Gemini API"],
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/utkarshsingh3011/Sentinel--Learn-Cybersecurity-Through-Simulations",
    demo: "https://sentinel-cyberlabs.vercel.app",
  },
  {
    id: "edgekart",
    title: "EdgeKart",
    subtitle: "A marketplace for students and makers looking for embedded electronics.",
    category: "Full-stack marketplace",
    year: "2026",
    role: "Full-stack development",
    whyIBuiltIt:
      "Students and makers often struggle to find specific microcontrollers, breakout boards, and sensors in one clean place with clear technical specs. I built EdgeKart around the needs of embedded developers.",
    overview:
      "EdgeKart is an e-commerce platform designed around embedded electronics, microcontrollers, and sensor modules for students, hobbyists, and engineers.",
    whatIBuilt:
      "Built an end-to-end shopping experience featuring product catalog filtering, cart state management, user wishlists, JWT authentication, and an admin inventory management dashboard.",
    howItWorks:
      "A React and TypeScript frontend communicates via REST APIs with an Express.js backend and a MongoDB document database modeled with Mongoose schemas.",
    keyFeatures: [
      "Electronics catalog with category filtering and instant search.",
      "User authentication with JWT session management and password hashing.",
      "Persistent shopping cart and order checkout workflow.",
      "Admin dashboard for adding and updating hardware parts.",
    ],
    engineeringFocus:
      "Managing shopping cart and wishlist state synchronization while optimizing MongoDB compound query indexing for multi-attribute component searches.",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS", "JWT Auth"],
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/utkarshsingh3011/EdgeKart",
    demo: "https://edgekart.vercel.app",
  },
  {
    id: "safesteps",
    title: "SafeSteps",
    subtitle: "An educational guide and safety platform for practical digital hygiene.",
    category: "Safety & education",
    year: "2026",
    role: "Frontend & integration",
    whyIBuiltIt:
      "Digital security can feel overwhelming for everyday non-technical users. SafeSteps simplifies practical cyber hygiene into bite-sized, interactive visual lessons paired with emergency assistance tools.",
    overview:
      "SafeSteps is an interactive digital safety platform focused on practical privacy tips, account security lessons, and one-tap emergency contact workflows for everyday internet users.",
    whatIBuilt:
      "Designed and developed interactive digital safety tutorials, emergency SOS contact workflows, geolocation route assistance, and responsive mobile layouts.",
    howItWorks:
      "A Next.js and TypeScript web app integrated with Firebase Authentication and Realtime Database, paired with Google Maps API for route assistance.",
    keyFeatures: [
      "Interactive digital safety lessons with real-world security guidance.",
      "One-tap emergency SOS interface with location coordinate sharing.",
      "Trusted contacts management and safety assistance map navigation.",
      "Accessibility-focused mobile design optimized for straightforward navigation.",
    ],
    engineeringFocus:
      "Balancing high responsiveness and location reporting with a calm, accessible user interface suitable for educational contexts.",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Firebase", "Google Maps API"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/utkarshsingh3011/SafeSteps-Platform",
    demo: "https://safesteps-platform.vercel.app",
  },
  {
    id: "sentinel-edge",
    title: "Sentinel Edge",
    subtitle: "Live environmental sensor data from an ESP32 to a web dashboard.",
    category: "Hardware & IoT",
    year: "2026",
    role: "Firmware & telemetry backend",
    whyIBuiltIt:
      "Moving sensor readings from physical microcontrollers to web interfaces without dropped packets or memory overflows requires thoughtful hardware polling, batching, and lightweight async ingestion.",
    overview:
      "Sentinel Edge is an IoT telemetry pipeline that reads live environmental sensor data from ESP32 microcontrollers, streams it through an asynchronous FastAPI backend, and renders real-time metric visualizations.",
    whatIBuilt:
      "Developed ESP32 C++ firmware for sensor polling, an asynchronous FastAPI ingestion backend in Python, and a real-time Next.js dashboard.",
    howItWorks:
      "Sensors → ESP32 Microcontroller → WiFi / HTTP Telemetry → FastAPI Python Server → Real-time Next.js Dashboard.",
    keyFeatures: [
      "Direct telemetry streaming from connected ESP32 environmental sensors.",
      "High-throughput asynchronous ingestion pipeline built with Python FastAPI.",
      "Real-time visual monitoring dashboard with live sensor gauges and metric charts.",
      "Configurable alert thresholds for environmental anomaly detection and logging.",
    ],
    engineeringFocus:
      "Optimizing memory efficiency on ESP32 microcontrollers while maintaining reliable, low-latency telemetry transmission to the web dashboard.",
    tech: ["ESP32", "Python", "FastAPI", "Next.js", "TypeScript", "Sensors", "REST APIs"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/utkarshsingh3011/sentinel-edge",
  },
  {
    id: "portflow",
    title: "PortFlow",
    subtitle: "A digital workflow for customs broker onboarding and compliance.",
    category: "Full-stack workflow",
    year: "2026",
    role: "Full-stack development",
    whyIBuiltIt:
      "Customs broker and importer onboarding involves numerous regulatory checkpoints, document validations, and compliance records that standard web forms cannot accommodate.",
    overview:
      "PortFlow explores how customs onboarding can be streamlined digitally — from customer details and document verification to compliance checklists and audit logging.",
    whatIBuilt:
      "Built a multi-stage onboarding workflow engine with rigorous form validation, document tracking checklists, PostgreSQL relational data models, and containerized Docker services.",
    howItWorks:
      "A Dockerized setup with a React and TypeScript frontend communicating with an asynchronous FastAPI backend and PostgreSQL database.",
    keyFeatures: [
      "Multi-stage customer onboarding form wizard with granular field validation.",
      "Document upload tracking and compliance verification checklists.",
      "Audit logging and status tracking for compliance reporting.",
      "Docker containerized setup for reproducible local deployment.",
    ],
    engineeringFocus:
      "Designing relational PostgreSQL schemas for onboarding lifecycles and building reliable multi-step form state management.",
    tech: ["React", "TypeScript", "FastAPI", "Python", "PostgreSQL", "JWT Auth", "Tailwind CSS", "Docker"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/utkarshsingh3011/PortFlow",
  },
  {
    id: "xss-guard-lab",
    title: "XSS Guard Lab",
    subtitle: "An educational sandbox for testing XSS vulnerabilities and defensive fixes.",
    category: "Security lab",
    year: "2026",
    role: "Security lab developer",
    whyIBuiltIt:
      "Understanding web injection vulnerabilities is easiest when you can see what happens inside the browser execution sink when input is unencoded versus when sanitization and CSP headers are applied.",
    overview:
      "XSS Guard Lab is an educational lab demonstrating Stored Cross-Site Scripting (XSS) mechanics and defensive remediation in a sandboxed Flask environment.",
    whatIBuilt:
      "Developed a dual-route Flask lab contrasting vulnerable execution sinks with secure remediation layers to illustrate payload persistence and defensive mitigation.",
    howItWorks:
      "A Python Flask server with distinct routes: unescaped database sinks for attack demonstration alongside context-aware HTML entity encoding and Content Security Policy (CSP) enforcement.",
    keyFeatures: [
      "Interactive Stored XSS payload persistence and script execution lab.",
      "Side-by-side vulnerable vs. remediated code execution analysis.",
      "Defensive implementation: HTML sanitization, output encoding, and CSP headers.",
      "Educational guide explaining OWASP web security concepts.",
    ],
    engineeringFocus:
      "Isolating vulnerable demonstration code safely while clearly articulating the mechanics of output encoding and browser execution contexts.",
    tech: ["Python", "Flask", "HTML", "CSS", "JavaScript", "Web Security", "OWASP"],
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/utkarshsingh3011/xss-guard-lab",
    demo: "https://xss-guard-lab.vercel.app",
    disclaimer:
      "Educational note: This is an intentionally vulnerable educational lab designed strictly for learning web security concepts and defensive output encoding.",
  },
];

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectIndex: number | null;
  onSelectProject?: (index: number) => void;
}

export default function ProjectModal({
  isOpen,
  onClose,
  projectIndex,
  onSelectProject,
}: ProjectModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowLeft" && projectIndex !== null && projectIndex > 0 && onSelectProject) {
          onSelectProject(projectIndex - 1);
        }
        if (
          e.key === "ArrowRight" &&
          projectIndex !== null &&
          projectIndex < PROJECT_DETAILS.length - 1 &&
          onSelectProject
        ) {
          onSelectProject(projectIndex + 1);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose, projectIndex, onSelectProject]);

  const project = projectIndex !== null ? PROJECT_DETAILS[projectIndex] : null;

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9990] flex h-screen w-screen overflow-hidden bg-bg/95 backdrop-blur-2xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={project.title}
        >
          {/* Scrollable Container */}
          <div
            className="relative h-full w-full overflow-y-auto overflow-x-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="sticky top-0 z-[9995] flex items-center justify-between border-b border-stroke/70 bg-bg/90 px-6 py-4 backdrop-blur-md md:px-12">
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted">
                  {project.category}
                </span>
                <span className="text-stroke">•</span>
                <span className="text-xs text-text-primary">
                  {project.year}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {onSelectProject && (
                  <>
                    <button
                      onClick={() =>
                        projectIndex !== null &&
                        projectIndex > 0 &&
                        onSelectProject(projectIndex - 1)
                      }
                      disabled={projectIndex === 0}
                      className="rounded-full border border-stroke bg-surface px-3 py-1.5 font-mono text-xs text-text-primary transition hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none"
                      aria-label="Previous project"
                    >
                      ← Prev
                    </button>
                    <button
                      onClick={() =>
                        projectIndex !== null &&
                        projectIndex < PROJECT_DETAILS.length - 1 &&
                        onSelectProject(projectIndex + 1)
                      }
                      disabled={projectIndex === PROJECT_DETAILS.length - 1}
                      className="rounded-full border border-stroke bg-surface px-3 py-1.5 font-mono text-xs text-text-primary transition hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none"
                      aria-label="Next project"
                    >
                      Next →
                    </button>
                  </>
                )}
                <button
                  onClick={onClose}
                  className="ml-2 flex items-center gap-1.5 rounded-full border border-stroke bg-surface px-4 py-1.5 font-mono text-xs text-text-primary transition hover:border-white/40 hover:bg-stroke"
                  aria-label="Close project modal"
                >
                  <span>Close</span>
                  <span className="text-muted">&times;</span>
                </button>
              </div>
            </div>

            {/* Core Content Layout */}
            <div className="mx-auto max-w-[850px] px-6 pb-20 pt-8 md:px-12 md:pb-28 md:pt-12">
              {/* Title & Subtitle */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.4 }}
                className="max-w-3xl"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-muted">
                    {project.category}
                  </span>
                  <span className="text-stroke">•</span>
                  <span className="text-xs text-muted">
                    {project.year}
                  </span>
                </div>

                <h1 className="font-display text-4xl italic text-text-primary sm:text-6xl md:text-7xl">
                  {project.title}
                </h1>
                <p className="mt-4 text-base text-muted md:text-xl leading-relaxed">
                  {project.subtitle}
                </p>
              </motion.div>

              {/* Action Buttons & Quick Metadata */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="mt-8 flex flex-wrap items-center justify-between gap-6 border-y border-stroke/70 py-6"
              >
                <div className="flex flex-wrap gap-8 text-xs">
                  <div>
                    <span className="text-muted block mb-1">Focus</span>
                    <span className="text-text-primary font-medium">{project.role}</span>
                  </div>
                  <div>
                    <span className="text-muted block mb-1">Year</span>
                    <span className="text-text-primary font-medium">{project.year}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-stroke bg-surface px-5 py-2 font-mono text-xs text-text-primary transition hover:border-white/30 hover:bg-stroke"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-text-primary px-5 py-2 font-mono text-xs text-bg transition hover:bg-white"
                    >
                      Live Demo ↗
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Disclaimer if present */}
              {project.disclaimer && (
                <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-950/20 p-4 text-xs text-amber-200/90 leading-relaxed">
                  {project.disclaimer}
                </div>
              )}

              {/* Banner Image */}
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-stroke bg-surface"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
              </motion.div>

              {/* Case Study Details */}
              <div className="mt-12 space-y-12 text-sm leading-relaxed text-muted md:text-base">
                {/* Why I built it */}
                <div>
                  <h2 className="text-xs uppercase tracking-wider text-text-primary mb-3">
                    Why I built it
                  </h2>
                  <p className="leading-7 text-text-primary/90">{project.whyIBuiltIt}</p>
                </div>

                {/* What I built */}
                <div>
                  <h2 className="text-xs uppercase tracking-wider text-text-primary mb-3">
                    What I built
                  </h2>
                  <p className="leading-7">{project.whatIBuilt}</p>
                </div>

                {/* Architecture & Flow */}
                <div>
                  <h2 className="text-xs uppercase tracking-wider text-text-primary mb-3">
                    How it works under the hood
                  </h2>
                  <div className="rounded-xl border border-stroke bg-surface/50 p-4 font-mono text-xs text-text-primary/90 leading-6">
                    {project.howItWorks}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h2 className="text-xs uppercase tracking-wider text-text-primary mb-3">
                    Key features
                  </h2>
                  <ul className="space-y-2.5">
                    {project.keyFeatures.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2.5 text-sm leading-6">
                        <span className="text-muted mt-0.5 shrink-0">—</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h2 className="text-xs uppercase tracking-wider text-text-primary mb-3">
                    Technologies
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-stroke bg-surface/60 px-3.5 py-1 text-xs font-mono text-text-primary/90"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Nav */}
              {onSelectProject && (
                <div className="mt-16 flex items-center justify-between border-t border-stroke pt-6">
                  <button
                    onClick={() =>
                      projectIndex !== null &&
                      projectIndex > 0 &&
                      onSelectProject(projectIndex - 1)
                    }
                    disabled={projectIndex === 0}
                    className="font-mono text-xs text-muted hover:text-text-primary disabled:opacity-30"
                  >
                    ← Previous Project
                  </button>
                  <button
                    onClick={onClose}
                    className="rounded-full border border-stroke bg-surface px-5 py-2 font-mono text-xs text-text-primary hover:border-white/30"
                  >
                    Back to Portfolio
                  </button>
                  <button
                    onClick={() =>
                      projectIndex !== null &&
                      projectIndex < PROJECT_DETAILS.length - 1 &&
                      onSelectProject(projectIndex + 1)
                    }
                    disabled={projectIndex === PROJECT_DETAILS.length - 1}
                    className="font-mono text-xs text-muted hover:text-text-primary disabled:opacity-30"
                  >
                    Next Project →
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
