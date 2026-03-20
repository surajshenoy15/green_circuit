import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Footprints } from 'lucide-react';

export default function LoaderPage() {
  const [p, setP] = useState(0);
  const navigate = useNavigate();
  const msgs = ['Lacing up shoes...', 'Warming up...', 'Setting the route...', 'On your marks...', '🏃 GO!'];

  useEffect(() => {
    const id = setInterval(() => {
      setP(v => {
        if (v >= 100) {
          clearInterval(id);
          setTimeout(() => navigate('/home', { replace: true }), 400);
          return 100;
        }
        return Math.min(v + 3, 100);
      });
    }, 20);
    return () => clearInterval(id);
  }, [navigate]);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-g900 flex items-center justify-center overflow-hidden"
      style={{ width: '100vw', height: '100vh', minHeight: '100dvh' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 noise" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-g600/15 rounded-full blur-[100px] glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] bg-g400/10 rounded-full blur-[80px] glow-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,.02) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.02) 1px,transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* SVG progress ring */}
        <div className="relative w-24 h-24">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r="42" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
            <circle cx="48" cy="48" r="42" fill="none" stroke="url(#loaderGrad)" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - p / 100)}`}
              style={{ transition: 'stroke-dashoffset 0.15s ease' }} />
            <defs>
              <linearGradient id="loaderGrad">
                <stop offset="0%" stopColor="#fff" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.4)" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <Footprints className="w-8 h-8 text-white" />
          </div>
        </div>

        {/* Logo */}
        <div className="text-center">
          <p className="font-head text-4xl text-white tracking-[0.2em]">GREEN<span className="text-white/60">CIRCUIT</span></p>
          <p className="text-white/30 text-[11px] mt-2 h-4 font-medium">{msgs[Math.min(Math.floor(p / 20), 4)]}</p>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <div className="w-40 h-[3px] bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-75" style={{ width: `${p}%` }} />
          </div>
          <span className="text-white/30 text-[10px] font-bold tabular-nums w-8">{p}%</span>
        </div>
      </div>
    </motion.div>
  );
}
