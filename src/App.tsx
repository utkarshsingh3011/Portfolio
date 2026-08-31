import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hls from "hls.js";
import { useEffect, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import ContactFormModal from "./components/ContactFormModal";
import CustomCursor from "./components/CustomCursor";
import EngineeringPlayground from "./components/EngineeringPlayground";
import EngineeringStack from "./components/EngineeringStack";
import ImageReveal from "./components/ImageReveal";
import MagneticButton from "./components/MagneticButton";
import NoteModal, { ENGINEERING_NOTES } from "./components/NoteModal";
import ProjectModal, { PROJECT_DETAILS } from "./components/ProjectModal";
import ResumeTimeline from "./components/ResumeTimeline";
import { EASING, editorialFadeUp } from "./utils/motion";

gsap.registerPlugin(ScrollTrigger);

const hlsSource =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

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

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onComplete();
      return;
    }

    let raf = 0;
    const started = performance.now();
    const duration = 700;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      const next = Math.round(progress * 100);
      setCount(next);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(onComplete, 100);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden bg-bg"
      exit={{ opacity: 0, transition: { duration: 0.3, ease: EASING.editorial } }}
    >
      <div className="tech-grid absolute inset-0 opacity-20 pointer-events-none" />

      <motion.div
        className="absolute left-6 top-6 text-xs text-muted md:left-10 md:top-10 font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: EASING.editorial }}
      >
        <span>Utkarsh Singh</span>
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-display text-4xl italic text-text-primary/90 md:text-6xl">
          Engineer & Builder
        </p>
      </div>

      <div className="absolute bottom-7 right-6 font-display text-5xl tabular-nums text-text-primary md:bottom-10 md:right-10 md:text-7xl">
        {String(count).padStart(3, "0")}
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] w-full bg-stroke/40">
        <div
          className="h-full bg-text-primary origin-left transition-transform duration-75"
          style={{ transform: `scaleX(${count / 100})` }}
        />
      </div>
    </motion.div>
  );
}

const NAV_ITEMS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Stack", href: "#stack", id: "stack" },
  { label: "Notes", href: "#notes", id: "notes" },
  { label: "Playground", href: "#playground", id: "playground" },
  { label: "Journey", href: "#journey", id: "journey" },
];

function Navbar({ onContactClick }: { onContactClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPos = window.scrollY + 200;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
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
          className={`inline-flex w-full max-w-[96vw] sm:max-w-max items-center justify-between sm:justify-start rounded-full border border-white/10 bg-surface/85 px-3.5 py-2 backdrop-blur-xl transition-all duration-300 ${
            scrolled ? "shadow-2xl shadow-black/60 border-white/20 bg-surface/95" : ""
          }`}
        >
          {/* Logo */}
          <MagneticButton maxMovement={4}>
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("#home");
              }}
              className="group flex items-center justify-center p-0.5"
              aria-label="Utkarsh Singh - Go to top"
            >
              <span className="grid size-7 place-items-center rounded-full border border-white/10 bg-stroke/60 font-display text-xs italic text-text-primary transition-all duration-300 group-hover:scale-105 group-hover:border-white/25 group-hover:bg-stroke">
                US
              </span>
            </a>
          </MagneticButton>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 ml-2">
            <span className="mx-1 h-3.5 w-px bg-stroke/70" />
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`rounded-full px-3.5 py-1.5 font-mono text-xs transition-colors duration-200 ${
                  activeSection === item.id
                    ? "bg-stroke text-text-primary font-medium"
                    : "text-muted hover:bg-stroke/40 hover:text-text-primary"
                }`}
              >
                {item.label}
              </a>
            ))}
            <span className="mx-1 h-3.5 w-px bg-stroke/70" />
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 ml-2">
            <MagneticButton maxMovement={6}>
              <button
                onClick={onContactClick}
                className="rounded-full bg-text-primary px-4 py-1.5 font-mono text-xs font-medium text-bg transition hover:bg-white cursor-pointer"
                aria-label="Open contact dialog"
              >
                Let's talk ↗
              </button>
            </MagneticButton>

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

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: EASING.editorial }}
            className="fixed inset-x-4 top-16 z-40 rounded-3xl border border-white/15 bg-bg/95 p-6 shadow-2xl backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col space-y-2">
              <span className="text-xs text-muted mb-2 font-mono">Menu</span>
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 font-mono text-xs transition-colors ${
                    activeSection === item.id
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
                  className="font-mono text-xs text-muted hover:text-text-primary"
                >
                  View résumé ↗
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

function Hero() {
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline.fromTo(
        ".hero-name",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.1 }
      );
      timeline.fromTo(
        ".hero-fade",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, delay: 0.15 },
        "<"
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
      <div className="absolute inset-0 bg-black/50" />
      <div className="tech-grid absolute inset-0 opacity-15 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
        {/* Understated Context Eyebrow */}
        <p className="hero-fade mb-5 font-mono text-xs tracking-[0.2em] text-muted/80 uppercase">
          B.Tech ECE · JIIT Noida
        </p>

        {/* Single Dominant Name Heading */}
        <h1 className="hero-name mb-8 font-display text-5xl italic leading-[0.95] text-text-primary sm:text-7xl md:text-8xl lg:text-9xl">
          Utkarsh Singh
        </h1>

        {/* Human Descriptive Statement */}
        <p className="hero-fade mb-5 max-w-2xl font-body text-lg font-normal leading-relaxed text-text-primary/95 sm:text-2xl md:text-3xl">
          I like building things — from web applications and security tools to connected hardware.
        </p>

        {/* Visually Quieter Supporting Sentence */}
        <p className="hero-fade mb-11 max-w-lg text-xs leading-relaxed text-muted/75 sm:text-sm md:text-base">
          I learn best by making something and then figuring out why it broke.
        </p>

        {/* Action CTAs with Magnetic Pull */}
        <div className="hero-fade inline-flex flex-wrap items-center justify-center gap-4">
          <MagneticButton maxMovement={8}>
            <a
              href="#work"
              className="inline-block rounded-full bg-text-primary px-7 py-3 font-mono text-xs font-medium text-bg transition hover:bg-white"
              aria-label="See my work section"
            >
              See my work ↓
            </a>
          </MagneticButton>

          <MagneticButton maxMovement={8}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-stroke bg-bg/80 px-7 py-3 font-mono text-xs font-medium text-text-primary backdrop-blur-md transition hover:border-white/40 hover:bg-surface"
              aria-label="View Utkarsh Singh resume PDF"
            >
              View résumé ↗
            </a>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}

function SelectedWorks({ onProjectClick }: { onProjectClick: (index: number) => void }) {
  const flagship = PROJECT_DETAILS[0];
  const otherProjects = PROJECT_DETAILS.slice(1);

  return (
    <section id="work" className="relative bg-bg py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div
          className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={editorialFadeUp}
        >
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-mono text-muted mb-3">
              Projects
            </p>
            <h2 className="text-balance font-display text-4xl italic text-text-primary sm:text-6xl md:text-7xl">
              Things I've built.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
              A selection of things I've built — from interactive cybersecurity labs to IoT telemetry pipelines and full-stack web applications.
            </p>
          </div>

          <MagneticButton maxMovement={6}>
            <a
              href="https://github.com/utkarshsingh3011"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-stroke bg-surface px-5 py-2.5 font-mono text-xs text-text-primary transition hover:border-white/30"
            >
              GitHub Profile ↗
            </a>
          </MagneticButton>
        </motion.div>

        {/* Flagship Showcase: SENTINEL */}
        <motion.article
          onClick={() => onProjectClick(0)}
          className="group relative mb-20 rounded-3xl border border-stroke/80 bg-surface/40 p-6 md:p-10 transition-all duration-300 hover:border-white/20 hover:bg-surface/70 cursor-pointer overflow-hidden"
          data-cursor="view"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={editorialFadeUp}
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            {/* Left Narrative Column */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#89aacc] font-medium">
                  {flagship.category}
                </span>
                <span className="text-stroke">•</span>
                <span className="text-xs text-muted">{flagship.year}</span>
              </div>

              <div>
                <h3 className="font-display text-4xl md:text-6xl italic text-text-primary leading-tight transition-transform duration-300 group-hover:translate-x-1.5">
                  {flagship.title}
                </h3>
                <p className="mt-2 text-sm text-[#89aacc]">
                  {flagship.subtitle}
                </p>
              </div>

              <p className="text-sm md:text-base leading-relaxed text-muted">
                {flagship.overview}
              </p>

              <div className="rounded-2xl border border-stroke/60 bg-bg/60 p-4 text-xs text-text-primary/90 leading-relaxed">
                <span className="text-muted block mb-1 font-mono uppercase tracking-wider text-[11px]">Why I built it</span>
                {flagship.whyIBuiltIt}
              </div>

              {/* Tech Line */}
              <div className="flex flex-wrap gap-2 pt-1">
                {flagship.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-stroke/80 bg-bg/80 px-3 py-1 font-mono text-xs text-text-primary/90"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-stroke/60">
                <span className="font-mono text-xs text-text-primary group-hover:translate-x-1 transition-transform">
                  Explore case study →
                </span>
                {flagship.demo && (
                  <MagneticButton maxMovement={5}>
                    <a
                      href={flagship.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-block rounded-full bg-text-primary px-4 py-1.5 font-mono text-xs text-bg transition hover:bg-white"
                    >
                      Live site ↗
                    </a>
                  </MagneticButton>
                )}
                {flagship.github && (
                  <MagneticButton maxMovement={5}>
                    <a
                      href={flagship.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-block rounded-full border border-stroke bg-surface px-4 py-1.5 font-mono text-xs text-text-primary transition hover:border-white/30"
                    >
                      GitHub ↗
                    </a>
                  </MagneticButton>
                )}
              </div>
            </div>

            {/* Right Visual Column with Clip-Path & Grayscale Reveal */}
            <div className="lg:col-span-6">
              <ImageReveal
                src={flagship.image}
                alt={flagship.title}
                aspectRatio="aspect-[16/10]"
              />
            </div>
          </div>
        </motion.article>

        {/* Editorial Grid for other projects */}
        <div className="space-y-12">
          {otherProjects.map((project, idx) => {
            const projectIndex = idx + 1;

            return (
              <motion.article
                key={project.id}
                onClick={() => onProjectClick(projectIndex)}
                className="group relative rounded-3xl border border-stroke/70 bg-surface/30 p-6 md:p-8 transition-all duration-300 hover:border-white/20 hover:bg-surface/60 cursor-pointer overflow-hidden"
                data-cursor="view"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.45, ease: EASING.editorial, delay: idx * 0.05 },
                  },
                }}
              >
                <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
                  {/* Left Column: Meta & Details */}
                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-[#89aacc] font-medium">
                        {project.category}
                      </span>
                      <span className="text-stroke">•</span>
                      <span className="text-xs text-muted">{project.year}</span>
                    </div>

                    <div>
                      <h3 className="font-display text-3xl md:text-4xl italic text-text-primary transition-transform duration-300 group-hover:translate-x-1.5">
                        {project.title}
                      </h3>
                      <p className="mt-1 text-xs text-muted">
                        {project.subtitle}
                      </p>
                    </div>

                    <p className="text-xs md:text-sm leading-relaxed text-muted">
                      {project.overview}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-stroke/70 bg-bg/70 px-2.5 py-0.5 font-mono text-[11px] text-text-primary/80"
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-stroke/50">
                      <span className="font-mono text-xs text-text-primary group-hover:translate-x-1 transition-transform">
                        Explore project →
                      </span>
                      {project.demo && (
                        <MagneticButton maxMovement={4}>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-block rounded-full bg-text-primary px-3.5 py-1 font-mono text-xs text-bg transition hover:bg-white"
                          >
                            Live demo ↗
                          </a>
                        </MagneticButton>
                      )}
                      {project.github && (
                        <MagneticButton maxMovement={4}>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-block rounded-full border border-stroke bg-surface px-3.5 py-1 font-mono text-xs text-text-primary transition hover:border-white/30"
                          >
                            GitHub ↗
                          </a>
                        </MagneticButton>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Project Preview Image with Grayscale Reveal */}
                  <div className="md:col-span-5">
                    <ImageReveal
                      src={project.image}
                      alt={project.title}
                      aspectRatio="aspect-[16/10]"
                    />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Journal({ onNoteClick }: { onNoteClick: (index: number) => void }) {
  return (
    <section id="notes" className="relative bg-bg py-24 md:py-32 border-t border-stroke/60 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div
          className="mb-16 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={editorialFadeUp}
        >
          <p className="text-xs uppercase tracking-[0.2em] font-mono text-muted mb-3">
            Writing
          </p>
          <h2 className="text-balance font-display text-4xl italic text-text-primary sm:text-6xl md:text-7xl">
            Notes from building.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base max-w-2xl">
            Short write-ups on things I figured out while building simulations, hardware telemetry, and web apps.
          </p>
        </motion.div>

        {/* Notebook Index Table */}
        <div className="space-y-4">
          {ENGINEERING_NOTES.map((entry, idx) => (
            <motion.div
              key={entry.id}
              onClick={() => onNoteClick(idx)}
              className="group relative flex flex-col md:flex-row md:items-center justify-between gap-5 rounded-2xl border border-stroke/70 bg-surface/30 p-6 transition-all duration-300 hover:border-white/20 hover:bg-surface/70 cursor-pointer"
              data-cursor="view"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.4, ease: EASING.editorial, delay: idx * 0.05 },
                },
              }}
            >
              <div className="space-y-2 max-w-3xl">
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span className="text-[#89aacc] font-medium">{entry.category}</span>
                  <span>•</span>
                  <span>{entry.read}</span>
                </div>

                <h3 className="font-body text-lg md:text-xl font-medium text-text-primary group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
                  {entry.title}
                </h3>

                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {entry.snippet}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0 font-mono text-xs text-text-primary/90 group-hover:translate-x-1.5 transition-transform">
                <span>Read note</span>
                <span>→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactFooter({ onContactClick }: { onContactClick: () => void }) {
  return (
    <footer id="contact" className="relative overflow-hidden bg-bg pt-24 pb-12 border-t border-stroke/60">
      <div className="absolute inset-0 opacity-40 pointer-events-none">
        <HlsVideo className="scale-y-[-1]" />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <motion.div
          className="mx-auto flex max-w-2xl flex-col items-center py-12 text-center md:py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={editorialFadeUp}
        >
          <p className="text-xs uppercase tracking-[0.2em] font-mono text-muted mb-3">
            Get in touch
          </p>

          <h2 className="text-balance font-display text-4xl italic text-text-primary sm:text-6xl md:text-7xl">
            Want to build something together?
          </h2>

          <p className="mt-5 max-w-lg text-sm md:text-base text-muted leading-relaxed">
            I'm always happy to talk about software projects, cybersecurity, embedded systems, or interesting engineering problems.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <MagneticButton maxMovement={8}>
              <button
                onClick={onContactClick}
                className="inline-block rounded-full bg-text-primary px-7 py-3.5 font-mono text-xs font-medium text-bg transition hover:bg-white cursor-pointer"
                aria-label="Send email"
              >
                Email me ↗
              </button>
            </MagneticButton>

            <MagneticButton maxMovement={8}>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                download="Utkarsh_Singh_Resume.pdf"
                className="inline-block rounded-full border border-stroke bg-surface px-7 py-3.5 font-mono text-xs font-medium text-text-primary backdrop-blur-md transition hover:border-white/30 hover:bg-stroke"
                aria-label="Download resume PDF"
              >
                Download résumé ↓
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        {/* Footer Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-5 border-t border-stroke/60 pt-8 text-xs text-muted md:flex-row font-mono">
          <div className="flex items-center gap-6">
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

          <div className="text-muted">
            Utkarsh Singh · B.Tech ECE @ JIIT Noida
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
      transition={{ duration: 0.35, ease: EASING.editorial }}
    >
      <Hero />
      <SelectedWorks onProjectClick={onProjectClick} />
      <EngineeringStack />
      <Journal onNoteClick={onNoteClick} />
      <EngineeringPlayground />
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
    () => !new URLSearchParams(window.location.search).has("skipLoader")
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
