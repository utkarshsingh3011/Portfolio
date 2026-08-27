import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export interface EngineeringNote {
  id: string;
  title: string;
  category: string;
  date: string;
  read: string;
  snippet: string;
  image: string;
  content: {
    problemStatement: string;
    architectureOverview: string;
    keyTakeaways: string[];
    technicalSnippet?: string;
  };
}

export const ENGINEERING_NOTES: EngineeringNote[] = [
  {
    id: "sentinel-note",
    title: "Designing Sentinel: Simulating Attack Vectors & Interactive Web Security in Next.js",
    category: "Cybersecurity & Web",
    date: "Jul 2026",
    read: "5 min read",
    snippet:
      "Exploring how to build sandboxed visual attack simulations without exposing server infrastructure, using client state machines and AI hints.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=85",
    content: {
      problemStatement:
        "Traditional web security education often relies on complex virtual machine setups or dry theory. The goal for Sentinel was to create an immediate, browser-first sandbox where students can visualize how malicious payloads propagate across client-server boundaries in real time.",
      architectureOverview:
        "Sentinel models attack scenarios as finite state machines rendered via Next.js and Framer Motion. Rather than executing hazardous payloads against live backend endpoints, the client executes simulated threat steps, tracking inspection states and verifying mitigation checkpoints locally. Contextual hints are streamed via the Gemini API when users encounter road blocks.",
      keyTakeaways: [
        "State machine architecture allows complex multi-stage attack simulations to remain safe, predictable, and fully client-contained.",
        "Visual animations help beginners grasp abstract concepts like DOM manipulation, token theft, and reflected payload paths.",
        "Integrating LLM APIs for interactive hints significantly lowers the barrier to entry for self-directed learning.",
      ],
      technicalSnippet:
        "// Attack Step State Machine\ntype SimulationState = 'IDLE' | 'PAYLOAD_INJECTED' | 'DOM_RENDERED' | 'TOKEN_EXFILTRATED' | 'MITIGATED';\n\ninterface StepResult {\n  state: SimulationState;\n  isSafe: boolean;\n  vulnerabilityTriggered: boolean;\n  remediationGuide: string;\n}",
    },
  },
  {
    id: "esp32-note",
    title: "Hardware to Cloud: ESP32 Sensor Telemetry Streaming to FastAPI & Next.js",
    category: "Embedded & IoT",
    date: "Jun 2026",
    read: "4 min read",
    snippet:
      "Architecting a continuous environmental telemetry pipeline from ESP32 C++ firmware to an asynchronous FastAPI backend and real-time dashboard.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
    content: {
      problemStatement:
        "Connecting physical hardware sensors to web interfaces requires handling microcontroller memory constraints, connection drops, and high-frequency JSON payload ingestion without bottlenecking backend databases.",
      architectureOverview:
        "The ESP32 reads analog and digital sensor streams, aggregates metrics over fixed sample windows, and dispatches authenticated HTTP POST requests over WiFi. The backend is an asynchronous FastAPI service that validates incoming payloads, computes moving averages, and serves live telemetry to a Next.js visualization frontend.",
      keyTakeaways: [
        "Batching sensor metrics on the microcontroller drastically reduces WiFi transmit overhead and power consumption.",
        "Asynchronous Python backends (FastAPI / Uvicorn) easily sustain concurrent microcontroller streaming with sub-50ms ingestion latency.",
        "Client dashboards require throttling re-renders with requestAnimationFrame to maintain 60 FPS when graphing live data streams.",
      ],
      technicalSnippet:
        "// ESP32 Telemetry Dispatch Pattern\nStaticJsonDocument<256> payload;\npayload[\"device_id\"] = \"ESP32_NODE_01\";\npayload[\"temp_c\"] = readTemperature();\npayload[\"humidity\"] = readHumidity();\npayload[\"timestamp\"] = getEpochTime();\n\nhttp.POST(serializeJson(payload));",
    },
  },
  {
    id: "xss-note",
    title: "Stored XSS Attack Mechanics & Defensive Remediation in Flask",
    category: "Web Security",
    date: "May 2026",
    read: "5 min read",
    snippet:
      "Analyzing unescaped database injection sinks versus contextual HTML encoding and Content Security Policy (CSP) headers in Python web servers.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=85",
    content: {
      problemStatement:
        "Stored Cross-Site Scripting (XSS) is one of the most common high-severity web vulnerabilities. Building a local laboratory to study payload persistence helps developers understand the exact mechanism of browser DOM execution and defense-in-depth mitigation.",
      architectureOverview:
        "XSS-Guard-Lab runs a dedicated Python Flask service. Two parallel route paths are created: one with raw database string interpolation into Jinja2 templates (vulnerable demonstration), and one strictly enforcing context-aware HTML entity encoding alongside HTTP Content Security Policy headers.",
      keyTakeaways: [
        "Never trust stored database text: output encoding must be tailored to the HTML context (body, attribute, JavaScript block).",
        "Content Security Policy (CSP) with strict script-src directives acts as an essential secondary defense even if a sanitization bypass occurs.",
        "Educational vulnerability labs must clearly isolate unsafe routes with prominent safety banners.",
      ],
      technicalSnippet:
        "# Hardened HTTP Response Headers\n@app.after_request\ndef apply_security_headers(response):\n    response.headers['Content-Security-Policy'] = \"default-src 'self'; script-src 'self'\"\n    response.headers['X-Content-Type-Options'] = 'nosniff'\n    return response",
    },
  },
  {
    id: "edgekart-note",
    title: "Architecting EdgeKart: MERN State Management, JWT Auth & Schema Design",
    category: "Full-Stack Web",
    date: "Apr 2026",
    read: "6 min read",
    snippet:
      "Synchronizing cart and wishlist state across authenticated sessions while optimizing MongoDB query indexing for specialized electronics catalogs.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=85",
    content: {
      problemStatement:
        "E-commerce platforms for hardware and electronic parts require handling granular product specifications (operating voltages, pin configurations, protocols) while maintaining smooth shopping cart synchronization across devices.",
      architectureOverview:
        "Built with React and TypeScript on the frontend communicating with an Express.js REST API. User sessions are secured using JSON Web Tokens (JWT). Product data is stored in MongoDB with indexed compound fields for multi-attribute filtering (category, package type, price range).",
      keyTakeaways: [
        "Compound indexing on frequent filter criteria (e.g. category + in_stock + price) reduces MongoDB query scan times by over 80%.",
        "Decoupling cart calculations to the server prevents client-side price tampering while keeping UI state responsive via optimistic updates.",
        "Role-based access control (RBAC) middleware cleanly separates consumer actions from inventory administration.",
      ],
      technicalSnippet:
        "// MongoDB Compound Index for Hardware Search\nProductSchema.index({ \n  category: 1, \n  inStock: 1, \n  price: 1 \n});",
    },
  },
  {
    id: "portflow-note",
    title: "Multi-Stage Workflow Systems: Designing Resilient Onboarding in PortFlow",
    category: "System Design",
    date: "Mar 2026",
    read: "5 min read",
    snippet:
      "Structuring multi-step validated form lifecycles, PostgreSQL document tracking schemas, and Docker microservice setups.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
    content: {
      problemStatement:
        "Customs broker and importer onboarding involves numerous regulatory checkpoints, document validations, and asynchronous compliance statuses that cannot be solved with a simple static contact form.",
      architectureOverview:
        "PortFlow models onboarding as an explicit state machine with distinct stages (Company Profile → Regulatory Identifiers → Document Uploads → Compliance Review). Backend services are written in FastAPI with a PostgreSQL relational database, orchestrated locally via Docker Compose.",
      keyTakeaways: [
        "Relational schemas with foreign key constraints ensure document records cannot be orphaned during partial onboarding submissions.",
        "Form wizards require granular client-side schema validation (Zod/TypeScript) paired with strict server-side model validation (Pydantic).",
        "Audit log tables tracking every status transition provide crucial compliance history for regulatory workflows.",
      ],
      technicalSnippet:
        "-- Relational Status Tracking Schema\nCREATE TABLE onboarding_audit_logs (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  importer_id UUID REFERENCES importers(id) ON DELETE CASCADE,\n  previous_status VARCHAR(50),\n  new_status VARCHAR(50) NOT NULL,\n  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()\n);",
    },
  },
];

interface NoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteIndex: number | null;
  onSelectNote: (index: number) => void;
}

export default function NoteModal({
  isOpen,
  onClose,
  noteIndex,
  onSelectNote,
}: NoteModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
        if (e.key === "ArrowLeft" && noteIndex !== null && noteIndex > 0) {
          onSelectNote(noteIndex - 1);
        }
        if (
          e.key === "ArrowRight" &&
          noteIndex !== null &&
          noteIndex < ENGINEERING_NOTES.length - 1
        ) {
          onSelectNote(noteIndex + 1);
        }
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose, noteIndex, onSelectNote]);

  const note = noteIndex !== null ? ENGINEERING_NOTES[noteIndex] : null;

  return (
    <AnimatePresence>
      {isOpen && note && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9990] flex h-screen w-screen overflow-hidden bg-bg/90 backdrop-blur-2xl"
          onClick={onClose}
        >
          <div
            className="relative h-full w-full overflow-y-auto overflow-x-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-[9995] flex items-center justify-between border-b border-stroke/60 bg-bg/85 px-6 py-4 backdrop-blur-md md:px-12">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[#89aacc]/30 bg-[#89aacc]/10 px-3 py-0.5 text-xs font-mono text-[#89aacc]">
                  {note.category}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    noteIndex !== null &&
                    noteIndex > 0 &&
                    onSelectNote(noteIndex - 1)
                  }
                  disabled={noteIndex === 0}
                  className="rounded-full border border-stroke bg-surface px-3 py-1.5 font-mono text-xs text-text-primary transition hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Previous article"
                >
                  ← Prev
                </button>
                <button
                  onClick={() =>
                    noteIndex !== null &&
                    noteIndex < ENGINEERING_NOTES.length - 1 &&
                    onSelectNote(noteIndex + 1)
                  }
                  disabled={noteIndex === ENGINEERING_NOTES.length - 1}
                  className="rounded-full border border-stroke bg-surface px-3 py-1.5 font-mono text-xs text-text-primary transition hover:border-white/30 disabled:opacity-30 disabled:pointer-events-none"
                  aria-label="Next article"
                >
                  Next →
                </button>
                <button
                  onClick={onClose}
                  className="ml-2 flex items-center gap-1.5 rounded-full border border-stroke bg-surface px-4 py-1.5 font-mono text-xs text-text-primary transition hover:border-white/40 hover:bg-stroke"
                  data-cursor="close"
                  aria-label="Close article modal"
                >
                  <span>Close</span>
                  <span className="text-muted">&times;</span>
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="mx-auto max-w-[850px] px-6 pb-20 pt-8 md:px-12 md:pb-28 md:pt-12">
              {/* Meta */}
              <div className="flex items-center gap-3 font-mono text-xs text-muted mb-3">
                <span className="text-[#89aacc]">{note.category}</span>
                <span>•</span>
                <span>{note.date}</span>
                <span>•</span>
                <span>{note.read}</span>
              </div>

              {/* Title */}
              <h1 className="font-display text-4xl italic leading-tight text-text-primary md:text-5xl lg:text-6xl">
                {note.title}
              </h1>

              {/* Cover Image */}
              <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-3xl border border-stroke bg-surface">
                <img
                  src={note.image}
                  alt={note.title}
                  className="h-full w-full object-cover"
                />
                <div className="halftone absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" />
              </div>

              {/* Body */}
              <div className="mt-12 space-y-8 text-sm md:text-base leading-relaxed text-muted">
                <div>
                  <h2 className="text-xs uppercase tracking-wider font-mono text-text-primary mb-2">
                    The Problem & Context
                  </h2>
                  <p className="leading-7">{note.content.problemStatement}</p>
                </div>

                <div>
                  <h2 className="text-xs uppercase tracking-wider font-mono text-text-primary mb-2">
                    Architectural Approach
                  </h2>
                  <p className="leading-7">{note.content.architectureOverview}</p>
                </div>

                {note.content.technicalSnippet && (
                  <div>
                    <h2 className="text-xs uppercase tracking-wider font-mono text-text-primary mb-2">
                      Code Pattern / Schema
                    </h2>
                    <div className="overflow-x-auto rounded-2xl border border-stroke bg-surface/80 p-5 font-mono text-xs text-text-primary/90 leading-6">
                      <pre className="font-mono">{note.content.technicalSnippet}</pre>
                    </div>
                  </div>
                )}

                <div>
                  <h2 className="text-xs uppercase tracking-wider font-mono text-text-primary mb-2">
                    Key Lessons Learned
                  </h2>
                  <ul className="space-y-2.5">
                    {note.content.keyTakeaways.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm leading-6">
                        <span className="font-mono text-[#89aacc] mt-0.5 shrink-0">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="mt-16 flex items-center justify-between border-t border-stroke pt-6">
                <button
                  onClick={() =>
                    noteIndex !== null &&
                    noteIndex > 0 &&
                    onSelectNote(noteIndex - 1)
                  }
                  disabled={noteIndex === 0}
                  className="font-mono text-xs text-muted hover:text-text-primary disabled:opacity-30"
                >
                  ← Previous Article
                </button>
                <button
                  onClick={onClose}
                  className="rounded-full border border-stroke bg-surface px-5 py-2 font-mono text-xs text-text-primary hover:border-white/30"
                >
                  Back to Portfolio
                </button>
                <button
                  onClick={() =>
                    noteIndex !== null &&
                    noteIndex < ENGINEERING_NOTES.length - 1 &&
                    onSelectNote(noteIndex + 1)
                  }
                  disabled={noteIndex === ENGINEERING_NOTES.length - 1}
                  className="font-mono text-xs text-muted hover:text-text-primary disabled:opacity-30"
                >
                  Next Article →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
