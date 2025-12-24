import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LightweightTree from "./LightweightTree.jsx"; 
import ParticleBackground from "./ParticleBackground";

const IntroScene = ({ onFinish }) => {
  const [name, setName] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowInput(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim()) onFinish(name);
  };

  const titleText = "MERRY CHRISTMAS";

  const letterAnim = {
    hidden: { opacity: 0, y: -40, scale: 0.8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.08,
        duration: 0.8,
        type: "spring",
        stiffness: 90,
      },
    }),
  };

  return (
    <motion.div
      className="relative w-full h-[100svh] overflow-hidden bg-[#020617]"
      exit={{
        opacity: 0,
        scale: 1.5,
        filter: "blur(20px)",
        transition: { duration: 1.2 },
      }}
    >
      {/* Background particles */}
      <div className="absolute inset-0 z-0 opacity-70 pointer-events-none">
        <ParticleBackground variant="sparkle" />
      </div>

      {/* Glow background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-blue-600/10 blur-[160px] rounded-full z-0 animate-pulse pointer-events-none" />

      {/* ===== CHỮ MERRY CHRISTMAS ===== */}
      <div className="absolute top-12 sm:top-14 md:top-16 w-full flex justify-center z-50 select-none px-2">
        <div className="flex flex-wrap justify-center">
          {titleText.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterAnim}
              initial="hidden"
              animate="visible"
              className="
                text-3xl sm:text-5xl md:text-6xl lg:text-8xl
                font-black text-transparent bg-clip-text
                bg-gradient-to-b from-white via-blue-100 to-blue-500
                drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]
                mx-[1px] sm:mx-[2px]
              "
              style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* ===== CÂY THÔNG ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        <div className="scale-90 sm:scale-110 md:scale-125 -translate-y-16 sm:-translate-y-20 md:-translate-y-5"> 
          <LightweightTree />
        </div>
      </div>

      {/* ===== INPUT + BUTTON ===== */}
      <div className="absolute bottom-10 sm:bottom-14 md:bottom-20 w-full flex justify-center z-40 px-4">
        <AnimatePresence>
          {showInput && (
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", duration: 0.9 }}
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-4 sm:gap-6 w-full"
            >
              {/* Input */}
              <div className="relative group w-full max-w-[320px] sm:max-w-md">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên bạn..."
                  autoFocus
                  className="
                    w-full px-6 py-3 sm:px-8 sm:py-4 rounded-full
                    bg-blue-950/60
                    border border-transparent
                    text-white text-center text-lg sm:text-xl
                    placeholder-blue-200/40
                    focus:outline-none
                    focus:bg-blue-900/80
                    backdrop-blur-2xl
                    transition-all
                    shadow-[0_0_40px_rgba(0,0,0,0.5)]
                  "
                />
                
                {/* Glow ring */}
                <div
                  className="
                    absolute inset-0 rounded-full
                    ring-2 ring-blue-400/80
                    opacity-0 scale-105
                    group-focus-within:opacity-100
                    group-focus-within:scale-100
                    transition-all duration-500
                    -z-10
                  "
                />
              </div>

              {/* Button */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px rgba(59,130,246,0.8)",
                }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="
                  px-8 py-2.5 sm:px-12 sm:py-3
                  bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400
                  text-white font-bold rounded-full
                  uppercase tracking-[0.2em] text-xs sm:text-sm
                  border border-white/10
                  relative overflow-hidden
                  shadow-lg
                "
              >
                <span className="relative z-10">Sẵn Sàng!</span>
                <div className="absolute inset-0 bg-white/30 -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12" />
              </motion.button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default IntroScene;