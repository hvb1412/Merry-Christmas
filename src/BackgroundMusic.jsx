import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const BackgroundMusic = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const musicUrl = "/jingle-bells-445113.mp3"; // Đảm bảo file nhạc nằm trong thư mục public

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.5; // Âm lượng 50%

    // Hàm cố gắng phát nhạc
    const attemptPlay = () => {
      audio.play()
        .then(() => {
          // Nếu phát thành công
          setIsPlaying(true);
          // Xóa các sự kiện lắng nghe đi vì đã phát được rồi
          removeInteractionListeners();
        })
        .catch((error) => {
          console.log("Trình duyệt chặn Autoplay, chờ tương tác...");
        });
    };

    // Thử phát ngay lập tức khi load trang
    attemptPlay();

    // Nếu thất bại (do trình duyệt chặn), lắng nghe cú click đầu tiên để phát
    const handleInteraction = () => {
      attemptPlay();
    };

    const addInteractionListeners = () => {
      document.addEventListener("click", handleInteraction);
      document.addEventListener("keydown", handleInteraction);
      document.addEventListener("touchstart", handleInteraction);
    };

    const removeInteractionListeners = () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("keydown", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    // Thêm lắng nghe sự kiện
    addInteractionListeners();

    // Cleanup khi component bị hủy
    return () => {
      removeInteractionListeners();
    };
  }, []);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      {/* Thêm thuộc tính autoPlay để trình duyệt ưu tiên phát nếu được phép */}
      <audio ref={audioRef} src={musicUrl} loop autoPlay />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className={`
          w-12 h-12 rounded-full flex items-center justify-center
          backdrop-blur-md border border-white/20 shadow-lg
          transition-all duration-300
          ${isPlaying ? "bg-red-600/80 animate-pulse-slow" : "bg-gray-800/80"}
        `}
        style={{
           boxShadow: isPlaying ? "0 0 15px rgba(220, 38, 38, 0.6)" : "none"
        }}
      >
        {isPlaying ? (
          <div className="flex gap-1 items-end h-4">
             <motion.div animate={{ height: [4, 16, 4] }} transition={{ repeat: Infinity, duration: 0.5 }} className="w-1 bg-white rounded-full" />
             <motion.div animate={{ height: [8, 16, 8] }} transition={{ repeat: Infinity, duration: 0.7 }} className="w-1 bg-white rounded-full" />
             <motion.div animate={{ height: [4, 12, 4] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-1 bg-white rounded-full" />
          </div>
        ) : (
          <span className="text-xl text-white/70">🔇</span>
        )}
      </motion.button>
    </div>
  );
};

export default BackgroundMusic;