import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { toast, Toaster } from "sonner";
import {
  Menu, X, Github, Linkedin, Mail, Phone, MapPin, Download,
  ArrowRight, ArrowUp, Send, Code2, Database, Wrench, Monitor,
  Globe, GraduationCap, Briefcase, Award, ExternalLink, Sparkles,
  Sun, Moon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import tanyaAsset from "@/assets/tanya.jpeg.asset.json";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const SKILL_GROUPS = [
  { title: "Languages", icon: Code2, items: ["Java", "Python", "JavaScript", "HTML", "CSS"] },
  { title: "Backend & Runtime", icon: Globe, items: ["Node.js", "REST APIs", "OOP"] },
  { title: "Databases", icon: Database, items: ["MySQL", "SQL", "MongoDB", "NoSQL"] },
  { title: "Core Concepts", icon: Sparkles, items: ["Data Structures", "Algorithms", "Database Design"] },
  { title: "Tools", icon: Wrench, items: ["Git", "GitHub", "VS Code", "AntiGravity"] },
  { title: "Languages Known", icon: Monitor, items: ["Tamil", "English"] },
];

const PROJECTS = [
  {
    title: "Gym Management System",
    desc: "Admin-focused platform to manage gym members, progress tracking, membership plans, and reporting. Designed the complete database structure for the Progress Tracking, Membership, and Report modules, ensuring organized data and smooth workflow between modules.",
    tech: ["MySQL", "Backend", "Database Design"],
    role: "Web Development Intern — AR Technologies",
  },
  {
    title: "Hospital Management System",
    desc: "Physiotherapy Clinic HMS with role-based access for Patients, Therapists, and Chief Doctor. Designed relational schema for registration, therapist management, appointment booking, exercise assignment, and treatment tracking with a focus on normalization and data integrity.",
    tech: ["SQL", "Schema Design", "RBAC"],
    role: "Academic Project",
  },
  {
    title: "College ERP System — HOD Portal",
    desc: "Centralized ERP platform with an HOD portal to manage student and staff data. Designed modules for academic records and departmental management to enable efficient monitoring and streamlined administrative workflows.",
    tech: ["Java", "MySQL", "ERP"],
    role: "Academic Project",
  },
  {
    title: "Time Table Scheduler",
    desc: "Web system that automatically generates conflict-free class timetables. Reduced manual scheduling errors and improved academic timetable management efficiency.",
    tech: ["JavaScript", "Node.js", "Algorithms"],
    role: "Web Development Intern — AR Technologies",
  },
];

const CERTS = [
  { title: "Fundamentals of Python", org: "Infosys Springboard", year: "2025" },
  { title: "Basics of MongoDB", org: "MongoDB (Official)", year: "2025" },
];

function Portfolio() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const height = h.scrollHeight - h.clientHeight;
      setProgress(height > 0 ? (scrolled / height) * 100 : 0);
      setShowTop(scrolled > 400);

      let current = "home";
      for (const n of NAV) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top <= 120) current = n.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = useCallback((id: string) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" richColors />

      {/* scroll progress */}
      <div
        className="fixed left-0 top-0 z-[60] h-1 bg-primary-gradient transition-[width] duration-150"
        style={{ width: `${progress}%` }}
        aria-hidden
      />

      {/* nav */}
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-lg">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <button onClick={() => go("home")} className="flex items-center gap-2 font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            <span className="grid size-8 place-items-center rounded-lg bg-primary-gradient text-primary-foreground shadow-soft">
              <Sparkles className="size-4" />
            </span>
            <span className="gradient-text">Tanya S.</span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <li key={n.id}>
                <button
                  onClick={() => go(n.id)}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                    active === n.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {n.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              aria-label="Toggle theme"
              onClick={() => setDark((d) => !d)}
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
          </div>
        </nav>

        {open && (
          <div className="border-t border-border bg-background lg:hidden">
            <ul className="mx-auto max-w-6xl px-4 py-2 sm:px-6">
              {NAV.map((n) => (
                <li key={n.id}>
                  <button
                    onClick={() => go(n.id)}
                    className={`block w-full rounded-md px-3 py-2 text-left text-sm ${
                      active === n.id ? "bg-accent text-accent-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {n.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      <main className="pt-16">
        {/* HERO */}
        <section id="home" className="relative overflow-hidden bg-hero-gradient">
          <div className="pointer-events-none absolute -left-24 top-10 size-72 rounded-full bg-primary/20 blur-3xl" />
          <div className="pointer-events-none absolute -right-24 bottom-0 size-72 rounded-full bg-sky-300/30 blur-3xl" />
          <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-2 lg:items-center">
            <div className="animate-fade-in">
              <Badge className="mb-5 rounded-full bg-accent px-3 py-1 text-accent-foreground hover:bg-accent">
                <span className="mr-1.5 inline-block size-1.5 rounded-full bg-primary" />
                Available for internships
              </Badge>
              <h1
                className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl md:text-6xl"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Tanya <span className="gradient-text">Somasundaram</span>
              </h1>
              <p className="mt-3 text-xl font-medium text-primary sm:text-2xl">
                Backend Developer
              </p>
              <p className="mt-4 max-w-xl text-base italic text-muted-foreground sm:text-lg">
                "Building reliable backend systems and transforming ideas into scalable digital solutions."
              </p>
              <p className="mt-5 max-w-xl text-muted-foreground">
                I am a final-year Information Technology student with a strong passion for
                backend development, databases, and problem-solving. I enjoy building efficient
                applications, learning modern technologies, and continuously improving my
                software development skills.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => go("projects")} className="bg-primary-gradient text-primary-foreground shadow-soft hover:opacity-90">
                  View Projects <ArrowRight className="ml-1 size-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => go("contact")}>
                  Contact Me
                </Button>
                <Button size="lg" variant="secondary" asChild>
                  <a href="/resume.txt" download aria-label="Download Resume">
                    <Download className="mr-1 size-4" /> Download Resume
                  </a>
                </Button>
              </div>
            </div>

            <div className="relative mx-auto animate-scale-in">
              <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-[2rem] bg-primary-gradient blur-2xl opacity-30" />
              <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-2 shadow-elegant">
                <img
                  src={tanyaAsset.url}
                  alt="Portrait of Tanya Somasundaram"
                  loading="eager"
                  className="h-[440px] w-[340px] rounded-[1.6rem] object-cover sm:h-[520px] sm:w-[400px]"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-border bg-background/90 px-4 py-3 shadow-soft backdrop-blur sm:block">
                <p className="text-xs text-muted-foreground">CGPA</p>
                <p className="text-lg font-bold gradient-text">8.6 / 10</p>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <Section id="about" eyebrow="About" title="A backend-focused engineer in the making">
          <div className="grid gap-8 lg:grid-cols-5">
            <Card className="lg:col-span-3 rounded-2xl border-border p-8 shadow-soft">
              <p className="text-base leading-relaxed text-muted-foreground">
                I am a final-year B.Tech Information Technology student with a strong interest in
                backend development and software engineering. My primary focus is on designing
                reliable, scalable, and efficient backend systems. I enjoy working with databases,
                exploring Artificial Intelligence, and continuously expanding my technical knowledge.
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                I believe in writing clean, maintainable code and solving real-world problems through
                technology. I am currently seeking opportunities where I can contribute, learn from
                experienced professionals, and grow as a backend software developer.
              </p>
            </Card>
            <div className="grid gap-4 lg:col-span-2">
              {[
                { label: "Focus", value: "Backend Development" },
                { label: "Degree", value: "B.Tech IT · Final Year" },
                { label: "CGPA", value: "8.6 / 10" },
                { label: "Location", value: "Erode, Tamil Nadu" },
              ].map((s) => (
                <Card key={s.label} className="rounded-xl border-border p-5 shadow-soft transition-transform hover:-translate-y-0.5">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
                  <p className="mt-1 font-semibold">{s.value}</p>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* SKILLS */}
        <Section id="skills" eyebrow="Skills" title="Tools & technologies I work with" muted>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SKILL_GROUPS.map(({ title, icon: Icon, items }) => (
              <Card
                key={title}
                className="group rounded-2xl border-border p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="mb-4 grid size-11 place-items-center rounded-xl bg-primary-gradient text-primary-foreground shadow-soft">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {items.map((it) => (
                    <Badge key={it} variant="secondary" className="rounded-full bg-accent text-accent-foreground hover:bg-accent">
                      {it}
                    </Badge>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* EDUCATION */}
        <Section id="education" eyebrow="Education" title="Academic journey">
          <div className="relative mx-auto max-w-3xl">
            <div className="absolute left-4 top-2 h-full w-px bg-border md:left-1/2" />
            <TimelineItem
              side="right"
              icon={<GraduationCap className="size-5" />}
              title="Bachelor of Technology — Information Technology"
              subtitle="Nandha Engineering College · Erode, Tamil Nadu"
              meta="Final Year · CGPA 8.6 / 10"
              body="Focused on backend development, databases, algorithms, and software engineering fundamentals."
            />
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" eyebrow="Projects" title="Selected work" muted>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((p) => (
              <Card
                key={p.title}
                className="group overflow-hidden rounded-2xl border-border p-0 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className={`relative h-44 bg-gradient-to-br ${p.gradient}`}>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_60%)]" />
                  <div className="absolute bottom-3 left-4 text-primary-foreground/90">
                    <Code2 className="size-8" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{p.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tech.map((t) => (
                      <Badge key={t} variant="outline" className="rounded-full text-xs">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-5 flex gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <a href="#" aria-label={`${p.title} GitHub`}>
                        <Github className="mr-1 size-4" /> GitHub
                      </a>
                    </Button>
                    <Button size="sm" asChild className="bg-primary-gradient text-primary-foreground hover:opacity-90">
                      <a href="#" aria-label={`${p.title} Live Demo`}>
                        <ExternalLink className="mr-1 size-4" /> Live Demo
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" eyebrow="Experience" title="Where I'm heading next">
          <Card className="mx-auto max-w-3xl rounded-2xl border-border p-8 text-center shadow-soft">
            <div className="mx-auto mb-4 grid size-12 place-items-center rounded-xl bg-primary-gradient text-primary-foreground shadow-soft">
              <Briefcase className="size-5" />
            </div>
            <h3 className="text-xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              Open to opportunities
            </h3>
            <p className="mt-2 text-muted-foreground">
              Currently seeking internship and full-time opportunities in Backend Development.
            </p>
            <Button onClick={() => go("contact")} className="mt-6 bg-primary-gradient text-primary-foreground hover:opacity-90">
              Get in touch <ArrowRight className="ml-1 size-4" />
            </Button>
          </Card>
        </Section>

        {/* CERTIFICATIONS */}
        <Section id="certifications" eyebrow="Certifications" title="Continuous learning" muted>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CERTS.map((c, i) => (
              <Card
                key={i}
                className="rounded-2xl border-border p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="mb-4 grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                  <Award className="size-5" />
                </div>
                <h3 className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.org}</p>
                <p className="mt-3 text-xs uppercase tracking-wider text-primary">{c.year}</p>
              </Card>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" eyebrow="Contact" title="Let's build something together">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-3">
              <ContactRow icon={<Mail className="size-4" />} label="Email" value="tanyasomu6@gmail.com" href="mailto:tanyasomu6@gmail.com" />
              <ContactRow icon={<Phone className="size-4" />} label="Phone" value="+91 95859 88544" href="tel:+919585988544" />
              <ContactRow icon={<MapPin className="size-4" />} label="Location" value="Vijayamangalam, Erode, Tamil Nadu, India" />
              <ContactRow icon={<Github className="size-4" />} label="GitHub" value="github.com/TanyaSomu" href="https://github.com/TanyaSomu" />
              <ContactRow icon={<Linkedin className="size-4" />} label="LinkedIn" value="linkedin.com/in/tanya-somu" href="https://www.linkedin.com/in/tanya-somu" />
            </div>

            <Card className="lg:col-span-3 rounded-2xl border-border p-6 shadow-soft sm:p-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  toast.success("Thanks! Your message has been captured.");
                  (e.currentTarget as HTMLFormElement).reset();
                }}
                className="grid gap-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field id="name" label="Name" required />
                  <Field id="email" label="Email" type="email" required />
                </div>
                <Field id="subject" label="Subject" required />
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" required rows={5} className="mt-1.5" placeholder="Tell me about your project or opportunity..." />
                </div>
                <Button type="submit" className="bg-primary-gradient text-primary-foreground hover:opacity-90">
                  Send Message <Send className="ml-1 size-4" />
                </Button>
              </form>
            </Card>
          </div>
        </Section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border bg-muted/40">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 sm:flex-row sm:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tanya Somasundaram. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <SocialLink href="https://github.com/TanyaSomu" label="GitHub"><Github className="size-4" /></SocialLink>
            <SocialLink href="https://www.linkedin.com/in/tanya-somu" label="LinkedIn"><Linkedin className="size-4" /></SocialLink>
            <SocialLink href="mailto:tanyasomu6@gmail.com" label="Email"><Mail className="size-4" /></SocialLink>
          </div>
          <p className="text-xs text-muted-foreground">
            Designed & Developed by <span className="gradient-text font-semibold">Tanya Somasundaram</span>
          </p>
        </div>
      </footer>

      {/* scroll to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-6 right-6 z-50 grid size-11 place-items-center rounded-full bg-primary-gradient text-primary-foreground shadow-elegant transition-transform hover:-translate-y-0.5 animate-fade-in"
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </div>
  );
}

function Section({
  id, eyebrow, title, muted, children,
}: { id: string; eyebrow: string; title: string; muted?: boolean; children: React.ReactNode }) {
  return (
    <section id={id} className={`py-20 sm:py-24 ${muted ? "bg-muted/40" : ""}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {title}
          </h2>
        </div>
        {children}
      </div>
    </section>
  );
}

function TimelineItem({
  icon, title, subtitle, meta, body,
}: { side: "left" | "right"; icon: React.ReactNode; title: string; subtitle: string; meta: string; body: string }) {
  return (
    <div className="relative pl-12 md:pl-0">
      <div className="md:grid md:grid-cols-2 md:gap-8">
        <div className="hidden md:block" />
        <div>
          <div className="absolute left-0 top-1 grid size-9 place-items-center rounded-full bg-primary-gradient text-primary-foreground shadow-soft md:left-1/2 md:-translate-x-1/2">
            {icon}
          </div>
          <Card className="rounded-2xl border-border p-6 shadow-soft">
            <p className="text-xs uppercase tracking-wider text-primary">{meta}</p>
            <h3 className="mt-1 text-lg font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
              {title}
            </h3>
            <p className="text-sm text-muted-foreground">{subtitle}</p>
            <p className="mt-3 text-sm text-muted-foreground">{body}</p>
          </Card>
        </div>
      </div>
    </div>
  );
}

function ContactRow({
  icon, label, value, href,
}: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const Body = (
    <Card className="flex items-center gap-4 rounded-xl border-border p-4 shadow-soft transition-transform hover:-translate-y-0.5">
      <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
        <p className="truncate text-sm font-medium">{value}</p>
      </div>
    </Card>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block">
      {Body}
    </a>
  ) : Body;
}

function Field({ id, label, type = "text", required }: { id: string; label: string; type?: string; required?: boolean }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} required={required} className="mt-1.5" />
    </div>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
      aria-label={label}
      className="grid size-9 place-items-center rounded-full border border-border bg-background text-muted-foreground transition-colors hover:bg-primary-gradient hover:text-primary-foreground"
    >
      {children}
    </a>
  );
}
