import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export interface ProjectDetail {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  badgeColor: string;
  context: string;
  year: string;
  role: string;
  overview: string;
  whatIBuilt: string;
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
    subtitle: "Interactive Cybersecurity Learning Platform",
    badge: "Cybersecurity Lab",
    badgeColor: "border-cyan-500/30 text-cyan-300 bg-cyan-950/40",
    context: "Security Simulation",
    year: "2026",
    role: "Full-Stack & Systems",
    overview:
      "An interactive cybersecurity platform where students learn how web attacks unfold through guided investigations, visual simulations, and step-by-step learning.",
    whatIBuilt:
      "Engineered browser-based attack scenario simulations, interactive security investigation modules, vulnerability inspection logs, and AI-assisted contextual guidance via the Gemini API.",
    howItWorks:
      "Next.js and TypeScript frontend rendering interactive state machines, paired with Framer Motion simulation animations and client-side threat emulation engines.",
    keyFeatures: [
      "Interactive attack and defense simulations for web security scenarios.",
      "Step-by-step guided vulnerability investigations with real-time inspection.",
      "AI-assisted conceptual hints and explanations powered by Gemini API.",
      "Hands-on interactive challenges with immediate remediation feedback.",
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
    id: "xss-guard-lab",
    title: "XSS-Guard-Lab",
    subtitle: "Interactive Stored XSS Security Lab",
    badge: "Security Lab",
    badgeColor: "border-red-500/30 text-red-300 bg-red-950/40",
    context: "Web Security & OWASP",
    year: "2026",
    role: "Security Lab Developer",
    overview:
      "An educational security lab for demonstrating and understanding Stored Cross-Site Scripting (XSS) vulnerabilities in a controlled environment.",
    whatIBuilt:
      "Developed a dual-environment Flask lab contrasting vulnerable execution sinks with secure remediation layers to illustrate payload persistence and defensive mitigation.",
    howItWorks:
      "Python Flask web server with distinct route architectures: unescaped database sinks for attack demonstration alongside context-aware HTML entity encoding and Content Security Policy (CSP) enforcement.",
    keyFeatures: [
      "Interactive Stored XSS payload persistence and script execution lab.",
      "Side-by-side vulnerable vs. remediated code execution analysis.",
      "Defensive implementation: HTML sanitization, output encoding, and CSP headers.",
      "Educational guide explaining OWASP Top 10 web security concepts.",
    ],
    engineeringFocus:
      "Isolating vulnerable demonstration code safely while clearly articulating the mechanics of output encoding and browser execution contexts.",
    tech: ["Python", "Flask", "HTML5", "CSS3", "JavaScript", "Web Security", "OWASP"],
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/utkarshsingh3011/xss-guard-lab",
    demo: "https://xss-guard-lab.vercel.app",
    disclaimer:
      "Educational Notice: This is an intentionally vulnerable educational lab designed strictly for learning web security concepts and defensive output encoding. It is not a production security tool.",
  },
  {
    id: "sentinel-edge",
    title: "Sentinel Edge",
    subtitle: "ESP32 IoT Monitoring System",
    badge: "Embedded & IoT",
    badgeColor: "border-emerald-500/30 text-emerald-300 bg-emerald-950/40",
    context: "Hardware-to-Cloud Telemetry",
    year: "2026",
    role: "Hardware & Backend",
    overview:
      "A full-stack IoT monitoring system that collects live environmental sensor data from ESP32 hardware, transmits it through a FastAPI backend, and visualizes it on a web dashboard.",
    whatIBuilt:
      "Developed ESP32 C++ firmware for environmental sensor polling, an asynchronous FastAPI telemetry ingestion backend, and a real-time Next.js dashboard.",
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
    tech: ["ESP32", "Python", "FastAPI", "Next.js", "TypeScript", "IoT", "Sensors", "REST APIs"],
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/utkarsingh3011/sentinel-edge",
  },
  {
    id: "edgekart",
    title: "EdgeKart",
    subtitle: "Embedded Systems Marketplace",
    badge: "Full-Stack MERN",
    badgeColor: "border-purple-500/30 text-purple-300 bg-purple-950/40",
    context: "Web Application",
    year: "2026",
    role: "Full-Stack Developer",
    overview:
      "A full-stack marketplace designed around embedded electronics components for students, makers, and engineers.",
    whatIBuilt:
      "Engineered an end-to-end e-commerce platform with product browsing, shopping cart state management, user wishlist, JWT-based authentication, and admin inventory controls.",
    howItWorks:
      "React and TypeScript frontend communicating via REST APIs with an Express.js backend and MongoDB document database modeled with Mongoose schemas.",
    keyFeatures: [
      "Electronics component catalog with category filtering and instant search.",
      "Secure user authentication with JWT session management and password hashing.",
      "Persistent shopping cart and order checkout workflow.",
      "Admin inventory management dashboard for adding and updating hardware components.",
    ],
    engineeringFocus:
      "Managing shopping cart and wishlist state synchronization while optimizing MongoDB query performance for dynamic catalog search.",
    tech: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Authentication", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/utkarshsingh3011/EdgeKart",
    demo: "https://edgekart.vercel.app",
  },
  {
    id: "portflow",
    title: "PortFlow",
    subtitle: "Customs Broker Onboarding Platform",
    badge: "Workflow Architecture",
    badgeColor: "border-blue-500/30 text-blue-300 bg-blue-950/40",
    context: "Enterprise Build",
    year: "2026",
    role: "Full-Stack Developer",
    overview:
      "A production-inspired workflow platform designed around importer onboarding, document verification, compliance tracking, audit logging, and reporting.",
    whatIBuilt:
      "Built a multi-stage onboarding workflow engine with rigorous form validation, document tracking checklists, PostgreSQL relational data models, and containerized Docker services.",
    howItWorks:
      "Dockerized setup with a React and TypeScript frontend communicating with an async FastAPI backend and PostgreSQL database.",
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
    id: "safesteps",
    title: "SafeSteps",
    subtitle: "Digital Safety Education Platform",
    badge: "Safety Education",
    badgeColor: "border-amber-500/30 text-amber-300 bg-amber-950/40",
    context: "Educational Web App",
    year: "2026",
    role: "Full-Stack Developer",
    overview:
      "An educational platform designed to help beginners develop practical digital safety skills through guided lessons, activities, and real-world examples.",
    whatIBuilt:
      "Designed and developed interactive digital safety tutorials, emergency SOS contact workflows, geolocation route assistance, and accessible mobile layouts.",
    howItWorks:
      "React and TypeScript web application integrated with Firebase Authentication and Realtime Database, coupled with Google Maps API for route mapping.",
    keyFeatures: [
      "Interactive digital safety lessons with real-world security guidance.",
      "One-tap emergency SOS interface with location coordinate sharing.",
      "Trusted contacts management and safety assistance map navigation.",
      "Accessibility-focused mobile design optimized for straightforward navigation.",
    ],
    engineeringFocus:
      "Balancing high responsiveness and location reporting with a calm, accessible user interface suitable for educational contexts.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Google Maps", "Interactive UI"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
    github: "https://github.com/utkarshsingh3011/SafeSteps-Platform",
    demo: "https://safesteps-platform.vercel.app",
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
          className="fixed inset-0 z-[9990] flex h-screen w-screen overflow-hidden bg-bg/90 backdrop-blur-2xl"
          onClick={onClose}
        >
          {/* Scrollable Container */}
          <div
            className="relative h-full w-full overflow-y-auto overflow-x-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar */}
            <div className="sticky top-0 z-[9995] flex items-center justify-between border-b border-stroke/60 bg-bg/85 px-6 py-4 backdrop-blur-md md:px-12">
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full border px-3 py-0.5 text-xs font-mono ${project.badgeColor}`}
                >
                  {project.badge}
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
                  data-cursor="close"
                  aria-label="Close project modal"
                >
                  <span>Close</span>
                  <span className="text-muted">&times;</span>
                </button>
              </div>
            </div>

            {/* Core Content Layout */}
            <div className="mx-auto max-w-[1000px] px-6 pb-20 pt-8 md:px-12 md:pb-28 md:pt-12">
              {/* Title & Subtitle */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.05, duration: 0.4 }}
                className="max-w-3xl"
              >
                <span className="text-xs font-mono text-muted block mb-2">
                  {project.context} • {project.year}
                </span>
                <h1 className="font-display text-5xl italic leading-tight text-text-primary md:text-7xl">
                  {project.title}
                </h1>
                <p className="mt-3 text-lg text-muted md:text-xl leading-relaxed">
                  {project.subtitle}
                </p>
              </motion.div>

              {/* Action Buttons & Quick Metadata */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.35 }}
                className="mt-8 flex flex-wrap items-center justify-between gap-6 border-y border-stroke py-6"
              >
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3">
                  <div>
                    <span className="text-xs font-mono text-muted block">Category</span>
                    <span className="mt-1 block text-sm font-medium text-text-primary">
                      {project.context}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-muted block">Year</span>
                    <span className="mt-1 block text-sm font-medium text-text-primary">
                      {project.year}
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-muted block">Focus</span>
                    <span className="mt-1 block text-sm font-medium text-text-primary">
                      {project.role}
                    </span>
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
                <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-950/20 p-4 text-xs font-mono text-red-300 flex items-start gap-2">
                  <span className="text-sm shrink-0">ℹ️</span>
                  <span>{project.disclaimer}</span>
                </div>
              )}

              {/* Banner Image */}
              <motion.div
                initial={{ scale: 0.98, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.5 }}
                className="group relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-stroke bg-surface"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
                <div className="halftone absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" />
              </motion.div>

              {/* Case Study Details Grid */}
              <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
                {/* Left Side: Tech Stack */}
                <div className="lg:col-span-4 space-y-6">
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-mono text-text-primary mb-3">
                      Tech Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-stroke bg-surface/70 px-3 py-1 text-xs font-mono text-text-primary/95"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-stroke bg-surface/30 p-5">
                    <h4 className="text-xs uppercase tracking-wider font-mono text-muted mb-2">
                      Engineering Focus
                    </h4>
                    <p className="text-xs leading-relaxed text-muted">
                      {project.engineeringFocus}
                    </p>
                  </div>
                </div>

                {/* Right Side: Structured Details */}
                <div className="space-y-8 lg:col-span-8 text-sm md:text-base leading-relaxed text-muted">
                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-mono text-text-primary mb-2">
                      Overview
                    </h3>
                    <p className="leading-7">{project.overview}</p>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-mono text-text-primary mb-2">
                      What I Built
                    </h3>
                    <p className="leading-7">{project.whatIBuilt}</p>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-mono text-text-primary mb-2">
                      Architecture & Data Flow
                    </h3>
                    <div className="rounded-2xl border border-stroke bg-surface/40 p-4 font-mono text-xs text-text-primary/90 leading-6">
                      {project.howItWorks}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xs uppercase tracking-wider font-mono text-text-primary mb-2">
                      Key Features
                    </h3>
                    <ul className="space-y-2.5">
                      {project.keyFeatures.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5 text-sm leading-6">
                          <span className="font-mono text-[#89aacc] mt-0.5 shrink-0">▸</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
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
