import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";

const ParticleBackground = ({ variant = "snow" }) => {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Cấu hình cho hiệu ứng tuyết rơi nhẹ nhàng (cho màn hình chính)
  const snowConfig = {
    particles: {
      color: { value: "#ffffff" },
      move: { enable: true, speed: 1.5, direction: "bottom", random: true },
      number: { density: { enable: true, area: 800 }, value: 100 },
      opacity: { value: { min: 0.3, max: 0.8 } },
      shape: { type: "circle" },
      size: { value: { min: 2, max: 5 } },
    },
  };

  // Cấu hình cho hiệu ứng lấp lánh mạnh (cho màn hình Intro)
  const sparkleConfig = {
    particles: {
      color: { value: ["#ffffff", "#FFD700", "#87CEEB"] }, // Trắng, Vàng, Xanh
      move: { enable: true, speed: 0.8, direction: "none", random: true, outModes: "out" },
      number: { density: { enable: true, area: 800 }, value: 150 },
      opacity: { animation: { enable: true, speed: 1, min: 0.1, sync: false } },
      shape: { type: "star" },
      size: { value: { min: 1, max: 4 }, animation: { enable: true, speed: 3, min: 0.3, sync: false } },
    },
  };

  return (
    <Particles
      className="absolute inset-0 -z-0"
      id="tsparticles"
      init={particlesInit}
      options={{
        fullScreen: { enable: false },
        background: { color: { value: "transparent" } },
        fpsLimit: 120,
        ...(variant === "sparkle" ? sparkleConfig : snowConfig),
      }}
    />
  );
};

export default ParticleBackground;