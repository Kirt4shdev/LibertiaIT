import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';

export default function LightOrbs() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Same orbs for all themes (dark-glass style)
  const orbs = [
    { color: 'rgba(34, 211, 238, 0.45)', size: 700, left: '5%', top: '10%', delay: '0s', duration: '20s' },
    { color: 'rgba(168, 85, 247, 0.45)', size: 650, left: '75%', top: '5%', delay: '-4s', duration: '25s' },
    { color: 'rgba(236, 72, 153, 0.35)', size: 500, left: '60%', top: '55%', delay: '-8s', duration: '22s' },
    { color: 'rgba(16, 185, 129, 0.30)', size: 450, left: '10%', top: '65%', delay: '-12s', duration: '28s' },
    { color: 'rgba(99, 102, 241, 0.35)', size: 550, left: '40%', top: '35%', delay: '-16s', duration: '30s' },
    { color: 'rgba(251, 191, 36, 0.20)', size: 400, left: '85%', top: '70%', delay: '-20s', duration: '18s' },
  ];

  // Reduce orb sizes on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const sizeMultiplier = isMobile ? 0.6 : 1;

  if (!mounted) return null;

  return (
    <>
      {/* CSS Keyframes */}
      <style>{`
        @keyframes float-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(5vw, -3vh) scale(1.05); }
          50% { transform: translate(-3vw, 5vh) scale(0.95); }
          75% { transform: translate(4vw, 2vh) scale(1.02); }
        }
        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-4vw, 4vh) scale(0.98); }
          50% { transform: translate(6vw, -2vh) scale(1.06); }
          75% { transform: translate(-2vw, -4vh) scale(1); }
        }
        @keyframes float-orb-3 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(3vw, 5vh) scale(1.03); }
          50% { transform: translate(-5vw, -3vh) scale(0.97); }
          75% { transform: translate(2vw, -2vh) scale(1.05); }
        }
        @keyframes float-orb-4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-6vw, -2vh) scale(1.04); }
          50% { transform: translate(4vw, 4vh) scale(0.96); }
          75% { transform: translate(-3vw, 3vh) scale(1.02); }
        }
        @keyframes float-orb-5 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(4vw, -5vh) scale(0.98); }
          50% { transform: translate(-2vw, 3vh) scale(1.05); }
          75% { transform: translate(5vw, 2vh) scale(0.97); }
        }
        @keyframes float-orb-6 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-3vw, 4vh) scale(1.06); }
          50% { transform: translate(5vw, -4vh) scale(0.94); }
          75% { transform: translate(-4vw, -2vh) scale(1.03); }
        }
        @keyframes pulse-spotlight {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
      `}</style>

      <div 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1,
          pointerEvents: 'none',
          overflow: 'hidden'
        }}
      >
        {orbs.map((orb, index) => (
          <div
            key={`${theme}-orb-${index}`}
            style={{
              position: 'absolute',
              left: orb.left,
              top: orb.top,
              width: orb.size * sizeMultiplier,
              height: orb.size * sizeMultiplier,
              borderRadius: '50%',
              background: `radial-gradient(circle at center, ${orb.color} 0%, transparent 70%)`,
              filter: isMobile ? 'blur(60px)' : 'blur(80px)',
              animation: `float-orb-${(index % 6) + 1} ${orb.duration} ease-in-out infinite`,
              animationDelay: orb.delay,
              willChange: 'transform'
            }}
          />
        ))}
        
        {/* Extra spotlight effects - same for all themes */}
        <>
          {/* Top spotlight */}
          <div
            style={{
              position: 'absolute',
              top: '-10%',
              left: '20%',
              width: '50%',
              height: '50%',
              background: 'radial-gradient(ellipse at center, rgba(103, 232, 249, 0.25) 0%, transparent 60%)',
              filter: 'blur(60px)',
              animation: 'pulse-spotlight 8s ease-in-out infinite',
              transform: 'rotate(-15deg)'
            }}
          />
          
          {/* Bottom right spotlight */}
          <div
            style={{
              position: 'absolute',
              bottom: '-5%',
              right: '5%',
              width: '45%',
              height: '45%',
              background: 'radial-gradient(ellipse at center, rgba(168, 85, 247, 0.3) 0%, transparent 60%)',
              filter: 'blur(70px)',
              animation: 'pulse-spotlight 10s ease-in-out infinite',
              animationDelay: '-3s'
            }}
          />
          
          {/* Center glow */}
          <div
            style={{
              position: 'absolute',
              top: '35%',
              left: '40%',
              width: '40%',
              height: '35%',
              background: 'radial-gradient(ellipse at center, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
              filter: 'blur(80px)',
              animation: 'pulse-spotlight 6s ease-in-out infinite',
              animationDelay: '-5s'
            }}
          />
        </>
      </div>
    </>
  );
}
