import Image from "next/image";
import portrait from "./portrait.jpg";
import {
  ArrowIcon,
  DocumentIcon,
  FacebookIcon,
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  SignalIcon,
} from "./icons";

type Role = {
  org: string;
  role: string;
  desc: string;
  date: string;
  href: string;
  delay: number;
};

const roles: Role[] = [
  {
    org: "Inspire Columbia",
    role: "Founder & CEO",
    desc: "A 501(c)(3) nonprofit that brings the Columbia community together through events that inspire, including the city’s first standard TEDx event in over a decade.",
    date: "2025—Present",
    href: "https://www.inspirecolumbia.org/",
    delay: 0,
  },
  {
    org: "Kappa Theta Pi",
    role: "President & Founding Member",
    desc: "USC’s professional technology fraternity. We pioneered a student nonprofit consulting program. I helped start the chapter and now lead it. ",
    date: "2023—Present",
    href: "https://www.ktpusc.com/",
    delay: 80,
  },
  {
    org: "TEDxCongaree Vista",
    role: "Co-Organizer & Event Manager",
    desc: "Brought a citywide TEDx event to Columbia, SC. Rented the region’s largest convention center, featured eight exhibitors, managed a 15-person crew, and welcomed 100+ guests.",
    date: "2025—2026",
    href: "https://tedxcongareevista.com",
    delay: 160,
  },
  {
    org: "LX Aer",
    role: "Chief Operating Officer",
    desc: "Led strategy, product, and operations at an early-stage EdTech startup, and managed development of the LX Classroom product suite.",
    date: "2023—2025",
    href: "https://edu.lxaer.com",
    delay: 240,
  },
];

export default function Home() {
  return (
    <main className="wrap">
      <div className="hero-glow" aria-hidden="true" />

      {/* ============ HERO ============ */}
      <section className="hero">
        <div className="hero-portrait" data-reveal data-delay="160">
          <figure className="portrait-frame">
            <Image
              src={portrait}
              alt="Luke Jannazzo"
              fill
              sizes="(min-width: 720px) 430px, 82vw"
              placeholder="blur"
              loading="eager"
              style={{ objectFit: "cover" }}
            />
          </figure>
        </div>

        <div className="hero-text">
          <div className="hero-eyebrow" data-reveal data-delay="0">
            <span className="eyebrow">Columbia, SC</span>
            <span className="dotsep" />
            <span className="eyebrow">New York Metro</span>
          </div>

          <h1 className="name reveal-name" data-delay="60">
            <span className="nl">
              <span>Luke</span>
            </span>
            <span className="nl">
              <span>Jannazzo</span>
            </span>
          </h1>
          <p className="tagline" data-reveal data-delay="230">
            Student, builder, and leader.
          </p>

          <p className="lead" data-reveal data-delay="310">
            I&apos;m a first-generation college student at the University of
            South Carolina Honors College, studying computer engineering with a minor in business.
          </p>
          <p className="lead" data-reveal data-delay="375">
            Most of what I do comes down to{" "}
            building teams and following through. I&apos;ve built a nonprofit,
            a student organization, and an EdTech startup company from the ground up. I like
            working across a lot of fronts, and aiming to leave each one a little
            better than I found it.
          </p>
          <p className="lead" data-reveal data-delay="440">
            If any of that overlaps with what you&apos;re working on, I&apos;d
            love to hear from you.
          </p>

          <div className="status" title="Currently" data-reveal data-delay="520">
            <span className="pulse" />
            <span>
              Currently — <b>Anti-Fraud Technology Intern</b> at SMBC Group
            </span>
          </div>

          <ul className="links">
            <li data-reveal data-delay="560">
              <a
                href="https://www.linkedin.com/in/lukejannazzo"
                target="_blank"
                rel="noopener"
              >
                <LinkedInIcon className="ic" />
                LinkedIn
              </a>
            </li>
            <li data-reveal data-delay="700">
              <a
                href="https://github.com/jannazzo"
                target="_blank"
                rel="noopener"
              >
                <GitHubIcon className="ic" />
                GitHub
              </a>
            </li>
            <li data-reveal data-delay="840">
              <a
                href="/Luke-Jannazzo-Resume.pdf"
                target="_blank"
                rel="noopener"
              >
                <DocumentIcon className="ic" />
                Resume
              </a>
            </li>
            <li data-reveal data-delay="980">
              <a href="mailto:luke@jannazzo.tech">
                <MailIcon className="ic" />
                Contact
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* ============ LEADERSHIP ============ */}
      <section className="section">
        <div className="section-head" data-reveal data-delay="0">
          <h2>Teams I&apos;ve helped build</h2>
        </div>

        <div className="ledger">
          {roles.map((r) => (
            <a
              key={r.org}
              className="row"
              href={r.href}
              target="_blank"
              rel="noopener"
              data-reveal
              data-delay={r.delay}
            >
              <div className="row-main">
                <div className="row-org">{r.org}</div>
                <div className="row-role">{r.role}</div>
                <p className="row-desc">{r.desc}</p>
              </div>
              <div className="row-meta">
                <span>{r.date}</span>
                <span className="row-arrow">
                  <ArrowIcon />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="footer">
        <div className="foot-grid" data-reveal data-delay="0">
          <div className="foot-col">
            <h3>Socials</h3>
            <ul className="foot-list">
              <li>
                <a
                  href="https://www.instagram.com/lukejannazzo"
                  target="_blank"
                  rel="noopener"
                >
                  <InstagramIcon className="ic" />
                  <span className="lbl">Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/lukejannazzo"
                  target="_blank"
                  rel="noopener"
                >
                  <FacebookIcon className="ic" />
                  <span className="lbl">Facebook</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="foot-col">
            <h3>Contact</h3>
            <ul className="foot-list">
              <li>
                <a href="mailto:luke@jannazzo.tech">
                  <MailIcon className="ic" />
                  <span className="lbl">luke@jannazzo.tech</span>
                </a>
              </li>
              <li>
                <a
                  href="https://signal.me/#u/jannazzo.01"
                  target="_blank"
                  rel="noopener"
                >
                  <SignalIcon className="ic" />
                  <span className="lbl">Signal · @jannazzo.01</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="foot-note" data-reveal data-delay="80">
          <span>© 2026 Luke Jannazzo</span>
        </div>
      </footer>
    </main>
  );
}
