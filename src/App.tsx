import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hls from "hls.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import CustomCursor from "./components/CustomCursor";
import ResumeTimeline from "./components/ResumeTimeline";
import ProjectModal from "./components/ProjectModal";
import ContactFormModal from "./components/ContactFormModal";

gsap.registerPlugin(ScrollTrigger);

const hlsSource =
  "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const roles = [
  "Cybersecurity Enthusiast",
  "Security Researcher",
  "Ethical Hacker",
  "Fullstack Developer",
];

const projects = [
  {
    title: "Automotive Motion",
    span: "md:col-span-7",
    ratio: "aspect-[1.28/1]",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Urban Architecture",
    span: "md:col-span-5",
    ratio: "aspect-[0.94/1]",
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Human Perspective",
    span: "md:col-span-5",
    ratio: "aspect-[0.94/1]",
    image:
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Brand Identity",
    span: "md:col-span-7",
    ratio: "aspect-[1.28/1]",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
  },
];

const journals = [
  {
    title: "Systems that feel designed, not decorated",
    date: "May 18, 2026",
    read: "6 min read",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "What founders can learn from motion studies",
    date: "Apr 29, 2026",
    read: "4 min read",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "Building with constraints as creative fuel",
    date: "Mar 12, 2026",
    read: "8 min read",
    image:
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=500&q=80",
  },
  {
    title: "The quiet craft of interface timing",
    date: "Feb 04, 2026",
    read: "5 min read",
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=500&q=80",
  },
];

const galleryItems = [
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    rotate: "-rotate-3",
    y: -90,
  },
  {
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85",
    rotate: "rotate-2",
    y: 120,
  },
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85",
    rotate: "rotate-6",
    y: -140,
  },
  {
    image:
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=900&q=85",
    rotate: "-rotate-2",
    y: 95,
  },
  {
    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=85",
    rotate: "rotate-3",
    y: -115,
  },
  {
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",
    rotate: "-rotate-6",
    y: 130,
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
  const words = ["Design", "Create", "Inspire"];

  useEffect(() => {
    let raf = 0;
    const started = performance.now();
    const duration = 2700;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - started) / duration);
      const next = Math.round(progress * 100);
      setCount(next);
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        window.setTimeout(onComplete, 400);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  useEffect(() => {
    const interval = window.setInterval(
      () => setWordIndex((current) => (current + 1) % words.length),
      900,
    );
    return () => window.clearInterval(interval);
  }, [words.length]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden bg-bg"
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
    >
      <motion.div
        className="absolute left-6 top-6 text-xs uppercase tracking-[0.3em] text-muted md:left-10 md:top-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        Portfolio
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={words[wordIndex]}
            className="font-display text-4xl italic text-text-primary/80 md:text-6xl lg:text-7xl"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {words[wordIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-7 right-6 font-display text-6xl tabular-nums text-text-primary md:bottom-10 md:right-10 md:text-8xl lg:text-9xl">
        {String(count).padStart(3, "0")}
      </div>

      <div className="absolute bottom-0 left-0 h-[3px] w-full bg-stroke/50">
        <div
          className="accent-gradient h-full origin-left"
          style={{
            transform: `scaleX(${count / 100})`,
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)",
          }}
        />
      </div>
    </motion.div>
  );
}

const NAV_ITEMS = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Work", href: "#work", id: "work" },
  { label: "Resume", href: "#resume", id: "resume" },
];

function Navbar({ onContactClick }: { onContactClick: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);

      const current = NAV_ITEMS.findLast((item) => {
        const section = document.getElementById(item.id);
        return section ? section.offsetTop - 160 <= window.scrollY : false;
      });

      setActiveSection(current?.id ?? "home");
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 md:pt-6">
      <div
        className={`inline-flex max-w-full items-center rounded-full border border-white/10 bg-surface px-2 py-2 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? "shadow-md shadow-black/10" : ""
        }`}
      >
        <a href="#home" className="group relative grid size-9 place-items-center rounded-full p-[2px]">
          <span className="accent-gradient absolute inset-0 rounded-full transition-transform duration-300 group-hover:rotate-180" />
          <span className="relative grid size-full place-items-center rounded-full bg-bg font-display text-[13px] italic text-text-primary transition-transform duration-300 group-hover:scale-110">
            JA
          </span>
        </a>
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />
        <div className="flex items-center">
          {NAV_ITEMS.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                activeSection === item.id
                  ? "bg-stroke/50 text-text-primary"
                  : "text-muted hover:bg-stroke/50 hover:text-text-primary"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />
        <button
          onClick={onContactClick}
          className="group relative rounded-full p-[2px] text-xs sm:text-sm cursor-pointer"
          aria-label="Open contact form"
        >
          <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
          <span className="relative flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-text-primary backdrop-blur-md sm:px-4 sm:py-2">
            Say hi <span aria-hidden="true">↗</span>
          </span>
        </button>
      </div>
    </nav>
  );
}

function Hero({ onContactClick }: { onContactClick: () => void }) {
  const [roleIndex, setRoleIndex] = useState(0);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const interval = window.setInterval(
      () => setRoleIndex((current) => (current + 1) % roles.length),
      2000,
    );
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 },
      );
      timeline.fromTo(
        ".blur-in",
        { opacity: 0, filter: "blur(10px)", y: 20 },
        {
          opacity: 1,
          filter: "blur(0px)",
          y: 0,
          duration: 1,
          stagger: 0.1,
          delay: 0.3,
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-28 text-center"
    >
      <HlsVideo />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
        <p className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">
          COLLECTION '26
        </p>
        <h1 className="name-reveal mb-6 font-display text-6xl italic leading-[0.9] tracking-normal text-text-primary md:text-8xl lg:text-9xl">
          Utkarsh Singh
        </h1>
        <p className="blur-in mb-5 text-base text-text-primary/90 md:text-lg">
          A{" "}
          <span
            key={roleIndex}
            className="inline-block animate-role-fade-in font-display italic text-text-primary"
          >
            {roles[roleIndex]}
          </span>{" "}
          based in New Delhi, India.
        </p>
        <p className="blur-in mb-12 max-w-md text-sm leading-7 text-muted md:text-base">
          Designing seamless digital interactions by focusing on the unique
          nuances which bring systems to life.
        </p>
        <div className="blur-in inline-flex flex-wrap items-center justify-center gap-4">
          <a href="#work" className="group relative rounded-full p-[2px]">
            <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
            <span className="relative block rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg transition duration-300 group-hover:bg-bg group-hover:text-text-primary group-hover:scale-105">
              See Works
            </span>
          </a>
          <button onClick={onContactClick} className="group relative rounded-full p-[2px] cursor-pointer">
            <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
            <span className="relative block rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-sm text-text-primary transition duration-300 group-hover:scale-105 group-hover:border-transparent">
              Reach out...
            </span>
          </button>
        </div>
      </div>

      <div className="absolute bottom-9 left-1/2 z-10 -translate-x-1/2 text-center">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">SCROLL</p>
        <div className="mx-auto h-10 w-px overflow-hidden bg-stroke">
          <span className="accent-gradient block h-5 w-px animate-scroll-down" />
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
}: {
  eyebrow: string;
  title: string;
  italic: string;
  subtext: string;
  button: string;
}) {
  return (
    <motion.div
      className="mb-10 flex items-end justify-between gap-8 md:mb-14"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <div>
        <div className="mb-5 flex items-center gap-4">
          <span className="h-px w-8 bg-stroke" />
          <p className="text-xs uppercase tracking-[0.3em] text-muted">{eyebrow}</p>
        </div>
        <h2 className="text-balance font-body text-4xl font-medium tracking-normal text-text-primary md:text-6xl">
          {title} <span className="font-display italic">{italic}</span>
        </h2>
        <p className="mt-4 max-w-lg text-sm leading-7 text-muted md:text-base">{subtext}</p>
      </div>
      <a href="#contact" className="group relative hidden rounded-full p-[2px] md:inline-flex">
        <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
        <span className="relative rounded-full bg-bg px-5 py-3 text-sm text-text-primary">
          {button} <span aria-hidden="true">→</span>
        </span>
      </a>
    </motion.div>
  );
}

function SelectedWorks({ onProjectClick }: { onProjectClick: (index: number) => void }) {
  return (
    <section id="work" className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured"
          italic="projects"
          subtext="A selection of projects I've worked on, from concept to launch."
          button="View all work"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              onClick={() => onProjectClick(index)}
              className={`group relative overflow-hidden rounded-3xl border border-stroke bg-surface cursor-pointer ${project.span} ${project.ratio}`}
              data-cursor="view"
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <img
                src={project.image}
                alt={`${project.title} project preview`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="halftone absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" />
              <div className="absolute inset-0 grid place-items-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-300 group-hover:opacity-100">
                <span className="animated-gradient-border rounded-full p-[2px] animate-gradient-shift">
                  <span className="block rounded-full bg-white px-5 py-3 text-sm text-bg">
                    View — <span className="font-display italic">{project.title}</span>
                  </span>
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journal() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          eyebrow="Journal"
          title="Recent"
          italic="thoughts"
          subtext="Notes on interfaces, systems, creative process, and the work behind the work."
          button="View all"
        />

        <div className="space-y-4">
          {journals.map((entry) => (
            <motion.a
              href="#journal"
              key={entry.title}
              className="group flex items-center gap-5 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors duration-300 hover:bg-surface sm:rounded-full sm:gap-6"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true, margin: "-80px" }}
            >
              <img
                src={entry.image}
                alt=""
                className="size-20 shrink-0 rounded-full object-cover sm:size-24"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-balance text-lg font-medium text-text-primary transition-colors duration-300 group-hover:text-white md:text-2xl">
                  {entry.title}
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted">
                  {entry.date} / {entry.read}
                </p>
              </div>
              <span className="hidden size-10 shrink-0 place-items-center rounded-full border border-stroke text-text-primary transition-transform duration-300 group-hover:translate-x-1 sm:grid">
                →
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Explorations() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [lightbox, setLightbox] = useState<string | null>(null);

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
    <section ref={sectionRef} className="relative min-h-[300vh] overflow-hidden bg-bg">
      <div ref={contentRef} className="relative z-10 flex h-screen items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-muted">Explorations</p>
          <h2 className="text-balance font-body text-5xl font-medium tracking-normal text-text-primary md:text-7xl">
            Visual <span className="font-display italic">playground</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-muted md:text-base">
            Motion fragments, interface studies, and composition sketches that
            keep the system loose.
          </p>
          <a href="https://dribbble.com" className="group relative mt-9 inline-flex rounded-full p-[2px]">
            <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
            <span className="relative rounded-full border border-stroke bg-bg px-6 py-3 text-sm text-text-primary">
              Dribbble ↗
            </span>
          </a>
        </div>
      </div>

      <div className="absolute inset-0 z-20 mx-auto grid max-w-[1400px] grid-cols-2 gap-12 px-6 py-[18vh] md:gap-40 md:px-14">
        <div className="flex flex-col items-start gap-[42vh] pt-[10vh]">
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
                  onClick={() => setLightbox(item.image)}
                  className={`group aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl shadow-black/30 transition-transform duration-300 hover:scale-[1.03] ${item.rotate}`}
                  aria-label="Open exploration image"
                >
                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                </button>
              );
            })}
        </div>
        <div className="flex flex-col items-end gap-[42vh] pt-[32vh]">
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
                  onClick={() => setLightbox(item.image)}
                  className={`group aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border border-white/10 bg-surface shadow-2xl shadow-black/30 transition-transform duration-300 hover:scale-[1.03] ${item.rotate}`}
                  aria-label="Open exploration image"
                >
                  <img src={item.image} alt="" className="h-full w-full object-cover" />
                </button>
              );
            })}
        </div>
      </div>

      <AnimatePresence>
        {lightbox ? (
          <motion.button
            className="fixed inset-0 z-[9998] grid cursor-zoom-out place-items-center bg-black/80 p-6 backdrop-blur-md"
            onClick={() => setLightbox(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-label="Close exploration image"
          >
            <motion.img
              src={lightbox}
              alt=""
              className="max-h-[86vh] max-w-[90vw] rounded-3xl object-contain"
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
            />
          </motion.button>
        ) : null}
      </AnimatePresence>
    </section>
  );
}



function ContactFooter({ onContactClick }: { onContactClick: () => void }) {
  const marqueeRef = useRef<HTMLDivElement | null>(null);
  const repeatedText = useMemo(
    () => Array.from({ length: 10 }, () => "BUILDING THE FUTURE • ").join(""),
    [],
  );

  useEffect(() => {
    const element = marqueeRef.current;
    if (!element) return;

    const tween = gsap.to(element, {
      xPercent: -50,
      duration: 40,
      ease: "none",
      repeat: -1,
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <footer id="contact" className="relative overflow-hidden bg-bg pt-16 md:pt-20 pb-8 md:pb-12">
      <div className="absolute inset-0 opacity-70">
        <HlsVideo className="scale-y-[-1]" />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="relative z-10 overflow-hidden">
        <div ref={marqueeRef} className="flex w-max whitespace-nowrap">
          <span className="pr-8 font-display text-[18vw] italic leading-none text-text-primary/10">
            {repeatedText}
          </span>
          <span className="pr-8 font-display text-[18vw] italic leading-none text-text-primary/10">
            {repeatedText}
          </span>
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center py-16 text-center md:py-24">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-muted">Contact</p>
          <h2 className="text-balance font-body text-4xl font-medium text-text-primary md:text-6xl">
            Let's build something with a little pulse.
          </h2>
          <button
            onClick={onContactClick}
            className="group relative mt-9 inline-flex rounded-full p-[2px] cursor-pointer"
          >
            <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
            <span className="relative rounded-full bg-text-primary px-7 py-3.5 text-sm text-bg">
              ustsingh@gmail.com
            </span>
          </button>
        </div>

        <div className="flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-6 text-sm text-muted md:flex-row">
          <div className="flex items-center gap-5">
            <a href="https://twitter.com" className="transition-colors hover:text-text-primary">
              Twitter
            </a>
            <a href="https://www.linkedin.com" className="transition-colors hover:text-text-primary">
              LinkedIn
            </a>
            <a href="https://github.com" className="transition-colors hover:text-text-primary">
              GitHub
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-400" />
            </span>
            <span>Available for projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

function HomePage({
  onProjectClick,
  onContactClick,
}: {
  onProjectClick: (index: number) => void;
  onContactClick: () => void;
}) {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <Hero onContactClick={onContactClick} />
      <SelectedWorks onProjectClick={onProjectClick} />
      <Journal />
      <Explorations />
      <ResumeTimeline />
      <ContactFooter onContactClick={onContactClick} />
    </motion.main>
  );
}

function AnimatedRoutes({
  onProjectClick,
  onContactClick,
}: {
  onProjectClick: (index: number) => void;
  onContactClick: () => void;
}) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={<HomePage onProjectClick={onProjectClick} onContactClick={onContactClick} />}
        />
        <Route path="*" element={<Link to="/">Return home</Link>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isProjectOpen, setIsProjectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

  const handleProjectClick = (index: number) => {
    setSelectedProject(index);
    setIsProjectOpen(true);
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
      <AnimatedRoutes onProjectClick={handleProjectClick} onContactClick={handleContactClick} />
      
      <ProjectModal
        isOpen={isProjectOpen}
        onClose={() => setIsProjectOpen(false)}
        projectIndex={selectedProject}
      />

      <ContactFormModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </>
  );
}
