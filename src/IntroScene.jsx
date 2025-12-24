import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import LightweightTree from "./LightweightTree.jsx"; 
import ParticleBackground from "./ParticleBackground";

const IntroScene = ({ onFinish }) => {
  const [name, setName] = useState("");
  const [showInput, setShowInput] = useState(false);

  useEffect(() => {
    // Hiện ô nhập sau 2 giây
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
      className="relative w-full h-screen overflow-hidden bg-[#020617]"
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
      <div className="absolute top-10 md:top-14 w-full flex justify-center z-50 select-none">
        <div className="flex">
          {titleText.split("").map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterAnim}
              initial="hidden"
              animate="visible"
              className="
                text-4xl md:text-6xl lg:text-8xl
                font-black text-transparent bg-clip-text
                bg-gradient-to-b from-white via-blue-100 to-blue-500
                drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]
                mx-[2px]
              "
              style={{ textShadow: "0 10px 30px rgba(0,0,0,0.8)" }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </div>
      </div>

      {/* ===== CÂY THÔNG (ĐÃ CHỈNH VỊ TRÍ CAO LÊN) ===== */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
        {/* -translate-y-24: Đẩy lên trên khoảng 96px
            md:-translate-y-32: Đẩy lên cao hơn nữa trên màn hình lớn 
        */}
        <div className="scale-110 md:scale-125 -translate-y-24 md:-translate-y-10"> 
          <LightweightTree />
        </div>
      </div>

      {/* ===== INPUT + BUTTON ===== */}
      <div className="absolute bottom-14 md:bottom-20 w-full flex justify-center z-40">
        <AnimatePresence>
          {showInput && (
            <motion.form
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ type: "spring", duration: 0.9 }}
              onSubmit={handleSubmit}
              className="flex flex-col items-center gap-6"
            >
              {/* Input */}
              <div className="relative group w-80 md:w-96">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nhập tên vào đây điiii...."
                  autoFocus
                  className="
                    w-full px-8 py-4 rounded-full
                    bg-blue-950/60
                    border border-transparent
                    text-white text-center text-xl
                    placeholder-blue-200/40
                    focus:outline-none
                    focus:bg-blue-900/80
                    backdrop-blur-2xl
                    transition-all
                    shadow-[0_0_40px_rgba(0,0,0,0.5)]
                  "
                />
                
                {/* Vòng sáng quanh input khi focus */}
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
                  px-12 py-3
                  bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400
                  text-white font-bold rounded-full
                  uppercase tracking-[0.25em] text-sm
                  border border-white/10
                  relative overflow-hidden
                  shadow-lg
                "
              >
                <span className="relative z-10">Sẵn Sànggg!</span>
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