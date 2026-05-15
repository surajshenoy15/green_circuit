import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import WhatsAppButton from '../components/WhatsAppButton';
import {
  Menu, X, Users, Download, Trophy, CalendarDays, MapPin,
  Footprints, Bike, PartyPopper, ArrowRight, Clock, TreePine, Award,
  Star, Quote, Check, Medal, Crown, Gem, Shield, ChevronDown, Mail, Phone,
  ArrowUp, Zap, Timer, Flame, Heart, Sparkles, ImageIcon, ChevronLeft, ChevronRight,
  Route, Navigation
} from 'lucide-react';
import { W, Stagger, StaggerItem, Fade, Head } from '../components/shared';
import { EventHighlights } from '../components/EventHighlights';

/* ═══ MARQUEES ═══ */
function Marquee({ items, dir = 'l', bg = 'bg-g700', speed = '25s' }) {
  const cls = dir === 'l' ? 'mq-l' : 'mq-r';
  return (
    <div className={`${bg} py-2.5 overflow-hidden relative`}>
      <div className={`${cls} flex gap-10 whitespace-nowrap`} style={{ animationDuration: speed }}>
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span key={i} className="text-white/70 text-[11px] font-bold tracking-wide flex items-center gap-1.5">{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ═══ NAVBAR ═══ */
const NAV = [['Events', '#events'], ['Route', '#route-map'], ['Impact', '#impact'], ['Sponsors', '#sponsors'], ['Past Events', '#past-events'], ['FAQ', '#faq']];

export function Navbar() {
  const [s, setS] = useState(false);
  const [m, setM] = useState(false);

  useEffect(() => {
    const f = () => setS(window.scrollY > 40);
    window.addEventListener('scroll', f, { passive: true });
    return () => window.removeEventListener('scroll', f);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 h-16 flex items-center transition-all duration-500 ${
        s ? 'bg-white/90 backdrop-blur-xl shadow-[0_1px_3px_rgba(0,0,0,.05)]' : ''
      }`}
    >
      <div className={`${W} w-full flex items-center justify-between`}>
        <a href="#" className="flex items-center gap-2 group">
          <img
            src="/images/GC.png"
            alt="Green Circuit"
            className="h-7 sm:h-8 w-auto object-contain shrink-0"
          />
          <span className="flex items-center leading-none font-head text-base sm:text-lg tracking-wider transition-colors duration-300">
            <span className={s ? 'text-[#59B94A]' : 'text-white'}>GREEN</span>
            <span className={`ml-1 ${s ? 'text-[#332F91]' : 'text-g400'}`}>CIRCUIT</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-0.5">
          {NAV.map(([l, h]) => (
            <a
              key={l}
              href={h}
              className={`px-3 py-1.5 rounded-md text-[11px] font-semibold transition-all duration-200 ${
                s
                  ? 'text-gray-500 hover:text-g700 hover:bg-g50'
                  : 'text-white/50 hover:text-white hover:bg-white/10'
              }`}
            >
              {l}
            </a>
          ))}
          <a
            href="#sponsor"
            className="ml-3 px-4 py-1.5 rounded-md bg-g600 text-white text-[11px] font-bold hover:bg-g700 transition breathe"
          >
            Sponsor Us
          </a>
        </div>

        <button
          onClick={() => setM(!m)}
          className={`md:hidden ${s ? 'text-gray-800' : 'text-white'}`}
        >
          {m ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {m && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="absolute top-16 inset-x-0 bg-white/95 backdrop-blur-xl shadow-xl md:hidden"
          >
            <div className="p-3 flex flex-col gap-0.5">
              {NAV.map(([l, h]) => (
                <a
                  key={l}
                  href={h}
                  onClick={() => setM(false)}
                  className="py-2 px-3 text-gray-500 hover:text-g700 text-sm font-medium rounded-md hover:bg-g50 transition"
                >
                  {l}
                </a>
              ))}
              <a
                href="#sponsor"
                onClick={() => setM(false)}
                className="mt-2 py-2.5 px-3 rounded-md bg-g600 text-white text-sm font-bold hover:bg-g700 transition text-center"
              >
                Sponsor Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* ═══ HERO ═══ */
function useCD(iso) {
  const tgt = useMemo(() => new Date(iso).getTime(), [iso]);
  const calc = useCallback(() => { const d = Math.max(0, tgt - Date.now()); return { d: Math.floor(d/864e5), h: Math.floor((d%864e5)/36e5), m: Math.floor((d%36e5)/6e4), s: Math.floor((d%6e4)/1e3) }; }, [tgt]);
  const [t, setT] = useState(calc);
  useEffect(() => { const id = setInterval(() => setT(calc()), 1000); return () => clearInterval(id); }, [calc]);
  return t;
}

function Dig({ v, l }) {
  return (
    <div className="min-w-[72px] rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-center backdrop-blur-sm">
      <div className="text-2xl font-bold text-white sm:text-3xl">
        {String(v).padStart(2, "0")}
      </div>
      <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/50">
        {l}
      </div>
    </div>
  );
}

function Hero() {
  // const cd = useCD('2026-06-01T06:00:00+05:30');
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.35], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  const d = (del) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { delay: del, duration: 0.5, ease: [.25, .1, .25, 1] }
  });

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-g950 noise">
      <motion.div style={{ y }} className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-20"
          poster="/images/GC.png"
        >
          <source src="/videos/gc-hero.mp4" type="video/mp4" />
        </video>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-g950/75 via-g950/50 to-g950" />
      <div className="absolute inset-0 bg-black/0.01" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-g950 to-transparent" />

      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,222,128,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,.04) 1px,transparent 1px)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="absolute top-20 left-6 w-12 h-12 border-t border-l border-g400/15 hidden lg:block" />
      <div className="absolute bottom-20 right-6 w-12 h-12 border-b border-r border-g400/15 hidden lg:block" />
      <div className="absolute top-1/4 left-[10%] w-48 h-48 rounded-full bg-g500/5 blur-[60px] glow-pulse" />
      <div
        className="absolute bottom-1/3 right-[15%] w-36 h-36 rounded-full bg-g400/5 blur-[50px] glow-pulse"
        style={{ animationDelay: '1.5s' }}
      />

      <motion.div
        style={{ opacity }}
        className="relative z-10 w-full pt-24 pb-16 px-5"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            {...d(0.1)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 mb-8 backdrop-blur-sm"
          >
            <span
              className="w-1.5 h-1.5 rounded-full bg-g400"
              style={{ animation: 'pulse-dot 1.5s infinite' }}
            />
            <span className="text-g400 text-[10px] font-bold tracking-wider">
              REGISTRATIONS OPEN
            </span>
          </motion.div>

          <motion.h1
            {...d(0.25)}
            className="font-head text-[clamp(3rem,10vw,8rem)] leading-[0.9] tracking-wide max-w-5xl mx-auto mb-5"
          >
            <span className="text-white">GREEN CIRCUIT:</span><br />
            <span className="shimmer">ACT NOW</span><br />
            <span className="text-white">FOR A </span>
            <span className="text-g400">BETTER</span><br />
            <span className="text-g400">TOMORROW!</span>
          </motion.h1>

          <motion.p
            {...d(0.4)}
            className="text-white/85 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            Bengaluru&apos;s biggest eco-sports event. Run, ride, and make an impact for a greener future.
          </motion.p>

          <motion.div {...d(0.5)} className="flex flex-wrap justify-center gap-3 mb-10">
            <a
              href="#events"
              className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-g500 text-white text-sm font-bold hover:bg-g600 transition-all shadow-lg shadow-g500/25"
            >
              <Flame size={14} className="text-white" />
              <span>Register Now</span>
            </a>

            <a
  href="/brochurefinal.pdf"
  download="Green-Circuit-Brochure.pdf"
  className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-lg bg-white/12 border border-white/20 text-white text-sm font-bold hover:bg-white/18 transition-all backdrop-blur-sm"
>
  <Download size={14} className="text-white" />
  <span>Brochure</span>
</a>
          </motion.div>

          {/*
          <motion.div {...d(0.6)}>
            <div className="flex items-center justify-center gap-1.5 mb-4">
              <Timer size={11} className="text-g400/70" />
              <p className="text-[8px] text-white/90 uppercase tracking-[0.3em] font-bold">
                Countdown to race day
              </p>
            </div>
            <div className="flex justify-center gap-2.5 sm:gap-3 mb-10">
              <Dig v={cd.d} l="Days" />
              <Dig v={cd.h} l="Hours" />
              <Dig v={cd.m} l="Mins" />
              <Dig v={cd.s} l="Secs" />
            </div>
          </motion.div>
          */}

          <motion.div
            {...d(0.75)}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-black/30 border border-white/10 shadow-lg backdrop-blur-sm"
          >
            <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-yellow-400" />
            </div>

            <div className="text-left">
              <p className="text-[8px] text-white/70 uppercase tracking-[0.2em] font-bold">
                Total Prize Pool
              </p>
              <p
                className="font-head text-[1.8rem] text-g400 leading-none"
                style={{ textShadow: '0 0 25px rgba(74,222,128,.25)' }}
              >
                ₹2,00,000
              </p>
            </div>
          </motion.div>

          <motion.div
            {...d(0.85)}
            className="flex flex-wrap justify-center gap-6 mt-6 text-[10px] text-white/80 font-medium"
          >
            <span className="flex items-center gap-1.5">
              <CalendarDays size={10} className="text-g400" />
              June 14, 2026
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin size={10} className="text-g400" />
              National College Ground,Basavanagudi
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={10} className="text-g400" />
              10000+ Runners
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══ EVENTS ═══ */
const EV = [
  {
    t: 'EcoMiles',
    tag: '10K & 5K & 3K',
    I: Footprints,
    img: '/images/eco-miles-1.png',
    d: "Push your limits on Bengaluru's greenest route through National College Ground, Basavanagudi.",
    loc: 'National College Ground, Basavanagudi',
    cap: '8000+',
    price: '',
    href: 'https://gc-reg.vercel.app',
  },
  {
    t: 'CycleStreet',
    tag: '5K Ride',
    I: Bike,
    img: '/images/cycle-street-1.png',
    d: 'Pedal for the planet through iconic landscapes starting from National College Ground, Basavanagudi.',
    loc: 'National College Ground, Basavanagudi',
    cap: '3000+',
    price: '',
    href: 'https://gc-reg.vercel.app',
  },
];

function Events() {
  return (
    <section id="events" className="bg-white py-16 sm:py-20">
      <div className={W}>
        <Fade>
          <Head ey="Choose Your Challenge" ti="OUR EVENTS" />
        </Fade>

        <Stagger className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {EV.map((e) => (
            <StaggerItem key={e.t}>
              <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white lift">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={e.img}
                    alt={e.t}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />

                  <div className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 shadow-sm backdrop-blur">
                    <e.I size={10} className="text-g700" />
                    <span className="text-[9px] font-bold text-g700">{e.tag}</span>
                  </div>

                  {e.price && (
                    <div className="absolute top-3 right-3 rounded-full bg-g600 px-2.5 py-1 text-[10px] font-bold text-white shadow-lg">
                      {e.price}
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent px-3 py-3">
                    <div className="flex flex-wrap gap-3 text-[9px] font-medium text-white/90">
                      <span className="flex items-center gap-1">
                        <MapPin size={9} />
                        {e.loc}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users size={9} />
                        {e.cap}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-1 font-head text-2xl tracking-wide text-gray-900">
                    {e.t}
                  </h3>
                  <p className="mb-5 flex-1 text-[11px] leading-relaxed text-gray-500">
                    {e.d}
                  </p>

                  <a
                    href={e.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/b flex items-center justify-center gap-1.5 rounded-xl bg-g600 py-2.5 text-[11px] font-bold text-white shadow-md shadow-g600/15 transition-all hover:bg-g700"
                  >
                    Register Now
                    <ArrowRight
                      size={12}
                      className="transition-transform group-hover/b:translate-x-1"
                    />
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}


/* ═══ ROUTE MAP ═══ */
function RouteMap() {
  const videoRef = useRef(null);

  // Ensure loop continues even if the browser pauses it (e.g. tab switch).
  // Only honors a *user-initiated* pause — programmatic stops auto-resume.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const handleEnded = () => {
      v.currentTime = 0;
      v.play().catch(() => {});
    };

    v.addEventListener('ended', handleEnded);
    return () => v.removeEventListener('ended', handleEnded);
  }, []);

  return (
    <section id="route-map" className="relative overflow-hidden bg-g950 py-16 sm:py-24 noise">
      {/* Ambient glow accents matching the theme */}
      <div className="absolute top-1/4 left-[8%] w-56 h-56 rounded-full bg-g500/8 blur-[100px] glow-pulse" />
      <div
        className="absolute bottom-1/4 right-[10%] w-64 h-64 rounded-full bg-g400/8 blur-[110px] glow-pulse"
        style={{ animationDelay: '1.5s' }}
      />

      {/* Subtle grid backdrop */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,222,128,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,.03) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className={`${W} relative z-10`}>
        <Fade>
          <Head ey="Know Your Path" ti="ROUTE MAP" dark />
        </Fade>

        <Fade d={0.1}>
          <div className="mx-auto mt-10 max-w-5xl">
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-g500/10">
              {/* Corner accents */}
              <div className="pointer-events-none absolute top-3 left-3 z-20 h-8 w-8 border-t border-l border-g400/40 rounded-tl-lg" />
              <div className="pointer-events-none absolute top-3 right-3 z-20 h-8 w-8 border-t border-r border-g400/40 rounded-tr-lg" />
              <div className="pointer-events-none absolute bottom-3 left-3 z-20 h-8 w-8 border-b border-l border-g400/40 rounded-bl-lg" />
              <div className="pointer-events-none absolute bottom-3 right-3 z-20 h-8 w-8 border-b border-r border-g400/40 rounded-br-lg" />

              {/* LIVE-style badge */}
              <div className="pointer-events-none absolute top-4 left-1/2 z-20 -translate-x-1/2">
                <div className="flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1 backdrop-blur-sm border border-white/10">
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-g400"
                    style={{ animation: 'pulse-dot 1.5s infinite' }}
                  />
                  <span className="text-[9px] font-bold tracking-[0.2em] text-white/80">
                    OFFICIAL ROUTE
                  </span>
                </div>
              </div>

              <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                controls
                controlsList="nodownload"
                preload="auto"
                className="aspect-video w-full bg-black"
              >
                <source src="/videos/route-map.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Info chips below the video */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 backdrop-blur-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-g400/15">
                  <MapPin size={12} className="text-g400" />
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-bold uppercase tracking-wider text-white/40">Start &amp; Finish</p>
                  <p className="text-[11px] font-bold leading-none text-white">National College Ground</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 backdrop-blur-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-g400/15">
                  <Route size={12} className="text-g400" />
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-bold uppercase tracking-wider text-white/40">Distances</p>
                  <p className="text-[11px] font-bold leading-none text-white">3K · 5K · 10K</p>
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 backdrop-blur-sm">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-g400/15">
                  <Navigation size={12} className="text-g400" />
                </div>
                <div className="text-left">
                  <p className="text-[8px] font-bold uppercase tracking-wider text-white/40">Terrain</p>
                  <p className="text-[11px] font-bold leading-none text-white">Scenic Bengaluru</p>
                </div>
              </div>
            </div>

            <p className="mx-auto mt-6 max-w-xl text-center text-[11px] leading-relaxed text-white/45">
              Get a complete preview of the Green Circuit course — every turn, checkpoint, and finish-line moment, all in one immersive flythrough.
            </p>
          </div>
        </Fade>
      </div>
    </section>
  );
}


/* ═══ IMPACT ═══ */
/* ═══ IMPACT ═══ */
function Ctr({ to, pre = '', suf = '' }) {
  const r = useRef(null);
  const v = useInView(r, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!v) return;
    let c = 0;
    const s = Math.max(1, Math.floor(to / 80));
    const id = setInterval(() => {
      c += s;
      if (c >= to) { setN(to); clearInterval(id); }
      else setN(c);
    }, 16);
    return () => clearInterval(id);
  }, [v, to]);
  return (
    <span
      ref={r}
      className="font-head text-4xl sm:text-5xl text-g700 tabular-nums"
    >
      {pre}{n.toLocaleString()}{suf}
    </span>
  );
}

const ST = [
  { I: Users, v: 10000, s: '+', l: 'Participants' },
  { I: TreePine, v: 5000, s: '+', l: 'Trees Planted' },
  { I: Bike, v: 50, s: '+', l: 'Events' },
  { I: Award, v: 2, s: 'L', p: '₹', l: 'Prizes' },
];

function Impact() {
  return (
    <section id="impact" className="relative overflow-hidden bg-g50/40 py-16 sm:py-20">
      {/* Soft green ambient blobs */}
      <div className="pointer-events-none absolute -top-20 left-[10%] h-64 w-64 rounded-full bg-g400/15 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-20 right-[8%] h-72 w-72 rounded-full bg-g500/10 blur-[110px]" />

      {/* Subtle grid backdrop */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,222,128,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,.08) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className={`${W} relative z-10`}>
        <Fade>
          <Head ey="Making a Difference" ti="OUR IMPACT" />
        </Fade>

        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ST.map((s) => (
            <StaggerItem key={s.l}>
              <div className="group relative overflow-hidden rounded-2xl border border-g200/60 bg-gradient-to-br from-white via-white to-g50 p-6 text-center shadow-sm shadow-g500/5 transition-all duration-300 hover:-translate-y-1 hover:border-g400/50 hover:shadow-lg hover:shadow-g500/15">
                {/* Top gradient accent — always visible, brighter on hover */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-g400 via-g500 to-g400 opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Decorative corner glow */}
                <div className="pointer-events-none absolute -top-8 -right-8 h-20 w-20 rounded-full bg-g400/10 blur-2xl transition-opacity duration-300 group-hover:bg-g400/25" />

                <div className="relative mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-g100 to-g200/70 shadow-inner shadow-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <s.I className="h-6 w-6 text-g700" strokeWidth={2.2} />
                </div>

                <Ctr to={s.v} pre={s.p || ''} suf={s.s} />

                <p className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-g700/70">
                  {s.l}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ═══ SPONSORS ═══ */
const SP = [
  { n: 'Sponsor 1', img: '/images/sp_1.png' },
  { n: 'Sponsor 2', img: '/images/sp_2.jpg' },
  { n: 'Sponsor 3', img: '/images/sp_3.jpg' },
  { n: 'Sponsor 4', img: '/images/sp_4.png' },
  { n: 'Sponsor 5', img: '/images/sp_5.png' },
  { n: 'Sponsor 6', img: '/images/sp_6.jpg' },
  { n: 'Sponsor 7', img: '/images/sp_7.png' },
  { n: 'Sponsor 8', img: '/images/sp_8.png' },
  { n: 'Sponsor 9', img: '/images/sp_9.png' },
  { n: 'Sponsor 10', img: '/images/sp_10.png' },
  { n: 'Sponsor 11', img: '/images/sp_11.jpg' },
  { n: 'Sponsor 12', img: '/images/sp_12.png' },
  { n: 'Sponsor 13', img: '/images/sp_13.png' },
  { n: 'Sponsor 14', img: '/images/sp_14.jpg' },
  { n: 'Sponsor 15', img: '/images/sp_15.png' },
  { n: 'Sponsor 16', img: '/images/sp_16.jpg' },
  { n: 'Sponsor 17', img: '/images/sp_17.jpg' },
  { n: 'Sponsor 18', img: '/images/sp_18.jpg' },
  { n: 'Sponsor 19', img: '/images/sp_19.jpg' },
  { n: 'Sponsor 20', img: '/images/sp_20.png' },
];

function Sponsors() {
  return (
    <section id="sponsors" className="bg-g900 py-16 sm:py-20 relative overflow-hidden noise">
      <div className="absolute top-0 left-1/3 w-60 h-60 bg-g600/8 rounded-full blur-[100px]" />

      <div className={`${W} relative z-10`}>
        <Fade>
          <Head ey="Past Supporters" ti="OUR SPONSORS" dark />
        </Fade>

        <div className="overflow-hidden mt-8">
          <div
            className="mq-l flex w-max gap-4 items-center"
            style={{ animationDuration: '30s' }}
          >
            {[...SP, ...SP].map((s, i) => (
              <div
                key={`${s.n}-${i}`}
                className="rounded-xl p-4 flex items-center justify-center bg-white border border-white/20 shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer group min-w-[140px] h-[90px] sm:min-w-[180px] sm:h-[110px]"
              >
                <img
                  src={s.img}
                  alt={s.n}
                  className="max-h-[50px] sm:max-h-[65px] max-w-[110px] sm:max-w-[140px] object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
/* ═══ PAST EVENTS ═══ */
const PAST_EVENTS_LIST = [
  {
    id: 1,
    slug: 'cycle-street',
    tag: 'GC · 1st June 2024',
    title: 'Cycle Street',
    desc: 'Over 1,200 cyclists took to the streets of Bengaluru in our flagship Cycle Street edition, raising awareness for urban mobility and clean air.',
    img: '/images/cycle-street.png',
    participants: '1,200+',
    edition: '5th Edition',
  },
  {
    id: 2,
    slug: 'eco-miles',
    tag: 'GC · 1st June 2024',
    title: 'Eco Miles',
    desc: 'Runners crossed the finish line for the planet — 5,000 participants completed the eco-themed marathon across Cubbon Park and MG Road.',
    img: '/images/eco-miles.png',
    participants: '5,000+',
    edition: '4th Edition',
  },
];

const FEATURED_PAST = {
  date: 'Debits – 03 June 2023',
  headline: '"Introducing GreenCircuit — Featuring Our Exciting Walkathon And The Flagship 5th Edition Of The Cycle Street Event!"',
  img: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=80',
  participants: '8,700+',
  raised: '₹4.2L',
};

function PastEvents() {
  const [active, setActive] = useState(PAST_EVENTS_LIST[0]);

  return (
    <section id="past-events" className="relative overflow-hidden bg-white py-16 sm:py-24">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-g300/40 to-transparent" />

      <div className={W}>
        <Fade>
          <Head ey="A Look Back" ti="PAST EVENTS" />
        </Fade>

        <div className="mt-10 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-[1fr_1.15fr]">
          <div className="flex flex-col gap-4">
            {PAST_EVENTS_LIST.map((ev, i) => (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45, ease: [.25, .1, .25, 1] }}
                onClick={() => setActive(ev)}
                className={`group flex cursor-pointer gap-4 rounded-2xl border p-4 transition-all duration-300 ${
                  active.id === ev.id
                    ? 'border-g300 bg-g50 shadow-md shadow-g200/30'
                    : 'border-gray-100 bg-white hover:border-g200 hover:bg-g50/50 hover:shadow-sm'
                }`}
              >
                <div className="h-20 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-[#393186] sm:h-[84px] sm:w-28">
                  <img
                    src={ev.img}
                    alt={ev.title}
                    className="h-full w-full object-contain p-1.5 transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="min-w-0 flex flex-col justify-center">
                  <p className="mb-1 text-[9px] font-bold tracking-wider text-g600">{ev.tag}</p>
                  <h4 className="mb-1 font-head text-lg leading-tight tracking-wide text-gray-900">
                    {ev.title}
                  </h4>
                  <p className="line-clamp-2 text-[10px] leading-relaxed text-gray-400">
                    {ev.desc}
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <span className="flex items-center gap-1 text-[9px] font-bold text-g700">
                      <Users size={9} /> {ev.participants}
                    </span>
                    <span className="text-[9px] text-gray-300">·</span>
                    <span className="text-[9px] font-medium text-gray-400">{ev.edition}</span>
                  </div>
                </div>

                <div
                  className={`ml-auto h-10 w-1.5 flex-shrink-0 self-center rounded-full transition-all duration-300 ${
                    active.id === ev.id ? 'bg-g500' : 'bg-transparent'
                  }`}
                />
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-1"
            >
              <a
                href="#"
                className="group inline-flex items-center gap-1.5 text-[11px] font-bold text-g700 transition hover:text-g600"
              >
                {/* View all past events */}
              </a>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: [.25, .1, .25, 1] }}
              className="relative flex min-h-[420px] flex-col overflow-hidden rounded-2xl bg-g950"
            >
              <div className="absolute inset-0">
                <div className="flex h-full w-full items-center justify-center bg-g950">
                  <img
                    src={active.img}
                    alt={active.title}
                    className="h-full w-full object-contain p-8 opacity-25"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-g950 via-g950/80 to-g950/40" />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(74,222,128,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,.03) 1px,transparent 1px)',
                    backgroundSize: '32px 32px',
                  }}
                />
              </div>

              <div className="relative z-10 flex items-start justify-between p-6 pb-0">
                <div className="inline-flex items-center gap-2 rounded-lg border border-g400/20 bg-g400/5 px-3 py-1.5 backdrop-blur-sm">
                  <span className="font-head text-[11px] tracking-[0.25em] text-white">
                    GREEN CIRCUIT
                  </span>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-g400" />
                  <span className="text-[9px] font-bold tracking-wider text-white/60">
                    PAST EVENT
                  </span>
                </div>
              </div>

              <div className="relative z-10 flex flex-1 flex-col justify-end p-6">
                <p className="mb-3 text-[10px] font-bold tracking-wider text-g400">
                  {active.tag.replace('GC · ', 'GC — ')}
                </p>

                <h3 className="mb-5 font-head text-[clamp(1.5rem,3vw,2.2rem)] leading-[1.1] tracking-wide text-white">
                  "Celebrating <span className="text-g400">{active.title}</span> — {active.edition} of the Green Circuit event!"
                </h3>

                <div className="mb-5 flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2 backdrop-blur-sm">
                    <Users size={13} className="text-g400" />
                    <div>
                      <p className="text-[8px] font-bold tracking-wider text-white/30">PARTICIPANTS</p>
                      <p className="text-[13px] font-bold leading-none text-white">{active.participants}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2 backdrop-blur-sm">
                    <TreePine size={13} className="text-g400" />
                    <div>
                      <p className="text-[8px] font-bold tracking-wider text-white/30">EDITION</p>
                      <p className="text-[13px] font-bold leading-none text-white">{active.edition}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.06] px-3.5 py-2 backdrop-blur-sm">
                    <Trophy size={13} className="text-yellow-400" />
                    <div>
                      <p className="text-[8px] font-bold tracking-wider text-white/30">PRIZES GIVEN</p>
                      <p className="text-[13px] font-bold leading-none text-white">₹1.5L+</p>
                    </div>
                  </div>
                </div>

                <p className="mb-5 max-w-sm text-[11px] leading-relaxed text-white/40">
                  {active.desc}
                </p>

                <a
                  href={`/past-events/${active.slug}`}
                  className="group inline-flex self-start items-center gap-1.5 rounded-xl bg-g500 px-5 py-2.5 text-[11px] font-bold text-white shadow-lg shadow-g500/25 transition-all hover:bg-g400"
                >
                  View Highlights
                  <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

/* ═══ TESTIMONIALS ═══ */
const TE = [
  {
    n: 'Priya S.',
    r: 'Runner',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80',
    t: "Most organized and inspiring event I've ever been to. The energy was electric!",
  },
  {
    n: 'Arjun R.',
    r: 'Cyclist',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80',
    t: "Amazing route, great community. Can't wait for the next one!",
  },
  {
    n: 'Sneha K.',
    r: 'Volunteer',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&q=80',
    t: 'Volunteering here was transformative. The impact is truly remarkable.',
  },
];

function Testimonials() {
  return (
    <section className="bg-g950 py-16 sm:py-20 relative overflow-hidden noise">
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-g500/8 rounded-full blur-[80px]" />
      <div className={`${W} relative z-10`}>
        <Fade>
          <Head ey="Wall of Love" ti="TESTIMONIALS" dark />
        </Fade>
        <Fade d={0.08}>
          <div className="max-w-4xl mx-auto mb-8">
            <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:bg-white/[0.08] transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_.8fr]">
                <div className="relative min-h-[260px] md:min-h-[320px] bg-black">
                  <video
                    controls preload="metadata"
                    poster="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80"
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/testimonial-feedback.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur text-white text-[10px] font-bold tracking-wider">VIDEO FEEDBACK</div>
                </div>
                <div className="p-5 sm:p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <Quote className="w-5 h-5 text-g400/30" />
                    <span className="text-g400 text-[10px] font-bold tracking-[0.2em] uppercase">Featured Story</span>
                  </div>
                  <h3 className="font-head text-2xl text-white tracking-wide mb-2">Hear it from our participants</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-5">Watch a real participant share their Green Circuit experience, the event atmosphere, and how the run inspired them to support a greener tomorrow.</p>
                  <div className="flex items-center gap-3">
                    <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80" alt="Featured participant" className="w-11 h-11 rounded-full object-cover ring-2 ring-g400/20" />
                    <div>
                      <p className="text-white text-sm font-bold">Priya S.</p>
                      <p className="text-white/30 text-[10px]">Runner · Featured video feedback</p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mt-4">
                    {[...Array(5)].map((_, j) => <Star key={j} size={10} className="text-yellow-400 fill-yellow-400" />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {TE.map((t) => (
            <StaggerItem key={t.n}>
              <div className="glass rounded-xl p-5 hover:bg-white/[0.08] transition-all duration-300 h-full">
                <Quote className="w-5 h-5 text-g400/20 mb-3" />
                <p className="text-white/50 text-[11px] leading-relaxed mb-4">"{t.t}"</p>
                <div className="flex items-center gap-2">
                  <img src={t.img} alt={t.n} className="w-8 h-8 rounded-full object-cover ring-2 ring-g400/20" />
                  <div>
                    <p className="text-white text-[11px] font-bold">{t.n}</p>
                    <p className="text-white/30 text-[8px]">{t.r}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, j) => <Star key={j} size={9} className="text-yellow-400 fill-yellow-400" />)}
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

/* ═══ CTA BANNER ═══ */
function CtaBanner() {
  return (
    <section className="relative bg-g950 py-14 overflow-hidden noise">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,.03) 10px,rgba(255,255,255,.03) 20px)' }} />
      <div className="absolute left-[10%] top-1/2 -translate-y-1/2 w-40 h-40 bg-g400/10 rounded-full blur-[60px]" />
      <div className="absolute right-[10%] top-1/2 -translate-y-1/2 w-32 h-32 bg-g400/8 rounded-full blur-[50px]" />
      <div className={`${W} text-center relative z-10`}>
        <Fade>
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 mb-4 wiggle">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <h2 className="font-head text-4xl sm:text-5xl text-white mb-2 tracking-wide">READY TO RUN?</h2>
          <p className="text-white/80 text-xs mb-6">Join 5000+ runners. Limited spots available.</p>
          <a href="#events" className="inline-flex items-center gap-1.5 px-7 py-3 rounded-xl bg-white text-g800 text-xs font-bold hover:bg-g100 transition shadow-xl breathe">
            <Footprints size={14} /> Register Now <ArrowRight size={12} />
          </a>
        </Fade>
      </div>
    </section>
  );
}

/* ═══ SPONSOR TIERS ═══ */
const FT = [
  'Print on Bibs',
  'Print on Tickets',
  'Print on Certificates',
  'Print on GC 26 Arch',
  'Mention on Website',
  'YouTube+Instagram Page Flashmob',
  'Mention on the Stage Arch',
  '3 exclusive stage feature slots (20 minutes each)',
  'Mention on Banners - 3K, 5K, 10K',
  'Exhibition Stall',
  'Coffee Table Book',
  'Powered by Title',
]

const TI = [
  {
    n: 'DIAMOND',
    p: 'CONTACT FOR MORE INFO',
    freq: 'Premium',
    cat: 'Title Partner',
    I: Gem,
    bg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
    pop: false,
    wa: 'https://wa.link/sz88e6',
    f: [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      '1 Stall (10 ft × 20 ft)',
      true,
      true,
    ],
  },
  {
    n: 'PLATINUM',
    p: 'CONTACT FOR MORE INFO',
    freq: 'Top Tier',
    cat: 'Main Sponsor',
    I: Crown,
    bg: 'bg-gradient-to-br from-blue-600 to-indigo-700',
    pop: true,
    wa: 'https://wa.link/2ncnxx',
    f: [
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      true,
      '1 Stall (10 ft × 10 ft)',
      true,
      false,
    ],
  },
  {
    n: 'GOLD',
    p: 'CONTACT FOR MORE INFO',
    freq: 'Gold Tier',
    cat: 'Event Sponsor',
    I: Trophy,
    bg: 'bg-gradient-to-br from-amber-400 to-yellow-600',
    pop: false,
    wa: 'https://wa.link/lhkvij',
    f: [
      true,
      false,
      false,
      true,
      true,
      false,
      true,
      false,
      true,
      '1 Stall',
      true,
      false,
    ],
  },
  {
    n: 'SILVER',
    p: 'CONTACT FOR MORE INFO',
    freq: 'Silver Tier',
    cat: 'Supporting Sponsor',
    I: Shield,
    bg: 'bg-gradient-to-br from-slate-400 to-gray-600',
    pop: false,
    wa: 'https://wa.link/x6r46h',
    f: [
      true,
      false,
      false,
      false,
      true,
      false,
      true,
      false,
      true,
      '1 Stall',
      true,
      false,
    ],
  },
  {
    n: 'BRONZE',
    p: 'CONTACT FOR MORE INFO',
    freq: 'Bronze Tier',
    cat: 'Brand Partner',
    I: Star,
    bg: 'bg-gradient-to-br from-orange-500 to-amber-700',
    pop: false,
    wa: 'https://wa.link/43van4',
    f: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      '1 Stall',
      true,
      false,
    ],
  },
  {
    n: 'ASSOCIATE',
    p: 'CONTACT FOR MORE INFO',
    freq: 'Associate Tier',
    cat: 'Community Sponsor',
    I: Users,
    bg: 'bg-gradient-to-br from-fuchsia-600 to-violet-700',
    pop: false,
    wa: 'https://wa.link/nc38oi',
    f: [
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      false,
      true,
      false,
    ],
  },
]

function SponsorTiers() {
  return (
    <section id="sponsor" className="relative overflow-hidden py-20 sm:py-28 noise">
      <div className="absolute inset-0 bg-gradient-to-b from-g900 via-g950 to-black" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,222,128,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,.03) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-20 left-[15%] h-48 w-48 rounded-full bg-g500/8 blur-[80px] glow-pulse" />
      <div
        className="absolute bottom-20 right-[10%] h-64 w-64 rounded-full bg-cyan-500/5 blur-[100px] glow-pulse"
        style={{ animationDelay: '1.5s' }}
      />

      <div className={`${W} relative z-10`}>
        <Fade>
          <div className="mb-6 text-center">
            <div className="glass mb-5 inline-flex items-center gap-2 rounded-full px-3 py-1">
              <Sparkles size={10} className="text-g400" />
              <span className="text-[9px] font-bold tracking-wider text-g400">
                SPONSORSHIP OPPORTUNITIES
              </span>
            </div>
            <h2 className="font-head text-[clamp(2.5rem,6vw,4.5rem)] leading-none tracking-wide text-white">
              BECOME A <span className="shimmer">SPONSOR</span>
            </h2>
            <p className="mx-auto mt-4 max-w-md text-xs leading-relaxed text-white/25 sm:text-sm">
              Support sustainability, boost your brand, and engage with 5000+ eco-conscious athletes.
            </p>
          </div>
        </Fade>

        <Fade d={0.1}>
          <div className="mb-12 flex justify-center">
            <div className="glass inline-flex items-center gap-3 rounded-full px-5 py-2.5">
              <Heart className="h-4 w-4 text-g400" />
              <span className="text-[10px] font-bold text-white/50">
                Join us in creating a <span className="text-g400">greener future</span>
              </span>
            </div>
          </div>
        </Fade>

        <Stagger className="grid items-stretch gap-6 pt-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {TI.map((t) => (
    <StaggerItem key={t.n} className="h-full">
      <div className="relative h-full">
        {t.pop && (
          <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-1 rounded-full bg-g500 px-4 py-1 text-[8px] font-bold tracking-wider text-white shadow-lg shadow-g500/30">
              <Sparkles size={8} />
              MOST POPULAR
            </div>
          </div>
        )}

        <div
          className={`relative flex h-full flex-col overflow-hidden rounded-2xl border transition-all duration-300 ${
            t.pop
              ? 'border-g400 bg-gradient-to-b from-white to-g50 shadow-2xl shadow-g400/15'
              : 'border-white/10 bg-white shadow-xl hover:-translate-y-1 hover:shadow-2xl'
          }`}
        >
          {t.pop && (
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-g400 via-g500 to-g400" />
          )}

          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="mb-4 pt-3 text-center">
              <div
                className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${t.bg} shadow-lg`}
              >
                <t.I className="h-5 w-5 text-white" />
              </div>

              <h3 className="font-head text-xl tracking-wider text-gray-900">
                {t.n}
              </h3>

              <p className="font-head mt-2 text-[2rem] leading-none text-g700">
                {t.p}
              </p>

              <p className="mt-2 text-[10px] font-medium leading-snug text-gray-400">
                {t.freq} · {t.cat}
              </p>
            </div>

            <div className="mb-5 h-px w-full bg-gray-100" />

            <div className="mb-6 flex-1 space-y-3">
              {FT.map((f, j) => {
                const value = t.f[j];
                const isAvailable =
                  value === true ||
                  typeof value === 'number' ||
                  typeof value === 'string';

                return (
                  <div key={f} className="flex items-start gap-2.5 text-[12px] leading-snug">
                    <div
                      className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
                        isAvailable ? 'bg-g500/10' : 'bg-gray-50'
                      }`}
                    >
                      {isAvailable ? (
                        <Check size={9} className="text-g600" />
                      ) : (
                        <span className="text-[8px] text-gray-200">✕</span>
                      )}
                    </div>

                    <span className={isAvailable ? 'font-medium text-gray-600' : 'text-gray-200'}>
                      {typeof value === 'string'
                        ? value
                        : typeof value === 'number'
                        ? `${value} ${f}`
                        : f}
                    </span>
                  </div>
                );
              })}
            </div>

            <a
              href={t.wa}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-auto w-full rounded-xl py-3 text-center text-[12px] font-bold transition-all duration-300 ${
                t.pop
                  ? 'breathe bg-g600 text-white shadow-lg shadow-g600/20 hover:bg-g700'
                  : 'border-2 border-g600 text-g700 hover:bg-g600 hover:text-white hover:shadow-lg'
              }`}
            >
              Join as Sponsor <ArrowRight size={11} className="ml-1 inline" />
            </a>
          </div>
        </div>
      </div>
    </StaggerItem>
  ))}
</Stagger>

        <Fade d={0.3}>
          <div className="mt-12 text-center">
            <p className="mb-3 text-[10px] text-white">Need a custom package?</p>
            <a
              href="mailto:info@greencircuit.in"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-g400 transition hover:text-g300"
            >
              Contact us{' '}
              <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Fade>
      </div>
    </section>
  );
}
/* ═══ FAQ ═══ */
const QA = [
  { q: 'What is Green Circuit?', a: 'Bengaluru\'s biggest eco-sports event — marathon, cycling, and fun run combined for a greener future. Over 5000+ participants expected.' },
  { q: 'When & where is the event?', a: 'June 14th @ national college grounds basavangudi' },
  { q: 'How do I register?', a: 'Hit "Register Now" on any event card above. You\'ll be redirected to our ticketing partner once the link is live.' },
  { q: 'What are the age requirements?', a: 'Marathon 10K: 16+, Marathon 5K: 12+, Cyclotron: 18+, Funathon: All ages welcome (under 12 with an adult).' },
  { q: 'Is there a refund policy?', a: 'Refund Policy will update soon' },
  { q: 'What\'s included with registration?', a: 'Race bib, event t-shirt, finisher medal, refreshments on route, certificate of participation, and post-event celebration access.' },
];

function Faq() {
  const [o, setO] = useState(0);

  return (
    <section id="faq" className="relative overflow-hidden bg-g900 py-20 sm:py-24">
      <div className="absolute inset-0 noise" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-g400/15 to-transparent" />
      <div className="absolute left-[8%] top-24 h-52 w-52 rounded-full bg-g500/10 blur-[100px]" />
      <div className="absolute bottom-10 right-[8%] h-64 w-64 rounded-full bg-g700/10 blur-[120px]" />

      <div className={`${W} relative z-10`}>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <Fade>
            <div className="lg:sticky lg:top-24 self-start">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full glass px-3 py-1">
                <span className="text-[9px] font-bold tracking-wider text-g400">NEED HELP?</span>
              </div>

              <h2 className="font-head text-[clamp(2.5rem,5vw,4rem)] leading-none tracking-wide text-white">
                FREQUENTLY ASKED
                <br />
                <span className="shimmer">QUESTIONS</span>
              </h2>

              <p className="mt-5 max-w-md text-sm leading-relaxed text-white/45">
                Everything you need to know about Green Circuit — registration, eligibility, venue details, and what you get on event day.
              </p>

              <div className="mt-8 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-sm">
                <p className="text-[10px] font-bold tracking-[0.2em] text-g400">STILL NEED HELP?</p>
                <p className="mt-2 text-sm leading-relaxed text-white/45">
                  Reach out to our team and we’ll help you with registration, sponsorship, or participant queries.
                </p>

                <a
                  href="mailto:info@greencircuit.in"
                  className="group mt-5 inline-flex items-center gap-2 rounded-xl bg-g500 px-4 py-2.5 text-xs font-bold text-white transition hover:bg-g400"
                >
                  <Mail size={13} />
                  Contact Support
                  <ArrowRight size={11} className="transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </Fade>

          <Stagger className="flex flex-col gap-4">
            {QA.map((q, i) => (
              <StaggerItem key={i}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                    o === i
                      ? 'border-g400/20 bg-g800/80 shadow-lg shadow-g400/5'
                      : 'border-white/[0.06] bg-white/[0.03] hover:border-white/[0.1] hover:bg-white/[0.05]'
                  }`}
                >
                  <button
                    onClick={() => setO(o === i ? -1 : i)}
                    className="group flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                          o === i ? 'bg-g500 shadow-md shadow-g500/25' : 'bg-white/[0.05]'
                        }`}
                      >
                        <span className={`font-head text-sm ${o === i ? 'text-white' : 'text-white/35'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div>
                        <h3
                          className={`text-sm font-semibold leading-snug transition-colors duration-300 sm:text-[15px] ${
                            o === i ? 'text-g400' : 'text-white/80 group-hover:text-white'
                          }`}
                        >
                          {q.q}
                        </h3>

                        <p className="mt-1 text-[11px] text-white/25">
                          Click to {o === i ? 'collapse' : 'expand'}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        o === i ? 'rotate-180 bg-g400/15' : 'bg-white/[0.05]'
                      }`}
                    >
                      <ChevronDown size={15} className={o === i ? 'text-g400' : 'text-white/25'} />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {o === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [.25, .1, .25, 1] }}
                      >
                        <div className="px-5 pb-5 pl-[76px] pr-5 sm:px-6 sm:pb-6 sm:pl-[88px]">
                          <div className="h-px w-full bg-gradient-to-r from-white/10 via-white/5 to-transparent mb-4" />
                          <p className="text-[12px] leading-relaxed text-white/50 sm:text-[13px]">
                            {q.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
const SOCIALS = [
  { name: 'Facebook', href: 'https://www.facebook.com/share/1DavMRpSM6/', icon: '/images/Facebook 1.png' },
  { name: 'Instagram', href: 'https://www.instagram.com/greencircuit.blr?igsh=MW15OXJ3MGg0eDZw', icon: '/images/Instagram_1.png' },
  { name: 'YouTube', href: '#', icon: '/images/linkedin-1.png' },
];

export function Footer() {
  return (
    <footer className="bg-g950 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-g400/15 to-transparent" />

      <div className={`${W} pt-16`}>
        <Fade>
          <div className="rounded-2xl bg-gradient-to-r from-g800 to-g900 border border-g700/30 p-6 sm:p-10 mb-14 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="w-full lg:w-auto">
                <h3 className="font-head text-2xl sm:text-3xl text-white tracking-wider mb-2">
                  STAY IN THE LOOP
                </h3>
                <p className="text-white/55 text-sm sm:text-base max-w-md">
                  Get updates about events, sponsorship, and opportunities.
                </p>
              </div>

              <div className="w-full lg:w-auto">
                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full sm:min-w-[280px] lg:w-[320px] px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-g400/40 focus:bg-white/[0.08] transition"
                  />
                  <button className="w-full sm:w-auto px-6 py-3 bg-g500 text-white text-sm font-bold rounded-xl hover:bg-g400 transition-all shadow-lg shadow-g500/20 whitespace-nowrap">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </div>

      <div className={`${W} pb-8`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/images/GC.png"
                alt="Green Circuit"
                className="h-7 sm:h-8 w-auto object-contain shrink-0"
              />
              <span className="flex items-center leading-none font-head text-lg sm:text-xl tracking-wider text-white">
                GREEN <span className="text-g400 ml-1">CIRCUIT</span>
              </span>
            </div>

            <p className="text-white/40 text-sm leading-relaxed mb-5">
              Bengaluru&apos;s premier eco-sports event for a greener tomorrow.
            </p>

            <div className="flex gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  aria-label={s.name}
                  className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center hover:border-g400/30 hover:bg-g400/10 transition-all group"
                >
                  <img
                    src={s.icon}
                    alt={s.name}
                    className="w-4 h-4 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-head text-base text-white tracking-wider mb-4">EVENTS</h4>
            <div className="flex flex-col gap-2.5">
              {['EcoMiles — 10K & 5K & 3K', 'CycleStreet — 5K Ride', 'Funathon — Fun Run'].map((l) => (
                <a key={l} href="#events" className="text-white/40 text-sm hover:text-g400 transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-head text-base text-white tracking-wider mb-4">COMPANY</h4>
            <div className="flex flex-col gap-2.5">
              {['About Us', 'Become a Sponsor', 'Privacy Policy', 'Terms & Conditions'].map((l) => (
                <a key={l} href="#" className="text-white/40 text-sm hover:text-g400 transition-colors">
                  {l}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-head text-base text-white tracking-wider mb-4">CONTACT</h4>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:info@greencircuit.in"
                className="text-white/40 text-sm flex items-center gap-2.5 hover:text-g400 transition-colors"
              >
                <Mail size={14} className="text-g400/60 flex-shrink-0" />
                info@greencircuit.in
              </a>

              <a
                href="tel:+91 8123452323"
                className="text-white/40 text-sm flex items-center gap-2.5 hover:text-g400 transition-colors"
              >
                <Phone size={14} className="text-g400/60 flex-shrink-0" />
                +91 8123452323
              </a>

              <span className="text-white/40 text-sm flex items-center gap-2.5">
                <MapPin size={14} className="text-g400/60 flex-shrink-0" />
                Bengaluru, Karnataka, India
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-white/25 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Green Circuit. All rights reserved.
          </p>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-9 h-9 rounded-xl bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-g400 hover:bg-g400/10 hover:border-g400/30 transition-all group"
          >
            <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}

/* ═══ HOME PAGE ═══ */
const M1 = [' ECOMILES', ' CYCLESTREET', 'FUNATHON', ' ₹2L PRIZE POOL', ' BENGALURU', ' JUNE 14, 2026', ' 1000+ RUNNERS', ' GO GREEN', ' LIMITED SPOTS'];
const M2 = ['REGISTER NOW →', 'RUN FOR A CAUSE', 'PEDAL FOR THE PLANET', 'MAKE AN IMPACT', 'JOIN THE MOVEMENT', 'ACT NOW', 'BE THE CHANGE', 'GREEN IS THE NEW GOLD'];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee items={M1} bg="bg-g700" speed="22s" />
      <Events />
      <EventHighlights />
       <Marquee items={M2} dir="r" bg="bg-g950" speed="28s" />
      <Impact />
      <RouteMap />
     
      <SponsorTiers />
      
      <Sponsors />
      {/* <Testimonials /> */}
      <Marquee items={M1} bg="bg-g800" speed="18s" />
      <PastEvents />
      <Faq />
      <Footer />
      <WhatsAppButton />
    </>
  );
}