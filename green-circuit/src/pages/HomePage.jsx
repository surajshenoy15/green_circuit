import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, useInView, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
  Menu, X, Users, Download, Trophy, CalendarDays, MapPin,
  Footprints, Bike, PartyPopper, ArrowRight, Clock, TreePine, Award,
  Star, Quote, Check, Medal, Crown, Gem, ChevronDown, Mail, Phone,
  ArrowUp, Zap, Timer, Flame, Heart, Sparkles
} from 'lucide-react';
import { W, Stagger, StaggerItem, Fade, Head } from '../components/shared';

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
const NAV = [['Events', '#events'], ['Impact', '#impact'], ['Sponsors', '#sponsors'], ['FAQ', '#faq']];

function Navbar() {
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
          <span
            className={`flex items-center leading-none font-head text-base sm:text-lg tracking-wider transition-colors duration-300 ${
              s ? 'text-gray-900' : 'text-white'
            }`}
          >
            GREEN <span className={s ? 'text-g700' : 'text-g400'} ml-1>CIRCUIT</span>
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

        <button onClick={() => setM(!m)} className={`md:hidden ${s ? 'text-gray-800' : 'text-white'}`}>
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
  const cd = useCD('2026-06-01T06:00:00+05:30');
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.35], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const d = (del) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: del, duration: 0.5, ease: [.25,.1,.25,1] } });

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-g950 noise">
      <motion.div style={{ y }} className="absolute inset-0">
        <video
  autoPlay
  muted
  loop
  playsInline
  preload="auto"
  className="w-full h-full object-cover opacity-25 zoom-bg"
  poster="https://images.unsplash.com/photo-1596727147705-61a532a659bd?w=1920&q=80"
>
  <source
    src="https://www.w3schools.com/howto/rain.mp4"
    type="video/mp4"
  />
</video>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-g950/50 via-transparent to-g950" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-g950 to-transparent" />
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(74,222,128,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,.04) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />
      <div className="absolute top-20 left-6 w-12 h-12 border-t border-l border-g400/15 hidden lg:block" />
      <div className="absolute bottom-20 right-6 w-12 h-12 border-b border-r border-g400/15 hidden lg:block" />
      <div className="absolute top-1/4 left-[10%] w-48 h-48 rounded-full bg-g500/5 blur-[60px] glow-pulse" />
      <div className="absolute bottom-1/3 right-[15%] w-36 h-36 rounded-full bg-g400/5 blur-[50px] glow-pulse" style={{ animationDelay: '1.5s' }} />

      <motion.div style={{ opacity }} className="relative z-10 w-full text-center pt-24 pb-16 px-5">
        <motion.div {...d(0.1)} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-g400" style={{ animation: 'pulse-dot 1.5s infinite' }} />
          <span className="text-g400 text-[10px] font-bold tracking-wider">REGISTRATIONS OPEN</span>
          <Sparkles size={10} className="text-g400/50" />
        </motion.div>

        <motion.h1 {...d(0.25)} className="font-head text-[clamp(3rem,10vw,9rem)] leading-[0.9] tracking-wide max-w-5xl mx-auto mb-5">
          <span className="text-white">GREEN CIRCUIT:</span><br />
          <span className="shimmer">ACT NOW</span><br />
          <span className="text-white">FOR A </span><span className="text-g400">BETTER</span><br />
          <span className="text-g400">TOMORROW!</span>
        </motion.h1>

        <motion.p {...d(0.4)} className="text-white/35 text-xs sm:text-sm max-w-md mx-auto mb-8 leading-relaxed">
          Bengaluru's biggest eco-sports event. Run, ride, and make an impact for a greener future.
        </motion.p>

        <motion.div {...d(0.5)} className="flex flex-wrap justify-center gap-2.5 mb-12">
          <a href="#events" className="group relative inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-g500 text-white text-xs font-bold hover:bg-g600 transition-all shadow-lg shadow-g500/20 breathe overflow-hidden">
            <span className="relative z-10 flex items-center gap-1.5"><Flame size={13} /> Register Now</span>
          </a>
          <a href="#" className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg text-white/70 text-xs font-bold glass hover:bg-white/10 transition">
            <Download size={13} /> Brochure
          </a>
        </motion.div>

        <motion.div {...d(0.6)}>
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <Timer size={11} className="text-g400/50" />
            <p className="text-[8px] text-white/80 uppercase tracking-[0.3em] font-bold">Countdown to race day</p>
          </div>
          <div className="flex justify-center gap-2.5 sm:gap-3 mb-10">
            <Dig v={cd.d} l="Days" /><Dig v={cd.h} l="Hours" /><Dig v={cd.m} l="Mins" /><Dig v={cd.s} l="Secs" />
          </div>
        </motion.div>

        <motion.div {...d(0.75)} className="inline-flex items-center gap-3 px-5 py-3 rounded-xl glass">
          <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center float">
            <Trophy className="w-5 h-5 text-yellow-400" />
          </div>
          <div className="text-left">
            <p className="text-[7px] text-white/20 uppercase tracking-[0.2em] font-bold">Total Prize Pool</p>
            <p className="font-head text-[1.7rem] text-g400 leading-none" style={{ textShadow: '0 0 25px rgba(74,222,128,.25)' }}>₹2,00,000</p>
          </div>
        </motion.div>

        <motion.div {...d(0.85)} className="flex flex-wrap justify-center gap-5 mt-6 text-[9px] text-white/20 font-medium">
          <span className="flex items-center gap-1"><CalendarDays size={10} className="text-g400/60" />June 1, 2025</span>
          <span className="flex items-center gap-1"><MapPin size={10} className="text-g400/60" />Bengaluru</span>
          <span className="flex items-center gap-1"><Users size={10} className="text-g400/60" />5000+ Runners</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══ EVENTS ═══ */
const EV = [
  { t: 'Marathon', tag: '10K & 5K', I: Footprints, img: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80', d: 'Push your limits on Bengaluru\'s greenest route through Cubbon Park.', loc: 'Cubbon Park', cap: '2000+', price: '₹499' },
  { t: 'Cyclotron', tag: '30K Ride', I: Bike, img: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80', d: 'Pedal for the planet through iconic landscapes starting from Lalbagh.', loc: 'Lalbagh Gate', cap: '1500+', price: '₹699' },
  { t: 'Funathon', tag: 'Fun Run', I: PartyPopper, img: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80', d: 'A fun-filled celebration for the whole family at Freedom Park.', loc: 'Freedom Park', cap: '3000+', price: '₹299' },
];

function Events() {
  return (
    <section id="events" className="bg-white py-16 sm:py-20">
      <div className={W}>
        <Fade><Head ey="Choose Your Challenge" ti="OUR EVENTS" /></Fade>
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {EV.map((e) => (
            <StaggerItem key={e.t}>
              <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden lift flex flex-col h-full">
                <div className="relative h-48 overflow-hidden">
                  <img src={e.img} alt={e.t} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3 flex items-center gap-1 px-2.5 py-1 bg-white/95 backdrop-blur rounded-full shadow-sm">
                    <e.I size={10} className="text-g700" /><span className="text-[9px] font-bold text-g700">{e.tag}</span>
                  </div>
                  <div className="absolute top-3 right-3 px-2.5 py-1 bg-g600 text-white text-[10px] font-bold rounded-full shadow-lg">{e.price}</div>
                  <div className="absolute bottom-3 left-3 right-3 flex gap-3 text-white/80 text-[9px] font-medium">
                    <span className="flex items-center gap-1"><MapPin size={9} />{e.loc}</span>
                    <span className="flex items-center gap-1"><Users size={9} />{e.cap}</span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-head text-2xl text-gray-900 tracking-wide mb-1">{e.t}</h3>
                  <p className="text-gray-400 text-[11px] leading-relaxed mb-5 flex-1">{e.d}</p>
                  <a href="#" className="flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-g600 text-white text-[11px] font-bold hover:bg-g700 transition-all group/b shadow-md shadow-g600/15">
                    Register Now <ArrowRight size={12} className="group-hover/b:translate-x-1 transition-transform" />
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

/* ═══ IMPACT ═══ */
function Ctr({ to, pre = '', suf = '' }) {
  const r = useRef(null); const v = useInView(r, { once: true }); const [n, setN] = useState(0);
  useEffect(() => { if (!v) return; let c = 0; const s = Math.max(1, Math.floor(to / 80)); const id = setInterval(() => { c += s; if (c >= to) { setN(to); clearInterval(id); } else setN(c); }, 16); return () => clearInterval(id); }, [v, to]);
  return <span ref={r} className="font-head text-4xl sm:text-5xl text-g400 tabular-nums" style={{ textShadow: '0 0 20px rgba(74,222,128,.2)' }}>{pre}{n.toLocaleString()}{suf}</span>;
}
const ST = [{ I: Users, v: 15000, s: '+', l: 'Participants' }, { I: TreePine, v: 5000, s: '+', l: 'Trees Planted' }, { I: Bike, v: 50, s: '+', l: 'Events' }, { I: Award, v: 10, s: 'L+', p: '₹', l: 'Prizes' }];

function Impact() {
  return (
    <section id="impact" className="bg-g950 py-16 sm:py-20 relative overflow-hidden noise">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-g600/10 rounded-full blur-[100px]" />
      <div className={`${W} relative z-10`}>
        <Fade><Head ey="Making a Difference" ti="OUR IMPACT" dark /></Fade>
        <Stagger className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {ST.map((s) => (
            <StaggerItem key={s.l}>
              <div className="glass rounded-2xl p-6 text-center hover:bg-white/[0.08] transition-all duration-300 group">
                <div className="w-10 h-10 rounded-xl bg-g400/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <s.I className="w-5 h-5 text-g400" />
                </div>
                <Ctr to={s.v} pre={s.p || ''} suf={s.s} />
                <p className="text-white/30 text-[10px] mt-1.5 font-medium">{s.l}</p>
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
  { n: 'Friends of Nature', i: '🐅' }, { n: "Vasundaraa's Farms", i: '🌾' },
  { n: 'Decathlon', i: '🏅' }, { n: 'Manipal Hospitals', i: '🏥' },
  { n: 'United Hospitals', i: '❤️' }, { n: 'Sparsh Hospital', i: '🩺' },
];

function Sponsors() {
  return (
    <section id="sponsors" className="bg-g950 py-16 sm:py-20 relative overflow-hidden noise">
      <div className="absolute top-0 left-1/3 w-60 h-60 bg-g600/8 rounded-full blur-[100px]" />
      <div className={`${W} relative z-10`}>
        <Fade><Head ey="Past Supporters" ti="OUR SPONSORS" dark /></Fade>
        <Stagger className="grid grid-cols-3 sm:grid-cols-6 gap-3 max-w-2xl mx-auto">
          {SP.map((s) => (
            <StaggerItem key={s.n}>
              <div className="glass rounded-xl p-4 text-center hover:bg-white/[0.08] transition-all duration-300 cursor-pointer group">
                <span className="text-2xl block mb-2 group-hover:scale-125 transition-transform duration-300">{s.i}</span>
                <p className="text-white/70 text-[9px] font-bold leading-tight">{s.n}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
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
    <section className="bg-g900 py-16 sm:py-20 relative overflow-hidden noise">
      <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-g500/8 rounded-full blur-[80px]" />

      <div className={`${W} relative z-10`}>
        <Fade>
          <Head ey="Wall of Love" ti="TESTIMONIALS" dark />
        </Fade>

        {/* Featured video testimonial */}
        <Fade d={0.08}>
          <div className="max-w-4xl mx-auto mb-8">
            <div className="glass rounded-2xl overflow-hidden border border-white/10 hover:bg-white/[0.08] transition-all duration-300">
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_.8fr]">
                <div className="relative min-h-[260px] md:min-h-[320px] bg-black">
                  <video
                    controls
                    preload="metadata"
                    poster="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=1200&q=80"
                    className="w-full h-full object-cover"
                  >
                    <source src="/videos/testimonial-feedback.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur text-white text-[10px] font-bold tracking-wider">
                    VIDEO FEEDBACK
                  </div>
                </div>

                <div className="p-5 sm:p-6 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-3">
                    <Quote className="w-5 h-5 text-g400/30" />
                    <span className="text-g400 text-[10px] font-bold tracking-[0.2em] uppercase">
                      Featured Story
                    </span>
                  </div>

                  <h3 className="font-head text-2xl text-white tracking-wide mb-2">
                    Hear it from our participants
                  </h3>

                  <p className="text-white/50 text-sm leading-relaxed mb-5">
                    Watch a real participant share their Green Circuit experience, the event atmosphere,
                    and how the run inspired them to support a greener tomorrow.
                  </p>

                  <div className="flex items-center gap-3">
                    <img
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&q=80"
                      alt="Featured participant"
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-g400/20"
                    />
                    <div>
                      <p className="text-white text-sm font-bold">Priya S.</p>
                      <p className="text-white/30 text-[10px]">Runner · Featured video feedback</p>
                    </div>
                  </div>

                  <div className="flex gap-0.5 mt-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={10} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>

        {/* Regular testimonial cards */}
        <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {TE.map((t) => (
            <StaggerItem key={t.n}>
              <div className="glass rounded-xl p-5 hover:bg-white/[0.08] transition-all duration-300 h-full">
                <Quote className="w-5 h-5 text-g400/20 mb-3" />
                <p className="text-white/50 text-[11px] leading-relaxed mb-4">
                  "{t.t}"
                </p>

                <div className="flex items-center gap-2">
                  <img
                    src={t.img}
                    alt={t.n}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-g400/20"
                  />
                  <div>
                    <p className="text-white text-[11px] font-bold">{t.n}</p>
                    <p className="text-white/30 text-[8px]">{t.r}</p>
                  </div>
                </div>

                <div className="flex gap-0.5 mt-2">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={9} className="text-yellow-400 fill-yellow-400" />
                  ))}
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
          <p className="text-white/30 text-xs mb-6">Join 5000+ runners. Limited spots available.</p>
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
  'Title Sponsor',
  'Event Sponsor',
  'Logo on Certificate',
  'Logo on Tickets',
  'Event Sponsors',
  'Logo on Banner',
  'Logo on Website',
  'Logo on Socials',
  'Advertisement',
  'Stalls',
];

const TI = [
  {
    n: 'SILVER',
    p: '₹50,000',
    I: Medal,
    bg: 'bg-gray-400',
    glow: '',
    freq: 'Every 1 Hr',
    cat: 'Corporate',
    f: [0, 0, 0, 1, 1, 0, 1, 1, 0, 0],
  },
  {
    n: 'GOLD',
    p: '₹75,000',
    I: Award,
    bg: 'bg-yellow-500',
    glow: 'shadow-yellow-500/10',
    freq: 'Every 30 Mins',
    cat: 'Corporate',
    f: [0, 0, 1, 1, 1, 1, 1, 1, 1, 0],
  },
  {
    n: 'PLATINUM',
    p: '₹1,00,000',
    I: Crown,
    bg: 'bg-cyan-400',
    glow: 'shadow-cyan-400/20',
    freq: 'Every 20 Mins',
    cat: 'Executive',
    pop: true,
    f: [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
  {
    n: 'DIAMOND',
    p: '₹2,00,000',
    I: Gem,
    bg: 'bg-g400',
    glow: 'shadow-g400/20',
    freq: 'Every 10 Mins',
    cat: 'Executive',
    f: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  },
];

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
              <Heart className="float h-4 w-4 text-g400" />
              <span className="text-[10px] font-bold text-white/50">
                Join us in creating a <span className="text-g400">greener future</span>
              </span>
            </div>
          </div>
        </Fade>

        {/* pt-6 reserves space so the popular badge doesn't break alignment */}
        <Stagger className="grid items-stretch gap-6 pt-6 sm:grid-cols-2 xl:grid-cols-4">
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
                  className={`relative flex h-full flex-col rounded-2xl overflow-hidden border transition-all duration-300 ${
                    t.pop
                      ? 'border-g400 bg-gradient-to-b from-white to-g50 shadow-2xl shadow-g400/15'
                      : 'border-white/10 bg-white shadow-xl hover:-translate-y-1 hover:shadow-2xl'
                  }`}
                >
                  {t.pop && (
                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-g400 via-g500 to-g400" />
                  )}

                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-5 pt-3 text-center">
                      <div
                        className={`mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl ${t.bg} shadow-lg`}
                      >
                        <t.I className="h-5 w-5 text-white" />
                      </div>

                      <h3 className="font-head text-xl tracking-wider text-gray-900">
                        {t.n}
                      </h3>

                      <p className="font-head mt-1 text-[1.7rem] leading-none text-g700">
                        {t.p}
                      </p>

                      <p className="mt-1.5 text-[8px] font-medium text-gray-400">
                        {t.freq} · {t.cat}
                      </p>
                    </div>

                    <div className="mb-4 h-px w-full bg-gray-100" />

                    <div className="mb-6 flex-1 space-y-2">
                      {FT.map((f, j) => (
                        <div key={f} className="flex items-center gap-2 text-[10px]">
                          {t.f[j] ? (
                            <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-g500/10">
                              <Check size={8} className="text-g600" />
                            </div>
                          ) : (
                            <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-gray-50">
                              <span className="text-[7px] text-gray-200">✕</span>
                            </div>
                          )}

                          <span className={t.f[j] ? 'font-medium text-gray-600' : 'text-gray-200'}>
                            {f}
                          </span>
                        </div>
                      ))}
                    </div>

                    <a
                      href="#"
                      className={`mt-auto w-full rounded-xl py-3 text-center text-[11px] font-bold transition-all duration-300 ${
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
              Contact us
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
  { q: 'When & where is the event?', a: 'June 1st, 2025 at Bengaluru, India. Specific venue details for each event will be shared upon registration.' },
  { q: 'How do I register?', a: 'Hit "Register Now" on any event card above. You\'ll be redirected to our ticketing partner once the link is live.' },
  { q: 'What are the age requirements?', a: 'Marathon 10K: 16+, Marathon 5K: 12+, Cyclotron: 18+, Funathon: All ages welcome (under 12 with an adult).' },
  { q: 'Is there a refund policy?', a: 'Transfers allowed up to 7 days before the event. Refunds available up to 14 days before with a 15% processing fee.' },
  { q: 'What\'s included with registration?', a: 'Race bib, event t-shirt, finisher medal, refreshments on route, certificate of participation, and post-event celebration access.' },
];

function Faq() {
  const [o, setO] = useState(0);
  return (
    <section id="faq" className="bg-g900 py-20 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 noise" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-g400/15 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-g700/10 rounded-full blur-[120px]" />
      <div className="max-w-[640px] mx-auto px-5 relative z-10">
        <Fade>
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass mb-5">
              <span className="text-g400 text-[9px] font-bold tracking-wider">NEED HELP?</span>
            </div>
            <h2 className="font-head text-[clamp(2.5rem,5vw,3.5rem)] text-white leading-none tracking-wide">FREQUENTLY ASKED<br /><span className="shimmer">QUESTIONS</span></h2>
          </div>
        </Fade>
        <Stagger className="flex flex-col gap-3">
          {QA.map((q, i) => (
            <StaggerItem key={i}>
              <div className={`rounded-2xl overflow-hidden transition-all duration-400 ${
                o === i ? 'bg-g800/80 backdrop-blur-md border border-g400/20 shadow-lg shadow-g400/5' : 'bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.1] hover:bg-white/[0.05]'
              }`}>
                <button onClick={() => setO(o === i ? -1 : i)} className="w-full flex items-center justify-between p-5 text-left group">
                  <div className="flex items-center gap-3 pr-4">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${o === i ? 'bg-g500 shadow-md shadow-g500/30' : 'bg-white/[0.05]'}`}>
                      <span className={`font-head text-sm ${o === i ? 'text-white' : 'text-white/30'}`}>{String(i + 1).padStart(2, '0')}</span>
                    </div>
                    <span className={`text-[13px] sm:text-sm font-semibold transition-colors duration-300 ${o === i ? 'text-g400' : 'text-white/70 group-hover:text-white/90'}`}>{q.q}</span>
                  </div>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${o === i ? 'bg-g400/15 rotate-180' : 'bg-white/[0.05]'}`}>
                    <ChevronDown size={14} className={o === i ? 'text-g400' : 'text-white/20'} />
                  </div>
                </button>
                <AnimatePresence>
                  {o === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [.25,.1,.25,1] }}>
                      <div className="px-5 pb-5 pl-16">
                        <p className="text-white/40 text-[12px] sm:text-[13px] leading-relaxed">{q.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
        <Fade d={0.2}>
          <div className="text-center mt-10">
            <p className="text-white/50 text-[11px] mb-2">Still have questions?</p>
            <a href="mailto:info@greencircuit.in" className="inline-flex items-center gap-1.5 text-g400 text-xs font-bold hover:text-g300 transition group">
              <Mail size={12} /> Email us <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </Fade>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
const SOCIALS = [
  { name: 'Facebook', href: '#', icon: '/images/Facebook 1.png' },
  { name: 'Instagram', href: '#', icon: '/images/Instagram_1.png' },
  
  { name: 'YouTube', href: '#', icon: '/images/linkedin-1.png' },
];

function Footer() {
  return (
    <footer className="bg-g950 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-g400/15 to-transparent" />

      <div className={`${W} pt-16`}>
        <Fade>
          <div className="rounded-2xl bg-gradient-to-r from-g800 to-g900 border border-g700/30 p-8 sm:p-10 mb-14">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="font-head text-2xl sm:text-3xl text-white tracking-wider mb-1.5">
                  STAY IN THE LOOP
                </h3>
                <p className="text-white/40 text-sm">
                  Get updates about events, sponsorship, and opportunities.
                </p>
              </div>

              <div className="flex gap-2.5 w-full sm:w-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 sm:w-56 px-4 py-3 rounded-xl bg-white/[0.06] border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-g400/40 focus:bg-white/[0.08] transition"
                />
                <button className="px-6 py-3 bg-g500 text-white text-sm font-bold rounded-xl hover:bg-g400 transition-all shadow-lg shadow-g500/20 breathe whitespace-nowrap">
                  Subscribe
                </button>
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
              Bengaluru's premier eco-sports event for a greener tomorrow.
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
              {['Marathon — 10K & 5K', 'Cyclotron — 30K Ride', 'Funathon — Fun Run'].map((l) => (
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
                href="tel:+919876543210"
                className="text-white/40 text-sm flex items-center gap-2.5 hover:text-g400 transition-colors"
              >
                <Phone size={14} className="text-g400/60 flex-shrink-0" />
                +91 98765 43210
              </a>

              <span className="text-white/40 text-sm flex items-center gap-2.5">
                <MapPin size={14} className="text-g400/60 flex-shrink-0" />
                Bengaluru, Karnataka, India
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-white/25 text-xs">
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
const M1 = ['🏃 MARATHON', '🚴 CYCLOTRON', '🎉 FUNATHON', '🏆 ₹2L PRIZE POOL', '📍 BENGALURU', '📅 JUNE 1, 2025', '⚡ 5000+ RUNNERS', '🌿 GO GREEN', '🔥 LIMITED SPOTS'];
const M2 = ['REGISTER NOW →', 'RUN FOR A CAUSE', 'PEDAL FOR THE PLANET', 'MAKE AN IMPACT', 'JOIN THE MOVEMENT', 'ACT NOW', 'BE THE CHANGE', 'GREEN IS THE NEW GOLD'];

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee items={M1} bg="bg-g700" speed="22s" />
      <Events />
      <Marquee items={M2} dir="r" bg="bg-g950" speed="28s" />
      <Impact />
      <Sponsors />
      <Testimonials />
      <CtaBanner />
      <Marquee items={M1} bg="bg-g800" speed="18s" />
      <SponsorTiers />
      <Faq />
      <Footer />
    </>
  );
}
