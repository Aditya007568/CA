
import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  RefreshCw, 
  Trophy, 
  GraduationCap, 
  User, 
  ChevronRight, 
  Camera,
  Briefcase,
  Heart,
  Award
} from 'lucide-react';
import { JOURNEY_STAGES, FLOATING_ICONS } from './constants';

const App: React.FC = () => {
  const [phase, setPhase] = useState<'intro' | 'journey' | 'celebration'>('intro');
  const [activeStage, setActiveStage] = useState(0);
  const [isWalking, setIsWalking] = useState(false);

  const startJourney = () => {
    setPhase('journey');
  };

  const nextStage = () => {
    if (activeStage < JOURNEY_STAGES.length - 1) {
      setIsWalking(true);
      setTimeout(() => {
        setActiveStage(prev => prev + 1);
        setIsWalking(false);
      }, 1000);
    } else {
      setPhase('celebration');
      triggerConfetti();
    }
  };

  const triggerConfetti = () => {
    // @ts-ignore
    if (window.confetti) {
      const end = Date.now() + 5000;
      const frame = () => {
        // @ts-ignore
        window.confetti({ 
          particleCount: 5, 
          angle: 60, 
          spread: 55, 
          origin: { x: 0 }, 
          colors: ['#fbbf24', '#ffffff', '#3b82f6'] 
        });
        // @ts-ignore
        window.confetti({ 
          particleCount: 5, 
          angle: 120, 
          spread: 55, 
          origin: { x: 1 }, 
          colors: ['#fbbf24', '#ffffff', '#3b82f6'] 
        });
        if (Date.now() < end) requestAnimationFrame(frame);
      };
      frame();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-slate-950 p-4 font-sans text-slate-100">
      
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        {FLOATING_ICONS.map((IconObj, i) => (
          <div 
            key={i} 
            className={`floating-icon ${IconObj.color}`}
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            <IconObj.Icon size={32} />
          </div>
        ))}
      </div>

      {/* Intro Phase */}
      {phase === 'intro' && (
        <div className="z-10 text-center animate-in fade-in zoom-in duration-700 max-w-lg">
          <div className="mb-8 relative inline-block">
            <div className="absolute inset-0 bg-amber-500 blur-2xl opacity-20 animate-pulse"></div>
            <h1 className="text-4xl md:text-5xl font-bold gold-text gold-glow relative tracking-tight leading-tight uppercase">
              Come, let me show you something...
            </h1>
          </div>
          <p className="text-3xl text-slate-300 mb-10 font-bold italic tracking-wide">
            Are you ready?
          </p>
          <button 
            onClick={startJourney}
            className="group relative px-10 py-5 bg-gradient-to-r from-amber-600 to-amber-400 text-slate-950 font-black rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-[0_10px_30px_rgba(251,191,36,0.4)] flex items-center gap-3 mx-auto uppercase tracking-wider"
          >
            Yes, absolutely! <ChevronRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
      )}

      {/* Journey Phase */}
      {phase === 'journey' && (
        <div className="z-10 w-full max-w-4xl flex flex-col items-center">
          
          {/* Journey Path Visualization */}
          <div className="w-full h-1 bg-slate-800 rounded-full relative mb-24 mt-12">
            <div 
              className="absolute top-0 left-0 h-full bg-amber-500 transition-all duration-1000 shadow-[0_0_10px_#fbbf24]"
              style={{ width: `${(activeStage / (JOURNEY_STAGES.length - 1)) * 100}%` }}
            />
            
            {/* Stage Markers */}
            {JOURNEY_STAGES.map((stage, idx) => {
              const Icon = stage.icon;
              const isPassed = idx <= activeStage;
              return (
                <div 
                  key={idx}
                  className={`absolute top-1/2 -translate-y-1/2 transition-all duration-500 flex flex-col items-center
                    ${isPassed ? 'opacity-100' : 'opacity-30'}`}
                  style={{ left: `${(idx / (JOURNEY_STAGES.length - 1)) * 100}%` }}
                >
                  <div className={`p-3 rounded-full bg-slate-900 border-2 ${isPassed ? 'border-amber-400' : 'border-slate-700'} shadow-xl mb-2`}>
                    <Icon size={20} className={isPassed ? 'text-amber-400' : 'text-slate-500'} />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold whitespace-nowrap hidden md:block uppercase tracking-tighter text-slate-400">
                    Stage {idx + 1}
                  </span>
                </div>
              );
            })}

            {/* Moving Character */}
            <div 
              className={`absolute top-[-40px] -translate-x-1/2 transition-all duration-1000 flex flex-col items-center
                ${isWalking ? 'animate-bounce' : ''}`}
              style={{ left: `${(activeStage / (JOURNEY_STAGES.length - 1)) * 100}%` }}
            >
              <div className="relative">
                <div className="absolute -top-1 w-6 h-6 bg-amber-400/20 rounded-full animate-ping"></div>
                <User size={40} className="text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
              </div>
            </div>
          </div>

          {/* Active Stage Card */}
          <div className="w-full bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl animate-in slide-in-from-bottom-5 duration-500 min-h-[300px] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-3 py-1 bg-amber-500 text-slate-950 text-xs font-bold rounded-full uppercase tracking-widest">Milestone {activeStage + 1}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-amber-100">{JOURNEY_STAGES[activeStage].title}</h2>
              </div>
              <p className="text-lg md:text-2xl leading-relaxed text-slate-300 italic font-medium">
                "{JOURNEY_STAGES[activeStage].message}"
              </p>
            </div>
            
            <div className="mt-8 flex justify-end">
              <button 
                disabled={isWalking}
                onClick={nextStage}
                className="group px-8 py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-amber-400 transition-all flex items-center gap-2 disabled:opacity-50 shadow-lg"
              >
                {activeStage === JOURNEY_STAGES.length - 1 ? "Celebrate Victory!" : "Next Chapter"} 
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Celebration Phase */}
      {phase === 'celebration' && (
        <div className="z-10 w-full max-w-5xl animate-in fade-in duration-1000 flex flex-col items-center">
          
          <div className="text-center mb-12">
            <div className="inline-block p-4 bg-amber-500/10 rounded-full mb-6">
              <Trophy size={100} className="text-amber-500 animate-bounce" />
            </div>
            <h1 className="text-5xl md:text-7xl font-black gold-text gold-glow mb-2 uppercase tracking-tighter">
              Welcome, My Personal CA SIdhee !
            </h1>
            <p className="text-2xl text-amber-200/80 font-light italic tracking-wide">Siddhi — You have conquered the peak!</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            
            {/* Siddhi's Success Photo Card */}
            <div className="group relative bg-slate-900 rounded-[2.5rem] overflow-hidden border-4 border-amber-500/30 shadow-[0_0_50px_rgba(251,191,36,0.2)] aspect-[4/5] flex flex-col items-center justify-center text-center transition-all duration-500 hover:border-amber-400">
              
              {/* Image Container */}
              <div className="absolute inset-0 z-0">
                <div className="w-full h-full bg-slate-800 flex items-center justify-center overflow-hidden">
                   <img 
                    src="siddhi.jpeg" 
                    alt="CA Siddhi" 
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-110"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "siddhi.jpeg";
                    }}
                   />
                </div>
              </div>

              {/* Overlay with Text */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent z-10"></div>
              
              {/* Badge */}
              <div className="absolute top-6 left-6 z-30">
                <div className="bg-amber-500 text-slate-950 px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest shadow-lg flex items-center gap-2">
                  <Award size={14} /> Certified
                </div>
              </div>

              <div className="z-20 p-10 w-full h-full flex flex-col items-center justify-end text-left relative">
                <div className="absolute top-6 right-6">
                   <Heart className="text-red-500 fill-red-500 animate-pulse" size={42} />
                </div>
                
                <div className="w-full backdrop-blur-sm bg-black/20 p-6 rounded-3xl border border-white/10">
                  <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-1 tracking-tight drop-shadow-lg">CA Siddhi</h3>
                  <div className="flex items-center gap-2 text-amber-400 font-bold uppercase tracking-[0.2em] text-sm">
                    <Sparkles size={18} />
                    Chartered Accountant
                  </div>
                  <div className="mt-6 p-4 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center shadow-inner">
                    <p className="text-white text-3xl font-black tracking-[0.3em] uppercase">PASS</p>
                  </div>
                  <p className="text-slate-300 text-sm mt-4 italic font-medium text-center">Successful Journey • All Stages Complete</p>
                </div>
              </div>
            </div>

            {/* Future Roadmap Card */}
            <div className="bg-gradient-to-br from-slate-900 to-indigo-950 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl p-10 flex flex-col transition-all duration-500 hover:shadow-amber-500/10">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-amber-500 rounded-2xl shadow-lg">
                  <Briefcase size={28} className="text-slate-950" />
                </div>
                <h3 className="text-2xl font-bold uppercase tracking-wider text-amber-50">Professional Future</h3>
              </div>
              
              <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                <div className="w-40 h-40 bg-white/5 rounded-full flex items-center justify-center border-2 border-amber-400/30 relative shadow-[0_0_30px_rgba(251,191,36,0.15)] group-hover:scale-105 transition-transform">
                   <div className="absolute inset-0 border-4 border-amber-500/10 rounded-full animate-spin-slow"></div>
                   <GraduationCap size={80} className="text-amber-400" />
                </div>
                <div className="text-center space-y-5 w-full">
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors shadow-sm">
                    <p className="text-xs text-amber-500 uppercase font-black tracking-[0.3em] mb-2">Expertise</p>
                    <p className="text-xl font-bold text-white uppercase tracking-tight">Audit & Tax Strategy Expert</p>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors shadow-sm">
                    <p className="text-xs text-amber-500 uppercase font-black tracking-[0.3em] mb-2">Vision</p>
                    <p className="text-xl font-bold text-white uppercase tracking-tight">CA Siddhi & Associates • Est. 2026</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-8 border-t border-white/10 text-center">
                <p className="text-slate-400 text-sm font-medium italic leading-relaxed">"This is just the beginning of your journey, Siddhi! Your success will inspire everyone." — Adyaa</p>
              </div>
            </div>

          </div>

          <div className="mt-16 mb-20 flex flex-col items-center">
            <button 
              onClick={() => window.location.reload()}
              className="px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-all flex items-center gap-3 group border border-slate-700 shadow-2xl font-bold uppercase tracking-widest text-sm"
            >
              <RefreshCw className="group-hover:rotate-180 transition-transform duration-1000" size={20} />
              Re-experience the Journey
            </button>
          </div>
          
        </div>
      )}

      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-amber-500/5 to-transparent pointer-events-none z-0"></div>
    </div>
  );
};

export default App;