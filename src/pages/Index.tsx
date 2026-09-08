import { lazy, Suspense, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Cloud, ExternalLink, FileText, ShieldCheck, Volume2, VolumeX } from "lucide-react";
import defenseImage from "@/assets/defense.jpeg";
import Footer from "@/components/Footer";
import { siteConfig } from "@/lib/site";

// 3D background is non-critical — load it after the page paints.
const Scene3D = lazy(() => import("@/components/Scene3D"));

const navLinks = [
  { label: "About me", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#footer" },
];

const specialties = [
  "Creative Visual Design",
  "Brand Identity Systems",
  "User Interface & Experience",
  "Frontend Development",
];

const coreSkills = [
  "HTML5",
  "CSS",
  "JavaScript",
  "TypeScript",
  "SQL Queries",
  "Rust",
  "C++",
];

const frameworks = [
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "Tailwind CSS",
  "Vite",
  "Framer Motion",
  "Linux",
];

export default function Index() {
  const firstName = siteConfig.name.split(" ")[0] ?? siteConfig.name;
  const portfolioLabel = siteConfig.role.replace(/-/g, " ");
  const musicRef = useRef<HTMLAudioElement>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const toggleMusic = () => {
    const music = musicRef.current;
    if (!music) return;

    if (music.paused) {
      music.volume = 0.12;
      void music.play().then(() => setIsMusicPlaying(true)).catch(() => setIsMusicPlaying(false));
      return;
    }

    music.pause();
    setIsMusicPlaying(false);
  };

  return (
    <div className="relative min-h-screen text-zinc-950">
      <audio ref={musicRef} src="/background-music.mp3" loop preload="metadata" />
      <button
        type="button"
        onClick={toggleMusic}
        aria-pressed={isMusicPlaying}
        aria-label={isMusicPlaying ? "Pause background music" : "Play background music"}
        className="fixed bottom-5 right-5 z-30 inline-flex items-center gap-2 border border-white/20 bg-black/70 px-4 py-3 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md transition-transform hover:-translate-y-0.5 sm:bottom-7 sm:right-7"
      >
        {isMusicPlaying ? (
          <Volume2 className="h-4 w-4" aria-hidden="true" />
        ) : (
          <VolumeX className="h-4 w-4" aria-hidden="true" />
        )}
        {isMusicPlaying ? "Sound on" : "Play sound"}
      </button>
      <Suspense fallback={<div className="pointer-events-none fixed inset-0 -z-10 bg-black" />}>
        <Scene3D />
      </Suspense>
      <main>
        <section id="top" className="relative min-h-screen overflow-hidden bg-black">
          <img
            src={defenseImage}
            alt={siteConfig.name}
            className="absolute inset-0 h-full w-full object-cover object-center grayscale contrast-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/35 via-black/15 to-black/45" />
          <div className="pointer-events-none absolute inset-0 bg-black/25 mix-blend-multiply" />

          <div className="relative z-10 flex min-h-screen w-full flex-col">
            <header className="px-5 py-5 sm:px-8 sm:py-6">
              <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <a
                  href="#top"
                  className="inline-flex w-fit items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.28em] text-white/85"
                >
                  <span className="text-white">I'm {firstName}</span>
                  <span className="h-5 w-px bg-white/30" />
                </a>

                <nav className="flex flex-wrap items-center gap-4 text-[0.72rem] font-medium text-white/80 sm:gap-6">
                  {navLinks.map((link) => (
                    <a key={link.href} href={link.href} className="transition-opacity hover:opacity-60">
                      {link.label}
                    </a>
                  ))}
                </nav>

                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href="/Godwin-Okafor-Resume.docx"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-fit items-center gap-2 border border-white/25 bg-white/10 px-5 py-3 text-[0.72rem] font-medium text-white backdrop-blur-sm transition-transform hover:-translate-y-0.5"
                  >
                    <FileText className="h-3.5 w-3.5" aria-hidden="true" />
                    View résumé
                  </a>
                  <a
                    href="#footer"
                    className="inline-flex w-fit items-center border border-white/25 bg-black/60 px-5 py-3 text-[0.72rem] font-medium text-white backdrop-blur-sm transition-transform hover:-translate-y-0.5"
                  >
                    Get in touch
                  </a>
                </div>
              </div>
            </header>

            <div className="flex flex-1 items-end px-5 pb-8 sm:px-8 sm:pb-10">
              <motion.div
                className="w-full"
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              >
                <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.35em] text-white/50">
                  {siteConfig.location}
                </p>
                <h1 className="max-w-5xl text-4xl font-medium uppercase leading-none tracking-[-0.06em] text-white sm:text-6xl lg:text-[7rem]">
                  Full Stack Developer
                </h1>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="about" className="bg-[#f5f4f1]/80 px-5 py-10 text-black backdrop-blur-md sm:px-8 sm:py-12">
          <motion.div
            className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="space-y-8 text-[0.72rem] leading-6 text-black/60">
              <div className="max-w-sm">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/85">
                  {siteConfig.name}
                </p>
                <p>{portfolioLabel}</p>
                <p>{siteConfig.location}</p>
                <p className="mt-5 text-sm leading-7 text-black/70">{siteConfig.about.body}</p>
              </div>

              <div className="grid gap-1">
                {specialties.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <p className="mb-3 text-[0.68rem] font-medium uppercase tracking-[0.35em] text-black/45">
                  {siteConfig.hero.eyebrow}
                </p>

                <h2 className="max-w-3xl text-3xl font-medium leading-tight tracking-[-0.05em] text-black sm:text-5xl lg:text-[3.5rem]">
                  {siteConfig.hero.heading}
                </h2>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-black/72 sm:text-base">
                  {siteConfig.hero.body}
                </p>
              </div>

              <div id="contact" className="mt-8 flex flex-wrap gap-4">
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="inline-flex items-center bg-black px-5 py-3 text-sm font-medium text-white transition-transform duration-500 hover:-translate-y-0.5"
                >
                  Start a project
                </a>
              </div>
            </div>
          </motion.div>
        </section>

        <section id="projects" className="py-16">
          <motion.div
            className="mx-auto w-full max-w-6xl px-5 sm:px-8 lg:px-10"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-10 max-w-2xl text-white">
              <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.35em] text-white/45">
                Selected Work
              </p>
              <h2 className="text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                Projects built with product thinking and strong execution.
              </h2>
              <p className="mt-4 text-sm leading-7 text-white/65 sm:text-base">
                A few recent products and experiments across marketplaces, SaaS, and
                learning platforms.
              </p>
            </div>

            <div className="divide-y divide-white/10">
              {siteConfig.projects.map((project) => (
                <article
                  key={project.title}
                  className="grid gap-6 py-8 first:pt-0 last:pb-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-10"
                >
                  <div
                    className={`flex h-72 items-center justify-center overflow-hidden lg:h-80 ${
                      project.image
                        ? project.imageFit === "cover"
                          ? `${project.imageBg || "bg-white/5"} p-0`
                          : `${project.imageBg || "bg-white/5"} p-8`
                        : `bg-gradient-to-br ${project.color}`
                    }`}
                  >
                    {project.title === "TessaVault" ? (
                      <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#fb4b4d] via-[#d5222b] to-[#86121b] p-7 text-white sm:p-10">
                        <div className="absolute -right-16 -top-20 h-56 w-56 rounded-full border border-white/15" />
                        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-black/10 blur-2xl" />
                        <div className="relative flex h-full flex-col justify-between">
                          <div className="flex items-center justify-between text-[0.65rem] font-semibold uppercase tracking-[0.26em] text-white/75">
                            <span>TessaVault</span>
                            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <div className="flex items-end justify-between gap-5">
                            <div>
                              <div className="flex h-28 w-32 items-center justify-center rounded-3xl border border-white/25 bg-white/15 shadow-2xl backdrop-blur-sm sm:h-32 sm:w-36">
                                <Cloud className="h-16 w-16 stroke-[1.25]" aria-hidden="true" />
                              </div>
                              <p className="mt-4 text-xl font-medium tracking-[-0.04em]">Your backup, secured.</p>
                            </div>
                            <div className="w-20 space-y-2 pb-1">
                              <div className="h-2 rounded-full bg-white/90" />
                              <div className="h-2 rounded-full bg-white/50" />
                              <div className="h-2 rounded-full bg-white/25" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className={
                          project.imageFit === "cover"
                            ? "h-full w-full object-cover"
                            : "h-full w-full object-contain"
                        }
                        loading="lazy"
                      />
                    ) : (
                      <div className="text-lg font-medium tracking-[0.2em] text-white/70">
                        {project.title}
                      </div>
                    )}
                  </div>

                  <div className="lg:max-w-xl">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-white/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-2xl font-medium tracking-[-0.03em] text-white sm:text-[2rem]">
                          {project.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-sm leading-7 text-white/65">
                          {project.description}
                        </p>
                        {project.note ? (
                          <p className="mt-2 text-xs leading-6 text-white/45">{project.note}</p>
                        ) : null}
                      </div>

                      {project.demoUrl ? (
                        <a
                          href={project.demoUrl}
                          target={project.demoUrl.startsWith("http") ? "_blank" : undefined}
                          rel={project.demoUrl.startsWith("http") ? "noreferrer" : undefined}
                          className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-white/10 text-white transition-colors hover:text-white/70"
                          aria-label={`Open ${project.title}`}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </section>

        <section className="pb-16">
          <div className="bg-white/80 px-6 py-10 text-black backdrop-blur-md sm:px-8 sm:py-12">
            <motion.div
              className="mx-auto max-w-6xl"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="mb-3 text-[0.72rem] font-medium uppercase tracking-[0.35em] text-black/45">
                Experience & Skills
              </p>
              <h2 className="text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                Roles, tools, and technologies across the stack.
              </h2>

              <div className="mt-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-black/45">
                    Experience
                  </p>

                  <div className="mt-6 space-y-6">
                    {siteConfig.experiences.map((experience) => (
                      <article
                        key={`${experience.role}-${experience.company}`}
                        className="border-t border-black/10 pt-6 first:border-t-0 first:pt-0"
                      >
                        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                          <div>
                            <h3 className="text-xl font-medium text-black">{experience.role}</h3>
                            <p className="text-sm text-black/65">{experience.company}</p>
                          </div>
                          <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/45">
                            {experience.period}
                          </p>
                        </div>
                        <p className="mt-3 text-sm leading-7 text-black/70">
                          {experience.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-black/45">
                    Skills
                  </p>

                  <div className="mt-6">
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-black/45">
                      Languages
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {coreSkills.map((skill) => (
                        <span
                          key={skill}
                          className="bg-black/5 px-4 py-2 text-sm font-medium text-black"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8">
                    <p className="text-xs font-medium uppercase tracking-[0.25em] text-black/45">
                      Frameworks & Tools
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {frameworks.map((framework) => (
                        <span
                          key={framework}
                          className="px-4 py-2 text-sm font-medium text-black ring-1 ring-black/15"
                        >
                          {framework}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
