"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, CheckCircle, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  const [setupRequired, setSetupRequired] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from(".contact-reveal", {
        opacity: 0,
        y: 50,
        stagger: 0.1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    const { name, email, subject, message } = formData;

    // Submit to backend API in background for database logging (non-blocking)
    fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).catch((error) => {
      console.warn("Background DB logging skipped/failed", error);
    });

    // Gmail Compose URL with pre-filled inputs
    const mailBody = `New Portfolio Contact:\n----------------------\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=arpit56665@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;

    // Open Gmail compose screen in a new tab synchronously (to bypass popup blockers)
    const newTab = window.open(gmailUrl, "_blank");
    
    if (!newTab) {
      // Fallback: If window.open popup is blocked, trigger mailto redirect in current window
      const mailtoUrl = `mailto:arpit56665@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(mailBody)}`;
      window.location.href = mailtoUrl;
    }

    setFormState("success");
    setFormData({ name: "", email: "", subject: "", message: "" });
    
    setTimeout(() => {
      setFormState("idle");
    }, 4000);
  };


  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-32 bg-[#040506]/35 border-t border-white/5 relative overflow-hidden z-10"
    >
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-bioluminescent-blue/5 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Left: Info */}
          <div className="space-y-12">
            <div className="contact-reveal">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-glint block mb-4">
                Get In Touch
              </span>
              <h2 className="font-space text-5xl md:text-7xl font-black tracking-tighter leading-none uppercase">
                LET&apos;S BUILD<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-glint to-bioluminescent-blue">
                  SOMETHING
                </span>
                <br />GREAT.
              </h2>
            </div>

            <p className="contact-reveal text-white/70 text-lg leading-relaxed font-light">
              Whether it&apos;s a startup sprint, a hard engineering problem, or
              a product that needs to dominate its market — I&apos;m ready to
              engage.
            </p>

            <div className="contact-reveal space-y-4">
              {[
                { label: "Direct Line", value: "arpit56665@gmail.com", mono: true },
                { label: "Phone Line", value: "+91 9015399193", mono: true },
                { label: "Location", value: "Hamirpur, HP, India (GMT+5:30)", mono: false },
                { label: "Availability", value: "Immediate Joiner", mono: false },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-6 pb-4 border-b border-white/5"
                >
                  <span className="font-mono text-[9px] uppercase tracking-widest text-white/60 w-24 shrink-0 pt-1">
                    {item.label}
                  </span>
                  <span
                    className={`text-sm font-light ${
                      item.mono
                        ? "font-mono text-cyan-glint"
                        : "text-white/80"
                    }`}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Status indicator */}
            <div className="contact-reveal inline-flex items-center gap-3 px-6 py-3 border border-white/10 rounded-full bg-white/3">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-white/80">
                Available for Work · Ready to Connect
              </span>
            </div>
          </div>

          {/* Right: Form */}
          <div className="contact-reveal">
            <div className="bg-glass rounded-2xl p-8 md:p-10 relative">
              {/* HUD corners */}
              <div className="hud-corner corner-tl opacity-30" />
              <div className="hud-corner corner-tr opacity-30" />
              <div className="hud-corner corner-bl opacity-30" />
              <div className="hud-corner corner-br opacity-30" />

              <div className="font-mono text-[9px] uppercase tracking-widest text-white/50 mb-8">
                Form Submission
              </div>

              {formState === "success" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                   <CheckCircle className="w-16 h-16 text-green-400" />
                  <h3 className="font-space text-2xl font-bold uppercase">
                    Message Received
                  </h3>
                  <p className="text-white/60 text-sm">
                    I&apos;ll respond within 24 hours.
                  </p>
                  {setupRequired && (
                    <div className="text-[10px] text-cyan-glint font-mono max-w-sm mt-6 border border-cyan-glint/20 p-4 rounded bg-cyan-glint/5 leading-relaxed text-left">
                      <strong className="block mb-1 text-white text-xs uppercase">Developer Setup Notice:</strong>
                      We just requested a Web3Forms Access Key for you. Check your inbox (<strong>arpit56665@gmail.com</strong>) for the key, and add it to your <strong>.env.local</strong> as <code>WEB3FORMS_ACCESS_KEY=&quot;your_key&quot;</code> to enable direct Gmail delivery!
                    </div>
                  )}
                </div>
              ) : formState === "error" ? (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                  <AlertCircle className="w-16 h-16 text-scarlet-accent" />
                  <h3 className="font-space text-2xl font-bold uppercase">
                    Submission Failed
                  </h3>
                  <p className="text-white/60 text-sm">
                    System error. Please use my email address.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="font-mono text-[9px] uppercase tracking-widest text-white/60"
                      >
                        Your Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full bg-white/5 border border-white/10 focus:border-cyan-glint/50 rounded-lg px-4 py-3 text-sm font-light text-white placeholder:text-white/20 outline-none transition-all focus:bg-white/7"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="font-mono text-[9px] uppercase tracking-widest text-white/60"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john.doe@example.com"
                        className="w-full bg-white/5 border border-white/10 focus:border-cyan-glint/50 rounded-lg px-4 py-3 text-sm font-light text-white placeholder:text-white/20 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="subject"
                      className="font-mono text-[9px] uppercase tracking-widest text-white/60"
                    >
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className="w-full bg-white/5 border border-white/10 focus:border-cyan-glint/50 rounded-lg px-4 py-3 text-sm font-light text-white placeholder:text-white/20 outline-none transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="font-mono text-[9px] uppercase tracking-widest text-white/60"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your project or inquiry details..."
                      className="w-full bg-white/5 border border-white/10 focus:border-cyan-glint/50 rounded-lg px-4 py-3 text-sm font-light text-white placeholder:text-white/20 outline-none transition-all resize-none"
                    />
                  </div>

                  <button
                    id="contact-submit"
                    type="submit"
                    disabled={formState === "loading"}
                    className="w-full group relative px-8 py-4 overflow-hidden border border-cyan-glint rounded-sm font-bold uppercase tracking-widest text-sm transition-all disabled:opacity-50"
                  >
                    <div className="absolute inset-0 bg-cyan-glint translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                    <span className="relative z-10 flex items-center justify-center gap-3 text-cyan-glint group-hover:text-black transition-colors">
                      {formState === "loading" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
