import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/navbar";
import heroImg from "@/assets/hero.webp";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2, Shield, Zap, Smartphone, Search, PenTool, MessageSquare, Wrench, Check, SendHorizonal } from "lucide-react";

const FORMSPREE_URL = import.meta.env.VITE_FORMSPREE_URL as string | undefined;

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
};

const staggerContainer = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, margin: "-100px" },
  transition: { staggerChildren: 0.15 }
};

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [fields, setFields] = useState({ name: "", business: "", email: "", phone: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!FORMSPREE_URL) {
      alert("Contact form is not configured yet. See setup instructions.");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: fields.name,
          business: fields.business,
          email: fields.email,
          phone: fields.phone,
          message: fields.message,
        }),
      });
      if (res.ok) {
        setStatus("success");
        setFields({ name: "", business: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold text-foreground">Message sent!</h3>
        <p className="text-muted-foreground max-w-sm">Thanks for reaching out. We'll get back to you within 24 hours.</p>
        <Button variant="outline" className="rounded-full mt-2" onClick={() => setStatus("idle")}>Send another</Button>
      </div>
    );
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-foreground">Name</label>
          <Input name="name" value={fields.name} onChange={handleChange} required className="h-12 rounded-xl bg-background" placeholder="John Doe" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-foreground">Business Name</label>
          <Input name="business" value={fields.business} onChange={handleChange} className="h-12 rounded-xl bg-background" placeholder="Doe's Plumbing" />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-foreground">Email</label>
          <Input name="email" type="email" value={fields.email} onChange={handleChange} required className="h-12 rounded-xl bg-background" placeholder="john@example.com" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-semibold text-foreground">Phone</label>
          <Input name="phone" type="tel" value={fields.phone} onChange={handleChange} className="h-12 rounded-xl bg-background" placeholder="(555) 123-4567" />
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-semibold text-foreground">How can we help?</label>
        <Textarea name="message" value={fields.message} onChange={handleChange} className="rounded-xl bg-background resize-none min-h-[100px]" placeholder="Tell us a bit about your project..." />
      </div>
      {status === "error" && (
        <p className="text-sm text-destructive text-center">Something went wrong. Please try again or email us directly.</p>
      )}
      <Button
        size="lg"
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-xl h-13 bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all flex items-center gap-2"
      >
        {status === "sending" ? "Sending..." : <><SendHorizonal size={18} /> Send Request</>}
      </Button>
      <p className="text-sm text-center text-muted-foreground">We usually respond within 24 hours.</p>
    </form>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="pt-32 pb-20 md:pt-40 md:pb-32 px-4 md:px-6">
          <div className="container mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                className="max-w-2xl"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 text-foreground">
                  We build websites that help local businesses get more customers.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-xl">
                  We build professional websites for local businesses. No tech jargon, no hidden fees — just a clean, fast site that brings customers to your door.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="rounded-full text-base h-14 px-8 bg-primary hover:bg-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
                    Get Your Free Quote
                  </Button>
                  <Button size="lg" variant="outline" className="rounded-full text-base h-14 px-8 border-2 hover:bg-muted text-foreground">
                    View Our Work
                  </Button>
                </div>
              </motion.div>

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              >
                <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-[2rem] blur-2xl opacity-50"></div>
                <img
                  src={heroImg}
                  alt="Small business owner confident in their shop"
                  className="relative rounded-[2rem] shadow-2xl object-cover w-full h-[500px] md:h-[600px] border border-border/50"
                />
                <motion.div
                  className="absolute bottom-8 -left-8 bg-card p-4 rounded-2xl shadow-xl border flex items-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
                >
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-600 dark:text-green-400">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-foreground">Project Completed</p>
                    <p className="text-xs text-muted-foreground">On time &amp; on budget</p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="py-24 px-4 md:px-6 bg-muted/30 border-y">
          <div className="container mx-auto">
            <motion.div
              className="max-w-2xl mx-auto text-center mb-16"
              variants={fadeUp} initial="initial" whileInView="whileInView"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything you need.</h2>
              <p className="text-lg text-muted-foreground">
                From design to hosting, we handle it all so you can focus on your business.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid md:grid-cols-3 gap-8"
            >
              {[
                { icon: Smartphone, title: "Custom Web Design", desc: "A beautiful site built for your brand that looks great on any device — phone, tablet, or desktop." },
                { icon: Search, title: "Local SEO Built-In", desc: "Your site is set up from day one so local customers can find you when they search on Google." },
                { icon: Shield, title: "Hosting & Maintenance", desc: "We keep your site fast, secure, and up to date. No tech headaches for you." }
              ].map((service, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-card p-8 rounded-3xl border border-border shadow-sm hover:shadow-md transition-all duration-300 group">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-all duration-300">
                    <service.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>


        {/* PORTFOLIO SECTION */}
        <section id="portfolio" className="py-24 px-4 md:px-6 bg-background">
          <div className="container mx-auto">
            <motion.div
              className="max-w-2xl mb-14"
              variants={fadeUp} initial="initial" whileInView="whileInView"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">What we can build for you.</h2>
              <p className="text-lg text-muted-foreground">
                A sample of the kind of sites we create for local businesses.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="whileInView"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {[
                { img: `${import.meta.env.BASE_URL}portfolio-cutroom.webp`, title: "The Cut Room", tag: "Barbershop" },
                { img: `${import.meta.env.BASE_URL}portfolio-birdspotter.webp`, title: "BirdSpotter", tag: "Web App" },
                { img: `${import.meta.env.BASE_URL}portfolio-savorsage.webp`, title: "Savor & Sage", tag: "Restaurant" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} className="group">
                  <div className="overflow-hidden rounded-2xl mb-4 aspect-[16/9] bg-card border shadow-sm">
                    <img
                      src={item.img}
                      alt={item.title}
                      loading="lazy"
                    className="object-cover object-top w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  </div>
                  <div className="px-1">
                    <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                    <p className="text-sm text-secondary font-medium">{item.tag}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Concept project</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section id="process" className="py-24 px-4 md:px-6 bg-primary text-primary-foreground">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              variants={fadeUp} initial="initial" whileInView="whileInView"
              className="mb-14"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">How it works.</h2>
              <p className="text-lg text-primary-foreground/80">Three simple steps and your site is live.</p>
            </motion.div>

            <motion.div
              variants={staggerContainer} initial="initial" whileInView="whileInView"
              className="grid md:grid-cols-3 gap-10"
            >
              {[
                { icon: MessageSquare, step: "1", title: "We Chat", desc: "A quick call to learn about your business, your goals, and what you need." },
                { icon: PenTool, step: "2", title: "We Build", desc: "We design and build your site. You review it before anything goes live." },
                { icon: Wrench, step: "3", title: "We Launch", desc: "Your site goes live. We stay around to keep it running smoothly." }
              ].map((step, i) => (
                <motion.div key={i} variants={fadeUp} className="flex flex-col gap-4">
                  <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                    <step.icon size={22} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-secondary uppercase tracking-widest mb-1">Step {step.step}</p>
                    <h3 className="text-2xl font-bold mb-2 text-white">{step.title}</h3>
                    <p className="text-primary-foreground/75 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp} initial="initial" whileInView="whileInView"
              className="mt-12 flex items-center gap-3 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 w-fit"
            >
              <Zap size={20} className="text-secondary flex-shrink-0" />
              <p className="text-white font-medium">Most sites launch in 1–3 weeks.</p>
            </motion.div>
          </div>
        </section>

        {/* FAQ SECTION */}
        <section className="py-24 px-4 md:px-6 bg-background">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              variants={fadeUp} initial="initial" whileInView="whileInView"
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Common Questions</h2>
              <p className="text-lg text-muted-foreground">Answers to what most people ask us first.</p>
            </motion.div>

            <motion.div variants={fadeUp} initial="initial" whileInView="whileInView">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b border-border py-3">
                  <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-primary transition-colors">How much does a website cost?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    Most websites range from $400 to $2,000+, depending on what you need. Simple sites are cheaper, while custom features and larger projects cost more. We'll give you a clear quote upfront — no surprises.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b border-border py-3">
                  <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-primary transition-colors">How long does it take?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    Typically 3–10 days for most websites. More complex projects can take longer, but we always give you a clear timeline before we start.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b border-border py-3">
                  <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-primary transition-colors">Do I own the website?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    Yes — you fully own everything. Once it's done, it's yours: the design, content, and files.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4" className="border-b border-border py-3">
                  <AccordionTrigger className="text-lg font-bold hover:no-underline hover:text-primary transition-colors">Will I show up on Google?</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pt-2">
                    Yes — we set up your site so it can be found on Google. Ranking higher depends on competition and ongoing SEO, but we make sure your site is properly set up from day one.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </motion.div>
          </div>
        </section>

        {/* CTA / CONTACT SECTION */}
        <section id="contact" className="py-24 px-4 md:px-6 bg-muted/40 border-t">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              variants={fadeUp} initial="initial" whileInView="whileInView"
              className="mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's get started.</h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form and we'll be in touch within 24 hours.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp} initial="initial" whileInView="whileInView"
              className="bg-card p-8 md:p-12 rounded-3xl shadow-sm border"
            >
              <div className="grid lg:grid-cols-5 gap-10">
                <div className="lg:col-span-2 space-y-6">
                  <div className="space-y-3">
                    {["No pushy sales tactics", "Transparent pricing", "Free consultation"].map((item) => (
                      <div key={item} className="flex items-center gap-3 text-foreground font-medium">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                          <Check size={16} />
                        </div>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <ContactForm />
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="py-8 px-4 md:px-6 border-t bg-background">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p className="font-bold text-foreground">PrimeSites</p>
          <p>Professional websites for local businesses.</p>
          <p>&copy; {new Date().getFullYear()} PrimeSites. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
