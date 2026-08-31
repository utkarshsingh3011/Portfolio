import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EASING, editorialFadeUp } from "../utils/motion";

interface Experiment {
  id: string;
  title: string;
  category: string;
  tagline: string;
  whatIWasTrying: string;
  whatILearned: string;
  techUsed: string[];
  snippetTitle: string;
  snippet: string;
  status: string;
}

const EXPERIMENTS: Experiment[] = [
  {
    id: "esp32-buffer",
    title: "ESP32 sensor batching",
    category: "Hardware & Firmware",
    tagline: "Preventing microcontroller WiFi transmit drops during high-frequency sensor reads.",
    whatIWasTrying:
      "When polling multiple analog and digital environmental sensors at 50Hz on an ESP32, transmitting each reading immediately over WiFi causes connection blocking, socket exhaustion, and packet loss. I wanted to build a circular in-memory buffer that batches readings and dispatches them in one lightweight HTTP payload every 2 seconds.",
    whatILearned:
      "Microcontroller heap fragmentation can crash the FreeRTOS task if dynamic JSON strings are repeatedly created in loops. Using static allocation (`StaticJsonDocument<512>`) and fixed-size circular ring buffers resolved memory crashes completely and reduced WiFi radio power consumption by ~65%.",
    techUsed: ["ESP32", "C++", "FreeRTOS", "ArduinoJson", "Sensors"],
    snippetTitle: "C++ Ring buffer dispatch snippet",
    snippet: `// Fixed-allocation telemetry batch buffer
struct SensorSample {
  float temperature;
  float humidity;
  uint32_t timestamp;
};

SensorSample ringBuffer[BATCH_SIZE];
size_t bufferIndex = 0;

void pushSample(float temp, float hum) {
  ringBuffer[bufferIndex] = { temp, hum, millis() };
  bufferIndex = (bufferIndex + 1) % BATCH_SIZE;
  if (bufferIndex == 0) flushBatchToApi();
}`,
    status: "Working prototype",
  },
  {
    id: "xss-sink-lab",
    title: "Testing XSS sinks and CSP",
    category: "Web Security",
    tagline: "Comparing unescaped template sinks with HTML entity encoding and CSP headers.",
    whatIWasTrying:
      "I wanted to build an intentionally unsafe Flask endpoint to visually inspect how the browser DOM parser executes malicious script tags in different HTML contexts (inside attributes, raw body, and script blocks), and then compare it with automated HTML entity encoding and CSP protection.",
    whatILearned:
      "Standard string escaping for HTML body elements (`&lt;`, `&gt;`) is insufficient when user input lands inside HTML attributes or JavaScript execution contexts. Security requires context-sensitive output encoding and a strict Content Security Policy (`script-src 'self'`) as a safety net.",
    techUsed: ["Python", "Flask", "OWASP ZAP", "HTML5", "CSP Headers"],
    snippetTitle: "Context-aware sanitization comparison",
    snippet: `# Unsafe vs Hardened Sink Pattern
# [Unsafe demonstration route]:
@app.route('/unsafe-comment', methods=['POST'])
def unsafe():
    return render_template_string(f"<div>{request.form['comment']}</div>")

# [Secure mitigation route]:
@app.route('/secure-comment', methods=['POST'])
def secure():
    clean_text = markupsafe.escape(request.form['comment'])
    resp = make_response(render_template('comment.html', text=clean_text))
    resp.headers['Content-Security-Policy'] = "default-src 'self'; script-src 'self'"
    return resp`,
    status: "Security lab",
  },
  {
    id: "jwt-refresh-flow",
    title: "Background token renewal",
    category: "Full-Stack Auth",
    tagline: "Handling expired access tokens without interrupting active client workflows.",
    whatIWasTrying:
      "When building authenticated workflows with short-lived access tokens (15 min) and long-lived HTTP-only refresh cookies (7 days), standard API calls fail abruptly once the access token expires. I wanted a seamless Axios response interceptor that intercepts 401s, queues pending requests, requests a fresh token, and retries the original calls without forcing a page reload.",
    whatILearned:
      "Handling concurrent API requests when a token expires requires a promise queue to prevent sending 10 simultaneous refresh requests to the backend. Storing the refresh token strictly in an HTTP-only SameSite cookie protects it from XSS theft while keeping client memory clean.",
    techUsed: ["TypeScript", "React", "Axios Interceptors", "Node.js", "JWT"],
    snippetTitle: "Axios token renewal queue",
    snippet: `let isRefreshing = false;
let failedQueue: Array<{ resolve: (token: string) => void; reject: (err: any) => void }> = [];

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!isRefreshing) {
        isRefreshing = true;
        const { token } = await authApi.post('/refresh');
        processQueue(null, token);
        return api(originalRequest);
      }
      return new Promise((resolve, reject) => failedQueue.push({ resolve, reject }));
    }
    return Promise.reject(error);
  }
);`,
    status: "Used in EdgeKart",
  },
  {
    id: "simulation-state-machine",
    title: "Attack simulation state machine",
    category: "Simulation & UI",
    tagline: "Visualizing multi-step security exploit progression deterministically.",
    whatIWasTrying:
      "I wanted to create interactive simulations of cyber attacks (like SQL injection and CSRF) where students step through each stage of an attack without executing dangerous code against real servers. The UI needed to transition cleanly between investigation states, payload injection, server interpretation, and mitigation checkpoints.",
    whatILearned:
      "Modeling attack scenarios as deterministic finite state machines (FSMs) makes edge cases easy to test, guarantees reproducible animations with Framer Motion, and ensures student progress is accurately tracked without requiring server-side sandboxes.",
    techUsed: ["TypeScript", "Framer Motion", "React", "Next.js"],
    snippetTitle: "Simulation state machine logic",
    snippet: `type ExploitPhase = 'RECON' | 'PAYLOAD_ENTRY' | 'FIREWALL_CHECK' | 'DOM_PARSE' | 'DEFENDED';

interface SimulationStep {
  phase: ExploitPhase;
  terminalLogs: string[];
  visualHighlights: string[];
  allowNext: boolean;
  explanation: string;
}

const transitionPhase = (current: ExploitPhase, action: 'INJECT' | 'REMEDIATE'): ExploitPhase => {
  if (action === 'REMEDIATE') return 'DEFENDED';
  return phaseTransitions[current] || 'RECON';
};`,
    status: "Used in Sentinel",
  },
];

export default function EngineeringPlayground() {
  const [selectedExperiment, setSelectedExperiment] = useState<string>(EXPERIMENTS[0].id);

  const activeExp = EXPERIMENTS.find((e) => e.id === selectedExperiment) || EXPERIMENTS[0];

  return (
    <section id="playground" className="relative bg-bg py-24 md:py-32 border-t border-stroke/60 overflow-hidden">
      <div className="tech-dots absolute inset-0 opacity-15 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        {/* Section Header */}
        <motion.div
          className="mb-16 max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={editorialFadeUp}
        >
          <p className="text-xs uppercase tracking-[0.2em] font-mono text-muted mb-3">
            Experiments
          </p>
          <h2 className="text-balance font-display text-4xl italic text-text-primary sm:text-6xl md:text-7xl">
            Things I built while figuring things out.
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-muted md:text-base max-w-2xl">
            Smaller explorations, microcontroller circuits, and security prototypes created to understand how things work under the hood.
          </p>
        </motion.div>

        {/* Experiment Selector Tabs & Inspector */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Left Column: Experiment Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs text-muted block mb-3 font-mono uppercase tracking-wider">
              Select an experiment
            </span>

            {EXPERIMENTS.map((exp) => {
              const isSelected = exp.id === selectedExperiment;

              return (
                <button
                  key={exp.id}
                  onClick={() => setSelectedExperiment(exp.id)}
                  className={`w-full text-left rounded-2xl border p-5 transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? "border-white/25 bg-surface/90 shadow-xl shadow-black/40"
                      : "border-stroke/60 bg-surface/25 hover:border-stroke hover:bg-surface/50"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs text-text-primary font-medium">{exp.title}</span>
                    <span className="text-[11px] text-muted">{exp.category}</span>
                  </div>

                  <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                    {exp.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Experiment Inspector */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExp.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, ease: EASING.editorial }}
                className="rounded-3xl border border-stroke/80 bg-surface/60 p-6 md:p-8 backdrop-blur-md"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stroke/60 pb-5">
                  <div>
                    <span className="text-xs text-muted block mb-1">
                      {activeExp.category}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl italic text-text-primary">
                      {activeExp.title}
                    </h3>
                  </div>

                  <span className="rounded-full border border-stroke bg-bg/80 px-3 py-1 font-mono text-[11px] text-muted">
                    {activeExp.status}
                  </span>
                </div>

                {/* What I was trying */}
                <div className="mt-6 space-y-6 text-xs md:text-sm text-muted leading-relaxed">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-text-primary mb-2 font-mono">
                      What I was trying to do
                    </h4>
                    <p className="text-text-primary/90 leading-6">{activeExp.whatIWasTrying}</p>
                  </div>

                  {/* What I learned */}
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-text-primary mb-2 font-mono">
                      What I learned
                    </h4>
                    <p className="leading-6">{activeExp.whatILearned}</p>
                  </div>

                  {/* Technical Snippet */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-xs uppercase tracking-wider text-text-primary font-mono">
                        {activeExp.snippetTitle}
                      </h4>
                    </div>

                    <pre className="overflow-x-auto rounded-xl border border-stroke/70 bg-bg/95 p-4 font-mono text-xs text-text-primary/90 leading-5">
                      <code>{activeExp.snippet}</code>
                    </pre>
                  </div>

                  {/* Technologies Used */}
                  <div className="pt-4 border-t border-stroke/60 flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted mr-1 font-mono">Tools:</span>
                    {activeExp.techUsed.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-stroke bg-surface px-2.5 py-0.5 font-mono text-xs text-text-primary/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
