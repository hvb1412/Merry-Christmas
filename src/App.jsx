import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import IntroScene from "./IntroScene";
import MainScene from "./MainScene";

function App() {
  const [step, setStep] = useState("intro"); // 'intro' | 'main'
  const [userName, setUserName] = useState("");

  const handleFinishIntro = (name) => {
    setUserName(name);
    setStep("main");
  };

  return (
    <div className="font-sans bg-black h-screen w-screen overflow-hidden">
      {/* Background Music Hint */}
      <div className="absolute top-4 right-4 z-50 text-white/30 text-xs">
          Tap to interact
      </div>

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