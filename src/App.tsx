import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hls from "hls.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import ResumeTimeline from "./components/ResumeTimeline";
import EngineeringStack from "./components/EngineeringStack";
import ProjectModal, { PROJECT_DETAILS, ProjectDetail } from "./components/ProjectModal";
import NoteModal, { ENGINEERING_NOTES } from "./components/NoteModal";
import ContactFormModal from "./components/ContactFormModal";

gsap.registerPlugin(ScrollTrigger);

const hlsSource =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

interface GalleryItem {
  image: string;
  label: string;
  projectIndex: number;
  projectTitle: string;
  rotate: string;
  y: number;
}

const galleryItems: GalleryItem[] = [
  {
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=900&q=85",
    label: "Security Lab // XSS-Guard",
    projectIndex: 1,
    projectTitle: "XSS-Guard-Lab",
    rotate: "-rotate-2",
    y: -70,
  },
  {
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=85",
    label: "Hardware // ESP32 Telemetry",
    projectIndex: 2,
    projectTitle: "Sentinel Edge",
    rotate: "rotate-2",
    y: 100,
  },
  {
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=85",
    label: "Simulation Engine // Sentinel",
    projectIndex: 0,
    projectTitle: "Sentinel",
    rotate: "rotate-3",
    y: -110,
  },
  {
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=85",
    label: "Telemetry Dashboard // Real-time",
    projectIndex: 2,
    projectTitle: "Sentinel Edge",
    rotate: "-rotate-2",
    y: 85,
  },
  {
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=85",
    label: "Workflow Engine // PortFlow",
    projectIndex: 4,
    projectTitle: "PortFlow",
    rotate: "rotate-2",
    y: -95,
  },
  {
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=85",
    label: "Accessible UI // SafeSteps",
    projectIndex: 5,
    projectTitle: "SafeSteps",
    rotate: "-rotate-3",
    y: 110,
  },
];

function HlsVideo({ className = "" }: { className?: string }) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (Hls.isSupported()) {
      hls = new Hls({ enableWorker: true });
      hls.loadSource(hlsSource);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsSource;
    }

    return () => {
      hls?.destroy();
    };
  }, []);

  return (
    <video
      ref={videoRef}
      className={`absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover ${className}`}
      autoPlay
      muted
      loop
      playsInline
    />
  );
}

function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ["Engineer", "Build", "Create"];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    let raf = 0;
    const started = performance.now();
    const duration = 850;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      const next = Math.round(progress * 100);
      setCount(next);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(onComplete, 160);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const interval = window.setInterval(
      () => setWordIndex((current) => (current + 1) % words.length),
      280,
    );
    return () => window.clearInterval(interval);
  }, [words.length]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden bg-bg"
      exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeInOut" } }}
    >
      <div className="tech-grid absolute inset-0 opacity-30 pointer-events-none" />

      <motion.div
        className="absolute left-6 top-6 font-mono text-xs text-muted md:left-10 md:top-10 flex items-center gap-2"
        initial={{ y: -15, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <span>Utkarsh Singh</span>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={words[wordIndex]}
            className="font-display text-4xl italic text-text-primary/90 md:text-6xl"
            initial={{ y: 12, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -12, opacity: 0 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {words[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-7 right-6 font-display text-5xl tabular-nums text-text-primary md:bottom-10 md:right-10 md:text-7xl">
        {String(count).padStart(3, "0")}
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-stroke/50">
        <div
          className="accent-gradient h-full origin-left transition-transform duration-75"
          style={{
            transform: `scaleX(${count / 100})`,
          }}
        />
      </div>
    </motion.div>
  );
}

const NAV_ITEMS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Stack", href: "#stack", id: "stack" },
  { label: "Notes", href: "#journal", id: "journal" },
  { label: "Playground", href: "#playground", id: "playground" },
  { label: "Journey", href: "#journey", id: "journey" },
];

function Navbar({ onContactClick }: { onContactClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const current = NAV_ITEMS.findLast((item) => {
        const section = document.getElementById(item.id);
        return section ? section.offsetTop - 180 <= window.scrollY : false;
      });

      setActiveSection(current?.id ?? "home");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-3 md:pt-6">
        <div
          className={`inline-flex w-full max-w-[96vw] sm:max-w-max items-center justify-between sm:justify-start rounded-full border border-white/10 bg-surface/90 px-3 py-1.5 backdrop-blur-xl transition-all duration-300 ${scrolled ? "shadow-2xl shadow-black/50 border-white/20" : ""
            }`}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="group relative grid size-8 md:size-9 place-items-center rounded-full p-[2px]"
            aria-label="Go to home section"
          >
            <span className="accent-gradient absolute inset-0 rounded-full transition-transform duration-300 group-hover:rotate-180" />
            <span className="relative grid size-full place-items-center rounded-full bg-bg font-display text-[13px] italic text-text-primary transition-transform duration-300 group-hover:scale-105">
              US
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 ml-2">
            <span className="mx-1 h-4 w-px bg-stroke" />
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs transition-colors duration-200 ${activeSection === item.id
                  ? "bg-stroke text-text-primary font-medium"
                  : "text-muted hover:bg-stroke/40 hover:text-text-primary"
                  }`}
              >
                {item.label}
              </a>
            ))}
            <span className="mx-1 h-4 w-px bg-stroke" />
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-1 ml-2">
            <button
              onClick={onContactClick}
              className="px-3.5 py-1.5 font-mono text-xs text-text-primary/90 hover:text-white transition-colors cursor-pointer"
              aria-label="Open contact modal"
            >
              Let's talk <span aria-hidden="true">↗</span>
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="grid size-8 place-items-center rounded-full border border-stroke bg-bg/80 text-text-primary md:hidden"
              aria-label="Toggle navigation menu"
            >
              <span className="text-sm">{mobileMenuOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-4 top-16 z-40 rounded-3xl border border-white/15 bg-bg/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col space-y-2">
              <span className="text-xs font-mono text-muted mb-2">
                Navigation
              </span>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-colors ${activeSection === item.id
                    ? "bg-surface text-text-primary font-medium border border-white/10"
                    : "text-muted hover:bg-surface/50 hover:text-text-primary"
                    }`}
                >
                  <span>{item.label}</span>
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-stroke flex items-center justify-between">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Utkarsh_Singh_Resume.pdf"
                  className="font-mono text-xs text-muted hover:text-text-primary"
                >
                  Download résumé ↓
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onContactClick();
                  }}
                  className="rounded-full bg-text-primary px-4 py-1.5 font-mono text-xs text-bg"
                >
                  Let's talk ↗
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Hero({ onContactClick }: { onContactClick?: () => void }) {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline.fromTo(
        ".name-reveal",
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.0, delay: 0.1 },
      );
      timeline.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(8px)", y: 14 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.2,
        },
        "<",
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-32 text-center"
    >
      <HlsVideo />
      <div className="absolute inset-0 bg-black/40" />
      <div className="tech-grid absolute inset-0 opacity-20 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
        {/* Subtle Plain Intro */}
        <p className="blur-in mb-3 font-mono text-xs text-muted tracking-wide">
          ECE student at JIIT Noida
        </p>

        {/* Name Heading (reduced by ~10-15%) */}
        <h1 className="name-reveal mb-6 font-display text-5xl italic leading-[0.95] tracking-normal text-text-primary md:text-7xl lg:text-8xl">
          Utkarsh Singh
        </h1>

        {/* Human Main Headline */}
        <p className="blur-in mb-5 max-w-2xl font-body text-xl font-normal leading-relaxed text-text-primary/95 md:text-2xl lg:text-3xl">
          I like building things — from web applications and security tools to connected hardware.
        </p>

        {/* Concise Supporting Sentence */}
        <p className="blur-in mb-10 max-w-lg text-sm leading-relaxed text-muted md:text-base">
          I'm an ECE student who likes turning ideas into practical software, security projects, and connected systems.
        </p>

        {/* Action Buttons */}
        <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4">
          <a
            href="#work"
            className="group relative rounded-full p-[2px]"
            aria-label="See my work"
          >
            <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
            <span className="relative flex items-center gap-1.5 rounded-full bg-text-primary px-6 py-3 font-mono text-xs font-medium text-bg transition duration-300 group-hover:bg-bg group-hover:text-text-primary">
              See my work <span aria-hidden="true">↓</span>
            </span>
          </a>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Utkarsh_Singh_Resume.pdf"
            className="group relative rounded-full p-[2px] cursor-pointer"
            aria-label="Download Utkarsh Singh resume PDF"
          >
            <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
            <span className="relative flex items-center gap-1.5 rounded-full border border-stroke bg-bg/80 px-6 py-3 font-mono text-xs font-medium text-text-primary backdrop-blur-md transition duration-300 group-hover:border-transparent">
              View résumé <span aria-hidden="true">↗</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  eyebrow,
  title,
  italic,
  subtext,
  button,
  buttonHref = "#contact",
  onButtonClick,
}: {
  eyebrow: string;
  title: string;
  italic: string;
  subtext: string;
  button: string;
  buttonHref?: string;
  onButtonClick?: () => void;
}) {
  return (
    <motion.div
      className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6 md:mb-16"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-muted mb-3">{eyebrow}</p>
        <h2 className="text-balance font-body text-4xl font-medium tracking-normal text-text-primary md:text-6xl">
          {title} <span className="font-display italic">{italic}</span>
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-muted md:text-base">{subtext}</p>
      </div>

      {onButtonClick ? (
        <button
          onClick={onButtonClick}
          className="group relative hidden self-start md:self-auto rounded-full p-[2px] md:inline-flex"
        >
          <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
          <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-2.5 font-mono text-xs text-text-primary backdrop-blur-md transition group-hover:border-transparent">
            {button} <span aria-hidden="true">↗</span>
          </span>
        </button>
      ) : (
        <a
          href={buttonHref}
          target={buttonHref.startsWith("http") ? "_blank" : undefined}
          rel={buttonHref.startsWith("http") ? "noopener noreferrer" : undefined}
          className="group relative hidden self-start md:self-auto rounded-full p-[2px] md:inline-flex"
        >
          <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
          <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-surface px-5 py-2.5 font-mono text-xs text-text-primary backdrop-blur-md transition group-hover:border-transparent">
            {button} <span aria-hidden="true">↗</span>
          </span>
        </a>
      )}
    </motion.div>
  );
}

// Project Card Component
function ProjectCard({
  project,
  index,
  onOpenCaseStudy,
}: {
  project: ProjectDetail;
  index: number;
  onOpenCaseStudy: () => void;
}) {
  const spans = [
    "md:col-span-7 aspect-[1.3/1]",
    "md:col-span-5 aspect-[0.95/1]",
    "md:col-span-5 aspect-[0.95/1]",
    "md:col-span-7 aspect-[1.3/1]",
    "md:col-span-7 aspect-[1.3/1]",
    "md:col-span-5 aspect-[0.95/1]",
  ];
  const cardSpan = spans[index % spans.length];

  return (
    <motion.article
      onClick={onOpenCaseStudy}
      className={`group relative overflow-hidden rounded-3xl border border-stroke bg-surface cursor-pointer ${cardSpan}`}
      data-cursor="view"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-60px" }}
    >
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="halftone absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" />

      {/* Category Pill */}
      <div className="absolute top-4 right-4 z-10">
        <span className={`rounded-full border px-3 py-0.5 text-xs font-mono backdrop-blur-md ${project.badgeColor}`}>
          {project.badge}
        </span>
      </div>

      {/* Default Bottom State */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bg via-bg/80 to-transparent p-6 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-xs text-muted">
            {project.context}
          </span>
          <span className="text-stroke">•</span>
          <span className="font-mono text-xs text-muted">{project.year}</span>
        </div>
        <h3 className="font-display text-3xl italic text-text-primary mt-0.5">
          {project.title}
        </h3>
        <p className="mt-1 text-xs text-muted/90 line-clamp-1">
          {project.subtitle}
        </p>
      </div>

      {/* Hover Overlay with Details & Actions */}
      <div className="absolute inset-0 flex flex-col justify-between bg-bg/92 p-6 md:p-8 opacity-0 backdrop-blur-md transition-opacity duration-300 group-hover:opacity-100">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="font-mono text-xs text-[#89aacc]">
              {project.context}
            </span>
            <span className="font-mono text-xs text-muted">{project.year}</span>
          </div>

          <h3 className="font-display text-3xl md:text-4xl italic text-text-primary">
            {project.title}
          </h3>

          <p className="mt-2 text-xs md:text-sm text-muted leading-relaxed line-clamp-3">
            {project.overview}
          </p>

          {/* Tech Badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-stroke bg-surface px-2.5 py-1 text-xs font-mono text-text-primary/90"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 pt-4 border-t border-stroke mt-4">
          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded-full border border-stroke bg-surface px-3.5 py-1.5 font-mono text-xs text-text-primary transition hover:border-white/40 hover:bg-stroke"
                aria-label={`Open GitHub for ${project.title}`}
              >
                GitHub ↗
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="rounded-full bg-text-primary px-3.5 py-1.5 font-mono text-xs text-bg transition hover:bg-white"
                aria-label={`Open live demo for ${project.title}`}
              >
                Live Demo ↗
              </a>
            )}
          </div>

          <span className="font-mono text-xs text-text-primary/90 flex items-center gap-1 group-hover:translate-x-1 transition-transform duration-300">
            Case Study <span>→</span>
          </span>
        </div>
      </div>
    </motion.article>
  );
}

function SelectedWorks({ onProjectClick }: { onProjectClick: (index: number) => void }) {
  return (
    <section id="work" className="relative bg-bg py-20 md:py-28">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          title="Things I've"
          italic="built"
          subtext="A collection of cybersecurity simulation platforms, ESP32 IoT pipelines, and full-stack web applications."
          button="GitHub Profile"
          buttonHref="https://github.com/utkarshsingh3011"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {PROJECT_DETAILS.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpenCaseStudy={() => onProjectClick(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Journal({ onNoteClick }: { onNoteClick: (index: number) => void }) {
  return (
    <section id="journal" className="relative bg-bg py-20 md:py-28 border-t border-stroke">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Writing & Notes"
          title="Things I've"
          italic="learned"
          subtext="Notes on building interactive cybersecurity simulations, hardware telemetry pipelines, and web architectures."
          button="Read Articles"
          onButtonClick={() => onNoteClick(0)}
        />

        <div className="space-y-4">
          {ENGINEERING_NOTES.map((entry, idx) => (
            <motion.div
              key={entry.id}
              onClick={() => onNoteClick(idx)}
              className="group relative flex flex-col md:flex-row md:items-center gap-5 rounded-3xl border border-stroke bg-surface/30 p-5 md:p-6 transition-all duration-300 hover:border-white/20 hover:bg-surface/70 cursor-pointer"
              data-cursor="view"
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <img
                src={entry.image}
                alt={entry.title}
                className="h-28 w-full md:size-24 shrink-0 rounded-2xl object-cover"
              />

              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1.5">
                  <span className="font-mono text-xs text-[#89aacc]">
                    {entry.category}
                  </span>
                  <span className="text-stroke">•</span>
                  <span className="font-mono text-xs text-muted">
                    {entry.date} / {entry.read}
                  </span>
                </div>

                <h3 className="text-balance text-lg md:text-xl font-medium text-text-primary transition-colors duration-200 group-hover:text-white">
                  {entry.title}
                </h3>

                <p className="mt-1.5 text-xs text-muted leading-relaxed line-clamp-2">
                  {entry.snippet}
                </p>
              </div>

              <div className="hidden md:flex size-10 shrink-0 place-items-center rounded-full border border-stroke text-text-primary transition-transform duration-300 group-hover:translate-x-1 group-hover:border-white/30">
                <span className="font-mono text-xs">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Explorations({ onProjectClick }: { onProjectClick: (index: number) => void }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [lightbox, setLightbox] = useState<{
    image: string;
    label: string;
    projectIndex: number;
    projectTitle: string;
  } | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        pin: content,
        pinSpacing: false,
      });

      itemRefs.current.forEach((item, index) => {
        if (!item) return;
        gsap.to(item, {
          y: galleryItems[index].y,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="playground" ref={sectionRef} className="relative min-h-[280vh] overflow-hidden bg-bg border-t border-stroke">
      <div className="tech-dots absolute inset-0 opacity-20 pointer-events-none" />

      <div ref={contentRef} className="relative z-10 flex h-screen items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-muted mb-3">Experiments</p>

          <h2 className="text-balance font-body text-5xl font-medium tracking-normal text-text-primary md:text-7xl">
            Engineering <span className="font-display italic">Playground</span>
          </h2>

          <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted md:text-base">
            Exploring ESP32 microcontroller circuits, sensor telemetry streams, vulnerability testbeds, and interactive web tools.
          </p>

          <a
            href="https://github.com/utkarshsingh3011"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mt-8 inline-flex rounded-full p-[2px]"
          >
            <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
            <span className="relative flex items-center gap-2 rounded-full border border-stroke bg-bg px-6 py-2.5 font-mono text-xs text-text-primary">
              GitHub Repositories ↗
            </span>
          </a>
        </div>
      </div>

      <div className="absolute inset-0 z-20 mx-auto grid max-w-[1400px] grid-cols-2 gap-12 px-6 py-[18vh] md:gap-40 md:px-14">
        <div className="flex flex-col items-start gap-[40vh] pt-[10vh]">
          {galleryItems
            .filter((_, index) => index % 2 === 0)
            .map((item, index) => {
              const originalIndex = index * 2;
              return (
                <button
                  key={item.image}
                  ref={(element) => {
                    itemRefs.current[originalIndex] = element;
                  }}
                  onClick={() =>
                    setLightbox({
                      image: item.image,
                      label: item.label,
                      projectIndex: item.projectIndex,
                      projectTitle: item.projectTitle,
                    })
                  }
                  className={`group relative aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl shadow-black/40 transition-transform duration-300 hover:scale-[1.03] cursor-pointer ${item.rotate}`}
                  data-cursor="view"
                  aria-label={`Open preview for ${item.projectTitle}`}
                >
                  <img src={item.image} alt={item.label} className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 text-left">
                    <span className="font-mono text-xs text-text-primary/90">
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
        </div>

        <div className="flex flex-col items-end gap-[40vh] pt-[30vh]">
          {galleryItems
            .filter((_, index) => index % 2 === 1)
            .map((item, index) => {
              const originalIndex = index * 2 + 1;
              return (
                <button
                  key={item.image}
                  ref={(element) => {
                    itemRefs.current[originalIndex] = element;
                  }}
                  onClick={() =>
                    setLightbox({
                      image: item.image,
                      label: item.label,
                      projectIndex: item.projectIndex,
                      projectTitle: item.projectTitle,
                    })
                  }
                  className={`group relative aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl shadow-black/40 transition-transform duration-300 hover:scale-[1.03] cursor-pointer ${item.rotate}`}
                  data-cursor="view"
                  aria-label={`Open preview for ${item.projectTitle}`}
                >
                  <img src={item.image} alt={item.label} className="h-full w-full object-cover" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 text-left">
                    <span className="font-mono text-xs text-text-primary/90">
                      {item.label}
                    </span>
                  </div>
                </button>
              );
            })}
        </div>
      </div>

      <AnimatePresence>
        {lightbox ? (
          <motion.div
            className="fixed inset-0 z-[9998] grid place-items-center bg-black/85 p-6 backdrop-blur-md"
            onClick={() => setLightbox(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close image preview"
          >
            <div
              className="relative max-h-[86vh] max-w-[90vw] overflow-hidden rounded-3xl border border-stroke bg-bg"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={lightbox.image}
                alt=""
                className="max-h-[70vh] w-auto rounded-t-3xl object-contain"
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
              />
              <div className="bg-bg/95 p-5 border-t border-stroke flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="font-mono text-xs text-muted block">
                    {lightbox.label}
                  </span>
                  <p className="font-display text-xl italic text-text-primary">
                    {lightbox.projectTitle}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      const idx = lightbox.projectIndex;
                      setLightbox(null);
                      onProjectClick(idx);
                    }}
                    className="rounded-full bg-text-primary px-5 py-2 font-mono text-xs text-bg transition hover:bg-white cursor-pointer"
                  >
                    Explore Case Study →
                  </button>
                  <button
                    onClick={() => setLightbox(null)}
                    className="rounded-full border border-stroke bg-surface px-4 py-2 font-mono text-xs text-text-primary hover:border-white/30"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function ContactFooter({ onContactClick }: { onContactClick: () => void }) {
  return (
    <footer id="contact" className="relative overflow-hidden bg-bg pt-20 pb-12 border-t border-stroke">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <HlsVideo className="scale-y-[-1]" />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center py-12 text-center md:py-16">
          <p className="text-xs uppercase tracking-[0.25em] text-muted mb-3">Contact</p>

          <h2 className="text-balance font-body text-4xl font-medium text-text-primary md:text-6xl">
            Let's <span className="font-display italic">talk.</span>
          </h2>

          <p className="mt-4 max-w-lg text-sm md:text-base text-muted leading-relaxed">
            I'm always open to interesting projects, collaborations, internships, and things worth building.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onContactClick}
              className="group relative inline-flex rounded-full p-[2px] cursor-pointer"
              aria-label="Send email"
            >
              <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
              <span className="relative rounded-full bg-text-primary px-7 py-3.5 font-mono text-xs font-medium text-bg transition duration-300 group-hover:bg-bg group-hover:text-text-primary">
                ustsingh@gmail.com ↗
              </span>
            </button>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Utkarsh_Singh_Resume.pdf"
              className="group relative inline-flex rounded-full p-[2px]"
              aria-label="Download resume PDF"
            >
              <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
              <span className="relative rounded-full border border-stroke bg-surface px-7 py-3.5 font-mono text-xs font-medium text-text-primary backdrop-blur-md transition group-hover:border-transparent">
                Download résumé ↓
              </span>
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 text-sm text-muted md:flex-row">
          <div className="flex items-center gap-6 font-mono text-xs">
            <a
              href="https://github.com/utkarshsingh3011"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-text-primary"
            >
              GitHub ↗
            </a>
            <a
              href="https://www.linkedin.com/in/utkarshsingh3011"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-text-primary"
            >
              LinkedIn ↗
            </a>
            <a
              href="mailto:ustsingh@gmail.com"
              className="transition-colors hover:text-text-primary"
            >
              Email ↗
            </a>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-muted">
            <span>Utkarsh Singh • JIIT Noida</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function HomePage({
  onProjectClick,
  onNoteClick,
  onContactClick,
}: {
  onProjectClick: (index: number) => void;
  onNoteClick: (index: number) => void;
  onContactClick: () => void;
}) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Hero onContactClick={onContactClick} />
      <SelectedWorks onProjectClick={onProjectClick} />
      <EngineeringStack />
      <Journal onNoteClick={onNoteClick} />
      <Explorations onProjectClick={onProjectClick} />
      <ResumeTimeline />
      <ContactFooter onContactClick={onContactClick} />
    </motion.main>
  );
}

function AnimatedRoutes({
  onProjectClick,
  onNoteClick,
  onContactClick,
}: {
  onProjectClick: (index: number) => void;
  onNoteClick: (index: number) => void;
  onContactClick: () => void;
}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <HomePage
              onProjectClick={onProjectClick}
              onNoteClick={onNoteClick}
              onContactClick={onContactClick}
            />
          }
        />
        <Route path="*" element={<Link to="/">Return home</Link>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(
    () => !new URLSearchParams(window.location.search).has("skipLoader"),
  );
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<number | null>(null);

  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleProjectClick = (index: number) => {
    setSelectedProject(index);
    setIsProjectOpen(true);
  };

  const handleNoteClick = (index: number) => {
    setSelectedNote(index);
    setIsNoteOpen(true);
  };

  const handleContactClick = () => {
    setIsContactOpen(true);
  };

  return (
    <>
      <CustomCursor />
      <Navbar onContactClick={handleContactClick} />
      <AnimatePresence>
        {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>
      <AnimatedRoutes
        onProjectClick={handleProjectClick}
        onNoteClick={handleNoteClick}
        onContactClick={handleContactClick}
      />

      <ProjectModal
        isOpen={isProjectOpen}
        onClose={() => setIsProjectOpen(false)}
        projectIndex={selectedProject}
        onSelectProject={(index) => setSelectedProject(index)}
      />

      <NoteModal
        isOpen={isNoteOpen}
        onClose={() => setIsNoteOpen(false)}
        noteIndex={selectedNote}
        onSelectNote={(index) => setSelectedNote(index)}
      />

      <ContactFormModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
