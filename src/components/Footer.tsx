import {
  Github as GithubIcon,
  Linkedin as LinkedinIcon,
  Mail as MailIcon,
} from "lucide-react";
import { siteConfig } from "@/lib/site";

const footerLinks = [
  {
    label: "LinkedIn",
    href: siteConfig.linkedinUrl,
    icon: LinkedinIcon,
  },
  {
    label: "GitHub",
    href: siteConfig.githubUrl,
    icon: GithubIcon,
  },
  {
    label: "Mail",
    href: `mailto:${siteConfig.contactEmail}`,
    icon: MailIcon,
  },
  {
    label: "WhatsApp",
    href: `https://wa.me/${siteConfig.whatsappNumber}`,
    icon: "whatsapp",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        <div className="max-w-2xl">
          <p className="text-2xl font-medium tracking-[-0.03em] text-white sm:text-3xl">
            Built for ambitious brands and modern digital products.
          </p>
          <p className="mt-2 text-sm uppercase tracking-[0.24em] text-white/45">
            {siteConfig.role}
          </p>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/60">
            I help founders and teams shape clean digital experiences with strong visual direction,
            dependable execution, and product decisions that hold up as the business grows.
          </p>
        </div>

        <div className="flex w-fit flex-col items-start gap-4 lg:items-end">
          {footerLinks.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={label}
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/85 transition-colors hover:border-white hover:bg-white hover:text-black"
            >
              {icon === "whatsapp" ? (
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-5 w-5 fill-current"
                >
                  <path d="M19.05 4.91A9.82 9.82 0 0 0 12.03 2C6.54 2 2.07 6.46 2.06 11.95c0 1.76.46 3.48 1.33 5L2 22l5.19-1.36a9.93 9.93 0 0 0 4.83 1.23h.01c5.49 0 9.96-4.46 9.97-9.95a9.86 9.86 0 0 0-2.95-7.01Zm-7.02 15.28h-.01a8.3 8.3 0 0 1-4.22-1.15l-.3-.18-3.08.81.82-3-.2-.31a8.27 8.27 0 0 1-1.27-4.4c0-4.57 3.72-8.29 8.3-8.29 2.21 0 4.29.86 5.86 2.43a8.23 8.23 0 0 1 2.44 5.86c0 4.58-3.72 8.3-8.29 8.3Zm4.55-6.2c-.25-.12-1.47-.72-1.7-.8-.23-.08-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.28.19-.53.06a6.77 6.77 0 0 1-1.99-1.23 7.45 7.45 0 0 1-1.38-1.72c-.14-.25-.02-.38.1-.5.11-.11.25-.28.37-.42.13-.14.17-.25.25-.41.08-.16.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.4-.42-.56-.43h-.48c-.16 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.21.88 2.39 1 2.56.12.16 1.71 2.61 4.14 3.66.58.25 1.04.41 1.39.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.14-1.18-.06-.1-.22-.16-.47-.29Z" />
                </svg>
              ) : (
                (() => {
                  const Icon = icon;
                  return <Icon className="h-5 w-5" />;
                })()
              )}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-6 py-5 text-xs uppercase tracking-[0.24em] text-white/40 sm:px-8 lg:px-10">
          © {currentYear} {siteConfig.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
