import React from "react";
import { motion } from "framer-motion";
import OptimizedSnow from "./OptimizedSnow";
import SparklesCore from "./SparklesCore";

/* =======================
   Typing Text Component
======================= */
const TypingText = React.memo(({ text, delayStart = 0, className = "" }) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delayStart
      }
    }
  };

  const child = {
    hidden: { opacity: 0, y: 6 },
    visible: {
      opacity: 1,
      y: 0,
      textShadow: "0px 0px 8px rgba(255,255,255,0.5)"
    }
  };

  return (
    <motion.div
      style={{ display: "inline-block" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
});

/* =======================
        Main Scene
======================= */
const MainScene = ({ receiverName }) => {
  const bgImage =
    "https://24hstore.vn/upload_images/images/Hinh-nen-Giang-sinh/hinh-nen-giang-sinh-202.jpg";

  const messageLines = [
    "Tiếng chuông ngân vang, báo hiệu mùa an lành đang tới,",
    `Gửi đến ${receiverName} ngàn lời chúc ấm áp nhất,`,
    "Mong bình yên sẽ ghé thăm và nụ cười luôn ở lại.",
    "Chúc những dự định sắp tới sẽ rực rỡ như ánh đèn đêm nay."
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden flex items-center justify-center bg-black font-sans">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 opacity-80 z-0"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-blue-950/40 to-black/80 z-10" />

      {/* Effects */}
      <OptimizedSnow />
      <SparklesCore />

      {/* Content */}
      <div className="relative z-30 w-[95%] max-w-5xl text-center px-4 py-8 sm:p-6 min-h-[100svh] flex flex-col justify-center items-center">
        {/* Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="mb-6 sm:mb-8"
        >
          <div className="bg-red-600/90 text-white px-4 sm:px-6 py-2 rounded-full border border-red-400 shadow-[0_0_15px_rgba(220,38,38,0.5)] flex items-center gap-2">
            <span className="text-lg sm:text-xl animate-bounce">🎁</span>
            <span className="text-xs sm:text-sm font-bold uppercase tracking-widest font-[Quicksand]">
              Special Gift
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col items-center gap-6 sm:gap-8 w-full">
          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)] font-[Dancing_Script,cursive]"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500">
              Dear {receiverName},
            </span>
          </motion.h1>

          {/* Message */}
          <div className="w-full max-w-4xl space-y-3 sm:space-y-4 font-[Quicksand,sans-serif]">
            {messageLines.map((line, i) => (
              <div
                key={i}
                className="min-h-[1.75rem] sm:min-h-[2rem]"
              >
                <TypingText
                  text={line}
                  delayStart={1.5 + i * 2}
                  className="text-base sm:text-lg md:text-2xl lg:text-3xl text-white font-medium leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                />
              </div>
            ))}

            <div className="mt-8 sm:mt-10">
              <TypingText
                text="Merry Christmas & Happy New Year! 🥂✨🎄"
                delayStart={1.5 + messageLines.length * 2}
                className="text-2xl sm:text-3xl md:text-5xl font-bold text-yellow-200 font-[Dancing_Script] drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]"
              />
            </div>
          </div>

          {/* Icons */}
          <motion.div
            className="flex justify-center gap-6 sm:gap-10 mt-8 sm:mt-12 text-4xl sm:text-6xl drop-shadow-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 10, duration: 1 }}
          >
            <span className="animate-bounce" style={{ animationDuration: "2s" }}>
              🎅
            </span>
            <span className="animate-pulse">🎄</span>
            <span
              className="animate-bounce"
              style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
            >
              🎁
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MainScene;
