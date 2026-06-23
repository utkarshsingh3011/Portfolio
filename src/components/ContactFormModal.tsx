import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactFormModal({ isOpen, onClose }: ContactFormModalProps) {
  const [form, setForm] = useState<FormState>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [touched, setTouched] = useState<Record<keyof FormState, boolean>>({
    name: false,
    email: false,
    message: false,
  });

  // Lock background scroll when open
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

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      // Delay reset slightly to let exit transition finish
      const t = setTimeout(() => {
        setForm({ name: "", email: "", message: "" });
        setErrors({});
        setStatus("idle");
        setTouched({ name: false, email: false, message: false });
      }, 400);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const validate = (field?: keyof FormState): boolean => {
    const newErrors: FormErrors = { ...errors };
    let isValid = true;

    // Email Regex Pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!field || field === "name") {
      if (!form.name.trim()) {
        newErrors.name = "Please enter your name.";
        isValid = false;
      } else {
        delete newErrors.name;
      }
    }

    if (!field || field === "email") {
      if (!form.email.trim()) {
        newErrors.email = "Please enter your email.";
        isValid = false;
      } else if (!emailRegex.test(form.email)) {
        newErrors.email = "Please enter a valid email address.";
        isValid = false;
      } else {
        delete newErrors.email;
      }
    }

    if (!field || field === "message") {
      if (!form.message.trim()) {
        newErrors.message = "Please write a message.";
        isValid = false;
      } else if (form.message.trim().length < 10) {
        newErrors.message = "Message must be at least 10 characters long.";
        isValid = false;
      } else {
        delete newErrors.message;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormState]) {
      // Validate in real-time once field has been touched/edited
      setTimeout(() => validate(name as keyof FormState), 0);
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validate(field);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all as touched
    setTouched({ name: true, email: true, message: true });

    const isValid = validate();
    if (!isValid) return;

    setStatus("submitting");

    // Simulate API submission latency
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[9990] flex h-screen w-screen items-center justify-center bg-bg/85 px-4 backdrop-blur-2xl"
        >
          {/* Main Modal Card */}
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative w-full max-w-[540px] rounded-3xl border border-stroke bg-surface p-8 shadow-2xl md:p-10"
          >
            {/* Floating Close Button */}
            <button
              onClick={onClose}
              className="absolute right-6 top-6 group relative flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-bg text-muted transition duration-300 hover:border-white/20 hover:text-text-primary"
              data-cursor="close"
              aria-label="Close modal"
            >
              <span className="text-xl leading-none">&times;</span>
            </button>

            {status !== "success" ? (
              <>
                {/* Header */}
                <div className="mb-8 pr-8">
                  <h2 className="font-body text-3xl font-medium text-text-primary">
                    Let's collaborate <span className="font-display italic">online</span>
                  </h2>
                  <p className="mt-2.5 text-sm leading-6 text-muted">
                    Have an idea, project, or role in mind? Drop me a message and I'll get back to you within 24 hours.
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-[10px] uppercase tracking-widest text-muted mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur("name")}
                      disabled={status === "submitting"}
                      className={`w-full rounded-xl border bg-bg/40 px-4 py-3 text-sm text-text-primary placeholder:text-muted/40 outline-none transition duration-300 focus:border-text-primary/30 ${
                        errors.name ? "border-red-500/50" : "border-stroke focus:border-white/25"
                      }`}
                      placeholder="Jane Doe"
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.span
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1.5 block text-xs text-red-400"
                        >
                          {errors.name}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-[10px] uppercase tracking-widest text-muted mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      onBlur={() => handleBlur("email")}
                      disabled={status === "submitting"}
                      className={`w-full rounded-xl border bg-bg/40 px-4 py-3 text-sm text-text-primary placeholder:text-muted/40 outline-none transition duration-300 focus:border-text-primary/30 ${
                        errors.email ? "border-red-500/50" : "border-stroke focus:border-white/25"
                      }`}
                      placeholder="jane@company.com"
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.span
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1.5 block text-xs text-red-400"
                        >
                          {errors.email}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Message Input */}
                  <div>
                    <label htmlFor="message" className="block text-[10px] uppercase tracking-widest text-muted mb-2">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      onBlur={() => handleBlur("message")}
                      disabled={status === "submitting"}
                      className={`w-full rounded-xl border bg-bg/40 px-4 py-3 text-sm text-text-primary placeholder:text-muted/40 outline-none transition duration-300 focus:border-text-primary/30 resize-none ${
                        errors.message ? "border-red-500/50" : "border-stroke focus:border-white/25"
                      }`}
                      placeholder="Hi Utkarsh, I'd love to chat about..."
                    />
                    <AnimatePresence>
                      {errors.message && (
                        <motion.span
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-1.5 block text-xs text-red-400"
                        >
                          {errors.message}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group relative w-full rounded-xl p-[2px]"
                  >
                    <span className="animated-gradient-border absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:animate-gradient-shift group-hover:opacity-100" />
                    <span className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-text-primary px-6 py-3.5 text-sm font-medium text-bg transition duration-300 group-hover:bg-bg group-hover:text-text-primary">
                      {status === "submitting" ? (
                        <>
                          <svg className="size-4 animate-spin text-current" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send message <span aria-hidden="true">↗</span>
                        </>
                      )}
                    </span>
                  </button>
                </form>
              </>
            ) : (
              /* Success Panel */
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center py-8 text-center"
              >
                {/* Glowing checkmark container */}
                <div className="relative mb-6 flex size-16 items-center justify-center rounded-full bg-[#89aacc]/15">
                  <span className="accent-gradient absolute inset-0 rounded-full opacity-20 blur-[6px]" />
                  <motion.svg
                    className="size-8 text-[#89aacc]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="3"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
                  >
                    <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </motion.svg>
                </div>

                <h2 className="font-body text-3xl font-medium text-text-primary">
                  Message <span className="font-display italic">sent!</span>
                </h2>
                <p className="mx-auto mt-3 max-w-[280px] text-sm leading-6 text-muted">
                  Thank you for reaching out, Jane. I'll get back to you as soon as possible.
                </p>

                <button
                  onClick={onClose}
                  className="mt-8 rounded-full border border-stroke bg-bg/50 px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-text-primary transition hover:border-text-primary/30"
                >
                  Close Window
                </button>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
