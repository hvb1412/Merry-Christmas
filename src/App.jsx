import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroScene from "./IntroScene.jsx";
import MainScene from "./MainScene.jsx";
import BackgroundMusic from "./BackgroundMusic.jsx";

function App() {
  const [step, setStep] = useState("intro"); // 'intro' | 'main'
  const [userName, setUserName] = useState("");

  const handleFinishIntro = (name) => {
    setUserName(name);
    setStep("main");
  };

  return (
    <div className="font-sans bg-black h-screen w-screen overflow-hidden relative">
      
      {/* 1. Đặt Component Nhạc ở đây để nó luôn chạy ngầm, không bị ngắt khi đổi cảnh */}
      <BackgroundMusic />

      {/* Background Music Hint */}
      <div className="absolute top-4 right-4 z-50 text-white/30 text-xs pointer-events-none">
          Tap to interact
      </div>

      {/* 2. Phần chuyển cảnh Intro -> Main */}
      <AnimatePresence mode="wait">
        {step === "intro" ? (
          <IntroScene key="intro" onFinish={handleFinishIntro} />
        ) : (
          <MainScene key="main" receiverName={userName} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;