import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [copied, setCopied] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const handleLaunchEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(
      formData.subject || `Message from ${formData.name || "Portfolio Visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:ustsingh@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  const handleCopyMessage = () => {
    const text = `From: ${formData.name} (${formData.email})\nSubject: ${formData.subject}\n\n${formData.message}`;
    navigator.clipboard.writeText(text);
    setCopied("message");
    setTimeout(() => setCopied(null), 2800);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("ustsingh@gmail.com");
    setCopied("email");
    setTimeout(() => setCopied(null), 2800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9995] flex items-center justify-center bg-bg/85 p-4 backdrop-blur-xl sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/10 bg-surface/95 p-6 shadow-2xl shadow-black/80 backdrop-blur-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-stroke/70 pb-4">
              <span className="text-xs font-mono text-muted">Get in touch</span>
              <button
                onClick={onClose}
                className="grid size-8 place-items-center rounded-full border border-stroke bg-bg/80 text-muted transition hover:border-white/40 hover:text-text-primary"
                aria-label="Close contact dialog"
              >
                &times;
              </button>
            </div>

            {/* Introduction */}
            <div className="mt-5">
              <h3 className="font-display text-3xl italic text-text-primary md:text-4xl">
                Let's talk.
              </h3>
              <p className="mt-2 text-xs md:text-sm text-muted leading-relaxed">
                Send an email directly or pre-fill the form below. I'm open to discussing software projects, cybersecurity labs, IoT builds, and engineering opportunities.
              </p>
            </div>

            {/* Quick Email Direct Copy Bar */}
            <div className="mt-5 flex items-center justify-between rounded-2xl border border-stroke bg-bg/60 p-3.5">
              <div className="flex items-center gap-2 font-mono text-xs text-text-primary truncate">
                <span className="text-muted">Email:</span>
                <span className="font-medium text-[#89aacc]">ustsingh@gmail.com</span>
              </div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="shrink-0 rounded-full border border-stroke bg-surface px-3 py-1 font-mono text-[11px] text-text-primary transition hover:border-white/30"
              >
                {copied === "email" ? "Copied ✓" : "Copy email"}
              </button>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleLaunchEmail} className="mt-6 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-mono text-muted mb-1.5">
                    Your name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Alex Chen"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-stroke bg-bg/80 px-4 py-2.5 font-mono text-xs text-text-primary placeholder:text-muted/50 focus:border-[#89aacc] focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-muted mb-1.5">
                    Your email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-xl border border-stroke bg-bg/80 px-4 py-2.5 font-mono text-xs text-text-primary placeholder:text-muted/50 focus:border-[#89aacc] focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1.5">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Project Collaboration / Opportunity"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-stroke bg-bg/80 px-4 py-2.5 font-mono text-xs text-text-primary placeholder:text-muted/50 focus:border-[#89aacc] focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-muted mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Share what you'd like to build, discuss, or collaborate on..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-stroke bg-bg/80 px-4 py-2.5 font-mono text-xs text-text-primary placeholder:text-muted/50 focus:border-[#89aacc] focus:outline-none transition"
                />
              </div>

              {submitted && (
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3 font-mono text-xs text-emerald-300">
                  ✓ Email client launched with pre-filled message. You can also copy the message text below.
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  disabled={!formData.message}
                  className="rounded-full border border-stroke bg-bg/60 px-4 py-2.5 font-mono text-xs text-muted hover:text-text-primary transition disabled:opacity-40"
                >
                  {copied === "message" ? "Copied to clipboard ✓" : "Copy message text"}
                </button>

                <button
                  type="submit"
                  className="group relative inline-flex rounded-full p-[2px] cursor-pointer"
                >
                  <span className="animated-gradient-border absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
                  <span className="relative flex items-center gap-2 rounded-full bg-text-primary px-6 py-2.5 font-mono text-xs font-medium text-bg transition group-hover:bg-bg group-hover:text-text-primary">
                    Open in email ↗
                  </span>
                </button>
              </div>
            </form>

            {/* Social Direct Links */}
            <div className="mt-6 flex items-center justify-center gap-6 border-t border-stroke/70 pt-5 font-mono text-xs text-muted">
              <a
                href="https://github.com/utkarshsingh3011"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition"
              >
                GitHub ↗
              </a>
              <span>•</span>
              <a
                href="https://www.linkedin.com/in/utkarshsingh3011"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-text-primary transition"
              >
                LinkedIn ↗
              </a>
              <span>•</span>
              <a
                href="mailto:ustsingh@gmail.com"
                className="hover:text-text-primary transition"
              >
                ustsingh@gmail.com
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
