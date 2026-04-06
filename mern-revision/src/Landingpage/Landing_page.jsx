import Signup from "../signup-login/Signup";
import Uniator from '../assets/image1.png'
import Connects from "./Connects";
import GridCards from "./GridLayout";
import { useEffect, useState } from "react";
import Pop_up from "./Pop_up";
import CollaborativeEditorLanding from "./part2";

/* 
  Inject once at app root (e.g. index.css or main.jsx):

  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --gold: #c9a84c;
    --gold-light: #f0d080;
    --ember: #e8553a;
    --teal-glow: #00d4b4;
    --bg-deep: #06080f;
    --bg-card: rgba(255,255,255,0.04);
    --border-dim: rgba(255,255,255,0.08);
  }
*/

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --gold: #c9a84c;
    --gold-light: #f0d080;
    --ember: #e8553a;
    --teal-glow: #00d4b4;
    --bg-deep: #06080f;
    --bg-card: rgba(255,255,255,0.04);
    --border-dim: rgba(255,255,255,0.08);
  }

  .lp-root {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg-deep);
    min-height: 100vh;
    overflow-x: hidden;
    position: relative;
  }

  /* ---------- atmospheric background ---------- */
  .lp-root::before {
    content: '';
    position: fixed;
    inset: 0;
    background:
      radial-gradient(ellipse 80% 60% at 15% -10%, rgba(201,168,76,0.12) 0%, transparent 60%),
      radial-gradient(ellipse 60% 50% at 90% 10%,  rgba(232,85,58,0.10) 0%, transparent 55%),
      radial-gradient(ellipse 70% 60% at 50% 110%, rgba(0,212,180,0.08) 0%, transparent 60%);
    pointer-events: none;
    z-index: 0;
  }

  .lp-root > * { position: relative; z-index: 1; }

  /* ---------- noise grain overlay ---------- */
  .lp-root::after {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 0;
    opacity: 0.6;
  }

  /* ---------- hero section ---------- */
  .lp-hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 100px 24px 60px;
    text-align: center;
    gap: 28px;
  }

  .lp-eyebrow {
    font-family: 'DM Sans', sans-serif;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0;
    animation: fadeUp 0.8s ease forwards 0.2s;
  }

  .lp-hero-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.6rem, 7vw, 5.5rem);
    font-weight: 900;
    line-height: 1.08;
    color: #f5f0e8;
    letter-spacing: -0.02em;
    opacity: 0;
    animation: fadeUp 0.9s ease forwards 0.4s;
  }

  .lp-hero-title .accent-welcome {
    font-style: italic;
    background: linear-gradient(135deg, var(--ember) 0%, #f0a060 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .lp-hero-title .accent-brand {
    background: linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 60%, #fff8dc 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    display: block;
    filter: drop-shadow(0 0 40px rgba(201,168,76,0.4));
  }

  .lp-hero-desc {
    font-size: clamp(0.95rem, 2vw, 1.1rem);
    font-weight: 300;
    color: rgba(255,255,255,0.55);
    line-height: 1.8;
    max-width: 720px;
    opacity: 0;
    animation: fadeUp 0.9s ease forwards 0.6s;
  }

  .lp-hero-desc span.hl-yellow { color: #f0d080; font-weight: 500; }
  .lp-hero-desc span.hl-pink   { color: #f472b6; font-weight: 500; }
  .lp-hero-desc span.hl-green  { color: #4ade80; font-weight: 500; }
  .lp-hero-desc span.hl-teal   { color: var(--teal-glow); font-weight: 500; }

  /* ---------- CTA buttons ---------- */
  .lp-cta-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
    justify-content: center;
    opacity: 0;
    animation: fadeUp 0.9s ease forwards 0.8s;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--gold) 0%, #a8762e 100%);
    color: #06080f;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    font-size: 0.88rem;
    letter-spacing: 0.5px;
    padding: 14px 32px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    transition: all 0.25s ease;
    box-shadow: 0 0 30px rgba(201,168,76,0.35);
    text-decoration: none;
  }
  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 50px rgba(201,168,76,0.55);
  }

  .btn-ghost {
    background: transparent;
    color: rgba(255,255,255,0.7);
    font-family: 'DM Sans', sans-serif;
    font-weight: 400;
    font-size: 0.88rem;
    letter-spacing: 0.5px;
    padding: 13px 32px;
    border-radius: 6px;
    border: 1px solid rgba(255,255,255,0.15);
    cursor: pointer;
    transition: all 0.25s ease;
    text-decoration: none;
  }
  .btn-ghost:hover {
    border-color: rgba(255,255,255,0.35);
    color: #fff;
    background: rgba(255,255,255,0.05);
  }

  /* ---------- divider line ---------- */
  .lp-divider {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, transparent, var(--gold), transparent);
    margin: 0 auto;
    opacity: 0;
    animation: fadeIn 1s ease forwards 1s;
  }

  /* ---------- feature card / banner ---------- */
  .lp-banner-wrap {
    padding: 0 24px;
    display: flex;
    justify-content: center;
    opacity: 0;
    animation: fadeUp 0.9s ease forwards 1.1s;
  }

  .lp-banner {
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 20px 28px;
    max-width: 860px;
    width: 100%;
    border-radius: 16px;
    border: 1px solid var(--border-dim);
    background: var(--bg-card);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    box-shadow: 0 4px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06);
    flex-wrap: wrap;
    position: relative;
    overflow: hidden;
  }

  .lp-banner::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--gold), transparent);
  }

  .lp-banner-img {
    width: 68px;
    height: 68px;
    border-radius: 14px;
    object-fit: cover;
    flex-shrink: 0;
    border: 1px solid rgba(201,168,76,0.3);
    box-shadow: 0 0 20px rgba(201,168,76,0.2);
  }

  .lp-banner-text { flex: 1; min-width: 200px; }

  .lp-banner-text h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #f5f0e8;
    margin: 0 0 4px;
    line-height: 1.3;
  }

  .lp-banner-text p {
    font-size: 0.82rem;
    color: rgba(255,255,255,0.45);
    margin: 0;
    line-height: 1.5;
  }

  /* ---------- section heading ---------- */
  .lp-section-head {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 80px 24px 0;
    text-align: center;
  }

  .lp-section-label {
    font-size: 10px;
    letter-spacing: 4px;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 500;
  }

  .lp-section-title {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2rem, 5vw, 3.4rem);
    font-weight: 900;
    color: #f5f0e8;
    letter-spacing: -0.01em;
    margin: 0;
  }

  .lp-section-line {
    width: 48px;
    height: 2px;
    background: linear-gradient(90deg, var(--ember), var(--gold));
    border-radius: 2px;
    margin-top: 4px;
  }

  /* ---------- animations ---------- */
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* ---------- children wrapper ---------- */
  .lp-children {
    padding: 0 0 80px;
  }

  /* ---------- footer connects ---------- */
  .lp-connects {
    padding: 40px 24px 60px;
    border-top: 1px solid var(--border-dim);
    margin-top: 40px;
  }
`;

function LandingPage() {
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPopup(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{styles}</style>

      <div className="lp-root0 bg-base-100">

        {/* ── Hero ───────────────────────────────────────────── */}
        <section className="lp-hero">
          <p className="lp-eyebrow">All-in-one developer &amp; student platform</p>

          <h1 className="lp-hero-title">
            <span className="accent-welcome">Welcome</span> to
            <span className="accent-brand">GeeksOfCodes</span>
          </h1>

          <p className="lp-hero-desc">
            A versatile platform integrating{" "}
            <span className="hl-yellow">real-time code collaboration</span>, a secure
            gate pass system with QR scanning, an{" "}
            <span className="hl-pink">attendance tracker</span>, an{" "}
            <span className="hl-green">advanced to-do</span> list with full backend
            support, and a <span className="hl-teal">community discussion</span> forum
            — streamlining workflow, security &amp; productivity for developers,
            students, and organizations alike.
          </p>

          <div className="lp-cta-row">
            <a href="#" className="btn-primary">Get Started Free</a>
            <a href="#" className="btn-ghost">Explore Features ↓</a>
          </div>
        </section>

        {/* ── Visual breath ──────────────────────────────────── */}
        <div className="lp-divider" />

        {/* ── Uniator banner ─────────────────────────────────── */}
        <div className="lp-banner-wrap">
          <div className="lp-banner">
            <img src={Uniator} className="lp-banner-img" alt="Uniator" />
            <div className="lp-banner-text">
              <h2>Elevate Your Learning Journey &amp; Campus Access</h2>
              <p>
                Curated learning paths, approach-wise solutions, personalized
                roadmaps, expert doubt assistance, and seamless entry-exit management.
              </p>
            </div>
            <a href="#" className="btn-primary" style={{ whiteSpace: "nowrap", flexShrink: 0 }}>
              Explore Us
            </a>
          </div>
        </div>

        {/* ── Features heading ───────────────────────────────── */}
        <div className="lp-section-head">
          <span className="lp-section-label">What we offer</span>
          <h2 className="lp-section-title">Features at a Glance</h2>
          <div className="lp-section-line" />
        </div>

        {/* ── GridCards ──────────────────────────────────────── */}
        <div className="lp-children">
          <GridCards />
        </div>

        {/* ── Collaborative editor section ───────────────────── */}
        <CollaborativeEditorLanding />

        {/* ── Signup ─────────────────────────────────────────── */}
        <Signup />

        {/* ── Connects footer ────────────────────────────────── */}
        <div className="lp-connects">
          <Connects />
        </div>

        {/* ── Popup ──────────────────────────────────────────── */}
        {popup && <Pop_up close={() => setPopup(false)} />}
      </div>
    </>
  );
}

export default LandingPage;