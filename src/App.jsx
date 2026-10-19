import { useEffect, useRef, useState } from "react";
import { profile, checks, experience, skills, education, certifications } from "./data.js";

function TestRun() {
  const [done, setDone] = useState(0);
  const [run, setRun] = useState(0);
  const timer = useRef();

  useEffect(() => {
    setDone(0);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setDone(checks.length); return; }
    let n = 0;
    timer.current = setInterval(() => {
      n += 1;
      setDone(n);
      if (n >= checks.length) clearInterval(timer.current);
    }, 550);
    return () => clearInterval(timer.current);
  }, [run]);

  const finished = done >= checks.length;
  return (
    <div className="run" aria-live="polite">
      <div className="run-head">
        <span>suite: alwin.profile</span>
        <button className="btn small" onClick={() => setRun((r) => r + 1)}>Run again</button>
      </div>
      <ul>
        {checks.map((c, i) => (
          <li key={c} className={i < done ? "pass" : i === done ? "running" : "queued"}>
            <span className="badge">{i < done ? "PASS" : i === done ? "RUN" : "WAIT"}</span>
            {c}
          </li>
        ))}
      </ul>
      <div className="run-foot">
        {finished ? `${checks.length} passed, 0 failed` : `${done} of ${checks.length} done`}
      </div>
    </div>
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
        <section className="hero wrap">
          <div>
            <h1>{profile.name}</h1>
            <p className="role">{profile.role}</p>
            <p className="lead">{profile.about}</p>
            <div className="actions">
              <a className="btn" href={profile.resume} download>Download resume</a>
              <a className="btn ghost" href="#contact">Contact me</a>
            </div>
          </div>
          <TestRun />
        </section>

        <section id="about" className="wrap sec">
          <h2>About</h2>
          <p className="body">
            Based in {profile.location}. I’m a QA Tester at JIITAK with hands-on experience in UI, functional, and API testing. I have experience in test case design, bug reporting, and retesting using ServiceNow, along with automation testing using Selenium and Java. I’m passionate about improving software quality, learning new technologies, and delivering reliable user experiences.
          </p>
        </section>

        <section id="experience" className="wrap sec">
          <h2>Experience</h2>
          {experience.map((e) => (
            <article className="item" key={e.title}>
              <div className="item-head">
                <h3>{e.title}</h3>
                <span className="period">{e.period}</span>
              </div>
              <p className="muted">{e.company}</p>
              <ul className="plain">
                {e.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </article>
          ))}
        </section>

        <section id="skills" className="wrap sec">
          <h2>Skills</h2>
          <div className="skills">
            {skills.map((s) => (
              <div key={s.group}>
                <h3>{s.group}</h3>
                <div className="chips">
                  {s.items.map((i) => <span className="chip" key={i}>{i}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="wrap sec">
          <h2>Education</h2>
          {education.map((e) => (
            <article className="item" key={e.title}>
              <div className="item-head">
                <h3>{e.title}</h3>
                <span className="period">{e.period}</span>
              </div>
              <p className="muted">{e.place}</p>
              <p>{e.note}</p>
            </article>
          ))}
          <h3 className="sub">Certifications</h3>
          <ul className="plain">
            {certifications.map((c) => <li key={c}>{c}</li>)}
          </ul>
        </section>

        <section id="contact" className="wrap sec">
          <h2>Contact</h2>
          <p className="body">Open to Software QA roles. The quickest way to reach me is email or phone.</p>
          <div className="actions">
            <a className="btn" href={`mailto:${profile.email}`}>{profile.email}</a>
            <a className="btn ghost" href={`tel:${profile.phone.replace(/\s/g, "")}`}>{profile.phone}</a>
            <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </section>
      </main>

      <footer className="foot wrap">&copy; {new Date().getFullYear()} {profile.name}</footer>
    </>
  );
}
