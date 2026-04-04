import { motion } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  Trophy,
  ImageIcon,
  Play,
} from 'lucide-react';
import { Navbar, Footer } from './HomePage';
import { W, Fade, Stagger, StaggerItem } from '../components/shared';

const PAST_EVENT_DATA = {
  'cycle-street': {
    slug: 'cycle-street',
    title: 'Cycle Street',
    subtitle: 'Celebrating Cycle Street — 5th Edition of the Green Circuit Event',
    tag: 'GC · 1st June 2024',
    edition: '5th Edition',
    participants: '1,200+',
    prizes: '₹1.5L+',
    location: 'Bengaluru, Karnataka',
    desc: 'Over 1,200 cyclists took to the streets of Bengaluru in our flagship Cycle Street edition, raising awareness for urban mobility, clean air, and sustainable living.',
    video: '/videos/gc-hero.mp4',
    heroImage: '/images/cycle-street.png',
    gallery: [
      '/images/C1.JPG',
      '/images/C2.JPG',
      '/images/C3.JPG',
      '/images/C4.JPG',
      '/images/C5.JPG',
      '/images/C6.JPG',
      '/images/C7.JPG',
      '/images/C8.JPG',
      '/images/C9.JPG',
      '/images/C10.JPG',
      '/images/C11.JPG',
      '/images/C12.JPG',
      '/images/C13.JPG',
      '/images/C14.JPG',
      '/images/C15.JPG',
      '/images/C16.JPG',
      '/images/C17.JPG',
      '/images/C18.JPG',
      '/images/C19.JPG',
      '/images/C20.JPG',
    ],
  },

  'eco-miles': {
    slug: 'eco-miles',
    title: 'Eco Miles',
    subtitle: 'Celebrating Eco Miles — 4th Edition of the Green Circuit Event',
    tag: 'GC · 1st June 2024',
    edition: '4th Edition',
    participants: '5,000+',
    prizes: '₹1.5L+',
    location: 'Bengaluru, Karnataka',
    desc: 'Runners crossed the finish line for the planet in Eco Miles, where thousands of participants joined together to celebrate health, endurance, and environmental awareness.',
    video: '/videos/gc-hero.mp4',
    heroImage: '/images/eco-miles.png',
    gallery: [
      '/images/M1.JPG',
      '/images/M2.JPG',
      '/images/M3.JPG',
      '/images/M4.JPG',
      '/images/M5.JPG',
      '/images/M6.JPG',
      '/images/M7.JPG',
      '/images/M8.JPG',
      '/images/M9.JPG',
      '/images/M10.JPG',
      '/images/M11.JPG',
      '/images/M12.JPG',
      '/images/M13.JPG',
      '/images/M14.JPG',
      '/images/M15.JPG',
      '/images/M16.JPG',
      '/images/M17.JPG',
      '/images/M18.JPG',
      '/images/M19.JPG',
      '/images/M20.JPG',
    ],
  },
};

function EventHero({ event }) {
  return (
    <section className="relative flex min-h-[92svh] items-center overflow-hidden bg-g950 noise">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="h-full w-full object-cover opacity-20"
          poster={event.heroImage}
        >
          <source src={event.video} type="video/mp4" />
        </video>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-g950/75 via-g950/55 to-g950" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(74,222,128,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(74,222,128,.04) 1px,transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />
      <div className="absolute top-1/4 left-[10%] h-48 w-48 rounded-full bg-g500/5 blur-[70px]" />
      <div className="absolute bottom-1/3 right-[10%] h-40 w-40 rounded-full bg-cyan-500/5 blur-[60px]" />

      <div className={`${W} relative z-10 pt-24 pb-16`}>
        <Fade>
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-[11px] font-bold text-white/80 backdrop-blur-sm transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={12} />
            Back to Home
          </Link>

          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-g400" />
              <span className="text-[10px] font-bold tracking-wider text-g400">
                PAST EVENT HIGHLIGHTS
              </span>
            </div>

            <p className="mb-3 text-[11px] font-bold tracking-[0.2em] text-g400">
              {event.tag.replace('GC · ', 'GC — ')}
            </p>

            <h1 className="font-head mb-5 text-[clamp(2.8rem,7vw,6rem)] leading-[0.95] tracking-wide text-white">
              {event.title.toUpperCase()}
            </h1>

            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/75 sm:text-base">
              {event.desc}
            </p>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-[9px] font-bold tracking-wider text-white/35">PARTICIPANTS</p>
                <p className="mt-1 text-lg font-bold text-white">{event.participants}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-[9px] font-bold tracking-wider text-white/35">EDITION</p>
                <p className="mt-1 text-lg font-bold text-white">{event.edition}</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                <p className="text-[9px] font-bold tracking-wider text-white/35">PRIZE POOL</p>
                <p className="mt-1 text-lg font-bold text-white">{event.prizes}</p>
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function EventOverview({ event }) {
  const items = [
    { icon: CalendarDays, label: 'Date', value: '1st June 2024' },
    { icon: MapPin, label: 'Location', value: event.location },
    { icon: Users, label: 'Participants', value: event.participants },
    { icon: Trophy, label: 'Edition', value: event.edition },
  ];

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className={W}>
        <Fade>
          <div className="mb-10 text-center">
            <p className="mb-2 text-[10px] font-bold tracking-[0.25em] text-g600">EVENT OVERVIEW</p>
            <h2 className="font-head text-[clamp(2.2rem,5vw,4rem)] tracking-wide text-gray-900">
              RELIVING THE <span className="text-g600">MOMENTS</span>
            </h2>
          </div>
        </Fade>

        <Stagger className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <StaggerItem key={item.label}>
              <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-g50">
                  <item.icon className="h-5 w-5 text-g700" />
                </div>
                <p className="text-[10px] font-bold tracking-wider text-gray-400">{item.label}</p>
                <p className="mt-1 text-sm font-semibold text-gray-800">{item.value}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function EventVideoStrip({ event }) {
  return (
    <section className="relative overflow-hidden bg-g950 py-16 sm:py-20 noise">
      <div className="absolute inset-0 bg-gradient-to-b from-g900 via-g950 to-black" />
      <div className={`${W} relative z-10`}>
        <Fade>
          <div className="mb-8 text-center">
            <p className="mb-2 text-[10px] font-bold tracking-[0.25em] text-g400">EVENT FILM</p>
            <h2 className="font-head text-[clamp(2rem,4vw,3.5rem)] tracking-wide text-white">
              HIGHLIGHT <span className="shimmer">VIDEO</span>
            </h2>
          </div>
        </Fade>

        <Fade d={0.08}>
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
            <div className="relative aspect-video">
              <video
                controls
                preload="metadata"
                poster={event.heroImage}
                className="h-full w-full object-cover"
              >
                <source src={event.video} type="video/mp4" />
              </video>

              <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-black/45 px-3 py-1.5 text-[10px] font-bold tracking-wider text-white backdrop-blur-sm">
                <Play size={10} />
                EVENT HIGHLIGHTS
              </div>
            </div>
          </div>
        </Fade>
      </div>
    </section>
  );
}

function EventGallery({ event }) {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className={W}>
        <Fade>
          <div className="mb-10 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-g50 px-4 py-2">
              <ImageIcon size={14} className="text-g700" />
              <span className="text-[10px] font-bold tracking-wider text-g700">PHOTO GALLERY</span>
            </div>
            <h2 className="font-head text-[clamp(2.2rem,5vw,4rem)] tracking-wide text-gray-900">
              {event.title.toUpperCase()} <span className="text-g600">MEMORIES</span>
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-500">
              A curated collection of moments from the event — energy, participation, celebration, and impact.
            </p>
          </div>
        </Fade>

        <Stagger className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {event.gallery.map((img, i) => (
            <StaggerItem key={`${img}-${i}`}>
              <motion.div
                whileHover={{ y: -4 }}
                className={`group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm ${
                  i % 5 === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                }`}
              >
                <div className={`${i % 5 === 0 ? 'h-[420px]' : 'h-[220px] sm:h-[240px]'}`}>
                  <img
                    src={img}
                    alt={`${event.title} gallery ${i + 1}`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function EventCta({ event }) {
  return (
    <section className="relative overflow-hidden bg-g950 py-16 noise">
      <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'repeating-linear-gradient(45deg,transparent,transparent 10px,rgba(255,255,255,.03) 10px,rgba(255,255,255,.03) 20px)' }} />
      <div className="absolute left-[10%] top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-g400/10 blur-[70px]" />
      <div className="absolute right-[10%] top-1/2 h-32 w-32 -translate-y-1/2 rounded-full bg-g400/8 blur-[60px]" />

      <div className={`${W} relative z-10 text-center`}>
        <Fade>
          <h2 className="font-head mb-3 text-4xl tracking-wide text-white sm:text-5xl">
            MORE THAN AN EVENT
          </h2>
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-white/65">
            {event.title} brought together community, sustainability, and energy in one unforgettable experience.
          </p>

          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-g500 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-g500/25 transition hover:bg-g400"
          >
            Back to Home
            <ArrowRight size={13} />
          </Link>
        </Fade>
      </div>
    </section>
  );
}

export default function PastEventDetailPage() {
  const { slug } = useParams();
  const event = PAST_EVENT_DATA[slug];

  if (!event) {
    return (
      <div className="min-h-screen bg-g950 text-white">
        <Navbar />
        <div className="flex min-h-screen items-center justify-center px-5 text-center">
          <div>
            <h1 className="font-head text-5xl tracking-wide">EVENT NOT FOUND</h1>
            <p className="mt-4 text-white/60">The page you are looking for does not exist.</p>
            <Link
              to="/"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-g500 px-6 py-3 text-sm font-bold text-white"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <EventHero event={event} />
      <EventOverview event={event} />
      <EventVideoStrip event={event} />
      <EventGallery event={event} />
      <EventCta event={event} />
      <Footer />
    </>
  );
}