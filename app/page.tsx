"use client";

import { FormEvent, useState } from "react";

const services = [
  {
    number: "01",
    title: "Natural sod",
    copy: "Farm-grown turf, selected for your site and installed by the team that raised it.",
    image: "/motz/natural-turf.png",
  },
  {
    number: "02",
    title: "Synthetic turf",
    copy: "Low-maintenance, high-performance surfaces for backyards, pets, play and commercial spaces.",
    image: "/motz/synthetic-turf.png",
  },
  {
    number: "03",
    title: "Seeding",
    copy: "Thoughtful prep, the right seed blend and professional equipment for a lawn built to last.",
    image: "/motz/seeding.png",
  },
];

export default function Home() {
  const [sent, setSent] = useState(false);

  function sendLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = `${form.get("firstName")} ${form.get("lastName")}`.trim();
    const subject = `New turf project inquiry from ${name}`;
    const body = [
      `Name: ${name}`,
      `Email: ${form.get("email")}`,
      `Phone: ${form.get("phone")}`,
      `Project address: ${form.get("address")}`,
      `Service: ${form.get("service")}`,
      `Timeline: ${form.get("timeline")}`,
      "",
      "Project details:",
      form.get("details"),
    ].join("\n");

    window.location.href = `mailto:info@motzfarm.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Motz Turf Farms home">
          <span>MOTZ</span>
          <small>TURF FARMS · CINCINNATI</small>
        </a>
        <nav aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#work">Our work</a>
          <a href="#story">Our story</a>
        </nav>
        <a className="header-cta" href="#quote">Request a quote <span>↗</span></a>
      </header>

      <section className="hero" id="top">
        <video
          className="hero-media"
          autoPlay
          muted
          loop
          playsInline
          poster="/motz/hero.jpg"
          aria-label="Motz Turf Farms project film"
        >
          <source src="/motz/hero-film.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">The trusted name in turf · Since 1960</p>
          <h1>Great lawns<br />start here.</h1>
          <p className="hero-copy">Grown here. Installed right. Natural sod, synthetic turf and seeding for Greater Cincinnati.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#quote">Tell us about your project <span>↗</span></a>
            <a className="text-link light" href="#work">See our work <span>↓</span></a>
          </div>
        </div>
        <div className="film-note"><span className="pulse" /> Motz in motion · campaign film</div>
        <div className="hero-index">01 / 06</div>
      </section>

      <section className="marquee" aria-label="Motz services">
        <div>FARM GROWN <i>✦</i> PROFESSIONALLY INSTALLED <i>✦</i> CINCINNATI PROUD <i>✦</i> FAMILY OWNED</div>
      </section>

      <section className="intro section-pad" id="story">
        <div className="section-number">02 — ROOTED HERE</div>
        <div className="intro-copy">
          <p className="eyebrow">One family. Three generations. Six decades.</p>
          <h2>We don’t just install turf. <em>We stand behind it.</em></h2>
          <div className="intro-bottom">
            <p>Motz Turf Farms has helped Cincinnati grow greener for more than 60 years. Our turf is cultivated in rich river soil, our recommendations come from experience, and our name goes on every job.</p>
            <a className="round-link" href="#quote" aria-label="Start a project">Start<br />a project <span>↗</span></a>
          </div>
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-head section-pad">
          <div className="section-number">03 — WHAT WE DO</div>
          <h2>One source.<br />Every kind of green.</h2>
          <p>From the first soil test to the final roll, we make the process clear, practical and built around your property.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <article className="service-card" key={service.title}>
              <img src={service.image} alt={`${service.title} project by Motz Turf Farms`} />
              <div className="service-overlay" />
              <span className="service-number">/ {service.number}</span>
              <div className="service-copy">
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <span className="card-arrow">↗</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="work section-pad" id="work">
        <div className="work-head">
          <div>
            <div className="section-number">04 — SELECTED WORK</div>
            <h2>Green spaces,<br /><em>done right.</em></h2>
          </div>
          <p>Backyards, schools, sports complexes, restaurants, offices and everything in between.</p>
        </div>
        <div className="project-feature">
          <img src="/motz/hero.jpg" alt="Large courtyard turf installation completed by Motz Turf Farms" />
          <div className="project-caption">
            <div><span>COMMERCIAL · SYNTHETIC</span><h3>Built for everyday use.</h3></div>
            <p>Durable turf, precise details and a finish that transforms the space from day one.</p>
          </div>
        </div>
      </section>

      <section className="numbers">
        <div className="number-card"><span>01 · EXPERIENCE</span><strong>60+</strong><p>years serving Greater Cincinnati</p></div>
        <div className="number-card"><span>02 · LOCAL</span><strong>3</strong><p>generations of family ownership</p></div>
        <div className="number-card"><span>03 · PROMISE</span><strong>1</strong><p>team from consultation to installation</p></div>
      </section>

      <section className="testimonial section-pad">
        <p className="eyebrow light">What Cincinnati says</p>
        <blockquote>“Quick response, great pricing, and the job was completed amazingly fast. All of the work looks great.”</blockquote>
        <div className="quote-meta"><span>★★★★★</span><p>JOHN C. · GREATER CINCINNATI</p></div>
      </section>

      <section className="quote-section" id="quote">
        <div className="quote-intro">
          <div className="section-number light">05 — LET’S TALK TURF</div>
          <h2>Your new lawn<br />starts with a<br /><em>conversation.</em></h2>
          <p>Tell us a little about the space. A member of our Cincinnati team will follow up to talk through options and next steps.</p>
          <div className="contact-details">
            <a href="tel:+15132314844">513 231 4844</a>
            <a href="mailto:info@motzfarm.com">info@motzfarm.com</a>
            <span>6280 Clough Pike · Cincinnati, OH</span>
          </div>
        </div>
        <form className="lead-form" onSubmit={sendLead}>
          <div className="form-row">
            <label>First name<input required name="firstName" autoComplete="given-name" placeholder="Jane" /></label>
            <label>Last name<input required name="lastName" autoComplete="family-name" placeholder="Smith" /></label>
          </div>
          <div className="form-row">
            <label>Email<input required type="email" name="email" autoComplete="email" placeholder="jane@email.com" /></label>
            <label>Phone<input required type="tel" name="phone" autoComplete="tel" placeholder="(513) 555-0123" /></label>
          </div>
          <label>Project address<input required name="address" autoComplete="street-address" placeholder="Street, city and ZIP" /></label>
          <div className="form-row">
            <label>What can we help with?
              <select required name="service" defaultValue="">
                <option value="" disabled>Select a service</option>
                <option>Natural sod</option><option>Synthetic turf</option><option>Seeding</option><option>Not sure yet</option>
              </select>
            </label>
            <label>Ideal timing
              <select required name="timeline" defaultValue="">
                <option value="" disabled>Select timing</option>
                <option>As soon as possible</option><option>1–3 months</option><option>3–6 months</option><option>Just exploring</option>
              </select>
            </label>
          </div>
          <label>Tell us about the project<textarea required name="details" rows={4} placeholder="Approximate size, access, sun or shade, pets, drainage concerns—anything helpful." /></label>
          <label className="consent"><input required type="checkbox" /> <span>I agree that Motz Turf Farms may contact me about this project.</span></label>
          <button className="submit-button" type="submit">Send project details <span>↗</span></button>
          {sent && <p className="form-note" role="status">Your email app is ready with the project details. Send the message to finish your request.</p>}
          <p className="privacy-note">Your information is only used to respond to your request.</p>
        </form>
      </section>

      <footer>
        <div className="footer-mark">MOTZ</div>
        <div className="footer-grid">
          <div><p>THE TRUSTED NAME IN TURF</p><span>Family owned · Cincinnati grown</span></div>
          <div><p>VISIT</p><a href="https://maps.google.com/?q=6280+Clough+Pike+Cincinnati+OH+45244">6280 Clough Pike<br />Cincinnati, OH 45244</a></div>
          <div><p>CONTACT</p><a href="tel:+15132314844">513-231-4844</a><a href="mailto:info@motzfarm.com">info@motzfarm.com</a></div>
          <div><p>FOLLOW</p><a href="https://www.facebook.com/motzturffarms/">Facebook ↗</a><a href="#top">Back to top ↑</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Motz Turf Farms</span><span>Natural turf · Synthetic turf · Seeding</span></div>
      </footer>
    </main>
  );
}
