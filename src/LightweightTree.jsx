import React from "react";
import { motion } from "framer-motion";

const LightweightTree = () => {
  // Tạo vị trí ngẫu nhiên cho các đốm sáng (đèn led) trên cây
  const lights = Array.from({ length: 15 }).map((_, i) => ({
    cx: 100 + Math.cos(i * 13) * (10 + i * 4), // Tính toán toạ độ giả lập hình nón
    cy: 60 + i * 12,
    delay: Math.random() * 2,
    color: i % 3 === 0 ? "#FCD34D" : i % 3 === 1 ? "#60A5FA" : "#F87171", // Vàng, Xanh, Đỏ
  }));

  return (
    <div className="relative w-[300px] h-[400px] flex items-center justify-center">
      {/* Hiệu ứng hào quang phía sau */}
      <div className="absolute inset-0 bg-blue-500/20 blur-[60px] rounded-full animate-pulse" />

      <svg
        viewBox="0 0 200 300"
        className="w-full h-full drop-shadow-[0_0_15px_rgba(56,189,248,0.6)]"
      >
        <defs>
          <linearGradient id="treeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Thân cây (Nhóm các tam giác xếp chồng) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          {/* Tầng 3 (Dưới cùng) */}
          <path
            d="M20,250 L180,250 L100,120 Z"
            fill="url(#treeGradient)"
            stroke="#60A5FA"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Tầng 2 (Giữa) */}
          <path
            d="M40,160 L160,160 L100,60 Z"
            fill="url(#treeGradient)"
            stroke="#93C5FD"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {/* Tầng 1 (Trên cùng) */}
          <path
            d="M60,90 L140,90 L100,20 Z"
            fill="url(#treeGradient)"
            stroke="#BFDBFE"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </motion.g>

        {/* Ngôi sao trên đỉnh */}
        <motion.path
          d="M100,5 L106,18 L120,18 L109,27 L113,40 L100,32 L87,40 L91,27 L80,18 L94,18 Z"
          fill="#FCD34D"
          stroke="#F59E0B"
          strokeWidth="1"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
            filter: ["drop-shadow(0 0 5px #FCD34D)", "drop-shadow(0 0 15px #FCD34D)", "drop-shadow(0 0 5px #FCD34D)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Các đèn Led nhấp nháy */}
        {lights.map((light, i) => (
          <motion.circle
            key={i}
            cx={light.cx}
            cy={light.cy}
            r="3"
            fill={light.color}
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.5, 1] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: light.delay,
            }}
          />
        ))}

        {/* Chân cây */}
        <rect x="90" y="250" width="20" height="30" fill="#1E3A8A" />
      </svg>
    </div>
  );
};

export default LightweightTree;