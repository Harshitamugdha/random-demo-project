import Image from "next/image";
import StarField from "./components/StarField";

const NAME = "Harshita Mugdha";
const EMAIL = "harshitamugdha@gmail.com";
const GITHUB = "https://github.com/Harshitamugdha";

const featured = {
  title: "NAAP (UDGAM)",
  blurb:
    "Satellite forensics that traces an oil spill back to the ship that caused it. Built for Smart India Hackathon 2026 (PS 26143).",
  points: [
    "Detects oil slicks in Sentinel-1 radar imagery",
    "Runs ocean and wind physics backwards to find where the oil entered the water",
    "Ranks nearby vessels and infrastructure as likely sources",
  ],
  tags: ["Python", "Node.js", "Satellite data", "Deep learning"],
  img: "/projects/naap-trace.png",
  href: "https://github.com/AkshatTm/Udgam-SIH-PS143",
};

const projects = [
  {
    title: "Medication Demand Disease Forecasting",
    blurb: "Spots possible disease outbreaks early by tracking spikes in pharmacy medicine sales, with alerts and a live heatmap dashboard.",
    tags: ["Python", "Flask", "pandas", "SQLite"],
    img: "https://picsum.photos/seed/orbit-pharmacy-data/1200/750",
    href: `${GITHUB}/Real-Time-Medication-Demand-Based-Disease-Forecasting-System`,
  },
  {
    title: "Symptom Checker",
    blurb: "A triage web app where users enter symptoms and get guidance, backed by an Express API and MongoDB.",
    tags: ["Node.js", "Express", "MongoDB", "Tailwind"],
    img: "https://picsum.photos/seed/orbit-health-check/1200/750",
    href: "https://github.com/anushkaa2205/symptom-checker",
  },
  {
    title: "Outbreak Prediction Prototype",
    blurb: "The first prototype of the forecasting idea: simulated sales data, trend analytics and a Flask dashboard.",
    tags: ["Python", "Flask"],
    img: "https://picsum.photos/seed/orbit-city-lights/1200/750",
    href: `${GITHUB}/Real-time-medication-based-outbreak-prediction-system-prototype`,
  },
  {
    title: "CSE205 DSA in C++",
    blurb: "My data structures and algorithms practice in C++, with a DSA sheet and time complexity notes.",
    tags: ["C++", "DSA"],
    img: "https://picsum.photos/seed/orbit-code-screen/1200/750",
    href: `${GITHUB}/CSE205`,
  },
];

const stack = [
  "Python",
  "Flask",
  "pandas",
  "SQLite",
  "Node.js",
  "Express",
  "MongoDB",
  "C++",
  "JavaScript",
  "React",
  "Next.js",
  "Tailwind CSS",
  "Git",
];

export default function Home() {
  return (
    <>
      <StarField />

      <header className="sticky top-0 z-20 border-b border-white/5 bg-background/40 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
          <a href="#" className="font-semibold tracking-tight">
            {NAME}
          </a>
          <div className="flex items-center gap-6 text-sm text-muted">
            <a href="#work" className="transition-colors hover:text-foreground">Work</a>
            <a href="#about" className="transition-colors hover:text-foreground">About</a>
            <a
              href="#contact"
              className="rounded-full border border-white/15 px-4 py-1.5 text-foreground transition hover:border-accent hover:text-accent active:scale-[0.98]"
            >
              Say hello
            </a>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero: copy on the left, the galaxy core fills the right. */}
        <section className="mx-auto flex min-h-[calc(100dvh-4rem)] max-w-6xl items-center px-4 md:px-8">
          <div className="max-w-xl">
            <p className="rise font-mono text-xs uppercase tracking-[0.2em] text-accent" style={{ "--i": 0 } as React.CSSProperties}>
              CS student and developer
            </p>
            <h1
              className="rise mt-5 text-5xl font-semibold leading-[1.05] tracking-tighter md:text-7xl"
              style={{ "--i": 1 } as React.CSSProperties}
            >
              I turn data into <span className="italic text-accent">useful</span> tools.
            </h1>
            <p
              className="rise mt-6 max-w-[42ch] text-lg leading-relaxed text-muted"
              style={{ "--i": 2 } as React.CSSProperties}
            >
              From oil-spill forensics to outbreak forecasting, built with Python and the web. Move your cursor, the stars notice.
            </p>
            <div className="rise mt-9 flex flex-wrap gap-3" style={{ "--i": 3 } as React.CSSProperties}>
              <a
                href="#work"
                className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-background transition hover:brightness-110 active:scale-[0.98]"
              >
                See projects
              </a>
              <a
                href="#contact"
                className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium backdrop-blur transition hover:border-white/30 active:scale-[0.98]"
              >
                Say hello
              </a>
            </div>
          </div>
        </section>

        {/* Work: one featured project, then an offset 2x2 grid. */}
        <section id="work" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 md:px-8">
          <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">Selected projects</h2>

          <a
            href={featured.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-12 grid grid-cols-1 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition hover:border-accent/40 md:grid-cols-[1.5fr_1fr]"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden md:aspect-auto md:min-h-[360px]">
              <Image
                src={featured.img}
                alt="NAAP trace screen showing the estimated origin of an oil slick off Jacksonville"
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover object-left-top transition duration-700 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex flex-col justify-center p-6 md:p-10">
              <h3 className="text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                {featured.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{featured.blurb}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {featured.points.map((pt) => (
                  <li key={pt} className="border-l border-accent/50 pl-3 text-foreground/85">
                    {pt}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2">
                {featured.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-muted">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </a>

          <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-5">
            {projects.map((p, i) => (
              <a
                key={p.title}
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm transition hover:border-accent/40 ${
                  i === 0 || i === 3 ? "md:col-span-3" : "md:col-span-2"
                }`}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden">
                  <Image
                    src={p.img}
                    alt={`${p.title} preview`}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-medium transition-colors group-hover:text-accent">{p.title}</h3>
                  <p className="mt-2 max-w-[50ch] text-sm leading-relaxed text-muted">{p.blurb}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-white/10 px-3 py-1 font-mono text-xs text-muted">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* About: short text with a portrait, offset layout. */}
        <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 md:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_1.4fr]">
            <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10">
              <Image
                src="https://picsum.photos/seed/orbit-portrait-telescope/800/1000"
                alt="Portrait"
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">About me</h2>
              <p className="mt-6 max-w-[60ch] text-lg leading-relaxed text-muted">
                I am Harshita, a computer science student who enjoys building data-driven projects
                with Python and Flask. Right now I am learning Next.js and deploying to Vercel.
              </p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {stack.map((s) => (
                  <li
                    key={s}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm transition hover:border-accent/60 hover:text-accent"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Contact: one big centered call. */}
        <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-32 text-center md:px-8">
          <h2 className="text-4xl font-semibold tracking-tighter md:text-6xl">Have an idea? Let&apos;s build it.</h2>
          <p className="mx-auto mt-5 max-w-md text-muted">I reply to every message, usually within a day.</p>
          <a
            href={`mailto:${EMAIL}`}
            className="mt-10 inline-block rounded-full bg-accent px-8 py-4 font-medium text-background transition hover:brightness-110 active:scale-[0.98]"
          >
            Say hello
          </a>
        </section>
      </main>

      <footer className="border-t border-white/5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-muted md:flex-row md:px-8">
          <p>&copy; 2026 {NAME}</p>
          <div className="flex gap-6">
            <a href={GITHUB} className="hover:text-foreground">GitHub</a>
            <a href={`mailto:${EMAIL}`} className="hover:text-foreground">Email</a>
          </div>
        </div>
      </footer>
    </>
  );
}
