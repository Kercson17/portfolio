"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Data Constants
const projects = [
  {
    title: "FONUS FEDERATION",
    description: "A premium e-commerce platform for high-end mobile devices and accessories.",
    image: "/fonus.png",
    tags: ["Next.js", "Tailwind CSS", "GSAP"],
    links: { live: "https://fonuscebu.netlify.app/", github: "#" }
  },
  {
    title: "VOTING SYSTEM",
    description: "Secure and transparent digital voting platform with real-time results.",
    image: "/voting.png",
    tags: ["React", "Node.js", "MongoDB"],
    links: { live: "https://sscelection2025.vercel.app/admin-login", github: "#" }
  },
  {
    title: "BRISASOLEI RESORT",
    description: "A luxury resort website showcasing premium accommodations and amenities.",
    image: "/brisa.png",
    tags: ["TypeScript", "Tailwind CSS", "Framer Motion"],
    links: { live: "https://brisasolei.netlify.app/", github: "#" }
  }
];

const skills = [
  {
    category: "Front-End",
    description: "Crafting immersive user interfaces with modern frameworks and animation libraries.",
    items: [
      { name: "React / Next.js", icon: <i className="fab fa-react"></i> },
      { name: "Angular", icon: <i className="fab fa-angular"></i> },
      { name: "TypeScript", icon: <i className="fab fa-js"></i> },
      { name: "Tailwind CSS", icon: <i className="fab fa-css3-alt"></i> },
      { name: "GSAP / Framer", icon: <i className="fas fa-magic"></i> }
    ]
  },
  {
    category: "Back-End",
    description: "Engineering scalable server-side logic and secure authentication architectures.",
    items: [
      { name: "Node.js / Express", icon: <i className="fab fa-node-js"></i> },
      { name: "REST APIs", icon: <i className="fas fa-exchange-alt"></i> },
      { name: "Prisma ORM", icon: <i className="fas fa-database"></i> },
      { name: "Auth Design", icon: <i className="fas fa-shield-alt"></i> }
    ]
  },
  {
    category: "Data Systems",
    description: "Designing efficient database schemas and real-time synchronization logic.",
    items: [
      { name: "PostgreSQL", icon: <i className="fas fa-server"></i> },
      { name: "MySQL", icon: <i className="fas fa-database"></i> },
      { name: "Firebase", icon: <i className="fas fa-fire"></i> },
      { name: "Schema Design", icon: <i className="fas fa-project-diagram"></i> }
    ]
  },
  {
    category: "Engineering",
    description: "Deploying high-performance applications with robust version control and CI/CD.",
    items: [
      { name: "Git / Linux", icon: <i className="fab fa-github"></i> },
      { name: "Vercel / Netlify", icon: <i className="fas fa-cloud-upload-alt"></i> },
      { name: "Unit Testing", icon: <i className="fas fa-vial"></i> },
      { name: "MacOS", icon: <i className="fab fa-apple"></i> }
    ]
  }
];

const education = [
  {
    school: "Benedicto College",
    period: "2022 — 2026",
    degree: "Bachelor of Science in Information Technology",
    highlights: "Distinguished Academic Performance (Dean's List 2023)",
    image: "/4.png",
  },
  {
    school: "University of Cebu",
    period: "2020 — 2022",
    degree: "General Academic Strand (Pre-Engineering)",
    image: "/5.png",
  },
  {
    school: "Paknaan National High School",
    period: "2015 — 2020",
    degree: "Junior High School Diploma",
    image: "/6.png",
  }
];

const LOADER_QUOTES = [
  "Every journey begins with a single letter.",
  "Knowledge grows as stories unfold.",
  "Let your path be seen, and your story heard.",
  "Each step forward writes your story.",
  "Dream, learn, and let your story shine.",
  "Words light the way where images guide.",
  "Every moment teaches, every letter inspires.",
  "Your story matters — let it appear, let it shine.",
  "Images capture the moment; words capture the heart.",
  "Grow, learn, and let your journey be seen."
];

// --- Interactive Sample Component: Mochi Pop ---
function MochiPopGame() {
  const [gameState, setGameState] = useState('start'); 
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [holes, setHoles] = useState(Array(9).fill(null));
  const [particles, setParticles] = useState<any[]>([]);
  
  const gameLoopRef = useRef<any>(null);
  const timerRef = useRef<any>(null);

  const spawnMochi = useCallback(() => {
    const MOCHI_TYPES = [
      { id: 'normal', face: '( • ω • )', points: 10, color: 'bg-amber-800 text-amber-100', shadow: 'shadow-amber-900/50' },
      { id: 'gold', face: '( ✧ ω ✧ )', points: 50, color: 'bg-amber-400 text-amber-900', shadow: 'shadow-amber-500/50' },
      { id: 'bad', face: '( > m < )', points: -20, color: 'bg-stone-800 text-stone-300', shadow: 'shadow-stone-900/50' },
    ];

    setHoles((currentHoles) => {
      const emptyHoles = currentHoles.map((h, i) => (h === null ? i : null)).filter(i => i !== null);
      if (emptyHoles.length === 0) return currentHoles;

      const randomHole = emptyHoles[Math.floor(Math.random() * emptyHoles.length)];
      const rand = Math.random();
      let type = MOCHI_TYPES[0];
      if (rand > 0.85) type = MOCHI_TYPES[1];
      else if (rand > 0.70) type = MOCHI_TYPES[2];

      const duration = type.id === 'gold' ? 800 : type.id === 'bad' ? 1200 : 1000 + Math.random() * 500;
      const newHoles = [...currentHoles];
      const spawnTime = Date.now();
      newHoles[randomHole] = { ...type, spawnTime, duration };
      
      setTimeout(() => {
        setHoles(latest => {
          if (latest[randomHole]?.spawnTime === spawnTime) {
            const cleared = [...latest];
            cleared[randomHole] = null;
            return cleared;
          }
          return latest;
        });
      }, duration);

      return newHoles;
    });
  }, []);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setTimeLeft(30);
    setHoles(Array(9).fill(null));
    setParticles([]);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          endGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    const loop = () => {
      spawnMochi();
      const nextSpawnTime = 400 + Math.random() * 600;
      gameLoopRef.current = setTimeout(loop, nextSpawnTime);
    };
    loop();
  };

  const endGame = () => {
    setGameState('gameover');
    if (timerRef.current) clearInterval(timerRef.current);
    if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
    setHoles(Array(9).fill(null));
  };

  const handlePop = (index: number, event: any, mochi: any) => {
    if (!mochi || gameState !== 'playing') return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setScore((prev) => Math.max(0, prev + mochi.points));

    const newParticle = {
      id: Date.now(),
      text: mochi.points > 0 ? `+${mochi.points}` : mochi.points,
      color: mochi.points > 0 ? (mochi.id === 'gold' ? 'text-amber-500' : 'text-amber-800') : 'text-stone-700',
      x, y
    };
    setParticles((prev) => [...prev, newParticle]);
    setTimeout(() => setParticles((prev) => prev.filter((p) => p.id !== newParticle.id)), 800);

    setHoles((prev) => {
      const newHoles = [...prev];
      newHoles[index] = null;
      return newHoles;
    });
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (gameLoopRef.current) clearTimeout(gameLoopRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto bg-[#FDFBF9] rounded-[2.5rem] md:rounded-[4rem] p-4 md:p-20 font-sans relative my-16 md:my-24 shadow-2xl reveal border-4 md:border-8 border-[#F2EBE4] overflow-hidden select-none">
      <div className="absolute top-4 left-4 text-[#8D6E63]/10 animate-bounce hidden md:block" style={{ animationDuration: '3s' }}><i className="fas fa-heart text-4xl md:text-8xl"></i></div>
      <div className="absolute bottom-10 right-4 text-[#8D6E63]/10 animate-bounce hidden md:block" style={{ animationDuration: '4s' }}><i className="fas fa-star text-5xl md:text-9xl"></i></div>
      
      <div className="relative z-10 w-full max-w-2xl mx-auto bg-white/90 backdrop-blur-2xl border-2 md:border-4 border-white rounded-[2rem] md:rounded-[4rem] p-4 md:p-12 shadow-xl flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-6 md:mb-12">
          <div className="flex flex-col items-center bg-[#FDFBF9] px-4 md:px-8 py-2 md:py-4 rounded-2xl md:rounded-3xl border border-[#F2EBE4] shadow-sm flex-1 mr-2">
            <span className="text-[9px] md:text-[12px] font-black text-[#8D6E63]/60 uppercase mb-1">Score</span>
            <span className="font-black text-xl md:text-4xl text-[#4E342E] tabular-nums">{score}</span>
          </div>
          <div className="flex flex-col items-center bg-[#FDFBF9] px-4 md:px-8 py-2 md:py-4 rounded-2xl md:rounded-3xl border border-[#F2EBE4] shadow-sm flex-1 ml-2">
            <span className="text-[9px] md:text-[12px] font-black text-[#8D6E63]/60 uppercase mb-1">Time</span>
            <span className={`font-black text-xl md:text-4xl tabular-nums ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-[#4E342E]'}`}>
              0:{timeLeft.toString().padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="relative w-full aspect-square bg-[#F2EBE4]/40 rounded-[1.5rem] md:rounded-[3rem] p-3 md:p-8 grid grid-cols-3 gap-3 md:gap-6 shadow-inner border-b-8 md:border-b-[12px] border-[#F2EBE4] touch-none">
          {holes.map((mochi, index) => (
            <div 
              key={index} 
              className="relative w-full h-full bg-[#F2EBE4]/30 rounded-xl md:rounded-2xl shadow-[inset_0_4px_10px_rgba(0,0,0,0.05)] md:shadow-[inset_0_8px_15px_rgba(0,0,0,0.05)] border-b-2 md:border-b-4 border-[#F2EBE4] flex items-end justify-center overflow-hidden cursor-pointer"
              onPointerDown={(e) => { e.preventDefault(); handlePop(index, e, mochi); }}
            >
              {mochi && (
                <div className={`absolute bottom-0 w-[90%] md:w-[85%] aspect-[1/0.9] ${mochi.color} rounded-[45%_45%_20%_20%] flex items-center justify-center shadow-lg ${mochi.shadow} animate-pop-up transform origin-bottom`}>
                  <span className="font-bold tracking-tighter text-lg md:text-3xl pointer-events-none select-none mb-2 md:mb-4">{mochi.face}</span>
                </div>
              )}
              {particles.map(p => (
                <div key={p.id} className={`absolute font-black text-xl md:text-3xl pointer-events-none drop-shadow-md animate-float-up-fast z-50 ${p.color}`} style={{ left: p.x - 15, top: p.y - 20 }}>{p.text}</div>
              ))}
            </div>
          ))}

          {gameState !== 'playing' && (
            <div className="absolute inset-0 z-50 bg-[#FDFBF9]/90 backdrop-blur-md rounded-[1.5rem] md:rounded-[3rem] flex flex-col items-center justify-center p-6 md:p-12 text-center animate-fade-in">
              {gameState === 'start' ? (
                <>
                  <div className="w-20 h-20 md:w-32 md:h-32 bg-[#8D6E63] text-white rounded-[45%_45%_30%_30%] flex items-center justify-center shadow-2xl mb-6 md:mb-8 animate-bounce">
                    <span className="font-bold text-2xl md:text-4xl">( • ω • )</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black text-[#4E342E] mb-2 md:mb-4 font-serif italic uppercase tracking-tighter">MOCHI POP</h2>
                  <p className="text-[#8D6E63] font-medium text-sm md:text-lg mb-8 md:mb-10 uppercase tracking-widest">Test your reflexes!</p>
                  <button onClick={startGame} className="bg-[#8D6E63] text-white px-8 py-4 md:px-12 md:py-6 rounded-full font-black text-sm md:text-lg tracking-[0.2em] uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all">
                    <i className="fas fa-play mr-2 md:mr-3"></i> START MISSION
                  </button>
                </>
              ) : (
                <>
                  <h2 className="text-6xl md:text-8xl font-black text-[#4E342E] mb-2 md:mb-4 font-serif italic leading-none">{score}</h2>
                  <p className="text-[#8D6E63] font-bold mb-8 md:mb-10 uppercase tracking-[0.3em] text-[10px] md:text-sm">Final Score</p>
                  <button onClick={startGame} className="bg-[#4E342E] text-white px-8 py-4 md:px-12 md:py-6 rounded-full font-black text-sm md:text-lg tracking-[0.2em] uppercase shadow-xl hover:brightness-110 active:scale-95 transition-all">
                    <i className="fas fa-rotate-left mr-2 md:mr-3"></i> RETRY PROTOCOL
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes popUp {
          0% { transform: translateY(100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-pop-up { animation: popUp 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
        @keyframes floatUpFast {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(-80px); opacity: 0; }
        }
        .animate-float-up-fast { animation: floatUpFast 0.8s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
      `}} />
    </div>
  );
}

// --- Audio Synthesis Helpers for GrooveBox ---
let audioCtx: any = null;
const getAudioContext = () => {
  if (typeof window !== "undefined") {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtx;
  }
  return null;
};

const playKick = (ctx: any, time: any) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.frequency.setValueAtTime(150, time);
  osc.frequency.exponentialRampToValueAtTime(0.001, time + 0.5);
  gain.gain.setValueAtTime(1, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.5);
  osc.start(time);
  osc.stop(time + 0.5);
};

const playSnare = (ctx: any, time: any) => {
  const bufferSize = ctx.sampleRate * 0.2;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const noiseFilter = ctx.createBiquadFilter();
  noiseFilter.type = 'highpass';
  noiseFilter.frequency.value = 1000;
  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.6, time);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  noise.start(time);
};

const playHiHat = (ctx: any, time: any) => {
  const bufferSize = ctx.sampleRate * 0.1;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
  const noise = ctx.createBufferSource();
  noise.buffer = buffer;
  const bandpass = ctx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 10000;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.3, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.05);
  noise.connect(bandpass);
  bandpass.connect(gain);
  gain.connect(ctx.destination);
  noise.start(time);
};

const playSynth = (ctx: any, time: any, note: any) => {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(note, time);
  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(2500, time);
  filter.frequency.exponentialRampToValueAtTime(200, time + 0.2);
  gain.gain.setValueAtTime(0.15, time);
  gain.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.start(time);
  osc.stop(time + 0.2);
};

// --- Interactive Sample Component: Groove Box ---
function GrooveBox() {
  const [power, setPower] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [grid, setGrid] = useState([
    [true, false, false, false, true, false, false, false],
    [false, false, true, false, false, false, true, false],
    [true, true, true, true, true, true, true, true],
    [false, true, false, false, true, false, false, true]
  ]);

  const ROWS = 4;
  const COLS = 8;
  const ROW_CONFIG = [
    { name: 'KICK', color: 'rose', hex: '#f43f5e' },
    { name: 'SNARE', color: 'amber', hex: '#f59e0b' },
    { name: 'HI-HAT', color: 'emerald', hex: '#10b981' },
    { name: 'SYNTH', color: 'cyan', hex: '#06b6d4' }
  ];

  const playBeatSounds = useCallback((beat: number) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume();
    const time = ctx.currentTime;
    if (grid[0][beat]) playKick(ctx, time);
    if (grid[1][beat]) playSnare(ctx, time);
    if (grid[2][beat]) playHiHat(ctx, time);
    if (grid[3][beat]) playSynth(ctx, time, [130.81, 146.83, 164.81, 196.00, 220.00, 130.81, 261.63, 196.00][beat]);
  }, [grid]);

  useEffect(() => {
    if (isPlaying && power) playBeatSounds(currentBeat);
  }, [currentBeat, isPlaying, power, playBeatSounds]);

  useEffect(() => {
    let interval: any;
    if (power && isPlaying) {
      interval = setInterval(() => setCurrentBeat((prev) => (prev + 1) % COLS), (60 / bpm) * 1000 / 2);
    } else setCurrentBeat(0);
    return () => clearInterval(interval);
  }, [isPlaying, bpm, power, COLS]);

  const togglePad = (r: number, c: number) => {
    if (!power) return;
    const newGrid = [...grid];
    newGrid[r] = [...newGrid[r]];
    newGrid[r][c] = !newGrid[r][c];
    setGrid(newGrid);
    if (newGrid[r][c]) {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') ctx.resume();
      if (r === 0) playKick(ctx, ctx.currentTime);
      if (r === 1) playSnare(ctx, ctx.currentTime);
      if (r === 2) playHiHat(ctx, ctx.currentTime);
      if (r === 3) playSynth(ctx, ctx.currentTime, [130.81, 146.83, 164.81, 196.00, 220.00, 130.81, 261.63, 196.00][c]);
    }
  };

  return (
    <div className={`w-full max-w-5xl mx-auto bg-[#1c1c21] rounded-[2.5rem] md:rounded-[4rem] p-4 md:p-16 shadow-2xl relative my-16 md:my-24 reveal border-2 md:border-4 border-zinc-800 ${!power ? 'grayscale-[0.6] brightness-50' : ''}`}>
      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center justify-between mb-10 md:mb-16">
        <div className="w-full max-w-[320px] h-28 md:h-32 bg-[#020617] rounded-2xl md:rounded-3xl border-4 md:border-8 border-[#0f172a] p-4 md:p-6 flex flex-col justify-between shadow-inner">
          <div className="flex justify-between text-cyan-400 text-[10px] md:text-xs font-black tracking-[0.3em]">
            <span className={isPlaying ? 'animate-pulse' : ''}>{isPlaying ? '▶ LIVE' : '■ READY'}</span>
            <span className="tabular-nums">{bpm} BPM</span>
          </div>
          <div className="flex items-end gap-1 h-8 md:h-10">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="flex-1 bg-cyan-400/60 rounded-sm shadow-[0_0_10px_rgba(34,211,238,0.3)]" style={{ height: isPlaying ? `${20 + Math.random() * 80}%` : '4px' }} />
            ))}
          </div>
        </div>

        <div className="flex gap-4 md:gap-8 items-center bg-black/30 p-4 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-white/5 shadow-inner">
          <button onClick={() => { if (!power) return; getAudioContext()?.resume(); setIsPlaying(!isPlaying); }} className={`w-16 h-14 md:w-24 md:h-20 rounded-xl md:rounded-[2rem] border-b-4 md:border-b-8 flex items-center justify-center transition-all ${isPlaying ? 'bg-emerald-400 border-emerald-700 text-emerald-950 scale-95' : 'bg-zinc-100 border-zinc-400 text-zinc-900 active:translate-y-1 active:border-b-4'}`}>{isPlaying ? <i className="fas fa-pause text-xl md:text-2xl"></i> : <i className="fas fa-play text-xl md:text-2xl"></i>}</button>
          <button onClick={() => { setPower(!power); setIsPlaying(false); }} className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl border-b-4 md:border-b-8 flex items-center justify-center transition-all ${power ? 'bg-rose-500 border-rose-800 text-white shadow-xl shadow-rose-500/30' : 'bg-zinc-800 border-zinc-900 text-zinc-500'}`}><i className="fas fa-power-off"></i></button>
        </div>
      </div>

      <div className="bg-[#121217] p-4 md:p-14 rounded-[2rem] md:rounded-[3.5rem] border border-white/5 shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)] overflow-x-auto">
        <div className="flex flex-col gap-4 md:gap-8 min-w-[600px] md:min-w-0">
          {grid.map((row, r) => (
            <div key={r} className="flex items-center gap-4 md:gap-6">
              <div className="w-12 md:w-16 text-right"><span className="text-[10px] md:text-[11px] font-black text-zinc-500 uppercase tracking-widest">{ROW_CONFIG[r].name}</span></div>
              <div className="flex-1 grid grid-cols-8 gap-3 md:gap-4">
                {row.map((isActive, c) => (
                  <button key={`${r}-${c}`} onClick={() => togglePad(r, c)} className={`aspect-square rounded-lg md:rounded-2xl transition-all duration-75 relative shadow-lg ${isActive ? 'scale-105 z-10' : ''} ${isPlaying && currentBeat === c ? 'brightness-150 ring-4 ring-white/30' : ''}`} style={{ backgroundColor: isActive ? ROW_CONFIG[r].hex : '#1e1e24', borderBottom: isActive ? `4px solid rgba(0,0,0,0.4)` : '4px solid #000' }}>
                    <div className={`absolute inset-0 rounded-lg md:rounded-2xl bg-white/10 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [activeQuote, setActiveQuote] = useState("");
  const [expandedExpertise, setExpandedExpertise] = useState<number | null>(null);
  const expertiseRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Update raw mouse positions for custom cursor
      document.documentElement.style.setProperty('--mouse-x-raw', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y-raw', `${e.clientY}px`);

      if (!expertiseRef.current) return;
      const cards = expertiseRef.current.querySelectorAll('.group');
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}%`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}%`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const mainRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const projectsSectionRef = useRef<HTMLElement>(null);
  const educationSectionRef = useRef<HTMLElement>(null);
  const uiuxSectionRef = useRef<HTMLElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Force scroll to top on refresh
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // Select random quote on mount
    setActiveQuote(LOADER_QUOTES[Math.floor(Math.random() * LOADER_QUOTES.length)]);

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    // Serif Bloom Entrance
    const bloomTl = gsap.timeline();
    bloomTl.to(".bloom-char", {
      opacity: 1,
      filter: "blur(0px)",
      scale: 1,
      stagger: {
        each: 0.1,
        from: "center"
      },
      duration: 2,
      ease: "expo.out",
      delay: 0.5
    })
    .to(".loader-bloom-sub", {
      opacity: 1,
      y: 0,
      duration: 1.5,
      ease: "power4.out"
    }, "-=1.2");

    // Hide loader with a premium "Bloom & Scale" exit
    const loaderTimeout = (typeof window !== "undefined" && window.innerWidth < 768) ? 2500 : 3500;
    
    const timer = setTimeout(() => {
      if (loaderRef.current) {
        const tl = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
            setTimeout(() => {
              ScrollTrigger.refresh();
            }, 100);
          }
        });

        tl.to(".bloom-char", {
          y: -40,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: "power4.in"
        })
        .to(".loader-bloom-sub, .absolute.-bottom-32", {
          opacity: 0,
          duration: 0.5,
          ease: "power4.in"
        }, "-=0.6")
        .to(loaderRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut"
        }, "-=0.4");
      } else {
        setIsLoading(false);
      }
    }, loaderTimeout);

    const handleScroll = () => {
      setNavScrolled(window.scrollY > 50);
    };

    // GSAP contexts for cleanup
    const contexts: gsap.Context[] = [];

    // GSAP ScrollTrigger Animations
    const mainCtx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Optimize ScrollTrigger for mobile
      ScrollTrigger.config({ 
        limitCallbacks: true,
        ignoreMobileResize: true 
      });

      // Hero Entrance (Load-triggered) - All Devices
      if (heroSectionRef.current) {
        const tl = gsap.timeline();
        tl.from(".hero-text-part", {
          opacity: 0,
          scale: 0.98,
          duration: 1.2,
          stagger: 0.15,
          ease: "power3.out"
        })
        .from(".hero-image-part", {
          opacity: 0,
          scale: 0.95,
          duration: 1.5,
          ease: "power3.out"
        }, "-=1");

        // Subtle Hero Parallax - All Devices (Increased scrub for fluidity)
        gsap.to(".hero-floating-element", {
          y: (i, target) => (typeof window !== "undefined" && window.innerWidth < 768) ? -20 : -30,
          ease: "none",
          scrollTrigger: {
            trigger: heroSectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.5
          }
        });
      }

      // Sequential Fade Reveals
      const animatedSections = ["#expertise", "#uiux", "#contact"];
      animatedSections.forEach((id) => {
        const elements = document.querySelectorAll(`${id} .reveal`);
        if (elements.length > 0) {
          gsap.fromTo(elements, 
            { opacity: 0, y: 20 }, // Added subtle y-drift
            {
              opacity: 1,
              y: 0,
              duration: 1.2, // Slightly longer for elegance
              stagger: 0.15,
              ease: "power2.out",
              scrollTrigger: {
                trigger: id,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        }
      });

      // Identity: "Typographic Horizon"
      if (aboutSectionRef.current) {
        const backdrop = aboutSectionRef.current.querySelector(".about-backdrop");
        const revealElements = aboutSectionRef.current.querySelectorAll(".reveal");

        // Parallax Backdrop
        gsap.to(backdrop, {
          yPercent: (typeof window !== "undefined" && window.innerWidth < 768) ? 15 : 20,
          ease: "none",
          scrollTrigger: {
            trigger: aboutSectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 2 // Smoother settle
          }
        });

        // Typographic Reveal
        revealElements.forEach((el) => {
          gsap.fromTo(el, 
            { opacity: 0, letterSpacing: "0.2em", filter: "blur(5px)" },
            { 
              opacity: 1, 
              letterSpacing: "normal", 
              filter: "blur(0px)",
              duration: 1.5, 
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 90%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }

      // Projects: "Infinite Marquee Background" Reveal
      if (projectsSectionRef.current) {
        projects.forEach((_, index) => {
          const projectEl = document.querySelector(`[data-project-index="${index}"]`);
          if (!projectEl) return;

          const imageContainer = projectEl.querySelector(".project-image-container");
          const contentElements = projectEl.querySelectorAll("h3, p, a, span");

          // Entrance: Fade & Stagger
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: projectEl,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          });

          tl.fromTo(imageContainer, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" })
            .fromTo(contentElements, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 }, "-=0.8");
            
          // Interaction: Hover zoom
          mm.add("(hover: hover)", () => {
            projectEl.addEventListener("mouseenter", () => {
              gsap.to(imageContainer, { scale: 1.02, duration: 0.6, ease: "power2.out" });
            });
            projectEl.addEventListener("mouseleave", () => {
              gsap.to(imageContainer, { scale: 1, duration: 0.6, ease: "power2.out" });
            });
          });
        });
      }

      // Education: Focus Reveal - All Devices
      gsap.utils.toArray<HTMLElement>(".edu-mist-card").forEach((card) => {
        const image = card.querySelector("img");
        const contentElements = card.querySelectorAll("h3, h4, span, p");
        
        // Image Focus Reveal
        gsap.fromTo(image, 
          { filter: "blur(20px)", scale: 1.1, opacity: 0.5 },
          { 
            filter: "blur(0px)", 
            scale: 1,
            opacity: 1,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              end: "top 30%",
              scrub: 1
            }
          }
        );

        // Text elements bleed in
        gsap.fromTo(contentElements, 
          { opacity: 0, filter: "blur(10px)" },
          { 
            opacity: 1, 
            filter: "blur(0px)",
            stagger: 0.2,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 75%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });

      // Magnetic Buttons (Desktop Only for touch safety)
      mm.add("(min-width: 1024px)", () => {
        const magneticButtons = document.querySelectorAll(".btn-primary, .btn-outline");
        magneticButtons.forEach((btn) => {
          const onMouseMove = (e: any) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(btn, {
              x: x * 0.3,
              y: y * 0.3,
              duration: 0.3,
              ease: "power2.out"
            });
          };
          const onMouseLeave = () => {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.5,
              ease: "elastic.out(1, 0.3)"
            });
          };
          btn.addEventListener("mousemove", onMouseMove);
          btn.addEventListener("mouseleave", onMouseLeave);
        });
      });
    }, mainRef);
    contexts.push(mainCtx);

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
      contexts.forEach(ctx => ctx.revert());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={mainRef} className="min-h-screen selection:bg-[#8D6E63] selection:text-white bg-[#FDFBF9] text-[#4E342E]">
      
      {/* Ultra-Premium "Serif Bloom" Loader */}
      {isLoading && (
        <div ref={loaderRef} className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#FDFBF9] overflow-hidden">
          {/* Central Point of Light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#8D6E63]/10 rounded-full blur-[60px] animate-pulse" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Blooming Typography */}
            <div className="overflow-hidden">
              <h1 className="loader-bloom-name text-[12vw] md:text-8xl font-black italic uppercase font-serif text-[#4E342E] leading-none">
                { "K. Didal".split("").map((char, i) => (
                  <span key={i} className="inline-block bloom-char opacity-0 blur-[20px] scale-[0.5]">
                    {char === " " ? "\u00A0\u00A0" : char}
                  </span>
                ))}
              </h1>
            </div>

            {/* Subtitle & Quote Bloom */}
            <div className="mt-12 flex flex-col items-center text-center max-w-xl px-8">
              <div className="loader-bloom-sub opacity-0 translate-y-4">
                <span className="text-[10px] font-black tracking-[0.8em] uppercase text-[#8D6E63] mb-8 block">
                  Est. 2026 / Creative Developer
                </span>
                
                <div className="space-y-6">
                  <div className="w-8 h-[1px] bg-[#8D6E63]/20 mx-auto" />
                  <p className="text-lg md:text-xl font-medium text-[#8D6E63] italic leading-relaxed">
                    &ldquo;{activeQuote}&rdquo;
                  </p>
                  <div className="w-8 h-[1px] bg-[#8D6E63]/20 mx-auto" />
                </div>
              </div>
            </div>

            {/* Micro Progress Counter */}
            <div className="absolute -bottom-32 flex flex-col items-center gap-2">
              <div className="w-32 h-[1px] bg-[#8D6E63]/10 overflow-hidden">
                <div 
                  className="h-full bg-[#8D6E63] transition-all duration-500"
                  style={{ width: `${loadingProgress}%` }}
                />
              </div>
              <span className="text-[10px] font-black italic font-serif text-[#4E342E]/40 tracking-widest">{loadingProgress}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Navigation (Hidden on Mobile) */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-1000 hidden md:block ${navScrolled ? "bg-white/80 backdrop-blur-xl py-6 border-b border-[#8D6E63]/5" : "bg-transparent py-10"}`}>
        <div className="max-w-[1400px] mx-auto px-8 md:px-16 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <div className="logo-mark">K</div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[11px] font-black tracking-[0.4em] uppercase leading-none mb-1">Kercson Didal</span>
              <span className="text-[8px] font-bold text-[#8D6E63] tracking-[0.2em] uppercase leading-none opacity-60">Portfolio / 2026</span>
            </div>
          </div>
          <div className="flex gap-8 md:gap-12">
            <a href="#about" className="nav-item">About</a>
            <a href="#education" className="nav-item">Education</a>
            <a href="#work" className="nav-item">Work</a>
            <a href="#uiux" className="nav-item">UI/UX</a>
            <a href="#contact" className="nav-item">Contact</a>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar & Toggle */}
      <div className="md:hidden">
        {/* Mobile Header Bar */}
        <div className={`fixed top-0 w-full z-[1000] transition-all duration-1000 ${navScrolled ? "bg-white/80 backdrop-blur-xl py-4 border-b border-[#8D6E63]/5" : "bg-transparent py-7"}`}>
          <div className="px-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center bg-[#4E342E] text-white font-black text-lg rounded-full shadow-lg">K</div>
              <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.2em] uppercase leading-none mb-1">Kercson Didal</span>
                <span className="text-[7px] font-bold text-[#8D6E63] tracking-[0.1em] uppercase leading-none opacity-60">Portfolio / 2026</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="flex flex-col gap-2 p-2 group"
              aria-label="Toggle Menu"
            >
              <div className={`h-[1px] bg-[#4E342E] transition-all duration-500 ${isSidebarOpen ? 'w-8 rotate-45 translate-y-[4.5px]' : 'w-8'}`} />
              <div className={`h-[1px] bg-[#4E342E] transition-all duration-500 ${isSidebarOpen ? 'w-8 -rotate-45 -translate-y-[4.5px]' : 'w-5'}`} />
            </button>
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className={`fixed inset-0 z-[900] transition-all duration-700 ${isSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
          {/* Backdrop */}
          <div 
            onClick={() => setIsSidebarOpen(false)}
            className={`absolute inset-0 bg-[#FDFBF9]/80 backdrop-blur-md transition-opacity duration-700 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`} 
          />
          
          {/* Menu */}
          <nav className={`absolute top-0 right-0 w-[80%] h-full bg-[#FDFBF9] border-l border-[#8D6E63]/10 p-12 flex flex-col justify-center transition-transform duration-700 ease-expo ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className="flex flex-col gap-8">
              {['About', 'Education', 'Work', 'UI/UX', 'Contact'].map((item, i) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace('/', '')}`}
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-4xl font-serif font-black italic uppercase tracking-tighter text-[#4E342E] hover:text-[#8D6E63] transition-colors"
                  style={{ 
                    transitionDelay: `${i * 100}ms`,
                    transform: isSidebarOpen ? 'translateY(0)' : 'translateY(20px)',
                    opacity: isSidebarOpen ? 1 : 0
                  }}
                >
                  {item}.
                </a>
              ))}
            </div>
            
            <div className="mt-24 space-y-6">
              <span className="text-[10px] font-black tracking-[0.4em] uppercase text-[#8D6E63] opacity-40">Get in touch</span>
              <a href="mailto:kercsondidal@gmail.com" className="block text-sm font-bold text-[#4E342E] underline underline-offset-4">kercsondidal@gmail.com</a>
            </div>
          </nav>
        </div>
      </div>

      <main className="max-w-[1400px] mx-auto px-6 md:px-16">
        
        {/* HERO: Balanced & Multi-layered */}
        <section ref={heroSectionRef} className="min-h-screen flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 pt-32 pb-20 overflow-hidden">
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="hero-text-part">
              <span className="section-title">Aspiring Front-End Developer</span>
              <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[110px] font-black leading-[0.9] tracking-tighter uppercase italic mb-8 font-serif">
                Turning <br />
                <span className="text-[#8D6E63] font-medium not-italic font-sans">Ideas</span> <br />
                Into Reality.
              </h1>
            </div>
            <p className="hero-text-part text-lg md:text-2xl text-[#8D6E63] max-w-xl leading-relaxed mb-12 font-medium">
              BSIT Student passionate about creating clean, user-friendly, and visually appealing websites. Eager to learn and work on projects that challenge me to build modern web experiences.
            </p>
            <div className="hero-text-part flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
              <a href="#work" className="btn-primary w-full sm:w-auto text-center">Explore My Work</a>
              <a href="/Didal_CV.pdf" download className="btn-outline w-full sm:w-auto text-center">Download CV</a>
            </div>
            
            <div className="hero-text-part mt-16 flex flex-wrap justify-center lg:justify-start items-center gap-6 text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase text-[#8D6E63] opacity-60">
              <span className="flex items-center gap-2"><i className="fab fa-html5"></i> HTML/CSS</span>
              <span className="hidden sm:block w-1 h-1 bg-[#8D6E63] rounded-full"></span>
              <span className="flex items-center gap-2"><i className="fab fa-js"></i> JavaScript</span>
              <span className="hidden sm:block w-1 h-1 bg-[#8D6E63] rounded-full"></span>
              <span className="flex items-center gap-2"><i className="fab fa-react"></i> React.js</span>
            </div>
          </div>

          <div className="w-full max-w-md lg:max-w-none lg:w-1/2 relative hero-image-part">
            <div className="relative w-full aspect-[4/5] soft-card overflow-hidden hero-floating-element z-20">
              <Image src="/profile.png" alt="Profile" fill className="object-cover scale-110" priority />
            </div>
            {/* Soft UI Layered Accents */}
            <div className="absolute -top-10 -right-10 w-32 h-32 md:w-40 md:h-40 bg-[#C4A490] rounded-[2rem] opacity-20 blur-3xl -z-10 animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-56 h-56 md:w-64 md:h-64 bg-[#8D6E63] rounded-full opacity-10 blur-[100px] -z-10" />
          </div>
        </section>

        {/* ABOUT: "The Story" with Large Backdrop */}
        <section id="about" ref={aboutSectionRef} className="py-24 md:py-48 relative overflow-hidden border-t border-[#8D6E63]/10 reveal">
          <div className="about-backdrop absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#8D6E63]/5 text-[35vw] md:text-[30vw] font-black select-none pointer-events-none uppercase italic font-serif">
            Didal
          </div>
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <span className="section-title reveal block mb-4">Identity</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic mb-12 md:mb-16 leading-none font-serif reveal">The Philosophy.</h2>
            <div className="space-y-8 md:space-y-12 text-xl md:text-4xl text-[#4E342E] leading-[1.3] font-medium tracking-tight">
              <p className="reveal">Fusing <span className="text-[#8D6E63] italic font-serif">learning</span> with <span className="text-[#8D6E63]">creativity</span> to build interactive web experiences.</p>
              <p className="reveal">I am a <span className="bg-[#F2EBE4] px-4 py-1 rounded-xl whitespace-nowrap">BSIT student</span> with a passion for web development and UI/UX design. I'm always eager to learn, improve my skills, and work on projects that challenge me to build modern and professional web applications.</p>
              <p className="text-lg md:text-2xl text-[#8D6E63] font-medium opacity-60 reveal">Currently pursuing a Bachelor of Science in Information Technology at Benedicto College.</p>
            </div>
          </div>
        </section>

        {/* EXPERTISE: Editorial Kinetic Reveal */}
        <section id="expertise" className="py-24 md:py-48 border-t border-[#8D6E63]/10 bg-[#FDFBF9] overflow-hidden">
          <div className="px-4 md:px-8 max-w-[1400px] mx-auto mb-16 md:mb-32">
            <span className="section-title reveal">Proficiency</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none font-serif reveal">Expertise.</h2>
          </div>

          <div className="flex flex-col">
            {skills.map((skill, index) => (
              <div 
                key={index}
                onMouseEnter={() => setExpandedExpertise(index)}
                onMouseLeave={() => setExpandedExpertise(null)}
                className="group relative py-10 md:py-16 border-b border-[#8D6E63]/5 cursor-none overflow-hidden"
              >
                {/* Parallax Moving Background Text */}
                <div 
                  className={`absolute inset-0 flex items-center whitespace-nowrap opacity-[0.03] pointer-events-none transition-transform duration-1000 ease-out`}
                  style={{ 
                    transform: `translateX(${(index % 2 === 0 ? 1 : -1) * (expandedExpertise === index ? 10 : 0)}%)` 
                  }}
                >
                  <span className="text-[15vh] md:text-[25vh] font-black uppercase italic font-serif">
                    {skill.category} {skill.category} {skill.category}
                  </span>
                </div>

                <div className="relative z-10 px-4 md:px-8 max-w-[1400px] mx-auto flex flex-col items-start">
                  <div className="flex items-baseline gap-6 md:gap-12 group-hover:translate-x-6 md:group-hover:translate-x-12 transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <span className="text-sm md:text-xl font-sans opacity-30 font-bold tracking-widest">0{index + 1}</span>
                    <h3 className="text-5xl md:text-[10rem] font-black tracking-tighter uppercase italic font-serif leading-none transition-all duration-700 group-hover:text-[#8D6E63] group-hover:tracking-widest">
                      {skill.category}.
                    </h3>
                  </div>

                  {/* The Ghost Reveal: Skills & Description */}
                  <div 
                    className={`mt-10 md:mt-16 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      expandedExpertise === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-10 md:gap-24 ml-10 md:ml-32">
                      <p className="text-xl md:text-3xl font-medium text-[#4E342E]/70 max-w-xl leading-tight italic font-serif">
                        {skill.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-4 md:gap-6">
                        {skill.items.map((item, iIndex) => (
                          <div 
                            key={iIndex}
                            className="flex items-center gap-3 animate-ripple-in"
                            style={{ animationDelay: `${iIndex * 100}ms` }}
                          >
                            <span className="text-[#8D6E63] text-2xl md:text-3xl">
                              {item.icon}
                            </span>
                            <span className="text-sm md:text-base font-black uppercase tracking-[0.2em] text-[#4E342E]">
                              {item.name}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive Custom Cursor Follower for this section */}
                <div 
                  className={`fixed w-32 h-32 rounded-full border border-[#8D6E63]/20 pointer-events-none z-50 transition-opacity duration-300 flex items-center justify-center ${expandedExpertise === index ? 'opacity-100' : 'opacity-0'}`}
                  style={{ 
                    left: 'var(--mouse-x-raw)', 
                    top: 'var(--mouse-y-raw)',
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <span className="text-[10px] font-black tracking-widest text-[#8D6E63] uppercase">View</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION: Organic Mist Drift Gallery */}
        <section id="education" ref={educationSectionRef} className="py-24 md:py-48 border-t border-[#8D6E63]/10 bg-[#FDFBF9] relative overflow-hidden reveal">
          {/* Decorative Background Mist */}
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#F2EBE4_0%,transparent_70%)] opacity-30 pointer-events-none" />

          <div className="mb-16 md:mb-24 px-4 md:px-8 max-w-[1400px] mx-auto relative z-10 flex flex-col items-start">
            <span className="section-title text-[#8D6E63] reveal">Academic Journey</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none font-serif text-[#4E342E] reveal">Education.</h2>
          </div>

          <div className="space-y-24 md:space-y-48 px-4 md:px-8 max-w-[1200px] mx-auto relative z-10">
            {education.map((edu, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className="edu-mist-card relative flex flex-col items-center reveal"
                >
                  <div className={`w-full flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-10 lg:gap-24 items-center`}>
                    
                    {/* Left/Right: Large Soft Cinematic Image */}
                    <div className="w-full lg:w-3/5 relative aspect-[16/9] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-[0_40px_100px_-20px_rgba(141,110,99,0.1)] group border-2 md:border-4 border-[#F2EBE4]">
                      <Image 
                        src={edu.image} 
                        alt={edu.school} 
                        fill 
                        className="object-cover transition-transform duration-1000 group-hover:scale-105" 
                      />
                      <div className="absolute inset-0 bg-[#8D6E63]/5" />
                    </div>

                    {/* Left/Right: Minimal Floating Content */}
                    <div className={`w-full lg:w-2/5 flex flex-col ${isEven ? 'lg:items-start' : 'lg:items-end lg:text-right'} items-center text-center lg:text-left`}>
                      <span className="text-[10px] md:text-[12px] font-black text-[#8D6E63] opacity-40 mb-4 md:mb-6 block tracking-[0.5em]">0{index + 1}</span>
                      <h3 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic font-serif text-[#4E342E] leading-none mb-6 md:mb-8">
                        {edu.school}
                      </h3>
                      
                      <div className="space-y-6 md:space-y-8 flex flex-col items-center lg:items-start">
                        <div className="space-y-2">
                          <span className="text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase text-[#8D6E63]/60">Qualification</span>
                          <h4 className="text-lg md:text-2xl font-bold text-[#4E342E] leading-tight">
                            {edu.degree}
                          </h4>
                        </div>

                        <span className="inline-block text-[10px] md:text-[12px] font-black tracking-[0.4em] uppercase text-[#8D6E63] bg-[#F2EBE4] px-5 py-2 md:px-6 md:py-3 rounded-full shadow-sm">
                          {edu.period}
                        </span>

                        {edu.highlights && (
                          <p className="text-sm md:text-base font-medium text-[#4E342E]/70 italic border-l-2 border-[#8D6E63]/20 pl-4 md:pl-6 py-2 max-w-sm">
                            &ldquo;{edu.highlights}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* WORK: Full-Bleed Cinematic Stage */}
        <section id="work" ref={projectsSectionRef} className="py-24 md:py-48 border-t border-[#8D6E63]/10 bg-[#FDFBF9] overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-6 md:px-16">
            <div className="mb-24 md:mb-48 flex flex-col items-center text-center">
              <span className="section-title reveal text-[#8D6E63]">Selected Works</span>
              <h2 className="text-6xl md:text-[12vw] font-black tracking-tighter uppercase italic leading-none font-serif reveal text-[#4E342E]">Projects.</h2>
            </div>

            <div className="space-y-48 md:space-y-96">
              {projects.map((project, index) => {
                const isEven = index % 2 === 0;

                return (
                  <div
                    key={index}
                    data-project-index={index}
                    className="project-card-container group relative flex flex-col items-center reveal min-h-[60vh] md:min-h-screen justify-center"
                  >
                    {/* Massive Background Project Title (Parallax) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none z-0 opacity-[0.03] transition-transform duration-1000 group-hover:scale-110">
                      <span className="text-[20vw] font-black uppercase italic font-serif leading-none block">
                        {project.title.split(" ")[0]}
                      </span>
                    </div>

                    <div className="relative z-10 w-full flex flex-col items-center">
                      {/* Project Image: Cinematic Reveal */}
                      <div className="relative w-full max-w-[1100px] aspect-[16/10] md:aspect-[16/9] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden soft-shadow border border-[#8D6E63]/10 bg-white cursor-none group/img">
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-1000 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-[#4E342E]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 flex items-center justify-center">
                          <div className="w-32 h-32 rounded-full border border-white/40 backdrop-blur-md flex items-center justify-center scale-50 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700">
                            <span className="text-white text-[10px] font-black tracking-[0.4em] uppercase">Explore</span>
                          </div>
                        </div>
                      </div>

                      {/* Project Details: Editorial Drift */}
                      <div className={`mt-12 md:mt-20 w-full max-w-4xl flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-start md:items-end justify-between gap-8 md:gap-16`}>
                        <div className="flex flex-col items-start space-y-4 md:space-y-6">
                          <span className="text-[12px] md:text-[14px] font-black text-[#8D6E63] tracking-[0.5em] uppercase">0{index + 1}</span>
                          <h3 className="text-4xl md:text-7xl font-black tracking-tighter uppercase italic leading-none font-serif text-[#4E342E] group-hover:text-[#8D6E63] transition-colors duration-500">
                            {project.title}
                          </h3>
                        </div>
                        
                        <div className={`flex flex-col ${isEven ? 'items-start' : 'items-start md:items-end'} max-w-md`}>
                          <p className={`text-[#8D6E63] text-lg md:text-xl leading-relaxed mb-8 font-medium ${!isEven && 'md:text-right'}`}>
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-3">
                            {project.tags.map((tag, tIndex) => (
                              <span key={tIndex} className="text-[10px] font-black uppercase tracking-widest text-[#4E342E]/40 border-b border-[#8D6E63]/20 pb-1">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* UI/UX SAMPLES: Interactive Experience */}
        <section id="uiux" ref={uiuxSectionRef} className="py-24 md:py-48 border-t border-[#8D6E63]/10 bg-white relative overflow-hidden reveal">
          <div className="mb-16 md:mb-24 px-4 md:px-8 max-w-[1400px] mx-auto relative z-10 flex flex-col items-start">
            <span className="section-title text-[#8D6E63] reveal">Interactive Lab</span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase italic leading-none font-serif text-[#4E342E] reveal">Playground.</h2>
            <p className="mt-6 md:mt-8 text-lg md:text-xl text-[#8D6E63] font-medium max-w-lg reveal">
              Exploring micro-interactions and performance-driven UI through interactive experiments.
            </p>
          </div>

          <div className="mb-16 text-center reveal">
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-[#8D6E63] mb-4 block">Interactive Experience 01</span>
            <h3 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic font-serif text-[#4E342E]">Mochi Pop.</h3>
          </div>
          
          <div className="reveal">
            <MochiPopGame />
          </div>

          <div className="mt-32 md:mt-64 mb-16 text-center reveal">
            <span className="text-[10px] font-black tracking-[0.5em] uppercase text-[#8D6E63] mb-4 block">Interactive Experience 02</span>
            <h3 className="text-2xl md:text-5xl font-black tracking-tighter uppercase italic font-serif text-[#4E342E]">Groove Station.</h3>
            <p className="mt-4 text-base md:text-lg text-[#8D6E63] font-medium italic">A premium hardware-inspired sequencer built with Web Audio API.</p>
          </div>

          <div className="reveal">
            <GrooveBox />
          </div>
        </section>

        {/* CONTACT: Aesthetic Refinement */}
        <section id="contact" className="py-12 md:py-48 relative z-10 reveal overflow-hidden">
          <div className="max-w-[1400px] mx-auto px-4 md:px-16">
            <div className="reveal soft-card bg-[#4E342E] text-white overflow-hidden p-6 md:p-24 shadow-[0_50px_100px_-30px_rgba(78,52,46,0.4)] relative rounded-[2.5rem] md:rounded-[5rem]">
              <div className="relative z-20 flex flex-col lg:flex-row justify-between items-center gap-10 lg:gap-16">
                {/* Text Side - Compact for mobile */}
                <div className="w-full lg:w-[45%] text-center lg:text-left">
                  <span className="text-[#8D6E63] text-[9px] md:text-[10px] font-black tracking-[0.6em] uppercase mb-4 md:mb-10 block">Initiate Collaboration</span>
                  <h2 className="text-4xl md:text-7xl lg:text-[72px] font-black uppercase italic leading-[1.1] mb-6 md:mb-10 font-serif tracking-normal text-white">
                    Start a Conversation.
                  </h2>

                  <div className="space-y-8 md:space-y-16 mb-12 lg:mb-0">
                    <div className="group">
                      <p className="text-[8px] md:text-[10px] font-black tracking-[0.4em] uppercase text-[#8D6E63] mb-2 md:mb-4">Email Address</p>
                      <a href="mailto:kercsondidal@gmail.com" className="text-lg md:text-4xl font-bold hover:text-[#8D6E63] transition-all duration-500 block underline underline-offset-[8px] md:underline-offset-[12px] decoration-white/10 group-hover:decoration-[#8D6E63]/40 break-all">
                        kercsondidal@gmail.com
                      </a>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-8 sm:gap-24">
                      <div>
                        <p className="text-[8px] md:text-[10px] font-black tracking-[0.4em] uppercase text-[#8D6E63] mb-2 md:mb-4">Location</p>
                        <p className="text-xs md:text-base font-bold tracking-widest uppercase opacity-80">Mandaue City, Cebu, PH</p>
                      </div>
                      <div>
                        <p className="text-[8px] md:text-[10px] font-black tracking-[0.4em] uppercase text-[#8D6E63] mb-2 md:mb-4">Social</p>
                        <div className="flex justify-center lg:justify-start gap-6 md:gap-8 text-white/40 text-[9px] md:text-[10px] font-black tracking-[0.4em] uppercase">
                          <a href="#" className="hover:text-white transition-colors">Github</a>
                          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Refined Form Card - Tighter padding for mobile */}
                <div className="w-full lg:w-[52%] bg-white/5 backdrop-blur-xl rounded-[2rem] md:rounded-[3.5rem] p-6 md:p-16 border border-white/10 shadow-2xl relative z-30">
                  <form className="space-y-8 md:space-y-12">
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-[8px] md:text-[9px] font-black tracking-[0.5em] uppercase text-[#8D6E63] opacity-80">Your Identity</label>
                      <input type="text" placeholder="Full Name" className="w-full bg-transparent border-b border-white/20 py-2 md:py-4 focus:outline-none focus:border-[#8D6E63] transition-colors text-white placeholder-white/20 text-base md:text-lg" />
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-[8px] md:text-[9px] font-black tracking-[0.5em] uppercase text-[#8D6E63] opacity-80">Your Inbox</label>
                      <input type="email" placeholder="email@example.com" className="w-full bg-transparent border-b border-white/20 py-2 md:py-4 focus:outline-none focus:border-[#8D6E63] transition-colors text-white placeholder-white/20 text-base md:text-lg" />
                    </div>
                    <div className="space-y-3 md:space-y-4">
                      <label className="text-[8px] md:text-[9px] font-black tracking-[0.5em] uppercase text-[#8D6E63] opacity-80">The Brief</label>
                      <textarea placeholder="Tell me about your project" className="w-full bg-transparent border-b border-white/20 py-2 md:py-4 focus:outline-none focus:border-[#8D6E63] transition-colors h-24 md:h-32 resize-none text-white placeholder-white/20 text-base md:text-lg" />
                    </div>
                    <button type="submit" className="w-full py-4 md:py-7 bg-white text-[#4E342E] text-[10px] md:text-[11px] font-black tracking-[0.6em] uppercase rounded-full hover:bg-[#8D6E63] hover:text-white transition-all duration-700 shadow-2xl active:scale-95">
                      Send Inquiry
                    </button>
                  </form>
                </div>
              </div>              
              {/* Background Accents - Moved further away to prevent visual clutter */}
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none z-0" />
              <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#8D6E63]/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none z-0" />
            </div>
          </div>
        </section>

      </main>

    <footer className="py-12 border-t border-[#8D6E63]/5">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black tracking-[0.4em] uppercase">© 2026 K. Didal</span>
          </div>
          <div className="flex gap-10 md:gap-12">
            <a href="#" className="text-[10px] font-black tracking-[0.4em] uppercase text-[#8D6E63] hover:text-[#4E342E] transition-colors">Github</a>
            <a href="#" className="text-[10px] font-black tracking-[0.4em] uppercase text-[#8D6E63] hover:text-[#4E342E] transition-colors">LinkedIn</a>
          </div>
          <div className="text-[9px] font-bold text-[#8D6E63] tracking-[0.2em] uppercase opacity-40">
            Engineered with Precision
          </div>
        </div>
      </footer>

    </div>
  );
}
