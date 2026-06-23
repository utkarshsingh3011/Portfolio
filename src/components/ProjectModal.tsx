import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

interface ProjectDetail {
  title: string;
  subtitle: string;
  client: string;
  year: string;
  role: string;
  description: string;
  approach: string;
  result: string;
  tech: string[];
  image: string;
}

const PROJECT_DETAILS: ProjectDetail[] = [
  {
    title: "Automotive Motion",
    subtitle: "Interactive Autonomous Fleet Spatial Analytics",
    client: "Zenith Autonomous",
    year: "2025",
    role: "Lead Creative Developer",
    description:
      "Automotive Motion is a high-performance WebGL-based visualization platform built for telemetry playback and spatial analysis of self-driving fleets. It processes complex sensory logs in real time, reconstructing 3D environments that map sensor point clouds, path planning vectors, and high-frequency velocity metrics.",
    approach:
      "We engineered a custom GPU particle emitter that streams LIDAR point clouds at 60fps directly in the browser. By leveraging Three.js and custom GLSL vertex shaders, we offloaded coordinate transforms from the main JavaScript thread to the GPU. WebSockets were integrated to stream live vehicle telemetry feeds during active test drives.",
    result:
      "A highly responsive, visual auditing dashboard used by vehicle safety operators to reconstruct and inspect edge-case road disconnects, decreasing incident analysis resolution times by over 55%.",
    tech: ["React", "Three.js", "GLSL Shaders", "WebSockets", "Vite", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=85",
  },
  {
    title: "Urban Architecture",
    subtitle: "Immersive Architectural Editorial Showcase",
    client: "Kaufmann Partners",
    year: "2026",
    role: "Front-end Architect",
    description:
      "Urban Architecture is a bespoke, media-rich portfolio experience created for an architectural design studio. It emphasizes slow-reveal image loading animations, fluid scroll triggers, dynamic asymmetric layout systems, and full-screen editorial typography transitions.",
    approach:
      "Using GSAP ScrollTrigger paired with CSS Grid, we established a responsive dual-axis scroll portfolio where vertical page movements dictate horizontal project slides. High-contrast clip-path masks were designed to reveal project images dynamically, reflecting the structured geometric lines of the buildings shown.",
    result:
      "The site earned 'Site of the Day' on Awwwards and CSS Design Awards, resulting in a 300% surge in digital portfolio inquiries and project consultation requests.",
    tech: ["Next.js", "GSAP ScrollTrigger", "CSS Grid", "Framer Motion", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Human Perspective",
    subtitle: "Experimental Portrait Interactive Velocity Canvas",
    client: "Institute of Fine Arts",
    year: "2025",
    role: "Creative Engineer & Designer",
    description:
      "An experimental digital portrait installation that explores the relationship between observer movement and human facial expression. The interface renders interactive, high-definition portraits that distort, shift, and filter in response to the user's cursor speed and scroll vectors.",
    approach:
      "We developed a React HTML5 Canvas component that monitors cursor speed and delta vectors. Using custom coordinate mapping and image kernel matrix manipulations, pixels are dynamically shifted in real-time, creating a fluid, interactive warping effect that tracks mouse velocity.",
    result:
      "Presented across three local fine arts exhibitions, the project became a benchmark for exploring the intersection of web technology and modern digital art.",
    tech: ["React", "HTML5 Canvas", "WebGL Shaders", "GSAP", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?auto=format&fit=crop&w=1200&q=85",
  },
  {
    title: "Brand Identity",
    subtitle: "Fluid Design System and Commerce Platform",
    client: "Aether Apparel",
    year: "2026",
    role: "Design Engineer",
    description:
      "A complete digital rebrand and high-speed headless e-commerce store built for a sustainable apparel label. The platform delivers zero-latency page transitions, dynamic interactive cart features, and custom color-way customizers.",
    approach:
      "We built a structured modular design system utilizing Tailwind styling tokens. The shop's front-end runs on a custom router that orchestrates entry and exit page animations using Framer Motion. Checkout caching and product catalog feeds sync asynchronously with a headless Shopify GraphQL backend.",
    result:
      "Achieved a mobile-first Lighthouse performance score of 98/100, which helped reduce checkout page abandonment rates and improved overall store conversion by 2.4%.",
    tech: ["React", "Next.js", "Framer Motion", "Shopify API", "GraphQL", "Tailwind CSS"],
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=85",
  },
];

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectIndex: number | null;
}

export default function ProjectModal({ isOpen, onClose, projectIndex }: ProjectModalProps) {
  // Prevent background scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const project = projectIndex !== null ? PROJECT_DETAILS[projectIndex] : null;

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[9990] flex h-screen w-screen overflow-hidden bg-bg/85 backdrop-blur-2xl"
        >
          {/* Scrollable Container */}
          <div className="relative h-full w-full overflow-y-auto overflow-x-hidden">
            
            {/* Top Navigation Row */}
            <div className="sticky top-0 z-[9995] flex items-center justify-between px-6 py-6 md:px-12 md:py-8 bg-gradient-to-b from-bg to-transparent">
              <span className="text-xs uppercase tracking-[0.3em] text-muted">Project Case Study</span>
              <button
                onClick={onClose}
                className="group relative flex items-center justify-center rounded-full bg-surface border border-white/10 px-5 py-2.5 text-xs uppercase tracking-wider text-text-primary transition hover:border-text-primary/40"
                data-cursor="close"
                aria-label="Close case study"
              >
                Close <span className="ml-1.5 text-xs text-muted group-hover:text-text-primary transition-colors">&times;</span>
              </button>
            </div>

            {/* Core Content Layout */}
            <div className="mx-auto max-w-[1200px] px-6 pb-20 pt-10 md:px-12 md:pb-28">
              
              {/* Title & Subtitle */}
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
                className="max-w-4xl"
              >
                <h1 className="font-display text-5xl italic leading-[0.9] tracking-normal text-text-primary md:text-7xl lg:text-8xl">
                  {project.title}
                </h1>
                <p className="mt-6 text-lg font-light leading-relaxed text-muted md:text-2xl">
                  {project.subtitle}
                </p>
              </motion.div>

              {/* Metadata Grid */}
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                className="mt-12 grid grid-cols-2 gap-8 border-t border-stroke pt-8 sm:grid-cols-4"
              >
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-muted">Client</span>
                  <span className="mt-2 block text-sm font-medium text-text-primary">{project.client}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-muted">Year</span>
                  <span className="mt-2 block text-sm font-medium text-text-primary">{project.year}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-muted">Role</span>
                  <span className="mt-2 block text-sm font-medium text-text-primary">{project.role}</span>
                </div>
                <div>
                  <span className="block text-[10px] uppercase tracking-widest text-muted">Services</span>
                  <span className="mt-2 block text-sm font-medium text-text-primary">Development, Design</span>
                </div>
              </motion.div>

              {/* Banner Image */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="group relative mt-16 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-stroke bg-surface"
              >
                <img
                  src={project.image}
                  alt={`${project.title} detailed preview`}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="halftone absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" />
              </motion.div>

              {/* Case Study Details */}
              <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
                
                {/* Left Side: Summary & Tech */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-4"
                >
                  <h3 className="font-body text-sm font-medium uppercase tracking-widest text-text-primary">Technologies</h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-stroke bg-surface/50 px-3.5 py-1.5 text-xs text-text-primary/95"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>

                {/* Right Side: Narrative paragraphs */}
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="space-y-12 lg:col-span-8 text-sm md:text-base leading-8 text-muted"
                >
                  <div>
                    <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-text-primary mb-4">Overview</h3>
                    <p>{project.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-text-primary mb-4">The Challenge & Approach</h3>
                    <p>{project.approach}</p>
                  </div>

                  <div>
                    <h3 className="font-body text-sm font-semibold uppercase tracking-widest text-text-primary mb-4">The Result</h3>
                    <p>{project.result}</p>
                  </div>
                </motion.div>

              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
