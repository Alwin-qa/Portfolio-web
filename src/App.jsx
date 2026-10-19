import { useEffect, useRef, useState } from "react";
import { profile, experience, skills, education, certifications } from "./data.js";

const steps = [
  { title: "Requirement analysis", text: "Read the requirements and find what needs testing." },
  { title: "Test cases and bug reports", text: "Write test cases, run them, and report defects clearly." },
  { title: "API testing", text: "Check endpoints using Postman or Swagger." },
  { title: "Regression testing", text: "Re-test after each bug fix to make sure nothing else broke." },
  { title: "Automation", text: "Write automation scripts using Selenium with Java." },
];

const roles = ["Software Test Engineer", "Manual Tester", "API Tester", "Automation Tester"];
const tickerItems = [...skills[0].items, ...skills[1].items];

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) { setShown(true); return; }
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setShown(true); io.disconnect(); } },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${shown ? "in" : ""} ${className}`} style={{ "--d": `${delay}ms` }}>
      {children}
    </div>
  );
}

function Typing({ words }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setText(words[0]); return; }
    const full = words[i];
    let delay = del ? 40 : 90;
    if (!del && text === full) delay = 1500;
    if (del && text === "") delay = 300;
    const t = setTimeout(() => {
      if (!del && text === full) setDel(true);
      else if (del && text === "") { setDel(false); setI((i + 1) % words.length); }
      else setText(del ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, del, i, words]);

  return (
    <span className="typed" aria-label={words[0]}>
      <span aria-hidden="true">{text}</span>
      <span className="caret" aria-hidden="true"></span>
    </span>
  );
}

function HowITest() {
  return (
    <aside className="flow">
      <h2 className="flow-title">How I test</h2>
      <ol>
        {steps.map((s, i) => (
          <li key={s.title} style={{ "--i": i }}>
            <span className="num">{i + 1}</span>
            <div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}

export default function App() {
  return (
    <>
      <header className="nav">
        <a href="#top" className="brand">{profile.name}</a>
        <nav>
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <span className="blob b1"></span>
          <span className="blob b2"></span>
          <div className="wrap hero-inner">
            <div className="hero-copy">
              <div className="identity">
                {profile.photo && (
                  <img
                    className="avatar"
                    src={profile.photo}
                    alt={`Photo of ${profile.name}`}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                )}
                <h1>{profile.name}</h1>
              </div>
              <p className="role"><Typing words={roles} /></p>
              <p className="lead">{profile.about}</p>
              <div className="actions">
                <a className="btn" href={profile.resume} download>Download resume</a>
                <a className="btn ghost" href="#contact">Contact me</a>
              </div>
            </div>
            <HowITest />
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[...tickerItems, ...tickerItems].map((t, i) => <span key={i}>{t}</span>)}
          </div>
        </div>

        <section id="about" className="band">
          <div className="wrap">
            <Reveal><h2>About</h2></Reveal>
            <div className="about-grid">
              <Reveal>
                <p className="body">
                  Based in {profile.location}. I started with a manual and automation testing course at AspireIT Academy,
                  then worked as a QA intern at Cydez Technologies and as an Embedded Systems Test Engineer at MRaD Enterprises.
                  I am looking for a Software QA role where I can keep growing and help ship reliable products.
                </p>
              </Reveal>
              <Reveal delay={120}>
                <dl className="facts card">
                  <dt>Location</dt><dd>{profile.location}</dd>
                  <dt>Email</dt><dd>{profile.email}</dd>
                  <dt>Phone</dt><dd>{profile.phone}</dd>
                  <dt>Status</dt><dd><span className="dot"></span> Open to Software QA roles</dd>
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="experience" className="band alt">
          <div className="wrap">
            <Reveal><h2>Experience</h2></Reveal>
            <div className="cards">
              {experience.map((e, i) => (
                <Reveal key={e.title} delay={i * 120}>
                  <article className="card">
                    <span className="period">{e.period}</span>
                    <h3>{e.title}</h3>
                    <p className="muted">{e.company}</p>
                    <ul className="plain">
                      {e.points.map((p) => <li key={p}>{p}</li>)}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="band">
          <div className="wrap">
            <Reveal><h2>Skills</h2></Reveal>
            <div className="cards">
              {skills.map((s, i) => (
                <Reveal key={s.group} delay={i * 120}>
                  <div className="card">
                    <h3>{s.group}</h3>
                    <div className="chips">
                      {s.items.map((it) => <span className="chip" key={it}>{it}</span>)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="band alt">
          <div className="wrap">
            <Reveal><h2>Education</h2></Reveal>
            <div className="cards">
              {education.map((e, i) => (
                <Reveal key={e.title} delay={i * 120}>
                  <article className="card">
                    <span className="period">{e.period}</span>
                    <h3>{e.title}</h3>
                    <p className="muted">{e.place}</p>
                    <p>{e.note}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <Reveal delay={150}>
              <h3 className="sub">Certifications</h3>
              <ul className="plain">
                {certifications.map((c) => <li key={c}>{c}</li>)}
              </ul>
            </Reveal>
          </div>
        </section>

        <section id="contact" className="band contact">
          <div className="wrap">
            <Reveal>
              <h2>Let's work together</h2>
              <p className="body">Open to Software QA roles. The quickest way to reach me is email or phone.</p>
              <div className="actions">
                <a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
                <a className="btn ghost" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
                <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="foot wrap">&copy; {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
