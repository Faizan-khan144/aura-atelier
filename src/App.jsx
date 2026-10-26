import { useEffect, useState } from 'react'
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Gem,
  Hand,
  Heart,
  Layers,
  LockKeyhole,
  Menu,
  MousePointer2,
  MoveHorizontal,
  Play,
  Scan,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react'
import HandScan from './components/HandScan'
import HeroObjects from './components/HeroObjects'
import Reveal from './components/Reveal'
import RingArt from './components/RingArt'
import RingScene from './components/RingScene'

const NAV = [
  { label: 'The mirror', href: '#mirror' },
  { label: 'Collection', href: '#collection' },
  { label: 'How it works', href: '#how' },
  { label: 'Technology', href: '#technology' },
]

const GESTURES = [
  {
    icon: MousePointer2,
    title: 'Pinch to select',
    copy: 'Bring your thumb and index finger together. The piece locks to your hand, not a screen.',
  },
  {
    icon: Hand,
    title: 'Open palm to reset',
    copy: 'Release the look and start again. No buttons, no menus, no reaching for a mouse.',
  },
  {
    icon: MoveHorizontal,
    title: 'Swipe to browse',
    copy: 'Move through metals, stones and shades with a flick of the wrist. It feels like air.',
  },
]

const PIECES = [
  {
    id: '04',
    name: 'Sculpted',
    meta: '18k gold · 4.2 g',
    price: '£1,280',
    variant: 'gold',
    tag: 'Bestseller',
    note: 'An architectural band for the hand that refuses to disappear.',
  },
  {
    id: '07',
    name: 'Liquid',
    meta: 'Recycled silver · 3.8 g',
    price: '£640',
    variant: 'silver',
    tag: 'New',
    note: 'A fluid curve that catches light from every angle you move.',
  },
  {
    id: '12',
    name: 'Nocturne',
    meta: 'Black ceramic · 1.1 ct',
    price: '£2,450',
    variant: 'noir',
    tag: 'Atelier',
    note: 'Quiet, sharp, after-dark. A diamond with nothing to prove.',
  },
]

const STEPS = [
  {
    number: '01',
    title: 'Allow the mirror',
    copy: 'One camera permission. Nothing is recorded, uploaded or stored. The entire try-on happens inside your browser.',
  },
  {
    number: '02',
    title: 'Raise your hand',
    copy: 'Aura maps 21 landmarks across your hand in real time, then fits each piece to your fingers and wrist.',
  },
  {
    number: '03',
    title: 'Try, compare, keep',
    copy: 'Switch metals and stones, hold a look, screenshot it, or send it straight to your wishlist.',
  },
]

const FEATURES = [
  {
    icon: Scan,
    title: '21-point hand map',
    copy: 'Fingertip-level precision from a single webcam. No gloves, markers or extra hardware.',
  },
  {
    icon: ShieldCheck,
    title: 'On-device by default',
    copy: 'Your camera feed never leaves the browser. Aura is private before it is pretty.',
  },
  {
    icon: Zap,
    title: 'Real-time feel',
    copy: 'Smoothing tuned to feel human, not laggy. The piece moves when you move.',
  },
  {
    icon: Gem,
    title: 'Made for objects',
    copy: 'Rings, watches, bangles and nail shades. Each piece gets its own fit logic.',
  },
  {
    icon: Hand,
    title: 'Gesture-first',
    copy: 'Pinch, swipe, open your palm. The whole interface disappears into your hand.',
  },
  {
    icon: Layers,
    title: 'No install',
    copy: 'Open a link and try. No app store, no account wall, no waiting for a download.',
  },
]

const STATS = [
  { value: '21', label: 'hand landmarks' },
  { value: '0', label: 'uploads' },
  { value: '60', label: 'fps target' },
  { value: '3', label: 'gestures' },
]

const STRIP = [
  '18k recycled gold',
  'Lab-grown diamonds',
  'Recycled silver',
  'Black ceramic',
  'Nail lacquer',
  'Try before you buy',
  'No app required',
]

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = open ? 'hidden' : ''
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <header className={`site-nav ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="nav-pill">
          <a className="brand" href="#top" aria-label="Aura home" onClick={() => setOpen(false)}>
            <span className="brand-icon">
              <Gem size={17} strokeWidth={2} />
            </span>
            <span className="brand-word">Aura</span>
          </a>

          <nav className="nav-links" aria-label="Primary">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a className="nav-signin" href="#waitlist">
              Sign in
            </a>
            <a className="nav-cta" href="#waitlist">
              Get early access
              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
            <button
              className="menu-toggle"
              type="button"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="mobile-menu-inner">
          <span className="status-pill">
            <span className="status-dot" />
            The hand-tracked atelier
          </span>
          <nav className="mobile-links" aria-label="Mobile">
            {NAV.map((item, index) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
                <ArrowUpRight size={18} />
              </a>
            ))}
          </nav>
          <a className="btn btn-gradient mobile-cta" href="#waitlist" onClick={() => setOpen(false)}>
            Join the first wave
            <ArrowUpRight size={15} />
          </a>
          <p className="mobile-menu-note">Jewelry, before it exists. Try it on in the air.</p>
        </div>
      </div>
    </>
  )
}

function MirrorMockup() {
  const [active, setActive] = useState(0)
  const piece = PIECES[active]

  return (
    <div className="mirror-mockup">
      <div className="preview-glow" />
      <div className="browser">
        <div className="browser-bar">
          <span className="browser-dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="browser-title">
            <Gem size={13} strokeWidth={2} />
            Aura Mirror
          </span>
          <span className="browser-live">
            <span />
            Live
          </span>
        </div>

        <div className="browser-body">
          <aside className="mirror-side">
            <div className="side-head">
              <span>Collection</span>
              <span>24 pieces</span>
            </div>
            <div className="side-list">
              {PIECES.map((item, index) => (
                <button
                  className={`side-item ${index === active ? 'is-active' : ''}`}
                  type="button"
                  key={item.name}
                  onClick={() => setActive(index)}
                >
                  <span className={`side-thumb side-thumb--${item.variant}`}>
                    <Gem size={15} strokeWidth={1.7} />
                  </span>
                  <span className="side-copy">
                    <strong>{item.name}</strong>
                    <small>{item.meta}</small>
                  </span>
                  <ChevronRight size={14} />
                </button>
              ))}
            </div>
            <div className="side-privacy">
              <ShieldCheck size={17} strokeWidth={1.7} />
              <span>
                <strong>Private by default</strong>
                <small>Camera stays on device</small>
              </span>
            </div>
          </aside>

          <div className="mirror-view">
            <div className="view-grid" />
            <RingScene />
            <div className="view-top">
              <span className="view-status">
                <span />
                Hand detected
              </span>
              <span>99.2%</span>
            </div>
            <div className="view-chip view-chip--ring">
              <Gem size={12} />
              Ring {piece.id}
              <strong>{piece.name}</strong>
            </div>
            <div className="view-chip view-chip--privacy">
              <LockKeyhole size={12} />
              On-device
            </div>
            <div className="view-scanline" />
            <div className="view-bottom">
              <span>Pinch to select</span>
              <span>Open palm to reset</span>
            </div>
          </div>

          <aside className="mirror-detail">
            <span className="detail-label">
              Ring {piece.id} · {piece.tag}
            </span>
            <h3>{piece.name}</h3>
            <p>{piece.note}</p>
            <div className="detail-price">
              {piece.price}
              <span>{piece.meta}</span>
            </div>
            <div className="detail-swatches" aria-hidden="true">
              <span className="swatch swatch--gold is-active" />
              <span className="swatch swatch--silver" />
              <span className="swatch swatch--noir" />
            </div>
            <button className="detail-cta" type="button">
              <Heart size={15} strokeWidth={1.8} />
              Save to wishlist
            </button>
            <div className="detail-foot">
              <span>
                <Check size={12} />
                Fits 15–18 mm
              </span>
              <span>Free returns</span>
            </div>
          </aside>
        </div>
      </div>

      <div className="float-note float-note--left">
        <Scan size={17} strokeWidth={1.7} />
        <span>
          <strong>21 landmarks</strong>
          <small>Fingertip precision</small>
        </span>
      </div>
      <div className="float-note float-note--right">
        <ShieldCheck size={17} strokeWidth={1.7} />
        <span>
          <strong>0 uploads</strong>
          <small>Runs in your browser</small>
        </span>
      </div>
      <div className="preview-badge">
        <span />
        Realtime · on-device
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-grid-bg" />
      <div className="hero-glow hero-glow--a" />
      <div className="hero-glow hero-glow--b" />
      <HeroObjects />

      <div className="hero-content">
        <Reveal delay={60}>
          <a className="status-pill" href="#technology">
            <span className="status-dot" />
            On-device try-on
            <span className="status-divider" />
            No app · no upload
          </a>
        </Reveal>

        <Reveal delay={140}>
          <h1>
            Every ring.
            <br />
            On <span className="text-gradient">your hand.</span>
            <br />
            Before it exists.
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="hero-sub">
            Aura turns your camera into a hand-tracked jewelry atelier. Try on rings, watches and
            nail shades in real time — with nothing but your hand.
          </p>
        </Reveal>

        <Reveal className="hero-actions" delay={300}>
          <a className="btn btn-gradient" href="#mirror">
            Open the mirror
            <ArrowRight size={15} strokeWidth={2} />
          </a>
          <a className="btn btn-white" href="#how">
            <span className="play-dot">
              <Play size={10} fill="currentColor" />
            </span>
            See how it works
          </a>
        </Reveal>

        <Reveal className="hero-checks" delay={380}>
          <span>
            <Check size={13} />
            No sign-up
          </span>
          <span>
            <Check size={13} />
            No app install
          </span>
          <span>
            <Check size={13} />
            60 fps realtime
          </span>
        </Reveal>
      </div>

      <Reveal className="hero-preview" delay={420}>
        <MirrorMockup />
      </Reveal>
    </section>
  )
}

function Strip() {
  return (
    <div className="logo-strip" aria-hidden="true">
      <div className="logo-track">
        {[0, 1].map((group) => (
          <div className="logo-group" key={group}>
            {STRIP.map((item) => (
              <span className="logo-item" key={`${group}-${item}`}>
                {item}
                <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function Stats() {
  return (
    <section className="stats">
      <div className="shell stats-row">
        {STATS.map((stat) => (
          <div className="stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, copy }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </div>
  )
}

function Features() {
  return (
    <section className="section features" id="technology">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Technology"
            title={
              <>
                Everything you need.
                <br />
                <span className="text-gradient">Nothing you don&apos;t.</span>
              </>
            }
            copy="A real-time try-on engine with no app, no account wall and no video leaving your device."
          />
        </Reveal>

        <div className="feature-grid">
          {FEATURES.map(({ icon: Icon, title, copy }, index) => (
            <Reveal className="feature-card" delay={index * 55} key={title}>
              <span className="feature-icon">
                <Icon size={19} strokeWidth={1.7} />
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Product() {
  return (
    <section className="section product" id="mirror">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Product"
            title={
              <>
                Built to feel <span className="text-gradient">instant.</span>
              </>
            }
            copy="Three things that make trying jewelry actually feel like trying jewelry."
          />
        </Reveal>

        <div className="product-rows">
          <Reveal className="product-row" delay={60}>
            <div className="product-copy">
              <span className="mini-label">The mirror</span>
              <h3>Your hand is the only controller.</h3>
              <p>
                No mouse, no touchscreen, no tutorial. Aura reads the gestures your hand already
                knows, then gets out of the way.
              </p>
              <a className="text-link" href="#how">
                Try the gestures
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="visual-card visual-card--hand">
              <div className="visual-card-bar">
                <span>
                  <span className="mini-live" />
                  Live mirror
                </span>
                <span>AU—01</span>
              </div>
              <HandScan />
              <span className="visual-chip visual-chip--a">
                <MousePointer2 size={12} />
                Pinch to select
              </span>
              <span className="visual-chip visual-chip--b">
                <MoveHorizontal size={12} />
                Swipe to browse
              </span>
              <span className="visual-chip visual-chip--c">
                <Hand size={12} />
                Open palm to reset
              </span>
            </div>
          </Reveal>

          <Reveal className="product-row product-row--reverse" delay={60}>
            <div className="product-copy" id="collection">
              <span className="mini-label">The collection</span>
              <h3>The whole collection, on you.</h3>
              <p>
                Metals, stones and shades are rendered live on your hand, so you can compare the
                whole edit before you commit to one piece.
              </p>
              <a className="text-link" href="#waitlist">
                Browse the first 24
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="visual-card visual-card--collection">
              <div className="visual-card-bar">
                <span>Collection 01</span>
                <span>24 pieces</span>
              </div>
              <div className="mini-collection">
                {PIECES.map((piece) => (
                  <article className="mini-piece" key={piece.name}>
                    <div className={`mini-art mini-art--${piece.variant}`}>
                      <RingArt variant={piece.variant} />
                    </div>
                    <div className="mini-piece-info">
                      <span>{piece.name}</span>
                      <strong>{piece.price}</strong>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal className="product-row" delay={60}>
            <div className="product-copy">
              <span className="mini-label">Privacy</span>
              <h3>Private before pretty.</h3>
              <p>
                Your camera feed is processed frame by frame inside your browser. Nothing is
                uploaded, recorded or stored. Close the tab and it&apos;s gone.
              </p>
              <a className="text-link" href="#technology">
                Read the tech
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="visual-card visual-card--privacy">
              <div className="privacy-card">
                <span className="privacy-icon">
                  <LockKeyhole size={22} strokeWidth={1.6} />
                </span>
                <span className="privacy-label">Camera permission</span>
                <h4>On-device only</h4>
                <p>No frames leave this browser.</p>
                <div className="privacy-list">
                  <span>
                    <Check size={13} />
                    No uploads
                  </span>
                  <span>
                    <Check size={13} />
                    No recordings
                  </span>
                  <span>
                    <Check size={13} />
                    No account needed
                  </span>
                </div>
                <div className="privacy-status">
                  <span />
                  Processing locally
                </div>
              </div>
              <div className="privacy-orbit privacy-orbit--one" />
              <div className="privacy-orbit privacy-orbit--two" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function How() {
  return (
    <section className="section how" id="how">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="How it works"
            title={
              <>
                Three steps.
                <br />
                <span className="text-gradient">Zero friction.</span>
              </>
            }
            copy="Aura is designed to disappear. The only thing left is the piece, your hand, and the decision."
          />
        </Reveal>

        <div className="steps">
          {STEPS.map((step, index) => (
            <Reveal className="step-card" delay={index * 80} key={step.number}>
              <span className="step-number">{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="privacy-banner" delay={180}>
          <span className="privacy-banner-icon">
            <ShieldCheck size={21} strokeWidth={1.6} />
          </span>
          <div>
            <strong>Private by design</strong>
            <span>Your camera feed never leaves this browser.</span>
          </div>
          <a className="text-link" href="#technology">
            See the tech
            <ArrowRight size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function Manifesto() {
  return (
    <section className="manifesto">
      <div className="shell">
        <Reveal>
          <span className="eyebrow">Manifesto</span>
          <h2>
            Jewelry shouldn&apos;t wait
            <br />
            for a <span className="text-gradient">fitting room.</span>
          </h2>
          <p>
            The best pieces are found in a second of instinct. Aura removes the friction between
            wanting to see something and seeing it on you.
          </p>
          <div className="manifesto-meta">
            <span>Designed for hands</span>
            <span>Built for browsers</span>
            <span>Private by default</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Waitlist() {
  const [email, setEmail] = useState('')
  const [joined, setJoined] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    if (!email.trim()) return
    setJoined(true)
  }

  return (
    <section className="waitlist" id="waitlist">
      <div className="shell">
        <Reveal className="waitlist-card">
          <div className="waitlist-glow" />
          <div className="waitlist-orbit waitlist-orbit--one" />
          <div className="waitlist-orbit waitlist-orbit--two" />

          <span className="waitlist-pill">
            <Sparkles size={13} strokeWidth={1.8} />
            Early access
          </span>
          <h2>
            Step into
            <br />
            the <span>aura.</span>
          </h2>
          <p>
            Be first to try Aura when the mirror opens. A small first wave, a careful fit, and a
            front-row seat to the next way of trying jewelry.
          </p>

          {joined ? (
            <div className="waitlist-success" role="status">
              <Check size={17} strokeWidth={2} />
              You&apos;re on the list. Watch your inbox.
            </div>
          ) : (
            <form className="waitlist-form" onSubmit={submit}>
              <label className="sr-only" htmlFor="waitlist-email">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
              <button type="submit">
                Request access
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </form>
          )}

          <div className="waitlist-meta">
            <span>No spam</span>
            <span>On-device</span>
            <span>First wave · 2026</span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-brand">
            <a className="brand" href="#top">
              <span className="brand-icon">
                <Gem size={17} strokeWidth={2} />
              </span>
              <span className="brand-word">Aura</span>
            </a>
            <p>Jewelry, before it exists. Try it on in the air.</p>
          </div>

          <div className="footer-column">
            <span>Explore</span>
            <a href="#mirror">The mirror</a>
            <a href="#collection">Collection</a>
            <a href="#how">How it works</a>
            <a href="#technology">Technology</a>
          </div>

          <div className="footer-column">
            <span>Elsewhere</span>
            <a href="#waitlist">Early access</a>
            <a href="#top">Instagram</a>
            <a href="#top">Pinterest</a>
            <a href="#top">Journal</a>
          </div>
        </div>

        <div className="footer-word" aria-hidden="true">
          AURA
        </div>

        <div className="footer-bottom">
          <span>© 2026 Aura Atelier</span>
          <span>Made for hands, not touchscreens.</span>
          <a href="#top">
            Back to top
            <ArrowUpRight size={13} />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="page">
      <Nav />
      <main>
        <Hero />
        <Strip />
        <Stats />
        <Features />
        <Product />
        <How />
        <Manifesto />
        <Waitlist />
      </main>
      <Footer />
    </div>
  )
}
