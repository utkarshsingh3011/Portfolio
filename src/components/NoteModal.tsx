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
    title: "Building Sentinel: An interactive way to explore web security",
    category: "Web security",
    date: "2026",
    read: "4 min read",
    snippet:
      "Designing browser-contained attack simulations without exposing real backend servers, using client state machines and AI-guided hints.",
    image:
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=85",
    content: {
      problemStatement:
        "Traditional web security education often relies on heavy virtual machines or dry theory. I wanted to build an immediate, browser-first sandbox where students can visualize how attack payloads propagate across client-server boundaries step-by-step.",
      architectureOverview:
        "Sentinel models attack scenarios as deterministic finite state machines rendered via Next.js and Framer Motion. Instead of executing hazardous code on a live backend, the client executes simulated threat transitions, tracking inspection states and verifying mitigation checkpoints locally. Contextual hints are streamed via the Gemini API when users need conceptual guidance.",
      keyTakeaways: [
        "State machine architecture allows complex multi-stage attack simulations to remain safe, predictable, and fully client-contained.",
        "Visual animations help beginners grasp abstract concepts like DOM manipulation, token theft, and reflected payload paths.",
        "Integrating LLM APIs for interactive hints significantly lowers the barrier to entry for self-directed learning without spoiling solutions.",
      ],
      technicalSnippet:
        "// Attack Step Finite State Machine\ntype SimulationState = 'IDLE' | 'PAYLOAD_INJECTED' | 'DOM_RENDERED' | 'TOKEN_EXFILTRATED' | 'MITIGATED';\n\ninterface StepResult {\n  state: SimulationState;\n  isSafe: boolean;\n  vulnerabilityTriggered: boolean;\n  remediationGuide: string;\n}",
    },
  },
  {
    id: "esp32-note",
    title: "Connecting ESP32 sensors to a live web dashboard",
    category: "Hardware & IoT",
    date: "2026",
    read: "4 min read",
    snippet:
      "Moving environmental sensor data from physical microcontrollers to an asynchronous Python backend and real-time frontend charts.",
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
    content: {
      problemStatement:
        "Connecting physical hardware sensors to web interfaces requires managing microcontroller memory constraints, WiFi reconnect drops, and high-frequency JSON payload ingestion without bottlenecking backend databases.",
      architectureOverview:
        "The ESP32 reads analog and digital sensor streams, batches samples into fixed ring buffers, and dispatches authenticated HTTP POST requests over WiFi. The backend is an asynchronous FastAPI service that validates incoming payloads, computes moving averages, and serves live telemetry to a Next.js visualization frontend.",
      keyTakeaways: [
        "Batching sensor metrics on the microcontroller drastically reduces WiFi transmit overhead, memory fragmentation, and power consumption.",
        "Asynchronous Python backends (FastAPI / Uvicorn) easily sustain concurrent microcontroller streaming with sub-50ms ingestion latency.",
        "Client dashboards require throttling re-renders with requestAnimationFrame or fixed interval polling to maintain 60 FPS when graphing live data streams.",
      ],
      technicalSnippet:
        "// ESP32 Telemetry Batch Dispatch Pattern\nStaticJsonDocument<256> payload;\npayload[\"device_id\"] = \"ESP32_NODE_01\";\npayload[\"temp_c\"] = readTemperature();\npayload[\"humidity\"] = readHumidity();\npayload[\"timestamp\"] = getEpochTime();\n\nhttp.POST(serializeJson(payload));",
    },
  },
  {
    id: "mern-note",
    title: "Handling cart state and search indexing in a MERN app",
    category: "Full-stack web",
    date: "2026",
    read: "5 min read",
    snippet:
      "Structuring optimistic client state updates, JWT authorization lifecycles, and indexed MongoDB document stores in EdgeKart.",
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1200&q=85",
    content: {
      problemStatement:
        "E-commerce platforms for hardware and electronic parts require handling granular product specifications (operating voltages, pin configurations, protocols) while maintaining smooth shopping cart synchronization across devices.",
      architectureOverview:
        "Built with React and TypeScript on the frontend communicating with an Express.js REST API. User sessions are secured using JSON Web Tokens (JWT). Product data is stored in MongoDB with indexed compound fields for multi-attribute filtering (category, package type, price range).",
      keyTakeaways: [
        "Compound indexing on frequent filter criteria (category + in_stock + price) reduces MongoDB query scan times by over 80%.",
        "Decoupling cart calculations to the server prevents client-side price tampering while keeping UI state responsive via optimistic updates.",
        "Role-based access control (RBAC) middleware cleanly separates consumer actions from inventory administration.",
      ],
      technicalSnippet:
        "// MongoDB Compound Index for Hardware Search\nProductSchema.index({ \n  category: 1, \n  inStock: 1, \n  price: 1 \n});",
    },
  },
  {
    id: "xss-note",
    title: "What I learned building a sandboxed XSS vulnerability lab",
    category: "Web security",
    date: "2026",
    read: "4 min read",
    snippet:
      "Contrasting unescaped execution sinks with context-aware HTML entity encoding and Content Security Policy (CSP) headers.",
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
          className="fixed inset-0 z-[9990] flex h-screen w-screen overflow-hidden bg-bg/95 backdrop-blur-2xl"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={note.title}
        >
          <div
            className="relative h-full w-full overflow-y-auto overflow-x-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky Header */}
            <div className="sticky top-0 z-[9995] flex items-center justify-between border-b border-stroke/70 bg-bg/90 px-6 py-4 backdrop-blur-md md:px-12">
              <div className="flex items-center gap-3">
                <span className="text-xs text-text-primary">
                  {note.category}
                </span>
                <span className="text-stroke">•</span>
                <span className="text-xs text-muted">
                  {note.read}
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
                  aria-label="Close article modal"
                >
                  <span>Close</span>
                  <span className="text-muted">&times;</span>
                </button>
              </div>
            </div>

            {/* Article Content */}
            <div className="mx-auto max-w-[800px] px-6 pb-20 pt-8 md:px-12 md:pb-28 md:pt-12">
              {/* Meta */}
              <div className="flex items-center gap-3 text-xs text-muted mb-4">
                <span className="text-[#89aacc]">{note.category}</span>
                <span>•</span>
                <span>{note.date}</span>
                <span>•</span>
                <span>{note.read}</span>
              </div>

              {/* Title */}
              <h1 className="font-display text-3xl italic leading-tight text-text-primary sm:text-5xl md:text-6xl">
                {note.title}
              </h1>

              <div className="my-8 border-b border-stroke/70" />

              {/* Body */}
              <div className="space-y-10 text-sm leading-relaxed text-muted md:text-base">
                <div>
                  <h2 className="text-xs uppercase tracking-wider text-text-primary mb-3">
                    Problem & context
                  </h2>
                  <p className="leading-7 text-text-primary/90">{note.content.problemStatement}</p>
                </div>

                <div>
                  <h2 className="text-xs uppercase tracking-wider text-text-primary mb-3">
                    Architecture & approach
                  </h2>
                  <p className="leading-7">{note.content.architectureOverview}</p>
                </div>

                {note.content.technicalSnippet && (
                  <div>
                    <h2 className="text-xs uppercase tracking-wider text-text-primary mb-3">
                      Code snippet
                    </h2>
                    <pre className="overflow-x-auto rounded-2xl border border-stroke/70 bg-bg/95 p-5 font-mono text-xs text-text-primary/90 leading-6">
                      <code>{note.content.technicalSnippet}</code>
                    </pre>
                  </div>
                )}

                <div>
                  <h2 className="text-xs uppercase tracking-wider text-text-primary mb-3">
                    Key takeaways
                  </h2>
                  <ul className="space-y-3">
                    {note.content.keyTakeaways.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-3 text-sm leading-6">
                        <span className="text-muted mt-0.5 shrink-0">—</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="mt-16 flex items-center justify-between border-t border-stroke/70 pt-6">
                <button
                  onClick={() =>
                    noteIndex !== null &&
                    noteIndex > 0 &&
                    onSelectNote(noteIndex - 1)
                  }
                  disabled={noteIndex === 0}
                  className="font-mono text-xs text-muted hover:text-text-primary disabled:opacity-30"
                >
                  ← Previous Note
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
                  Next Note →
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
