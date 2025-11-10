import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, QrCode, ShieldPlus } from 'lucide-react';
import axios from 'axios';

// Determine API base
const getApiUrl = () => {
  if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  return `${protocol}//${hostname}:5000/api`;
};

const Home = () => {
  // No admin-only actions on Home page

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }
    })
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }
  };

  // Floating gradient particles
  const particles = [
    { size: 14, x: '10%', y: '12%', from: '#6366F1', to: '#8B5CF6', delay: 0 },
    { size: 10, x: '22%', y: '70%', from: '#06B6D4', to: '#3B82F6', delay: 1.2 },
    { size: 18, x: '78%', y: '20%', from: '#8B5CF6', to: '#06B6D4', delay: 0.6 },
    { size: 12, x: '85%', y: '66%', from: '#3B82F6', to: '#6366F1', delay: 1.8 },
  ];

  return (
    <div className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating glow background */}
      <motion.div
        aria-hidden="true"
        initial={{ opacity: 0.4, x: -60, y: -60 }}
        animate={{ opacity: 0.7, x: 60, y: 40 }}
        transition={{ duration: 12, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
        className="pointer-events-none absolute -top-24 -left-24 w-[36rem] h-[36rem] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(40% 40% at 50% 50%, rgba(99,102,241,0.35) 0%, rgba(139,92,246,0.25) 40%, rgba(59,130,246,0.15) 70%, rgba(255,255,255,0) 100%)'
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          initial={{ y: 0 }}
          animate={{ y: [-6, 6, -6] }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: p.delay }}
          className="pointer-events-none absolute rounded-full blur-md opacity-60"
          style={{
            width: p.size,
            height: p.size,
            left: p.x,
            top: p.y,
            background: `linear-gradient(135deg, ${p.from}, ${p.to})`
          }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-14">
          <div className="text-center md:text-left">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 bg-clip-text text-transparent tracking-tight"
            >
              <motion.span
                animate={{ backgroundPositionX: ['0%', '100%', '0%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                className="bg-clip-text text-transparent bg-[length:200%_100%] bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500"
                style={{ WebkitBackgroundClip: 'text' }}
              >
                Life Code
              </motion.span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-2xl md:text-3xl text-gray-800/90 mb-6"
            >
              Emergency QR Identification System
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={3}
              className="text-base md:text-lg text-gray-600 max-w-xl md:max-w-2xl mx-auto md:mx-0"
            >
              Register your emergency information and instantly get a secure QR code. When scanned,
              it reveals critical medical info to first responders—fast, private, and reliable.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={4}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <Link
                to="/register"
                className="group relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-2xl text-white font-semibold text-lg shadow-lg
                           bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-all"
              >
                <span className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-md bg-gradient-to-r from-indigo-400/40 to-purple-400/40" />
                <span className="relative flex items-center gap-2">
                  <ShieldPlus className="w-5 h-5" />
                  Register Now
                </span>
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 rounded-2xl border-2 border-gray-200 text-gray-800 font-semibold text-lg bg-white/80 backdrop-blur hover:bg-white transition-all shadow"
              >
                Learn More
              </Link>
            </motion.div>
          </div>

          {/* Hero Illustration (animated QR) */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="hidden md:flex items-center justify-center"
          >
            <FancyQR />
          </motion.div>
        </div>

        {/* Gradient divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-200 to-transparent mb-10" />

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: 'Quick Registration',
              text: 'Register your emergency information in minutes with our simple form.',
              icon: <Activity className="w-6 h-6 text-gray-800" />,
              color: 'from-indigo-500 to-purple-500',
              bg: 'bg-indigo-50'
            },
            {
              title: 'QR Code Generation',
              text: 'Get your personalized QR code instantly after registration.',
              icon: <QrCode className="w-6 h-6 text-gray-800" />,
              color: 'from-purple-500 to-indigo-500',
              bg: 'bg-purple-50'
            },
            {
              title: 'Life-Saving Info',
              text: 'Critical information accessible instantly when needed most.',
              icon: <ShieldPlus className="w-6 h-6 text-gray-800" />,
              color: 'from-cyan-500 to-blue-500',
              bg: 'bg-cyan-50'
            }
          ].map((card, idx) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              custom={idx + 1}
              className="group"
            >
              <div className="relative bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 transition-all hover:shadow-2xl hover:-translate-y-1">
                <div className={`w-12 h-12 ${card.bg} rounded-xl flex items-center justify-center mb-4`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{card.title}</h3>
                <p className="text-gray-600">{card.text}</p>
                <div className={`absolute inset-x-0 -bottom-1 h-1 rounded-b-2xl bg-gradient-to-r ${card.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/register"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Register Now
          </Link>
          
          <Link
            to="/about"
            className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-all shadow-lg"
          >
            Learn More
          </Link>
        </div>

        {/* How It Works */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-16 bg-white/80 backdrop-blur rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">How It Works</h2>
          <div className="space-y-6">
            {[
              {
                step: '1',
                title: 'Register Your Information',
                text:
                  'Fill out the registration form with your emergency details including blood group, allergies, medical history, and emergency contact.'
              },
              {
                step: '2',
                title: 'Get Your QR Code',
                text:
                  'Receive your personalized QR code that links to your emergency profile. Download and print it.'
              },
              {
                step: '3',
                title: 'Keep It Accessible',
                text:
                  'Place your QR code on your ID, wallet, phone case, or medical bracelet. In an emergency, anyone can scan it to access your critical information.'
              }
            ].map((item, idx) => (
              <motion.div key={item.step} variants={fadeUp} custom={idx + 1} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full flex items-center justify-center font-bold shadow">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;

/* Tailwind keyframes for shimmer */
/* Add via existing Tailwind config defaults; inline utility used above */

// Enhanced QR Hologram component
const FancyQR = () => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 14; // left-right
    const rotateX = (0.5 - py) * 14; // up-down
    setTilt({ x: rotateX, y: rotateY });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      className="relative"
      style={{ perspective: 1000 }}
    >
      {/* Rotating halo ring */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-6 -z-10 rounded-[2rem] opacity-60"
        style={{
          background:
            'conic-gradient(from 0deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15), rgba(20,184,166,0.15), rgba(99,102,241,0.15))'
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Outer glow */}
      <div className="absolute -inset-3 -z-10 rounded-[1.75rem] bg-gradient-to-tr from-cyan-300/30 via-purple-300/25 to-indigo-300/30 blur-2xl" />

      {/* Card with tilt */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="rounded-3xl p-6 bg-white/10 backdrop-blur-xl shadow-2xl ring-1 ring-white/20"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Glass top reflection */}
        <div
          className="pointer-events-none absolute inset-0 rounded-3xl"
          style={{
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0) 60%)'
          }}
        />

        {/* QR canvas with soft border gradient */}
        <div className="relative rounded-2xl p-3 bg-gradient-to-tr from-white/30 to-white/5">
          <div className="rounded-xl bg-[#0B1020] p-3 ring-1 ring-white/10">
            {/* Decorative grid behind QR */}
            <div className="absolute inset-0 rounded-xl pointer-events-none opacity-20 [mask-image:radial-gradient(white,transparent_70%)]"
                 style={{ backgroundImage: 'linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(0deg, rgba(255,255,255,.08) 1px, transparent 1px)', backgroundSize: '14px 14px' }} />

            {/* QR Illustration */}
            <svg width="240" height="240" viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" className="relative">
              <defs>
                <linearGradient id="qrGrad" x1="0" x2="1">
                  <stop offset="0%" stopColor="#4F46E5" />
                  <stop offset="50%" stopColor="#9333EA" />
                  <stop offset="100%" stopColor="#14B8A6" />
                </linearGradient>
              </defs>
              <rect x="0" y="0" width="220" height="220" rx="22" fill="url(#qrGrad)" opacity="0.12" />
              <rect x="20" y="20" width="60" height="60" fill="#0B1020" rx="8" />
              <rect x="30" y="30" width="40" height="40" fill="white" rx="6" />
              <rect x="40" y="40" width="20" height="20" fill="#0B1020" rx="4" />

              <rect x="140" y="20" width="60" height="60" fill="#0B1020" rx="8" />
              <rect x="150" y="30" width="40" height="40" fill="white" rx="6" />
              <rect x="160" y="40" width="20" height="20" fill="#0B1020" rx="4" />

              <rect x="20" y="140" width="60" height="60" fill="#0B1020" rx="8" />
              <rect x="30" y="150" width="40" height="40" fill="white" rx="6" />
              <rect x="40" y="160" width="20" height="20" fill="#0B1020" rx="4" />

              {/* Random QR blocks */}
              <rect x="100" y="20" width="20" height="20" fill="#0B1020" rx="4" />
              <rect x="120" y="60" width="20" height="20" fill="#0B1020" rx="4" />
              <rect x="100" y="100" width="20" height="20" fill="#0B1020" rx="4" />
              <rect x="140" y="100" width="20" height="20" fill="#0B1020" rx="4" />
              <rect x="120" y="140" width="20" height="20" fill="#0B1020" rx="4" />
              <rect x="100" y="180" width="20" height="20" fill="#0B1020" rx="4" />
              <rect x="180" y="100" width="20" height="20" fill="#0B1020" rx="4" />
            </svg>

            {/* Holographic scanline */}
            <motion.div
              className="pointer-events-none absolute left-3 right-3 h-10 rounded bg-gradient-to-b from-white/5 via-white/30 to-white/5"
              animate={{ top: ['16%', '78%', '16%'] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ filter: 'blur(1px)' }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
