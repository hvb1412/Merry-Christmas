import React from "react";
import { motion } from "framer-motion";
import ParticleBackground from "./ParticleBackground";

// --- COMPONENT NHỎ: HIỆU ỨNG CHỮ CHẠY TỪ TỪ ---
const TypingText = ({ text, delayStart = 0, className = "" }) => {
  // Tách chuỗi thành từng ký tự
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: delayStart } // 0.04 là tốc độ chữ chạy
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      textShadow: "0px 0px 8px rgba(255,255,255,0.5)", // Chữ sáng lên khi hiện
      transition: { type: "spring", damping: 12, stiffness: 100 }
    },
    hidden: { opacity: 0, y: 10, transition: { type: "spring", damping: 12, stiffness: 100 } }
  };

  return (
    <motion.div
      style={{ overflow: "hidden", display: "inline-block" }} // Đảm bảo dòng không bị vỡ layout
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span variants={child} key={index}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// --- COMPONENT NHỎ: HIỆU ỨNG LẤP LÁNH ---
const Sparkles = () => {
  // Tạo mảng ngẫu nhiên các ngôi sao lấp lánh
  const sparkles = Array.from({ length: 20 }); 
  return (
    <div className="absolute inset-0 pointer-events-none z-40">
      {sparkles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-yellow-300"
          initial={{ 
            opacity: 0, 
            scale: 0,
            x: Math.random() * window.innerWidth * 0.8 - (window.innerWidth * 0.4), // Random vị trí X quanh tâm
            y: Math.random() * window.innerHeight * 0.8 - (window.innerHeight * 0.4)  // Random vị trí Y quanh tâm
          }}
          animate={{ 
            opacity: [0, 1, 0], 
            scale: [0, 1.5, 0],
            rotate: [0, 180]
          }}
          transition={{
            duration: 2 + Math.random() * 2, // Thời gian ngẫu nhiên
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
          style={{
            left: "50%", 
            top: "50%",
            fontSize: `${10 + Math.random() * 20}px` // Kích thước ngẫu nhiên
          }}
        >
          ✨
        </motion.div>
      ))}
    </div>
  );
};

const MainScene = ({ receiverName }) => {
  const bgImage = "https://24hstore.vn/upload_images/images/Hinh-nen-Giang-sinh/hinh-nen-giang-sinh-202.jpg";

  const messageLines = [
    "Tiếng chuông ngân vang, báo hiệu mùa an lành đang tới,",
    `Gửi đến ${receiverName} ngàn lời chúc ấm áp nhất,`,
    "Mong bình yên sẽ ghé thăm và nụ cười luôn ở lại.",
    "Chúc những dự định sắp tới sẽ rực rỡ như ánh đèn đêm nay.",
  ];

  return (
    <motion.div
      className="relative w-full h-screen flex items-center justify-center overflow-hidden font-sans"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {/* Background & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 scale-105" 
        style={{ backgroundImage: `url(${bgImage})` }} 
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-blue-950/40 to-black/70 z-10" />
      
      {/* Hiệu ứng tuyết rơi có sẵn */}
      <ParticleBackground variant="snow" />
      
      {/* Hiệu ứng lấp lánh thêm vào (New) */}
      <Sparkles />

      {/* Wrapper nội dung */}
      <div className="relative z-30 max-w-5xl w-[95%] text-center p-4">
          
          {/* Badge Special Gift */}
          <motion.div 
             initial={{ scale: 0, opacity: 0 }} 
             animate={{ scale: 1, opacity: 1 }} 
             transition={{ delay: 0.5, type: "spring" }}
             className="mb-6 inline-block"
          >
             <div className="bg-red-600/90 text-white px-6 py-2 rounded-full shadow-[0_0_20px_rgba(220,38,38,0.6)] border border-red-400 flex items-center gap-2">
                <span className="text-xl animate-pulse">🎁</span>
                <span className="font-bold text-sm uppercase tracking-widest font-[Quicksand]">Special Gift</span>
             </div>
          </motion.div>

          <div className="flex flex-col gap-6 items-center">
            {/* Tên người nhận */}
            <motion.h1 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 1 }}
                className="text-6xl md:text-8xl font-bold font-[Dancing_Script,cursive] drop-shadow-[0_5px_5px_rgba(0,0,0,1)] mb-4"
            >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-100 via-yellow-300 to-yellow-500 filter drop-shadow-[0_0_10px_rgba(253,224,71,0.5)]">
                  Dear {receiverName},
                </span>
            </motion.h1>
            
            {/* Nội dung thư - Chạy từng chữ */}
            <div className="space-y-4 font-[Quicksand,sans-serif] min-h-[200px]">
              {messageLines.map((line, i) => (
                <div key={i} className="min-h-[1.5em]"> {/* Giữ chỗ để tránh nhảy layout */}
                    <TypingText 
                        text={line} 
                        delayStart={2.5 + (i * 2.5)} // Tính toán thời gian delay để dòng sau chạy khi dòng trước xong
                        className="text-xl md:text-3xl text-white font-medium leading-relaxed drop-shadow-[0_3px_3px_rgba(0,0,0,0.9)]"
                    />
                </div>
              ))}
              
              {/* Câu chúc cuối cùng (To & Đẹp hơn) */}
               <div className="mt-8">
                <TypingText 
                    text="Merry Christmas & Happy New Year! 🥂✨🎄" 
                    delayStart={2.5 + (messageLines.length * 2.5)} 
                    className="font-bold text-yellow-200 text-3xl md:text-5xl font-[Dancing_Script] drop-shadow-[0_0_15px_rgba(253,224,71,0.6)]"
                />
               </div>
            </div>

            {/* Icon động phía dưới */}
            <motion.div 
                className="flex justify-center gap-8 mt-8 text-6xl drop-shadow-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 14, duration: 1 }} // Hiện ra sau khi chữ chạy xong
            >
               <motion.span animate={{ rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2 }}>🎅</motion.span>
               <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>🎄</motion.span>
               <motion.span animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}>🎁</motion.span>
            </motion.div>
          </div>
      </div>
    </motion.div>
  );
};

export default MainScene;