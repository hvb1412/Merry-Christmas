import React, { useMemo } from "react";

const sparkleStyles = `
  @keyframes twinkle {
    0%, 100% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1.5) rotate(180deg); }
  }
`;

const SparklesCore = () => {
  const sparkles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${2 + Math.random() * 3}s`,
      animationDelay: `${Math.random() * 2}s`
    }));
  }, []);

  return (
    <>
      <style>{sparkleStyles}</style>
      <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
        {sparkles.map((s) => (
          <div
            key={s.id}
            className="absolute text-yellow-300 select-none"
            style={{
              left: s.left,
              top: s.top,
              animation: `twinkle ${s.animationDuration} ease-in-out infinite`,
              animationDelay: s.animationDelay,
              fontSize: '1.2rem' // Kích thước sao
            }}
          >
            ✨
          </div>
        ))}
      </div>
    </>
  );
};

export default React.memo(SparklesCore);