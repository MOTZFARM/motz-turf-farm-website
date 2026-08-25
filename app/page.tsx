"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const services = [
  {
    number: "01",
    title: "Natural sod",
    copy: "Farm-grown turf, selected for your site and installed by the team that raised it.",
    image: "/motz/gallery/sod/picture-2.webp",
    href: "#sod-gallery-title",
  },
  {
    number: "02",
    title: "Synthetic turf",
    copy: "Low-maintenance, high-performance surfaces for backyards, pets, play and commercial spaces.",
    image: "/motz/gallery/synthetic/20250916-140220.webp",
    href: "#synthetic-gallery-title",
  },
  {
    number: "03",
    title: "Firewood",
    copy: "Wholesale firewood and convenient local delivery for homes, businesses and seasonal inventory.",
    image: "/motz/firewood/firewood-delivery.webp",
    href: "#firewood",
  },
  {
    number: "04",
    title: "Seeding",
    copy: "Thoughtful prep, the right seed blend and professional equipment for a lawn built to last.",
    image: "/motz/seeding.png",
    href: "#seeding",
  },
  {
    number: "05",
    title: "Grading",
    copy: "Purposeful slopes, smoother lawns and better drainage—prepared for sod, seed or the next outdoor project.",
    image: "/motz/grading/residential-grading.jpg",
    href: "#grading",
  },
];

const historyPhotos = [
  { number: "02", tone: "monochrome", src: "/motz/history/working-the-sod-farm.webp", alt: "Early Motz crew members working with rolls of freshly harvested sod", caption: "Working the farm" },
  { number: "03", tone: "monochrome", src: "/motz/history/early-years-tractor.webp", alt: "Early Motz team member driving a John Deere tractor", caption: "The early years" },
  { number: "04", tone: "vintage-color", src: "/motz/history/motz-roadside-sign-vintage.png", alt: "Vintage Motz Turf Farms roadside sign overlooking the farm", caption: "The Motz name takes root" },
  { number: "05", tone: "vintage-color", src: "/motz/history/motz-crew-sod-vintage.png", alt: "Motz crew member holding sections of turf during an installation", caption: "Built by the work" },
  { number: "06", tone: "vintage-color", src: "/motz/history/kentucky-speedway-turf-vintage.png", alt: "Motz Turf Farms installing turf at Kentucky Speedway", caption: "Installing turf at Kentucky Speedway" },
  { number: "07", tone: "modern-color", src: "/motz/history/motz-sod-delivery-truck-modern.png", alt: "Motz Turf Farms flatbed truck loaded with large rolls of sod", caption: "Delivering turf at scale" },
  { number: "08", tone: "modern-color", src: "/motz/history/motz-big-roll-loader-modern.jpg", alt: "Motz team member transporting a large roll of sod at the farm", caption: "Moving every roll with care" },
  { number: "09", tone: "modern-color", src: "/motz/history/motz-field-tractor-modern.jpg", alt: "Motz tractor working across a cultivated turf field", caption: "Growing today’s turf" },
  { number: "10", tone: "modern-color", src: "/motz/history/motz-farm-sunset-modern.jpg", alt: "Motz tractor working the turf farm at sunset", caption: "The farm at work today" },
];

const communityPhotos = [
  { src: "/motz/community/farm-bureau-scholarships.webp", alt: "Community members celebrating Hamilton County Farm Bureau scholarship recipients", caption: "Supporting local students" },
  { src: "/motz/community/motz-community-event-booth.webp", alt: "University of Cincinnati Bearcat mascot visiting the Motz Turf Farms community event booth", caption: "Meeting our neighbors" },
  { src: "/motz/community/community-donation-day.webp", alt: "Volunteers unloading supplies during a community donation effort", caption: "A community effort" },
  { src: "/motz/community/community-volunteer-team.webp", alt: "Motz family and community volunteers gathered during a donation event", caption: "Neighbors helping neighbors" },
  { src: "/motz/community/supporting-local-families.jpg", alt: "Motz representative supporting the Light for Levi Foundation at a local golf outing", caption: "Supporting local families" },
  { src: "/motz/community/clough-valley-carriage-parade.webp", alt: "Clough Valley Carriages wagon by Motz Turf Farms in a community parade", caption: "Clough Valley Carriages" },
  { src: "/motz/community/illuminated-community-carriage.webp", alt: "Horse-drawn carriage illuminated for an evening community celebration", caption: "Celebrating together" },
  { src: "/motz/community/ama-ignite-community.webp", alt: "Motz team member holding an AMA Cincinnati Ignite sign encouraging others to go the extra mile", caption: "Going the extra mile" },
  { src: "/motz/community/horses-community-parade.webp", alt: "Pair of Motz horses pulling a carriage through a Cincinnati parade", caption: "Cincinnati traditions" },
];

type GalleryPhoto = {
  src: string;
  alt: string;
  category: "Synthetic turf" | "Natural sod";
  enhance?: boolean;
};

function ArrowUpRightIcon() {
  return (
    <svg className="link-arrow" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 15 15 5M8 5h7v7" />
    </svg>
  );
}

const syntheticPhotos: GalleryPhoto[] = [
  { src: "/motz/gallery/synthetic/20250916-075250.webp", alt: "Urban rooftop synthetic lawn overlooking the riverfront", category: "Synthetic turf" },
  { src: "/motz/gallery/synthetic/20250916-140220.webp", alt: "Backyard putting green behind a modern home", category: "Synthetic turf" },
  { src: "/motz/gallery/synthetic/20250916-140225.webp", alt: "Residential synthetic putting green and lawn", category: "Synthetic turf" },
  { src: "/motz/gallery/synthetic/20260310-132745.webp", alt: "Compact synthetic turf courtyard with overhead lights", category: "Synthetic turf" },
  { src: "/motz/gallery/synthetic/20260501-125413.webp", alt: "Pool patio with geometric synthetic turf strips", category: "Synthetic turf" },
  { src: "/motz/gallery/synthetic/20260605-114328.webp", alt: "Contoured poolside synthetic putting green", category: "Synthetic turf" },
  { src: "/motz/gallery/synthetic/20260722-115540.webp", alt: "Backyard synthetic putting green beside a swimming pool", category: "Synthetic turf" },
  { src: "/motz/gallery/synthetic/1000006495.webp", alt: "Commercial synthetic turf lawn beside an industrial building", category: "Synthetic turf" },
  { src: "/motz/gallery/synthetic/1000009531.webp", alt: "Landscaped residential synthetic putting green", category: "Synthetic turf" },
  { src: "/motz/gallery/synthetic/1000010135.webp", alt: "Narrow synthetic putting lane along a retaining wall", category: "Synthetic turf" },
  { src: "/motz/gallery/synthetic/1000010820.webp", alt: "Poolside synthetic putting green and turf surround", category: "Synthetic turf" },
  { src: "/motz/gallery/synthetic/1000010828.webp", alt: "Square patio pavers with synthetic turf joints", category: "Synthetic turf" },
  { src: "/motz/gallery/synthetic/1000015352.webp", alt: "Private synthetic putting green illuminated at night", category: "Synthetic turf" },
  { src: "/motz/gallery/synthetic/img-20260619-164322-2.webp", alt: "Geometric patio pavers framed by synthetic turf", category: "Synthetic turf" },
];

const sodPhotos: GalleryPhoto[] = [
  { src: "/motz/gallery/sod/motz-image-2.webp", alt: "Finished natural sod lawn at a Cincinnati residence", category: "Natural sod" },
  { src: "/motz/gallery/sod/estate-lawn-front.webp", alt: "Expansive finished natural lawn at a Cincinnati estate", category: "Natural sod", enhance: true },
  { src: "/motz/gallery/sod/img-6206.webp", alt: "Newly sodded front lawn at a newly built home", category: "Natural sod" },
  { src: "/motz/gallery/sod/estate-lawn-side.webp", alt: "Natural sod wrapping the side lawn of a Cincinnati estate", category: "Natural sod", enhance: true },
  { src: "/motz/gallery/sod/estate-lawn-rear.webp", alt: "Wide finished natural lawn behind a Cincinnati estate", category: "Natural sod", enhance: true },
  { src: "/motz/gallery/sod/playground-sod.webp", alt: "Finished natural sod lawn at a neighborhood playground", category: "Natural sod", enhance: true },
  { src: "/motz/gallery/sod/parking-median-sod.webp", alt: "Newly installed natural sod in a commercial parking median", category: "Natural sod", enhance: true },
  { src: "/motz/gallery/sod/img-6679.webp", alt: "Expansive natural lawn at a wooded estate", category: "Natural sod" },
  { src: "/motz/gallery/sod/img-6656.webp", alt: "Striped commercial sod lawn surrounded by landscaped beds", category: "Natural sod" },
  { src: "/motz/gallery/sod/img-6617.webp", alt: "Natural sod lawn beside a pond and black metal fence", category: "Natural sod" },
  { src: "/motz/gallery/sod/img-6179.webp", alt: "New residential sod lawn being watered", category: "Natural sod" },
  { src: "/motz/gallery/sod/img-5891.webp", alt: "Large natural sod lawn under irrigation in autumn", category: "Natural sod" },
  { src: "/motz/gallery/sod/a73a9777.webp", alt: "Motz crew member moving a roll of natural sod", category: "Natural sod" },
  { src: "/motz/gallery/sod/a73a9779.webp", alt: "Sod delivery equipment carrying a fresh turf roll", category: "Natural sod" },
  { src: "/motz/gallery/sod/a73a9790.webp", alt: "Installer fitting natural sod along a curb", category: "Natural sod" },
  { src: "/motz/gallery/sod/a73a9803.webp", alt: "Commercial natural sod installation by the Motz crew", category: "Natural sod" },
  { src: "/motz/gallery/sod/a73a9813.webp", alt: "Motz Turf Farms truck at a commercial sod project", category: "Natural sod" },
  { src: "/motz/gallery/sod/a73a9818.webp", alt: "Sod installation machine carrying a large turf roll", category: "Natural sod" },
  { src: "/motz/gallery/sod/a73a9827.webp", alt: "Installer trimming natural sod beside a walkway", category: "Natural sod" },
  { src: "/motz/gallery/sod/a73a9832.webp", alt: "Crew unrolling natural sod beside a stone wall", category: "Natural sod" },
  { src: "/motz/gallery/sod/dji-0618.webp", alt: "Finished sod landscaping around a commercial building", category: "Natural sod" },
  { src: "/motz/gallery/sod/img-2182.webp", alt: "Finished natural lawn at a Cincinnati residence", category: "Natural sod" },
  { src: "/motz/gallery/sod/picture-1.webp", alt: "Curved front walkway bordered by a finished natural lawn", category: "Natural sod" },
  { src: "/motz/gallery/sod/picture-2.webp", alt: "Newly installed front lawn with fresh natural sod", category: "Natural sod" },
];

const allGalleryPhotos = [...syntheticPhotos, ...sodPhotos];

const googleReviews = [
  {
    name: "Francisco B.",
    text: "Our entire backyard was transformed with excellent work at a fair price.",
    detail: "BACKYARD TRANSFORMATION",
  },
  {
    name: "Taylor S.",
    text: "Great communication and a beautiful synthetic-turf backyard where grass simply would not grow.",
    detail: "SYNTHETIC TURF",
  },
  {
    name: "Jeffrey G.",
    text: "We highly recommend Motz for their experienced crews, quality work, synthetic turf and natural sod.",
    detail: "SYNTHETIC + NATURAL TURF",
  },
  {
    name: "Amy C.",
    text: "The sod installed in November came back green and beautiful the following spring.",
    detail: "NATURAL SOD",
  },
  {
    name: "Elizabeth F.",
    text: "Our small backyard project was prioritized, scheduled flexibly and handled with responsive communication.",
    detail: "BACKYARD SOD",
  },
];

export default function Home() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [formMessage, setFormMessage] = useState("");
  const [comparisonPosition, setComparisonPosition] = useState(50);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState<number | null>(null);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);
  const [reviewsPaused, setReviewsPaused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  const communityVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    // Keep the autoplay requirements explicit for mobile Safari. The source is
    // present in the initial markup so loading begins before React hydrates.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    function playHeroVideo() {
      if (document.visibilityState === "visible") {
        void video?.play().catch(() => undefined);
      }
    }

    function unlockPlayback() {
      playHeroVideo();
      window.removeEventListener("touchstart", unlockPlayback);
      window.removeEventListener("pointerdown", unlockPlayback);
      window.removeEventListener("keydown", unlockPlayback);
    }

    playHeroVideo();
    video.addEventListener("loadedmetadata", playHeroVideo);
    video.addEventListener("canplay", playHeroVideo);
    window.addEventListener("pageshow", playHeroVideo);
    document.addEventListener("visibilitychange", playHeroVideo);
    window.addEventListener("touchstart", unlockPlayback, { passive: true });
    window.addEventListener("pointerdown", unlockPlayback, { passive: true });
    window.addEventListener("keydown", unlockPlayback);

    return () => {
      video.removeEventListener("loadedmetadata", playHeroVideo);
      video.removeEventListener("canplay", playHeroVideo);
      window.removeEventListener("pageshow", playHeroVideo);
      document.removeEventListener("visibilitychange", playHeroVideo);
      window.removeEventListener("touchstart", unlockPlayback);
      window.removeEventListener("pointerdown", unlockPlayback);
      window.removeEventListener("keydown", unlockPlayback);
    };
  }, []);

  useEffect(() => {
    const video = communityVideoRef.current;
    if (!video) return;

    let started = false;

    function playWhenReached() {
      if (started || !video) return;

      if (video.getBoundingClientRect().top <= window.innerHeight * 0.82) {
        started = true;
        void video.play().catch(() => undefined);
        window.removeEventListener("scroll", playWhenReached);
        window.removeEventListener("resize", playWhenReached);
      }
    }

    playWhenReached();
    window.addEventListener("scroll", playWhenReached, { passive: true });
    window.addEventListener("resize", playWhenReached);

    return () => {
      window.removeEventListener("scroll", playWhenReached);
      window.removeEventListener("resize", playWhenReached);
    };
  }, []);

  useEffect(() => {
    if (activeGalleryIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleLightboxKey(event: KeyboardEvent) {
      if (event.key === "Escape") setActiveGalleryIndex(null);
      if (event.key === "ArrowRight") {
        setActiveGalleryIndex((index) => index === null ? 0 : (index + 1) % allGalleryPhotos.length);
      }
      if (event.key === "ArrowLeft") {
        setActiveGalleryIndex((index) => index === null ? 0 : (index - 1 + allGalleryPhotos.length) % allGalleryPhotos.length);
      }
    }

    window.addEventListener("keydown", handleLightboxKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleLightboxKey);
    };
  }, [activeGalleryIndex]);

  useEffect(() => {
    if (reviewsPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const reviewTimer = window.setInterval(() => {
      setActiveReviewIndex((index) => (index + 1) % googleReviews.length);
    }, 6500);

    return () => window.clearInterval(reviewTimer);
  }, [reviewsPaused]);

  useEffect(() => {
    function closeMobileMenu(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileMenuOpen(false);
    }

    function closeMenuOnDesktop() {
      if (window.innerWidth > 900) setMobileMenuOpen(false);
    }

    window.addEventListener("keydown", closeMobileMenu);
    window.addEventListener("resize", closeMenuOnDesktop);
    return () => {
      window.removeEventListener("keydown", closeMobileMenu);
      window.removeEventListener("resize", closeMenuOnDesktop);
    };
  }, []);

  function updateComparisonFromPointer(clientX: number, element: HTMLElement) {
    const bounds = element.getBoundingClientRect();
    const position = ((clientX - bounds.left) / bounds.width) * 100;
    setComparisonPosition(Math.min(100, Math.max(0, position)));
  }

  const activePhoto = activeGalleryIndex === null ? null : allGalleryPhotos[activeGalleryIndex];

  async function sendLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload = Object.fromEntries(form.entries());

    setFormStatus("submitting");
    setFormMessage("");

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "We could not send your request. Please try again.");
      }

      const analyticsWindow = window as typeof window & {
        gtag?: (command: "event", eventName: string, parameters?: Record<string, unknown>) => void;
      };
      analyticsWindow.gtag?.("event", "generate_lead", {
        form_name: "get_a_quote",
        service: typeof payload.service === "string" ? payload.service : "not_selected",
        project_size: typeof payload.projectSize === "string" ? payload.projectSize : "not_selected",
      });

      formElement.reset();
      setFormStatus("success");
      setFormMessage("Thank you — your request was sent. We also emailed you a confirmation.");
    } catch (error) {
      setFormStatus("error");
      setFormMessage(error instanceof Error ? error.message : "We could not send your request. Please call 513-231-4844.");
    }
  }

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Motz Turf Farms home">
          <img src="/motz/motz-avi-logo.png" alt="" />
        </a>
        <nav aria-label="Main navigation">
          <a href="#services">Services</a>
          <a href="#work">Our work</a>
          <a href="#story">About</a>
          <a href="#community">Community</a>
        </nav>
        <div className="header-actions">
          <button
            className={`mobile-menu-toggle${mobileMenuOpen ? " open" : ""}`}
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <strong>Menu</strong>
          </button>
          <a className="header-phone" href="tel:+15132314844" aria-label="Call Motz Turf Farms at 513-231-4844">
            <span>Call us</span>
            <strong>513 231 4844</strong>
          </a>
          <a className="header-cta" href="#quote">Get a quote <span><ArrowUpRightIcon /></span></a>
        </div>
        <div className={`mobile-menu${mobileMenuOpen ? " open" : ""}`} id="mobile-navigation">
          <nav aria-label="Mobile navigation">
            <a href="#services" onClick={() => setMobileMenuOpen(false)}><span>01</span>Services</a>
            <a href="#work" onClick={() => setMobileMenuOpen(false)}><span>02</span>Our work</a>
            <a href="#story" onClick={() => setMobileMenuOpen(false)}><span>03</span>About</a>
            <a href="#community" onClick={() => setMobileMenuOpen(false)}><span>04</span>Community</a>
          </nav>
          <a className="mobile-menu-phone" href="tel:+15132314844" onClick={() => setMobileMenuOpen(false)}>
            <span>Call us</span>
            <strong>513 231 4844</strong>
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <video
          ref={heroVideoRef}
          className="hero-media"
          src="/motz/hero-film.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          aria-label="Motz Turf Farms project film"
        />
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow light">The trusted name in turf · Since the 1960s</p>
          <h1>Great lawns<br />start here.</h1>
          <p className="hero-copy">Grown Here. Installed Right. Natural Sod, Synthetic Turf, Seeding, Grading, and Firewood Delivery for Greater Cincinnati.</p>
          <div className="hero-actions">
            <a className="button button-light" href="#quote">Tell us about your project <span><ArrowUpRightIcon /></span></a>
            <a className="text-link light" href="#work">See our work <span>↓</span></a>
          </div>
        </div>
        <div className="film-note"><span className="pulse" /> Motz in motion · campaign film</div>
        <div className="hero-index">01 / 07</div>
      </section>

      <section className="marquee" aria-label="Motz services">
        <div>FARM GROWN <i>✦</i> PROFESSIONALLY INSTALLED <i>✦</i> FIREWOOD DELIVERED <i>✦</i> CINCINNATI PROUD <i>✦</i> FIELDS CULTIVATED <i>✦</i> SITES PREPARED</div>
      </section>

      <section className="intro section-pad" id="story">
        <div className="intro-aside">
          <div className="section-number">02 — ROOTED HERE</div>
          <figure className="intro-heritage-art" aria-hidden="true">
            <img src="/motz/history/motz-established-1969-heritage-white.webp" alt="" />
          </figure>
        </div>
        <div className="intro-copy">
          <p className="eyebrow">Built over generations, carried forward with purpose.</p>
          <h2>We don’t just install turf. <em>We stand behind it.</em></h2>
          <div className="intro-bottom">
            <p>Motz Turf Farms has helped Cincinnati grow greener for more than 60 years. Our turf is cultivated in rich river soil, our recommendations come from experience, and our name goes on every job.</p>
            <a className="round-link" href="#quote" aria-label="Start a project">Start<br />a project <span><ArrowUpRightIcon /></span></a>
          </div>
        </div>
        <div className="story-archive" aria-label="Motz Turf Farms business history">
          <div className="story-archive-intro">
            <span>THE STORY OF MOTZ</span>
            <p>From black-and-white beginnings through decades of growth and into the work of today, the Motz story is written in the fields, equipment and projects that built the name.</p>
          </div>
          <ol className="story-timeline" aria-label="Motz company history milestones">
            <li>
              <time dateTime="1969">1969</time>
              <div><strong>Where it began</strong><p>Motz Environmental Maintenance opens as a landscape maintenance and grounds care business.</p></div>
            </li>
            <li>
              <time dateTime="1979">1979</time>
              <div><strong>Growing the work</strong><p>Professional lawn care joins the company’s capabilities with the launch of Motz Lawn Care.</p></div>
            </li>
            <li>
              <time dateTime="1982">1982</time>
              <div><strong>Building the team</strong><p>Motz, Inc. is established, marking a new chapter of team growth and expanded service.</p></div>
            </li>
          </ol>
          <div className="story-photo-grid">
            {historyPhotos.map((photo, index) => (
              <figure className={`story-photo story-photo-${index + 1} story-photo-${photo.tone}`} key={photo.src}>
                <div className="story-photo-frame">
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </div>
                <figcaption><span>{photo.number}</span>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="community section-pad" id="community">
        <div className="community-head">
          <div>
            <p className="eyebrow">CINCINNATI · COMMUNITY</p>
            <h2>Rooted in the<br /><em>community.</em></h2>
          </div>
          <p>Motz has always believed that being a local business means showing up. We’re proud to take part in the traditions, gatherings and shared moments that make Cincinnati feel like home.</p>
        </div>
        <figure className="community-feature">
          <div className="community-video-wrap">
            <video
              ref={communityVideoRef}
              muted
              loop
              playsInline
              controls
              preload="metadata"
              aria-label="Motz horses pulling the original Kroger wagon in Cincinnati's 2026 Opening Day Parade"
            >
              <source src="/motz/community/opening-day-parade-2026.mov" />
            </video>
            <span className="community-play-note"><i /> PLAYS ON SCROLL</span>
          </div>
          <figcaption>
            <span>2026 · OPENING DAY PARADE</span>
            <h3>A Cincinnati tradition, carried forward.</h3>
            <p>Motz horses pull the original Kroger wagon through the 2026 Opening Day Parade.</p>
          </figcaption>
        </figure>
        <div className="community-gallery-intro">
          <span>SHOWING UP · YEAR AFTER YEAR</span>
          <p>From scholarships and volunteer days to neighborhood events and Cincinnati traditions, involvement has always meant participating alongside the people we serve.</p>
        </div>
        <div className="community-photo-grid">
          {communityPhotos.map((photo, index) => (
            <figure className={`community-photo community-photo-${index + 1}`} key={photo.src}>
              <img src={photo.src} alt={photo.alt} loading="lazy" />
              <figcaption><span>{String(index + 1).padStart(2, "0")}</span>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="services" id="services">
        <div className="section-head section-pad">
          <div className="section-number">03 — WHAT WE DO</div>
          <h2>One source.<br />Built for outdoors.</h2>
          <p>From shaping the ground to the final installation or delivery, we make the process clear, practical and built around your property.</p>
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <a className="service-card" href={service.href} key={service.title} aria-label={`Explore ${service.title}`}>
              <img src={service.image} alt={`${service.title} project by Motz Turf Farms`} />
              <div className="service-overlay" />
              <span className="service-number">/ {service.number}</span>
              <div className="service-copy">
                <h3>{service.title}</h3>
                <p>{service.copy}</p>
                <span className="card-arrow"><ArrowUpRightIcon /></span>
              </div>
            </a>
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
        <div className="comparison-block">
          <div className="comparison-copy">
            <span>RESIDENTIAL · SYNTHETIC</span>
            <h3>A backyard built for every member of the family.</h3>
            <p>Drag the handle to see how synthetic turf turned a worn, patchy lawn into a clean and dog-friendly outdoor space.</p>
            <small>SLIDE TO COMPARE ↔</small>
          </div>
          <figure
            className="comparison-stage"
            aria-label="Before and after backyard turf installation"
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              updateComparisonFromPointer(event.clientX, event.currentTarget);
            }}
            onPointerMove={(event) => {
              if (event.buttons === 1) {
                updateComparisonFromPointer(event.clientX, event.currentTarget);
              }
            }}
            onPointerUp={(event) => {
              if (event.currentTarget.hasPointerCapture(event.pointerId)) {
                event.currentTarget.releasePointerCapture(event.pointerId);
              }
            }}
          >
            <img src="/motz/gallery/backyard-dogs-before.jpg" alt="Patchy backyard lawn before the Motz Turf Farms installation" />
            <div
              className="comparison-after"
              style={{ clipPath: `inset(0 0 0 ${comparisonPosition}%)` }}
            >
              <img src="/motz/gallery/backyard-dogs-after.jpg" alt="Dog-friendly synthetic turf after the Motz Turf Farms installation" />
            </div>
            <span className="comparison-label before-label">Before</span>
            <span className="comparison-label after-label">After</span>
            <div className="comparison-divider" style={{ left: `${comparisonPosition}%` }} aria-hidden="true">
              <span className="comparison-handle">↔</span>
            </div>
            <input
              className="comparison-range"
              type="range"
              min="0"
              max="100"
              value={comparisonPosition}
              onInput={(event) => setComparisonPosition(Number(event.currentTarget.value))}
              aria-label="Reveal before or after photo"
              aria-valuetext={`${comparisonPosition}% before, ${100 - comparisonPosition}% after`}
            />
          </figure>
        </div>

        <div className="gallery-collection" id="gallery">
          <section className="gallery-section" aria-labelledby="synthetic-gallery-title">
            <div className="gallery-heading">
              <div>
                <span>01 · 14 PROJECT PHOTOS</span>
                <h3 id="synthetic-gallery-title">Synthetic turf</h3>
              </div>
              <p>Putting greens, pool surrounds, patios and low-maintenance lawns designed for year-round use.</p>
            </div>
            <div className="gallery-grid">
              {syntheticPhotos.map((photo, index) => (
                <button
                  className={`gallery-tile ${index % 9 === 0 ? "gallery-tile-featured" : ""}`}
                  type="button"
                  key={photo.src}
                  onClick={() => setActiveGalleryIndex(allGalleryPhotos.indexOf(photo))}
                  aria-label={`Open photo: ${photo.alt}`}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                  <span>View project <b><ArrowUpRightIcon /></b></span>
                </button>
              ))}
            </div>
          </section>

          <section className="gallery-section" aria-labelledby="sod-gallery-title">
            <div className="gallery-heading">
              <div>
              <span>02 · 24 PROJECT PHOTOS</span>
                <h3 id="sod-gallery-title">Natural sod</h3>
              </div>
              <p>Farm-grown turf, careful installation and finished lawns for homes and commercial properties.</p>
            </div>
            <div className="gallery-grid">
              {sodPhotos.map((photo, index) => (
                <button
                className={`gallery-tile ${index % 9 === 0 ? "gallery-tile-featured" : ""} ${photo.enhance ? "gallery-tile-enhanced" : ""}`}
                  type="button"
                  key={photo.src}
                  onClick={() => setActiveGalleryIndex(allGalleryPhotos.indexOf(photo))}
                  aria-label={`Open photo: ${photo.alt}`}
                >
                  <img src={photo.src} alt={photo.alt} loading="lazy" decoding="async" />
                  <span>View project <b><ArrowUpRightIcon /></b></span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </section>

      <section className="firewood" id="firewood" aria-labelledby="firewood-title">
        <div className="firewood-intro section-pad">
          <div className="section-number">05 — FIREWOOD</div>
          <div className="firewood-title-block">
            <p className="eyebrow">Wholesale supply · Local delivery</p>
            <h2 id="firewood-title">Firewood,<br /><em>delivered.</em></h2>
          </div>
          <div className="firewood-lead">
            <p>Stock the woodpile without the hauling. Motz supplies firewood for residential customers, commercial buyers and wholesale needs, with convenient delivery to your property.</p>
            <a className="button firewood-button" href="#quote">Request firewood <span><ArrowUpRightIcon /></span></a>
          </div>
        </div>

        <div className="firewood-showcase">
          <figure className="firewood-main-image">
            <img src="/motz/firewood/firewood-delivery.webp" alt="Pickup truck loaded with split firewood for delivery" />
            <figcaption><span>01</span> Loaded for local delivery</figcaption>
          </figure>
          <div className="firewood-detail-grid">
            <figure>
              <img src="/motz/firewood/firewood-drop.webp" alt="Loose split firewood ready for pickup or delivery" />
              <figcaption><span>02</span> Loose-drop convenience</figcaption>
            </figure>
            <figure>
              <img src="/motz/firewood/seasoned-firewood.webp" alt="Large supply of split firewood stacked and ready" />
              <figcaption><span>03</span> Wholesale quantities</figcaption>
            </figure>
          </div>
        </div>

        <div className="firewood-benefits section-pad">
          <div><span>01</span><h3>Residential delivery</h3><p>A straightforward way to stock up for fireplaces, wood stoves and outdoor fire pits.</p></div>
          <div><span>02</span><h3>Wholesale supply</h3><p>Volume options for commercial customers, resellers and recurring seasonal demand.</p></div>
          <div><span>03</span><h3>Easy drop-off</h3><p>We bring the load to your property, saving you the time and work of hauling it yourself.</p></div>
        </div>

        <p className="firewood-credits">
          Photography via Pexels: <a href="https://www.pexels.com/photo/pickup-truck-loaded-with-firewood-outdoors-28408041/" target="_blank" rel="noreferrer">Matt Barnard</a>, <a href="https://www.pexels.com/photo/a-pile-of-wood-logs-on-the-ground-28159972/" target="_blank" rel="noreferrer">fotovegraf</a> and <a href="https://www.pexels.com/photo/stock-of-firewood-16926674/" target="_blank" rel="noreferrer">Joel Zar</a>.
        </p>
      </section>

      <section className="seeding" id="seeding" aria-labelledby="seeding-title">
        <div className="seeding-intro section-pad">
          <div className="section-number">06 — SEEDING</div>
          <div className="seeding-title-block">
            <p className="eyebrow">Signature blend · Professional installation</p>
            <h2 id="seeding-title">A stronger lawn,<br /><em>from seed.</em></h2>
          </div>
          <div className="seeding-lead">
            <p>From a thin problem spot to a complete lawn renovation, Motz pairs a regionally selected seed blend with careful preparation and professional application for a healthy, durable start.</p>
            <a className="button seeding-button" href="#quote">Request seeding <span><ArrowUpRightIcon /></span></a>
          </div>
        </div>

        <div className="seeding-showcase">
          <figure className="seeding-main-image">
            <img src="/motz/seeding/signature-seed-blend-20260825.png" alt="Motz team member carrying a bucket of Motz Signature Seed Blend" />
            <figcaption><span>01</span> Motz Signature Seed Blend</figcaption>
          </figure>
          <div className="seeding-detail-grid">
            <figure>
              <img src="/motz/seeding/professional-seeding.jpg" alt="Motz equipment professionally applying grass seed to a prepared residential lawn" />
              <figcaption><span>02</span> Professional installation</figcaption>
            </figure>
            <figure>
              <img src="/motz/seeding/watering-new-lawn.jpg" alt="Sprinkler watering fresh green grass in morning light" />
              <figcaption><span>03</span> Care for a strong start</figcaption>
            </figure>
          </div>
        </div>

        <div className="seeding-benefits section-pad">
          <div><span>01</span><h3>Made for our region</h3><p>Our primary 90/10 Tall Fescue and Kentucky Bluegrass blend is selected to thrive in Greater Cincinnati, with a shade blend available for lower-light areas.</p></div>
          <div><span>02</span><h3>Prepared and installed</h3><p>Professional service can include debris removal, contouring and grading, seed application, straw and starter fertilizer.</p></div>
          <div><span>03</span><h3>DIY or full service</h3><p>Let our experienced team complete the installation, or pick up Motz seed in 10-, 25- or 50-pound bags for thin spots and overseeding.</p></div>
        </div>

        <p className="seeding-credits">
          Motz project photography and free stock photography via Pexels: <a href="https://www.pexels.com/photo/photo-of-a-sprinkler-near-the-grass-8791457/" target="_blank" rel="noreferrer">Daria</a>.
        </p>
      </section>

      <section className="grading" id="grading" aria-labelledby="grading-title">
        <div className="grading-intro section-pad">
          <div className="section-number">07 — GRADING</div>
          <div className="grading-title-block">
            <p className="eyebrow">Site preparation · Drainage correction</p>
            <h2 id="grading-title">Groundwork,<br /><em>done right.</em></h2>
          </div>
          <div className="grading-lead">
            <p>Standing water, uneven ground or drainage flowing toward a building can signal that the land needs to be reshaped. Motz creates the slope, level and contours your property needs for better drainage and a cleaner finished landscape.</p>
            <a className="button grading-button" href="#quote">Request grading <span><ArrowUpRightIcon /></span></a>
          </div>
        </div>

        <div className="grading-showcase">
          <figure className="grading-main-image">
            <img src="/motz/grading/motz-garden-grading.png" alt="Motz equipment grading soil around an established residential landscape" />
            <figcaption><span>01</span> Careful work around your landscape</figcaption>
          </figure>
          <div className="grading-detail-grid">
            <figure>
              <img src="/motz/grading/residential-grading.jpg" alt="Motz tractor shaping and leveling a residential property for proper drainage" />
              <figcaption><span>02</span> Shaped for proper drainage</figcaption>
            </figure>
            <figure>
              <img src="/motz/grading/grading-crew.jpg" alt="Equipment operator and crew member completing site preparation" />
              <figcaption><span>03</span> Professional site preparation</figcaption>
            </figure>
          </div>
        </div>

        <div className="grading-benefits section-pad">
          <div><span>01</span><h3>Move water the right way</h3><p>Create positive drainage away from buildings to reduce pooling, flooding and the risk of foundation damage.</p></div>
          <div><span>02</span><h3>Prepare what comes next</h3><p>Build a better base for new sod or seed, decks, patios, driveways and other landscape improvements.</p></div>
          <div><span>03</span><h3>Plan, protect and clean up</h3><p>From site planning and staking to debris removal, finish grading and cleanup, we handle the full process.</p></div>
        </div>

        <p className="grading-credits">
          Motz project photography and free stock photography via Pexels: <a href="https://www.pexels.com/photo/a-bulldozer-on-brown-field-13923406/" target="_blank" rel="noreferrer">Serg Alesenko</a> and <a href="https://www.pexels.com/photo/construction-workers-and-bulldozer-15110000/" target="_blank" rel="noreferrer">IslandHopper X</a>.
        </p>
      </section>

      <section className="numbers">
        <div className="number-card"><span>01 · EXPERIENCE</span><strong>60+</strong><p>years serving Greater Cincinnati</p></div>
        <div className="number-card"><span>02 · SERVICES</span><strong>5</strong><p>core services for your property</p></div>
        <div className="number-card"><span>03 · PROMISE</span><strong>1</strong><p>team from consultation to installation</p></div>
      </section>

      <section
        className="testimonial section-pad"
        aria-label="Five-star Google reviews"
        onMouseEnter={() => setReviewsPaused(true)}
        onMouseLeave={() => setReviewsPaused(false)}
        onFocusCapture={() => setReviewsPaused(true)}
        onBlurCapture={() => setReviewsPaused(false)}
      >
        <div className="testimonial-head">
          <p className="eyebrow light">Five-star Google reviews</p>
          <a href="https://www.google.com/maps/search/?api=1&query=Motz+Turf+Farms+6280+Clough+Pike+Cincinnati+OH" target="_blank" rel="noreferrer">4.5 average · 84 reviews <ArrowUpRightIcon /></a>
        </div>
        <div className="review-stage" aria-live="polite" aria-atomic="true">
          <blockquote key={activeReviewIndex}>{googleReviews[activeReviewIndex].text}</blockquote>
          <div className="quote-meta">
            <span aria-label="5 out of 5 stars">★★★★★</span>
            <p>{googleReviews[activeReviewIndex].name} · {googleReviews[activeReviewIndex].detail}</p>
          </div>
        </div>
        <div className="review-controls" aria-label="Review carousel controls">
          <button type="button" onClick={() => setActiveReviewIndex((activeReviewIndex - 1 + googleReviews.length) % googleReviews.length)} aria-label="Previous review">←</button>
          <div className="review-dots">
            {googleReviews.map((review, index) => (
              <button
                type="button"
                key={review.name}
                className={index === activeReviewIndex ? "active" : ""}
                onClick={() => setActiveReviewIndex(index)}
                aria-label={`Show review from ${review.name}`}
                aria-current={index === activeReviewIndex ? "true" : undefined}
              />
            ))}
          </div>
          <button type="button" onClick={() => setActiveReviewIndex((activeReviewIndex + 1) % googleReviews.length)} aria-label="Next review">→</button>
        </div>
      </section>

      <section className="quote-section" id="quote">
        <div className="quote-intro">
          <div className="section-number light">08 — LET’S TALK</div>
          <h2>Your next project<br />starts with a<br /><em>conversation.</em></h2>
          <p>Tell us about your property, turf or grading project, or firewood needs. A member of our Cincinnati team will follow up to talk through options and next steps.</p>
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
                <option>Natural sod</option><option>Synthetic turf</option><option>Seeding</option><option>Grading and drainage correction</option><option>Firewood wholesale or delivery</option><option>Not sure yet</option>
              </select>
            </label>
            <label>Ideal timing
              <select required name="timeline" defaultValue="">
                <option value="" disabled>Select timing</option>
                <option>As soon as possible</option><option>1–3 months</option><option>3–6 months</option><option>Just exploring</option>
              </select>
            </label>
          </div>
          <fieldset className="project-size-fieldset">
            <legend>Approximately how large is your project area?</legend>
            <div className="project-size-options">
              <label className="project-size-option">
                <input required type="radio" name="projectSize" value="Small job — Under 2,500 sq. ft." />
                <span><strong>Small job — Under 2,500 sq. ft.</strong><small>Up to approximately half of a regulation basketball court.</small></span>
              </label>
              <label className="project-size-option">
                <input required type="radio" name="projectSize" value="Medium job — 2,500–10,000 sq. ft." />
                <span><strong>Medium job — 2,500–10,000 sq. ft.</strong><small>Approximately half of a basketball court to two full courts.</small></span>
              </label>
              <label className="project-size-option">
                <input required type="radio" name="projectSize" value="Large job — Over 10,000 sq. ft." />
                <span><strong>Large job — Over 10,000 sq. ft.</strong><small>Larger than two basketball courts—or approximately a quarter acre and up.</small></span>
              </label>
            </div>
            <p className="project-size-help"><strong>Not sure?</strong> Choose your closest estimate. Our team can measure the area during your consultation.</p>
          </fieldset>
          <label>Tell us what you need<textarea required name="details" rows={4} placeholder="Site access, goals, delivery quantity or anything else that would help us prepare." /></label>
          <label className="consent"><input required type="checkbox" /> <span>I agree that Motz Turf Farms may contact me about this project.</span></label>
          <button className="submit-button" type="submit" disabled={formStatus === "submitting"}>
            {formStatus === "submitting" ? "Sending…" : "Send project details"} <span><ArrowUpRightIcon /></span>
          </button>
          {formMessage && <p className={`form-note ${formStatus}`} role="status" aria-live="polite">{formMessage}</p>}
          <p className="privacy-note">Your information is only used to respond to your request.</p>
        </form>
      </section>

      <footer>
        <div className="footer-brand">
          <img
            src="/motz/motz-official-footer-20260825.png"
            alt="Motz Turf Farms — The Motz trusted name in turf."
          />
        </div>
        <div className="footer-grid">
          <div><p>THE TRUSTED NAME IN TURF</p><span>Locally owned · Cincinnati rooted</span></div>
          <div><p>VISIT</p><a href="https://maps.google.com/?q=6280+Clough+Pike+Cincinnati+OH+45244">6280 Clough Pike<br />Cincinnati, OH 45244</a></div>
          <div><p>CONTACT</p><a href="tel:+15132314844">513-231-4844</a><a href="mailto:info@motzfarm.com">info@motzfarm.com</a></div>
          <div><p>FOLLOW</p><a href="https://www.facebook.com/MotzTurfFarm/">Facebook <ArrowUpRightIcon /></a><a href="https://www.instagram.com/motzturffarm/">Instagram <ArrowUpRightIcon /></a><a href="https://www.youtube.com/@motzturffarm/featured">YouTube <ArrowUpRightIcon /></a><a href="#top">Back to top ↑</a></div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Motz Turf Farms</span>
          <a href="/privacy">Privacy policy</a>
          <span>Natural turf · Synthetic turf · Seeding · Grading · Firewood</span>
        </div>
      </footer>

      {activePhoto && activeGalleryIndex !== null && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Project photo viewer" onClick={() => setActiveGalleryIndex(null)}>
          <button className="lightbox-close" type="button" onClick={() => setActiveGalleryIndex(null)} aria-label="Close photo viewer">Close ×</button>
          <button
            className="lightbox-nav lightbox-previous"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActiveGalleryIndex((activeGalleryIndex - 1 + allGalleryPhotos.length) % allGalleryPhotos.length);
            }}
            aria-label="Previous project photo"
          >
            ←
          </button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={activePhoto.src} alt={activePhoto.alt} />
            <figcaption><span>{activePhoto.category}</span><p>{activePhoto.alt}</p></figcaption>
          </figure>
          <button
            className="lightbox-nav lightbox-next"
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setActiveGalleryIndex((activeGalleryIndex + 1) % allGalleryPhotos.length);
            }}
            aria-label="Next project photo"
          >
            →
          </button>
        </div>
      )}
    </main>
  );
}
