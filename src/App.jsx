import { useState, useEffect, useRef } from "react";

// ─── Floating Particles Background ───────────────────────────────────────────
function Particles() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(18)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full opacity-10 animate-pulse"
          style={{
            width: `${Math.random() * 6 + 2}px`,
            height: `${Math.random() * 6 + 2}px`,
            background:
              i % 3 === 0 ? "#6EE7B7" : i % 3 === 1 ? "#818CF8" : "#F472B6",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["About", "Skills", "Experience", "Projects", "Contact"];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleNav = (link) => {
    setActive(link);
    setMenuOpen(false);
    document
      .getElementById(link.toLowerCase())
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0A0F1E]/90 backdrop-blur-md shadow-lg shadow-black/30"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="text-xl font-bold font-mono">
          <span className="text-emerald-400">&lt;</span>
          <span className="text-white">Dev</span>
          <span className="text-violet-400">Portfolio</span>
          <span className="text-emerald-400">/&gt;</span>
        </div>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => handleNav(l)}
              className={`text-sm font-medium transition-all duration-200 hover:text-emerald-400 cursor-pointer relative group ${
                active === l ? "text-emerald-400" : "text-gray-400"
              }`}
            >
              {l}
              <span
                className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-400 transition-all duration-300 ${
                  active === l ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
          <a
            href="#contact"
            className="bg-emerald-500 hover:bg-emerald-400 text-black text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-emerald-500/30"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="space-y-1.5">
            <span
              className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-6 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0A0F1E]/95 backdrop-blur-md px-6 pb-4 flex flex-col gap-4">
          {links.map((l) => (
            <button
              key={l}
              onClick={() => handleNav(l)}
              className="text-gray-300 hover:text-emerald-400 text-left py-1"
            >
              {l}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  const roles = [
    "MERN Stack Developer",
    "Full Stack Engineer",
    "React Specialist",
    "Node.js Expert",
  ];
  const [roleIdx, setRoleIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIdx];
    let timeout;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        80,
      );
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIdx((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIdx]);

  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center relative px-6 pt-24 pb-16"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Text */}
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Available for opportunities
          </div>

          <div className="space-y-2">
            <p className="text-gray-400 text-lg font-light">Hi there, I'm</p>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight">
              Vivek{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-violet-400">
                Lagshetti
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xl md:text-2xl font-semibold text-gray-300 h-8">
            <span className="text-emerald-400">{">"}</span>
            <span>{displayed}</span>
            <span className="w-0.5 h-6 bg-emerald-400 animate-pulse ml-0.5" />
          </div>

          <p className="text-gray-400 text-base leading-relaxed max-w-lg">
            Crafting pixel-perfect frontends and battle-tested backends. I turn
            complex problems into elegant digital products — from startup MVPs
            to production-grade systems. Shipped code across two startups and
            counting.
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-gradient-to-r cursor-pointer from-emerald-500 to-emerald-400 text-black font-semibold px-6 py-3 rounded-xl hover:opacity-90 transition-all hover:shadow-xl hover:shadow-emerald-500/30 hover:-translate-y-0.5"
            >
              View My Work
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="border cursor-pointer border-violet-500/50 text-violet-300 font-semibold px-6 py-3 rounded-xl hover:bg-violet-500/10 transition-all hover:-translate-y-0.5"
            >
              Get In Touch
            </button>
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4 border-t border-white/5">
            {[
              ["2+", "Years"],
              ["2", "Startups"],
              ["5+", "Projects"],
              ["∞", "Curiosity"],
            ].map(([n, l]) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-bold text-white">{n}</div>
                <div className="text-xs text-gray-500">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual card */}
        <div className="flex justify-center">
          <div className="relative w-72 h-72 md:w-80 md:h-80">
            {/* Rotating ring */}
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30 animate-spin"
              style={{ animationDuration: "20s" }}
            />
            <div
              className="absolute inset-4 rounded-full border border-violet-500/20 animate-spin"
              style={{
                animationDuration: "15s",
                animationDirection: "reverse",
              }}
            />

            {/* Center avatar */}
            <div className="absolute inset-8 rounded-full bg-gradient-to-br from-[#1A2035] to-[#0D1425] border border-white/10 flex items-center justify-center shadow-2xl">
              <div className="text-center space-y-1">
                <div className="text-5xl">👨‍💻</div>
                <div className="font-mono text-xs text-emerald-400">
                  ./vivek.exe
                </div>
              </div>
            </div>

            {/* Orbiting tech badges */}
            {[
              { label: "React", color: "text-cyan-400", angle: 0 },
              { label: "Node", color: "text-green-400", angle: 72 },
              { label: "MongoDB", color: "text-emerald-400", angle: 144 },
              { label: "Express", color: "text-yellow-400", angle: 216 },
              { label: "Next.js", color: "text-white", angle: 288 },
            ].map(({ label, color, angle }) => {
              const rad = (angle * Math.PI) / 180;
              const r = 140;
              const x = 50 + (r / 2.8) * Math.cos(rad);
              const y = 50 + (r / 2.8) * Math.sin(rad);
              return (
                <div
                  key={label}
                  className={`absolute text-xs font-bold font-mono ${color} bg-[#0A0F1E] border border-white/10 px-2 py-1 rounded-md shadow-lg`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  {label}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Skills ───────────────────────────────────────────────────────────────────
const skillGroups = [
  {
    category: "Frontend",
    icon: "🎨",
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "React.js", level: 92 },
      { name: "Next.js", level: 30 },
      { name: "JavaScript (ES6+)", level: 90 },
      { name: "TypeScript", level: 30 },
      { name: "Tailwind CSS", level: 88 },
      { name: "HTML/CSS", level: 95 },
    ],
  },
  {
    category: "Backend",
    icon: "⚙️",
    color: "from-emerald-500 to-teal-500",
    skills: [
      { name: "Node.js", level: 85 },
      { name: "Express.js", level: 88 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 30 },
      { name: "JWT / Auth", level: 82 },
      { name: "WebSockets", level: 70 },
    ],
  },
  {
    category: "Database & Cloud",
    icon: "🗄️",
    color: "from-violet-500 to-purple-600",
    skills: [
      { name: "MongoDB", level: 87 },
      { name: "Mongoose", level: 85 },
      { name: "PostgreSQL", level: 30 },
      { name: "Redis", level: 58 },
      { name: "AWS (S3, EC2)", level: 30 },
      { name: "Docker", level: 30 },
    ],
  },
  {
    category: "Tools & Practices",
    icon: "🔧",
    color: "from-pink-500 to-rose-500",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "Agile / Scrum", level: 30 },
      { name: "CI/CD", level: 30 },
      { name: "Postman", level: 88 },
      { name: "Figma", level: 60 },
      { name: "Linux/CLI", level: 75 },
    ],
  },
];

function SkillBar({ name, level }) {
  const [width, setWidth] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setWidth(level);
      },
      { threshold: 0.3 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="space-y-1.5">
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{name}</span>
        <span className="text-gray-500 font-mono text-xs">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-violet-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="What I Know" title="Skills & Technologies" />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="bg-white/3 border border-white/8 rounded-2xl p-6 hover:border-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/10"
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl">{group.icon}</span>
                <h3
                  className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${group.color}`}
                >
                  {group.category}
                </h3>
              </div>
              <div className="space-y-4">
                {group.skills.map((s) => (
                  <SkillBar key={s.name} {...s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Experience ───────────────────────────────────────────────────────────────
const jobs = [
  {
    role: "Full Stack Developer",
    company: "Mcute",
    period: "2024 – Present",
    type: "Full-time",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    icon: "🚀",
    color: "border-emerald-500",
    desc: "Building and scaling a consumer-facing platform from the ground up. Architected RESTful APIs, led frontend development with React, and integrated third-party services including payment gateways and real-time features.",
    points: [
      "Designed and implemented a full auth system (JWT, refresh tokens, role-based access)",
      "Reduced API response time by 40% through MongoDB indexing and query optimization",
      "Built real-time notifications using WebSockets and Socket.io",
      "Deployed and maintained services on AWS EC2 + S3 with automated CI/CD",
      "Collaborated directly with the founding team on product roadmap decisions",
    ],
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "AWS",
      "Socket.io",
      "Redis",
    ],
  },
  {
    role: "Junior Frontend Engineer",
    company: "SelectionO",
    period: "2023 – 2024",
    type: "Full-time",
    badge: "bg-violet-500/15 text-violet-400 border-violet-500/30",
    icon: "⚡",
    color: "border-violet-500",
    desc: "Joined as an early-stage hire at a recruitment-tech startup. Owned the candidate-facing frontend, turning Figma designs into responsive, accessible React components at startup speed.",
    points: [
      "Built 20+ reusable UI components adopted across the entire product",
      "Integrated job listing APIs and implemented real-time search with debouncing",
      "Improved Lighthouse performance score from 62 to 91 through code splitting and lazy loading",
      "Worked closely with designers and backend team in 2-week Agile sprints",
      "Implemented Google OAuth and email-based onboarding flow",
    ],
    stack: ["React", "JavaScript", "Tailwind CSS", "REST APIs", "Git", "Figma"],
  },
];

function Experience() {
  const [open, setOpen] = useState(0);

  return (
    <section id="experience" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeader eyebrow="Where I've Worked" title="Experience" />

        <div className="mt-12 space-y-6">
          {jobs.map((job, i) => (
            <div
              key={job.company}
              className={`bg-white/3 border border-white/8 rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer hover:border-white/20 ${
                open === i ? "shadow-xl shadow-black/30" : ""
              }`}
              onClick={() => setOpen(open === i ? -1 : i)}
            >
              <div className="p-6 flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div
                    className={`text-3xl p-3 rounded-xl bg-white/5 border-l-2 ${job.color}`}
                  >
                    {job.icon}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-white font-bold text-lg">
                        {job.role}
                      </h3>
                      <span
                        className={`text-xs border px-2 py-0.5 rounded-full font-medium ${job.badge}`}
                      >
                        {job.type}
                      </span>
                    </div>
                    <div className="text-emerald-400 font-semibold">
                      {job.company}
                    </div>
                    <div className="text-gray-500 text-sm mt-0.5 font-mono">
                      {job.period}
                    </div>
                  </div>
                </div>
                <div
                  className={`text-gray-400 text-xl transition-transform duration-300 ${open === i ? "rotate-45" : ""}`}
                >
                  +
                </div>
              </div>

              {open === i && (
                <div className="px-6 pb-6 border-t border-white/5 pt-4 space-y-4">
                  <p className="text-gray-400 leading-relaxed">{job.desc}</p>
                  <ul className="space-y-2">
                    {job.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm text-gray-400">
                        <span className="text-emerald-400 mt-0.5 shrink-0">
                          ▸
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {job.stack.map((t) => (
                      <span
                        key={t}
                        className="text-xs bg-white/5 border border-white/10 text-gray-300 px-3 py-1 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Projects ─────────────────────────────────────────────────────────────────
const projects = [
  {
    title: "DevConnect",
    tagline: "GitHub for teams — but smarter",
    desc: "A full-stack developer collaboration platform with real-time messaging, project boards, code snippet sharing, and GitHub integration. Built to solve the context-switching problem teams face.",
    image: "🧑‍🤝‍🧑",
    color: "from-cyan-500/20 to-blue-500/10",
    border: "hover:border-cyan-500/40",
    glow: "hover:shadow-cyan-500/10",
    stack: ["React", "Node.js", "MongoDB", "Socket.io", "JWT", "Tailwind"],
    links: { live: "#", github: "#" },
    featured: true,
    status: "Live",
  },
  {
    title: "ShopNest",
    tagline: "E-commerce, rebuilt from scratch",
    desc: "A production-ready e-commerce platform with cart management, Stripe payments, order tracking, admin dashboard, and inventory management. Handles 1000+ SKUs.",
    image: "🛍️",
    color: "from-emerald-500/20 to-teal-500/10",
    border: "hover:border-emerald-500/40",
    glow: "hover:shadow-emerald-500/10",
    stack: ["Next.js", "Express", "MongoDB", "Stripe", "Cloudinary", "Redux"],
    links: { live: "#", github: "#" },
    featured: true,
    status: "Live",
  },
  {
    title: "TaskFlow",
    tagline: "Trello meets Notion",
    desc: "A Kanban-style project management tool with drag-and-drop boards, team workspaces, real-time sync, and markdown-powered notes. Built for async-first teams.",
    image: "📋",
    color: "from-violet-500/20 to-purple-500/10",
    border: "hover:border-violet-500/40",
    glow: "hover:shadow-violet-500/10",
    stack: ["React", "Node.js", "PostgreSQL", "WebSockets", "React DnD"],
    links: { live: "#", github: "#" },
    featured: false,
    status: "Beta",
  },
  {
    title: "AuthForge",
    tagline: "Drop-in auth for any MERN app",
    desc: "An open-source authentication boilerplate with JWT + refresh tokens, Google OAuth, email verification, role-based access control, and rate limiting. 200+ GitHub stars.",
    image: "🔐",
    color: "from-pink-500/20 to-rose-500/10",
    border: "hover:border-pink-500/40",
    glow: "hover:shadow-pink-500/10",
    stack: ["Node.js", "Express", "MongoDB", "JWT", "Nodemailer"],
    links: { live: "#", github: "#" },
    featured: false,
    status: "Open Source ⭐ 200+",
  },
  {
    title: "PriceAlert",
    tagline: "Never miss a price drop",
    desc: "A web scraping + alerting SaaS where users track product prices from Amazon/Flipkart and get email/SMS notifications on drops. Built with cron jobs and queues.",
    image: "📉",
    color: "from-yellow-500/20 to-orange-500/10",
    border: "hover:border-yellow-500/40",
    glow: "hover:shadow-yellow-500/10",
    stack: ["React", "Node.js", "Puppeteer", "Redis", "Nodemailer", "MongoDB"],
    links: { live: "#", github: "#" },
    featured: false,
    status: "Live",
  },
  {
    title: "BlogEngine",
    tagline: "Markdown-first CMS",
    desc: "A headless CMS and blogging platform with rich markdown editor, image uploads via Cloudinary, SEO management, analytics dashboard, and RSS feed generation.",
    image: "✍️",
    color: "from-teal-500/20 to-cyan-500/10",
    border: "hover:border-teal-500/40",
    glow: "hover:shadow-teal-500/10",
    stack: ["Next.js", "MongoDB", "Cloudinary", "React Hook Form", "Next Auth"],
    links: { live: "#", github: "#" },
    featured: false,
    status: "Live",
  },
];

function Projects() {
  const [filter, setFilter] = useState("All");
  const filters = ["All", "Featured", "Open Source"];

  const visible = projects.filter((p) => {
    if (filter === "Featured") return p.featured;
    if (filter === "Open Source") return p.status.includes("Open Source");
    return true;
  });

  return (
    <section id="projects" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <SectionHeader eyebrow="What I've Built" title="Projects" />

        <div className="flex gap-2 mt-8 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 text-sm rounded-lg border transition-all duration-200 ${
                filter === f
                  ? "bg-emerald-500 border-emerald-500 text-black font-semibold"
                  : "border-white/10 text-gray-400 hover:border-emerald-500/40 hover:text-emerald-400"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visible.map((p) => (
            <div
              key={p.title}
              className={`relative group bg-white/3 border border-white/8 ${p.border} rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${p.glow} flex flex-col`}
            >
              {/* Top gradient band */}
              <div
                className={`h-28 bg-gradient-to-br ${p.color} flex items-center justify-center relative`}
              >
                <span className="text-5xl">{p.image}</span>
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  <span className="text-xs bg-black/40 backdrop-blur-sm text-white px-2 py-0.5 rounded-full border border-white/10">
                    {p.status}
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <div className="mb-3">
                  <h3 className="text-white font-bold text-lg">{p.title}</h3>
                  <p className="text-gray-500 text-xs font-mono mt-0.5">
                    {p.tagline}
                  </p>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed flex-1">
                  {p.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-4 mb-4">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="text-xs bg-white/5 text-gray-400 px-2 py-0.5 rounded border border-white/8"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-3 border-t border-white/5">
                  <a
                    href={p.links.live}
                    className="flex-1 text-center text-sm bg-white/5 hover:bg-emerald-500 hover:text-black text-gray-300 py-2 rounded-lg transition-all duration-200 font-medium"
                  >
                    Live Demo
                  </a>
                  <a
                    href={p.links.github}
                    className="flex-1 text-center text-sm bg-white/5 hover:bg-white/10 text-gray-300 py-2 rounded-lg transition-all duration-200 font-medium"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handle = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
    setForm({ name: "", email: "", message: "" });
  };
  const socialLinks = [
    { label: "GitHub", url: "https://github.com/viveklagshetti" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/vivek-lagshetti/" },
  ].filter((item) => item.url && item.url.trim() !== "");
  return (
    <section id="contact" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto">
        <SectionHeader eyebrow="Let's Talk" title="Get In Touch" />

        <div className="mt-12 grid md:grid-cols-5 gap-10">
          {/* Left info */}
          <div className="md:col-span-2 space-y-6">
            <p className="text-gray-400 leading-relaxed">
              I'm currently open to new opportunities — freelance, full-time, or
              co-founder conversations. If you have an interesting problem to
              solve, let's chat.
            </p>

            {[
              {
                icon: "📧",
                label: "Email",
                value: "lagshettivivek@gmail.com",
              },
              { icon: "💼", label: "LinkedIn", value: "/in/vivek-lagshetti/" },
              {
                icon: "🐙",
                label: "GitHub",
                value: "github.com/viveklagshetti",
              },
              {
                icon: "📍",
                label: "Location",
                value: "Solapur, India (Remote OK)",
              },
            ].map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <span className="text-lg">{icon}</span>
                <div>
                  <div className="text-xs text-gray-500 font-mono">{label}</div>
                  <div className="text-gray-300 text-sm">{value}</div>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <p className="text-gray-500 text-xs mb-3 font-mono">// Social</p>

              <div className="flex flex-wrap gap-3">
                {socialLinks.map(({ label, url }) => (
                  <a
                    key={label}
                    href={url.startsWith("http") ? url : `https://${url}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs border border-white/10 text-gray-400 hover:border-emerald-500/50 hover:text-emerald-400 px-3 py-2 rounded-lg transition-all"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handle} className="md:col-span-3 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {["name", "email"].map((field) => (
                <div key={field}>
                  <label className="block text-xs text-gray-500 font-mono mb-1.5 capitalize">
                    {field}
                  </label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={form[field]}
                    onChange={(e) =>
                      setForm({ ...form, [field]: e.target.value })
                    }
                    required
                    placeholder={
                      field === "name" ? "John Doe" : "john@example.com"
                    }
                    className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 text-white placeholder-gray-600 px-4 py-3 rounded-xl outline-none transition-all text-sm"
                  />
                </div>
              ))}
            </div>
            <div>
              <label className="block text-xs text-gray-500 font-mono mb-1.5">
                Message
              </label>
              <textarea
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                placeholder="Tell me about your project or opportunity..."
                className="w-full bg-white/5 border border-white/10 focus:border-emerald-500/50 text-white placeholder-gray-600 px-4 py-3 rounded-xl outline-none transition-all text-sm resize-none"
              />
            </div>
            <button
              type="submit"
              className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                sent
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/50"
                  : "bg-gradient-to-r from-emerald-500 to-emerald-400 text-black hover:opacity-90 hover:shadow-xl hover:shadow-emerald-500/30"
              }`}
            >
              {sent ? "✓ Message Sent!" : "Send Message →"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 px-6 text-center">
      <div className="text-gray-600 text-sm font-mono space-y-1">
        <div>
          <span className="text-emerald-400">const</span>{" "}
          <span className="text-violet-400">portfolio</span>{" "}
          <span className="text-gray-500">
            = built with ❤️ by Vivek Lagshetti
          </span>
        </div>
        <div className="text-gray-700 text-xs">
          © {new Date().getFullYear()} · All rights reserved
        </div>
      </div>
    </footer>
  );
}

// ─── Shared section header ─────────────────────────────────────────────────────
function SectionHeader({ eyebrow, title }) {
  return (
    <div className="text-center mb-4">
      <p className="text-emerald-400 font-mono text-sm mb-2">// {eyebrow}</p>
      <h2 className="text-4xl font-extrabold text-white">
        {title}
        <span className="text-emerald-400">.</span>
      </h2>
      <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-500 to-violet-500 mx-auto mt-4" />
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("About");

  useEffect(() => {
    const ids = ["about", "skills", "experience", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(
              e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1),
            );
          }
        });
      },
      { threshold: 0.4 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white font-sans relative overflow-x-hidden">
      {/* Ambient background blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed top-1/2 left-0 w-64 h-64 bg-pink-500/3 rounded-full blur-3xl pointer-events-none" />

      <Particles />
      <Navbar active={active} setActive={setActive} />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
