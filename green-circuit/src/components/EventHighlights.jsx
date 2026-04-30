import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bike, Footprints, Music, Utensils, Globe, Mic,
  ChevronLeft, ChevronRight, Laugh, Tv, Youtube, Star
} from 'lucide-react';
import { W, Fade, Head } from '../components/shared';

const HIGHLIGHTS = [
  {
    id: 1,
    tag: 'FLAGSHIP EVENT',
    title: 'Cycle Street',
    subtitle: 'Pedal for the Planet',
    desc: "Cycle Street transforms a dedicated stretch of Bengaluru's iconic avenues into a vehicle-free zone, inviting thousands of cyclists of all ages — from professional riders to families — to ride together. It's not just a rally; it's a powerful statement for carbon-neutral transit and a cleaner, greener city.",
    icon: Bike,
    accent: '#59B94A',
    img: '/images/highlights/cycle-street-1.png',
    badge: 'Open Roads',
    stat1: { val: '3000+', label: 'Cyclists' },
    stat2: { val: '5K', label: 'Route' },
    extras: null,
  },
  {
    id: 2,
    tag: 'MARATHON',
    title: 'Ecomiles Marathon',
    subtitle: 'Run for Earth, Run for Yourself',
    desc: 'The Ecomiles Marathon is a high-energy fitness challenge featuring 3K, 5K, and 10K categories. Whether you are a competitive athlete chasing a personal best or a first-time walker, this marathon is about individual endurance contributing to a collective cause. Every mile run is a commitment to a healthier lifestyle and environmental awareness.',
    icon: Footprints,
    accent: '#14b8a6',
    img: '/images/highlights/eco-miles-1.png',
    badge: '3K · 5K · 10K',
    stat1: { val: '8000+', label: 'Runners' },
    stat2: { val: '10K', label: 'Max Distance' },
    extras: null,
  },
  {
    id: 3,
    tag: 'CULTURE & ARTS',
    title: 'Bengaluru Heritage Habba',
    subtitle: "Unveiling Karnataka's Legacy",
    desc: "A grand celebration of our roots featuring breathtaking demonstrations of Mallakamba and various folk art forms that showcase the physical prowess and artistic depth of our culture. The Habba bridges the gap between modern fitness and ancient discipline, ending with a mega musical concert that brings the community together in celebration.",
    icon: Music,
    accent: '#8b5cf6',
    img: '/images/highlights/heritage-habba-1.png',
    badge: 'Folk & Fitness',
    stat1: { val: 'Live', label: 'Performances' },
    stat2: { val: '∞', label: 'Culture' },
    extras: null,
  },
  {
    id: 4,
    tag: 'FOOD FESTIVAL',
    title: 'Bengaluru Bakaasurara Habba',
    subtitle: 'The Ultimate Culinary Carnival',
    desc: "Named after the legendary connoisseur of food, this is Bengaluru's grandest food festival. We bring together the most authentic flavors of South Bengaluru, from heritage eateries to local hidden gems. It's a reward for the morning's physical exertion — a place where participants and families can savor the city's rich culinary heritage in a vibrant, festive atmosphere.",
    icon: Utensils,
    accent: '#f59e0b',
    img: '/images/highlights/bakaasurara-habba-1.png',
    badge: 'Heritage Flavors',
    stat1: { val: '50+', label: 'Food Stalls' },
    stat2: { val: 'All Day', label: 'Festival' },
    extras: null,
  },
  {
    id: 5,
    tag: 'VIRTUAL',
    title: 'Virtual Ecomile Axis',
    subtitle: 'Move Anywhere, Impact Everywhere',
    desc: "For those who cannot join us on-ground, the Virtual Marathon running throughout May allows global participation. Using digital tracking, participants log their runs or cycles from any location worldwide. It ensures that the message of the Green Circuit transcends geographical boundaries, making sustainability a global conversation.",
    icon: Globe,
    accent: '#06b6d4',
    img: '/images/highlights/virtual-ecomile-axis.png',
    badge: 'Global Participation',
    stat1: { val: 'May', label: 'Month-Long' },
    stat2: { val: 'Global', label: 'Reach' },
    extras: null,
  },
  {
    id: 6,
    tag: 'STAND-UP COMEDY',
    title: 'Raghavendra Acharya',
    subtitle: '"Raichur Hot Huduga" — Live on Stage',
    desc: "A prominent Kannada stand-up comedian known for his sharp wit and unique cultural flavor. He rose to fame through the popular YouTube channel Namdu K, where his relatable storytelling and distinct Uttara Karnataka dialect earned him a massive statewide following. A pioneer in making Kannada stand-up accessible to local audiences through the mother tongue.",
    icon: Laugh,
    accent: '#f97316',
    img: '/images/highlights/raghavendra-acharya (2).jpg',
    badge: 'Live Comedy',
    stat1: { val: 'Millions', label: 'YT Views' },
    stat2: { val: 'Family', label: 'Friendly' },
    extras: {
      highlights: [
        {
          icon: Star,
          label: '"Raichur Hot Huduga"',
          desc: 'Deeply rooted in North Karnataka dialect — relatable rural-vs-urban humor with a massive fanbase across the state.',
        },
        {
          icon: Youtube,
          label: 'Viral on Namdu K',
          desc: '"Danger Naga" and other sketches crossed millions of views, launching him from digital creator to live-stage performer.',
        },
        {
          icon: Laugh,
          label: 'Clean & Family-Friendly',
          desc: 'Everyday life, Bengaluru outsider quirks, Indian media tropes — zero vulgarity, 100% laughter for all ages.',
        },
        {
          icon: Tv,
          label: 'Television & "Naale Baa"',
          desc: 'Featured on Comedy Khiladigalu and toured with his acclaimed solo special "Naale Baa," cementing his pioneer status.',
        },
      ],
    },
  },
  {
    id: 7,
    tag: 'GRAND FINALE',
    title: 'Grand Mega Concert',
    subtitle: 'A Symphony for Sustainability',
    desc: "As the sun sets, the energy shifts from the tracks to the stage. Our Grand Mega Concert serves as the spectacular finale — featuring a powerhouse lineup of renowned Indian artists, high-octane beats, and a night of unity and celebration under the Bengaluru sky.",
    icon: Mic,
    accent: '#f43f5e',
    img: '/images/highlights/grand-mega-concert.png',
    badge: 'Live Concert',
    stat1: { val: '10K+', label: 'Audience' },
    stat2: { val: 'Live', label: 'Artists' },
    extras: null,
  },
];

export function EventHighlights() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef(null);

  const go = useCallback((idx, direction) => {
    setDir(direction);
    setActive(idx);
  }, []);

  const next = useCallback(() => {
    go((active + 1) % HIGHLIGHTS.length, 1);
  }, [active, go]);

  const prev = useCallback(() => {
    go((active - 1 + HIGHLIGHTS.length) % HIGHLIGHTS.length, -1);
  }, [active, go]);

  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(next, 3000);
    return () => clearInterval(intervalRef.current);
  }, [next, paused]);

  const ev = HIGHLIGHTS[active];
  const Icon = ev.icon;

  const variants = {
    enter: (d) => ({ opacity: 0, x: d > 0 ? 48 : -48 }),
    center: { opacity: 1, x: 0 },
    exit: (d) => ({ opacity: 0, x: d > 0 ? -48 : 48 }),
  };

  return (
    <section
      id="event-highlights"
      className="relative overflow-hidden bg-g950 py-20 sm:py-28 noise"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambient blobs */}
      <div
        className="absolute top-1/3 left-[8%] w-72 h-72 rounded-full blur-[120px] opacity-10 transition-colors duration-700"
        style={{ background: ev.accent }}
      />
      <div
        className="absolute bottom-1/4 right-[8%] w-56 h-56 rounded-full blur-[100px] opacity-10 transition-colors duration-700"
        style={{ background: ev.accent }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,222,128,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,.025) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className={`${W} relative z-10`}>
        {/* Heading */}
        <Fade>
          <Head ey="What Awaits You" ti="EVENT HIGHLIGHTS" dark />
        </Fade>

        {/* Pill tabs */}
        <Fade d={0.08}>
          <div className="flex flex-wrap justify-center gap-2 mt-6 mb-10">
            {HIGHLIGHTS.map((h, i) => {
              const HIcon = h.icon;
              return (
                <button
                  key={h.id}
                  onClick={() => go(i, i > active ? 1 : -1)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-bold transition-all duration-300 ${
                    i === active
                      ? 'text-white shadow-lg'
                      : 'bg-white/5 border border-white/10 text-white/40 hover:text-white/70 hover:bg-white/10'
                  }`}
                  style={i === active ? { background: h.accent } : {}}
                >
                  <HIcon size={9} />
                  {h.title}
                </button>
              );
            })}
          </div>
        </Fade>

        {/* Carousel — fixed height wrapper prevents resize between slides */}
        <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.03] overflow-hidden shadow-2xl">
          <AnimatePresence custom={dir} mode="wait">
            <motion.div
              key={active}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.38, ease: [0.25, 0.1, 0.25, 1] }}
              /* fixed height on lg so all cards are identical in size */
              className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] w-full lg:h-[460px]"
            >
              {/* ── Image panel ── */}
              <div className="relative h-64 lg:h-full overflow-hidden lg:rounded-tl-3xl lg:rounded-bl-3xl">
                <img
                  src={ev.img}
                  alt={ev.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-g950/80 hidden lg:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-g950/80 via-g950/20 to-transparent lg:hidden" />

                {/* Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3 py-1.5 rounded-full text-[9px] font-bold text-white shadow-lg"
                    style={{ background: ev.accent + 'cc' }}
                  >
                    {ev.badge}
                  </span>
                </div>

                {/* Stats */}
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {[ev.stat1, ev.stat2].map((s) => (
                    <div
                      key={s.label}
                      className="rounded-xl border border-white/15 bg-black/50 backdrop-blur-sm px-3 py-2 text-center min-w-[58px]"
                    >
                      <p className="font-head text-sm text-white leading-none">{s.val}</p>
                      <p className="text-[8px] text-white/50 font-medium mt-0.5">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Content panel ── */}
              <div className="flex flex-col p-7 sm:p-10 lg:pl-8 lg:overflow-y-auto">
                {/* Tag row */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: ev.accent + '22' }}
                  >
                    <Icon size={14} style={{ color: ev.accent }} />
                  </div>
                  <span
                    className="text-[9px] font-bold tracking-[0.22em]"
                    style={{ color: ev.accent }}
                  >
                    {ev.tag}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-head text-[clamp(1.5rem,2.5vw,2.2rem)] leading-[1.05] tracking-wide text-white mb-1">
                  {ev.title}
                </h3>
                <p className="text-sm font-semibold mb-3 italic" style={{ color: ev.accent }}>
                  "{ev.subtitle}"
                </p>

                {/* Description */}
                <div className="space-y-2 mb-4">
                  {ev.desc.split('\n').filter(Boolean).map((para, pi) => (
                    <p key={pi} className="text-[11px] leading-relaxed text-white/45">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Comedy highlight cards — only for Raghavendra */}
                {ev.extras?.highlights && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                    {ev.extras.highlights.map((item, idx) => {
                      const ItemIcon = item.icon;
                      return (
                        <div
                          key={idx}
                          className="rounded-xl border border-white/[0.08] bg-white/[0.04] p-2.5 flex gap-2 items-start"
                        >
                          <div
                            className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ background: ev.accent + '22' }}
                          >
                            <ItemIcon size={11} style={{ color: ev.accent }} />
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-white/80 mb-0.5">{item.label}</p>
                            <p className="text-[9px] leading-relaxed text-white/35">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Spacer pushes nav to bottom */}
                <div className="flex-1" />

                {/* Nav controls */}
                <div className="flex items-center gap-1.5 pt-4 border-t border-white/[0.06]">
                  {HIGHLIGHTS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => go(i, i > active ? 1 : -1)}
                      className="rounded-full transition-all duration-300 flex-shrink-0"
                      style={
                        i === active
                          ? { background: ev.accent, width: '20px', height: '5px' }
                          : { background: 'rgba(255,255,255,0.15)', width: '5px', height: '5px' }
                      }
                    />
                  ))}

                  <div className="ml-auto flex items-center gap-2">
                    <button
                      onClick={prev}
                      className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition"
                    >
                      <ChevronLeft size={14} />
                    </button>
                    <button
                      onClick={next}
                      className="w-8 h-8 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition"
                    >
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Auto-progress bar — 3s duration matches interval */}
          {!paused && (
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
              <motion.div
                key={`bar-${active}`}
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 3, ease: 'linear' }}
                className="h-full"
                style={{ background: ev.accent }}
              />
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        <Fade d={0.15}>
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mt-4">
            {HIGHLIGHTS.map((h, i) => {
              const TIcon = h.icon;
              return (
                <button
                  key={h.id}
                  onClick={() => go(i, i > active ? 1 : -1)}
                  className={`relative rounded-xl overflow-hidden h-14 sm:h-16 transition-all duration-300 ${
                    i === active
                      ? 'opacity-100 scale-[1.05]'
                      : 'opacity-35 hover:opacity-60 hover:scale-[1.02]'
                  }`}
                  style={
                    i === active
                      ? { outline: `2px solid ${h.accent}`, outlineOffset: '2px' }
                      : {}
                  }
                >
                  <img src={h.img} alt={h.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-g950/55" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 px-1">
                    <TIcon size={10} className="text-white flex-shrink-0" />
                    <span className="text-[7px] font-bold text-white/80 text-center leading-tight line-clamp-2">
                      {h.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </Fade>
      </div>
    </section>
  );
}