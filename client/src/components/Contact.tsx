/*
 * Design: Ironbark — Industrial Premium
 * Contact: Split layout — details on left, form on right.
 * Form submits to Google Apps Script web app → Google Sheets.
 * Replace APPS_SCRIPT_URL with your deployed web app URL.
 */

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// After deploying your Google Apps Script web app, paste the URL here.
// See GOOGLE_APPS_SCRIPT_SETUP.md in the project root for full instructions.
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec";
// ──────────────────────────────────────────────────────────────────────────────

const serviceOptions = [
  "Tree Removal",
  "Tree Pruning",
  "Tree Lopping",
  "Stump Grinding",
  "Hedging",
  "Arborist Reports",
  "24/7 Emergency Services",
  "Land Clearing",
  "Bush Mulching",
  "Other",
];

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    // If the URL hasn't been configured yet, fall back to mailto
    if (APPS_SCRIPT_URL.includes("YOUR_SCRIPT_ID_HERE")) {
      const subject = encodeURIComponent(
        `Quote Request: ${formData.service || "General Enquiry"}`
      );
      const body = encodeURIComponent(
        `Name: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nAddress: ${formData.address}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:deanhibbert21@gmail.com?subject=${subject}&body=${body}`;
      toast.info("Apps Script URL not yet configured — opening email client as fallback.");
      setStatus("idle");
      return;
    }

    try {
      // Google Apps Script requires no-cors mode for cross-origin fetch
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toLocaleString("en-AU", {
            timeZone: "Australia/Melbourne",
          }),
          source: "Website Contact Form",
        }),
      });

      // no-cors means we can't read the response — treat completion as success
      setStatus("success");
      toast.success("Enquiry sent! We'll be in touch shortly.");
      setFormData({ name: "", email: "", phone: "", address: "", service: "", message: "" });
    } catch {
      setStatus("error");
      toast.error("Something went wrong. Please call us directly on 0409 331 052.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-cream" ref={ref}>
      <div className="container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold font-body font-semibold text-sm uppercase tracking-[0.25em]">
            Get in Touch
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-evergreen-dark mt-6 mb-8 tracking-[-0.01em]">
            Request a <span className="text-gold italic">Free Quote</span>
          </h2>
          <p className="font-body text-charcoal-light text-lg max-w-2xl mx-auto">
            To discuss your requirements or get a free quote, give us a call or fill
            out the form below. We'll get back to you promptly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="space-y-8">
              {[
                {
                  icon: Phone,
                  label: "Phone",
                  value: "0409 331 052",
                  href: "tel:0409331052",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "deanhibbert21@gmail.com",
                  href: "mailto:deanhibbert21@gmail.com",
                },
                {
                  icon: MapPin,
                  label: "Address",
                  value: "285 Sunday Creek Rd, Sunday Creek VIC 3658",
                  href: "https://maps.google.com/?q=285+Sunday+Creek+Rd+Sunday+Creek+VIC+3658",
                },
                {
                  icon: Clock,
                  label: "Working Hours",
                  value: "Monday – Sunday, 9:00 AM – 5:00 PM",
                  href: undefined,
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-evergreen/5 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-evergreen" />
                  </div>
                  <div>
                    <span className="block font-body font-semibold text-charcoal text-sm mb-1">
                      {label}
                    </span>
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="font-body text-charcoal-light text-sm hover:text-gold transition-colors duration-300"
                      >
                        {value}
                      </a>
                    ) : (
                      <span className="font-body text-charcoal-light text-sm">
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Map embed */}
            <div className="mt-10 rounded-lg overflow-hidden border border-border/50 shadow-sm">
              <iframe
                title="Northern Tree Solutions Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3168.5!2d145.15!3d-37.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDE1JzAwLjAiUyAxNDXCsDA5JzAwLjAiRQ!5e0!3m2!1sen!2sau!4v1234567890"
                width="100%"
                height="220"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            {/* Success state */}
            {status === "success" ? (
              <div className="bg-white rounded-lg p-10 shadow-sm border border-border/50 flex flex-col items-center justify-center text-center min-h-[480px]">
                <div className="w-20 h-20 rounded-full bg-evergreen/10 flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-evergreen" />
                </div>
                <h3 className="font-display text-2xl font-semibold text-evergreen-dark mb-3">
                  Enquiry Received!
                </h3>
                <p className="font-body text-charcoal-light text-base max-w-sm mb-8">
                  Thanks for reaching out. We'll review your request and get back to you
                  as soon as possible — usually within a few hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="inline-flex items-center gap-2 bg-evergreen hover:bg-evergreen-light text-cream font-body font-bold text-sm px-8 py-3 rounded transition-all duration-300"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg p-8 lg:p-10 shadow-sm border border-border/50"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body font-semibold text-charcoal text-sm mb-2">
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 rounded border border-border bg-cream/50 font-body text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all duration-300 disabled:opacity-60"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label className="block font-body font-semibold text-charcoal text-sm mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 rounded border border-border bg-cream/50 font-body text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all duration-300 disabled:opacity-60"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label className="block font-body font-semibold text-charcoal text-sm mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 rounded border border-border bg-cream/50 font-body text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all duration-300 disabled:opacity-60"
                      placeholder="04XX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block font-body font-semibold text-charcoal text-sm mb-2">
                      Property Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      disabled={status === "submitting"}
                      className="w-full px-4 py-3 rounded border border-border bg-cream/50 font-body text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all duration-300 disabled:opacity-60"
                      placeholder="Property address"
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <label className="block font-body font-semibold text-charcoal text-sm mb-2">
                    Service Type
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="w-full px-4 py-3 rounded border border-border bg-cream/50 font-body text-sm text-charcoal focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all duration-300 appearance-none disabled:opacity-60"
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-5">
                  <label className="block font-body font-semibold text-charcoal text-sm mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    disabled={status === "submitting"}
                    className="w-full px-4 py-3 rounded border border-border bg-cream/50 font-body text-sm text-charcoal placeholder:text-charcoal-light/50 focus:outline-none focus:ring-2 focus:ring-gold/30 focus:border-gold transition-all duration-300 resize-none disabled:opacity-60"
                    placeholder="Tell us about your tree care needs..."
                  />
                </div>

                {/* Error message */}
                {status === "error" && (
                  <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded px-4 py-3">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span className="font-body text-sm">
                      Something went wrong. Please try again or call us on{" "}
                      <a href="tel:0409331052" className="font-semibold underline">
                        0409 331 052
                      </a>
                      .
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-evergreen hover:bg-evergreen-light text-cream font-body font-bold text-base px-10 py-4 rounded transition-all duration-300 shadow-md shadow-evergreen/20 hover:shadow-lg hover:shadow-evergreen/30 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Enquiry
                    </>
                  )}
                </button>

                <p className="mt-4 font-body text-xs text-charcoal-light/60">
                  Your information is kept private and will only be used to respond to
                  your enquiry.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
