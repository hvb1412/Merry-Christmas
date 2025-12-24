import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const SparklingTree = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    canvas.width = 1000; 
    canvas.height = 1000;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2; 

    const particleCount = 5500; // Tăng mạnh số hạt
    const fov = 450; 
    let angleSpeed = 0.0025; // Chậm hơn để ngắm kỹ
    let time = 0;

    const particles = [];
    const ornaments = [];
    const lightStrings = []; // Dây đèn LED quanh cây
    const garlands = []; // Dây kim tuyến
    const layers = 22; // Tăng độ chi tiết
    const treeHeight = 850; 
    const treeBaseOffset = 400; 

    // KHỞI TẠO HẠT CÂY - Nhiều màu sắc hơn
    for (let i = 0; i < particleCount; i++) {
      const y = - (treeHeight - treeBaseOffset) + Math.random() * treeHeight; 
      const progress = (y + (treeHeight - treeBaseOffset)) / treeHeight;
      const layerProgress = (progress * layers) % 1;
      
      const baseRadius = 10 + progress * 360; 
      const layerShape = Math.pow(Math.sin(layerProgress * Math.PI), 2) * 0.8 + 0.2; 
      const maxRadius = baseRadius * layerShape;
      const radius = maxRadius * Math.pow(Math.random(), 0.4);
      const angle = Math.random() * Math.PI * 2;
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const randomColor = Math.random();
      let color;
      let isHighlight = false;
      
      if (randomColor > 0.98) { 
        color = { r: 255, g: 240, b: 120 }; // Vàng kim
        isHighlight = true; 
      } 
      else if (randomColor > 0.96) { 
        color = { r: 255, g: 255, b: 255 }; // Trắng sáng
        isHighlight = true; 
      } 
      else if (randomColor > 0.94) { 
        color = { r: 255, g: 80, b: 120 }; // Đỏ hồng
        isHighlight = true; 
      }
      else if (randomColor > 0.92) { 
        color = { r: 255, g: 150, b: 50 }; // Cam đào
        isHighlight = true; 
      }
      else if (randomColor > 0.90) { 
        color = { r: 180, g: 100, b: 255 }; // Tím
        isHighlight = true; 
      }
      else if (randomColor > 0.7) color = { r: 100, g: 230, b: 255 }; // Xanh cyan
      else if (randomColor > 0.45) color = { r: 80, g: 200, b: 150 }; // Xanh lá mint
      else if (randomColor > 0.2) color = { r: 60, g: 180, b: 255 }; // Xanh dương
      else color = { r: 50, g: 150, b: 200 }; // Xanh đậm

      particles.push({
        x, y, z, baseX: x, baseZ: z, color, isHighlight,
        sizeBase: Math.random() * 3 + 0.8,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.015 + Math.random() * 0.06,
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    // THÊM QUẢ CẦU TRANG TRÍ - Nhiều hơn và đa dạng
    for (let i = 0; i < 50; i++) {
      const y = -150 + Math.random() * 700;
      const progress = (y + (treeHeight - treeBaseOffset)) / treeHeight;
      const baseRadius = 10 + progress * 320;
      const radius = baseRadius * (0.5 + Math.random() * 0.35);
      const angle = Math.random() * Math.PI * 2;
      
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      const colors = [
        { r: 255, g: 30, b: 60, name: 'red' },      // Đỏ
        { r: 255, g: 215, b: 0, name: 'gold' },     // Vàng kim
        { r: 80, g: 255, b: 120, name: 'green' },   // Xanh lá
        { r: 255, g: 255, b: 255, name: 'silver' }, // Bạc
        { r: 100, g: 150, b: 255, name: 'blue' },   // Xanh dương
        { r: 255, g: 100, b: 200, name: 'pink' },   // Hồng
        { r: 200, g: 100, b: 255, name: 'purple' }  // Tím
      ];
      
      const chosenColor = colors[Math.floor(Math.random() * colors.length)];
      
      ornaments.push({
        x, y, z, baseX: x, baseZ: z,
        color: chosenColor,
        size: 6 + Math.random() * 10,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.015 + Math.random() * 0.035,
        shimmerPhase: Math.random() * Math.PI * 2
      });
    }

    // DÂY ĐÈN LED QUANH CÂY (hiệu ứng xoắn ốc)
    for (let spiral = 0; spiral < 8; spiral++) {
      for (let i = 0; i < 40; i++) {
        const t = i / 40;
        const y = -700 + t * 800;
        const progress = (y + 700) / 800;
        const baseRadius = 30 + progress * 300;
        const angle = spiral * (Math.PI / 4) + t * Math.PI * 6;
        
        const x = Math.cos(angle) * baseRadius;
        const z = Math.sin(angle) * baseRadius;
        
        const colors = [
          { r: 255, g: 255, b: 100 },  // Vàng
          { r: 255, g: 100, b: 100 },  // Đỏ
          { r: 100, g: 255, b: 255 },  // Xanh
          { r: 100, g: 255, b: 100 },  // Xanh lá
          { r: 255, g: 150, b: 255 }   // Tím hồng
        ];
        
        lightStrings.push({
          x, y, z, baseX: x, baseZ: z,
          color: colors[i % colors.length],
          phase: i * 0.3 + spiral * 0.5
        });
      }
    }

    // DÂY KIM TUYẾN (garland) - vòng tròn ngang
    for (let level = 0; level < 12; level++) {
      const y = -650 + level * 60;
      const progress = (y + 700) / 800;
      const radius = 50 + progress * 280;
      
      for (let i = 0; i < 60; i++) {
        const angle = (i / 60) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        garlands.push({
          x, y, z, baseX: x, baseZ: z,
          phase: i * 0.1 + level * 0.2
        });
      }
    }

    let animationFrameId;
    let rotation = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      rotation += angleSpeed;
      time += 1;

      // NỀN PHẢN CHIẾU MẶT ĐẤT - Nâng cao
      const groundY = treeBaseOffset * (fov / (fov + treeBaseOffset)) + centerY + 20;
      const groundRadiusX = 450 * (fov / (fov + treeBaseOffset));
      const groundRadiusY = 90 * (fov / (fov + treeBaseOffset));
      
      // Gradient phức tạp hơn
      const groundGradient = ctx.createRadialGradient(centerX, groundY, 0, centerX, groundY, groundRadiusX);
      groundGradient.addColorStop(0, 'rgba(150, 220, 255, 0.25)');
      groundGradient.addColorStop(0.3, 'rgba(100, 180, 255, 0.15)');
      groundGradient.addColorStop(0.6, 'rgba(80, 150, 255, 0.08)');
      groundGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.save();
      ctx.translate(centerX, groundY);
      ctx.scale(1, groundRadiusY / groundRadiusX); 
      ctx.fillStyle = groundGradient;
      ctx.beginPath();
      ctx.arc(0, 0, groundRadiusX, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Thêm ánh sáng xung quanh gốc cây
      const baseGlow = ctx.createRadialGradient(centerX, groundY - 50, 0, centerX, groundY - 50, 150);
      baseGlow.addColorStop(0, 'rgba(255, 220, 150, 0.3)');
      baseGlow.addColorStop(0.5, 'rgba(255, 180, 100, 0.15)');
      baseGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = baseGlow;
      ctx.beginPath();
      ctx.arc(centerX, groundY - 50, 150, 0, Math.PI * 2);
      ctx.fill();

      // KẾT HỢP TẤT CẢ ELEMENTS
      const allElements = [
        ...particles.map(p => ({...p, type: 'particle'})),
        ...ornaments.map(o => ({...o, type: 'ornament'})),
        ...lightStrings.map(l => ({...l, type: 'light'})),
        ...garlands.map(g => ({...g, type: 'garland'}))
      ];

      allElements.sort((a, b) => {
        const zA = a.baseZ * Math.cos(rotation) + a.baseX * Math.sin(rotation);
        const zB = b.baseZ * Math.cos(rotation) + b.baseX * Math.sin(rotation);
        return zB - zA;
      });

      // VẼ TẤT CẢ ELEMENTS
      allElements.forEach(p => {
        const rotatedX = p.baseX * Math.cos(rotation) - p.baseZ * Math.sin(rotation);
        const rotatedZ = p.baseZ * Math.cos(rotation) + p.baseX * Math.sin(rotation);
        const scale = fov / (fov + rotatedZ + 600); 
        const x2d = rotatedX * scale + centerX;
        const y2d = p.y * scale + centerY;

        if (p.type === 'light') {
          // DÂY ĐÈN LED - Nhấp nháy theo nhóm
          const lightPulse = Math.sin(time * 0.08 + p.phase) * 0.5 + 0.5;
          const brightness = 0.3 + lightPulse * 0.7;
          const lightSize = 3 * scale * (0.8 + lightPulse * 0.4);
          
          // Glow mạnh
          const lightGlow = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, lightSize * 8);
          lightGlow.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${brightness * scale * 0.6})`);
          lightGlow.addColorStop(0.4, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${brightness * scale * 0.3})`);
          lightGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = lightGlow;
          ctx.beginPath();
          ctx.arc(x2d, y2d, lightSize * 8, 0, Math.PI * 2);
          ctx.fill();
          
          // Bóng đèn
          ctx.fillStyle = `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${brightness * scale})`;
          ctx.beginPath();
          ctx.arc(x2d, y2d, lightSize, 0, Math.PI * 2);
          ctx.fill();
          
          // Điểm sáng trung tâm
          ctx.fillStyle = `rgba(255, 255, 255, ${brightness * scale * 0.9})`;
          ctx.beginPath();
          ctx.arc(x2d, y2d, lightSize * 0.4, 0, Math.PI * 2);
          ctx.fill();
        }
        else if (p.type === 'garland') {
          // DÂY KIM TUYẾN - Lấp lánh
          const shimmer = Math.sin(time * 0.05 + p.phase) * 0.5 + 0.5;
          const garlandAlpha = (0.4 + shimmer * 0.6) * scale;
          const garlandSize = 2 * scale;
          
          // Ánh kim tuyến
          const shimmerGrad = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, garlandSize * 4);
          shimmerGrad.addColorStop(0, `rgba(255, 215, 0, ${garlandAlpha * 0.6})`);
          shimmerGrad.addColorStop(0.5, `rgba(255, 180, 50, ${garlandAlpha * 0.3})`);
          shimmerGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = shimmerGrad;
          ctx.beginPath();
          ctx.arc(x2d, y2d, garlandSize * 4, 0, Math.PI * 2);
          ctx.fill();
          
          ctx.fillStyle = `rgba(255, 215, 0, ${garlandAlpha})`;
          ctx.beginPath();
          ctx.arc(x2d, y2d, garlandSize, 0, Math.PI * 2);
          ctx.fill();
        }
        else if (p.type === 'ornament') {
          // QUẢ CẦU - Cải tiến với nhiều chi tiết
          const pulse = Math.sin(time * p.pulseSpeed + p.pulsePhase) * 0.5 + 0.5;
          const shimmer = Math.sin(time * 0.04 + p.shimmerPhase) * 0.5 + 0.5;
          const ornamentSize = p.size * scale * (0.85 + pulse * 0.3);
          
          // Ánh sáng phía sau rất mạnh
          const outerGlow = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, ornamentSize * 4);
          outerGlow.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${0.5 * scale})`);
          outerGlow.addColorStop(0.4, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${0.25 * scale})`);
          outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = outerGlow;
          ctx.beginPath();
          ctx.arc(x2d, y2d, ornamentSize * 4, 0, Math.PI * 2);
          ctx.fill();

          // Quả cầu với gradient 3D phức tạp
          const ballGrad = ctx.createRadialGradient(
            x2d - ornamentSize * 0.35, y2d - ornamentSize * 0.35, 0,
            x2d, y2d, ornamentSize * 1.2
          );
          
          const highlightR = Math.min(p.color.r + 120, 255);
          const highlightG = Math.min(p.color.g + 120, 255);
          const highlightB = Math.min(p.color.b + 120, 255);
          
          ballGrad.addColorStop(0, `rgba(${highlightR}, ${highlightG}, ${highlightB}, ${scale})`);
          ballGrad.addColorStop(0.3, `rgba(${p.color.r + 50}, ${p.color.g + 50}, ${p.color.b + 50}, ${scale})`);
          ballGrad.addColorStop(0.7, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${scale})`);
          ballGrad.addColorStop(1, `rgba(${p.color.r * 0.4}, ${p.color.g * 0.4}, ${p.color.b * 0.4}, ${scale})`);
          
          ctx.fillStyle = ballGrad;
          ctx.beginPath();
          ctx.arc(x2d, y2d, ornamentSize, 0, Math.PI * 2);
          ctx.fill();

          // Viền kim loại
          ctx.strokeStyle = `rgba(180, 180, 180, ${0.6 * scale})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();

          // Điểm sáng phản chiếu chính
          const highlightGrad = ctx.createRadialGradient(
            x2d - ornamentSize * 0.35, y2d - ornamentSize * 0.35, 0,
            x2d - ornamentSize * 0.35, y2d - ornamentSize * 0.35, ornamentSize * 0.4
          );
          highlightGrad.addColorStop(0, `rgba(255, 255, 255, ${0.95 * scale})`);
          highlightGrad.addColorStop(0.6, `rgba(255, 255, 255, ${0.6 * scale})`);
          highlightGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
          ctx.fillStyle = highlightGrad;
          ctx.beginPath();
          ctx.arc(x2d - ornamentSize * 0.35, y2d - ornamentSize * 0.35, ornamentSize * 0.4, 0, Math.PI * 2);
          ctx.fill();

          // Điểm sáng phụ (shimmer)
          const shimmerIntensity = shimmer * scale;
          ctx.fillStyle = `rgba(255, 255, 255, ${shimmerIntensity * 0.5})`;
          ctx.beginPath();
          ctx.arc(x2d + ornamentSize * 0.25, y2d + ornamentSize * 0.15, ornamentSize * 0.15, 0, Math.PI * 2);
          ctx.fill();
        } 
        else {
          // HẠT CÂY THÔNG
          const twinkle = Math.sin(time * p.twinkleSpeed + p.twinklePhase);
          const twinkleNorm = twinkle * 0.5 + 0.5; 
          const alpha = scale * (0.3 + twinkleNorm * 0.7);
          const currentSize = p.sizeBase * scale * (0.75 + twinkleNorm * 0.6);

          if (p.isHighlight) {
            // Bloom effect cực mạnh
            const bloomGrad = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, currentSize * 8);
            bloomGrad.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.7})`);
            bloomGrad.addColorStop(0.25, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.4})`);
            bloomGrad.addColorStop(0.6, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha * 0.15})`);
            bloomGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = bloomGrad;
            ctx.beginPath();
            ctx.arc(x2d, y2d, currentSize * 8, 0, Math.PI * 2);
            ctx.fill();
          }

          // Hạt chính
          const particleGrad = ctx.createRadialGradient(
            x2d - currentSize * 0.2, y2d - currentSize * 0.2, 0,
            x2d, y2d, currentSize
          );
          particleGrad.addColorStop(0, `rgba(${Math.min(p.color.r + 80, 255)}, ${Math.min(p.color.g + 80, 255)}, ${Math.min(p.color.b + 80, 255)}, ${alpha})`);
          particleGrad.addColorStop(0.7, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${alpha})`);
          particleGrad.addColorStop(1, `rgba(${p.color.r * 0.7}, ${p.color.g * 0.7}, ${p.color.b * 0.7}, ${alpha * 0.5})`);
          
          ctx.fillStyle = particleGrad;
          ctx.beginPath();
          ctx.arc(x2d, y2d, currentSize, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      
      // NGÔI SAO ĐỈNH CÂY - Siêu nổi bật
      const topY3D = -(treeHeight - treeBaseOffset) - 40;
      const topScale = fov / (fov + 600);
      const topX = centerX;
      const topY = topY3D * topScale + centerY;
      
      const starPulse = Math.sin(time * 0.04) * 0.5 + 0.5;
      const starRotation = time * 0.015;
      const glowSize = 65 + starPulse * 20;
      
      // Glow cực mạnh nhiều lớp
      for (let i = 3; i > 0; i--) {
        const layerGlow = ctx.createRadialGradient(topX, topY, 0, topX, topY, glowSize * (i * 0.8));
        layerGlow.addColorStop(0, `rgba(255, 255, 220, ${0.9 / i})`);
        layerGlow.addColorStop(0.3, `rgba(255, 230, 120, ${0.6 / i})`);
        layerGlow.addColorStop(0.6, `rgba(255, 200, 80, ${0.3 / i})`);
        layerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = layerGlow;
        ctx.beginPath();
        ctx.arc(topX, topY, glowSize * (i * 0.8), 0, Math.PI * 2);
        ctx.fill();
      }

      // Vẽ ngôi sao 5 cánh với nhiều lớp
      const drawStar = (x, y, spikes, outerRadius, innerRadius) => {
        let rot = Math.PI / 2 * 3;
        let step = Math.PI / spikes;
        
        ctx.beginPath();
        ctx.moveTo(x, y - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
          ctx.lineTo(x + Math.cos(rot) * outerRadius, y + Math.sin(rot) * outerRadius);
          rot += step;
          ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
          rot += step;
        }
        
        ctx.lineTo(x, y - outerRadius);
        ctx.closePath();
      };

      ctx.save();
      ctx.translate(topX, topY);
      ctx.rotate(starRotation);
      ctx.translate(-topX, -topY);

      // Ngôi sao ngoài (lớn hơn, mờ hơn)
      const starOuterSize = 26 + starPulse * 6;
      ctx.fillStyle = 'rgba(255, 220, 100, 0.3)';
      drawStar(topX, topY, 5, starOuterSize, starOuterSize * 0.5);
      ctx.fill();

      // Ngôi sao chính
      const starSize = 22 + starPulse * 5;
      const starGrad = ctx.createRadialGradient(topX, topY - starSize * 0.3, 0, topX, topY, starSize);
      starGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      starGrad.addColorStop(0.4, 'rgba(255, 240, 150, 1)');
      starGrad.addColorStop(0.7, 'rgba(255, 220, 100, 1)');
      starGrad.addColorStop(1, 'rgba(255, 180, 50, 1)');
      
      ctx.fillStyle = starGrad;
      drawStar(topX, topY, 5, starSize, starSize * 0.45);
      ctx.fill();
      
      // Viền vàng kim
      ctx.strokeStyle = 'rgba(255, 235, 150, 1)';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Viền trắng sáng bên trong
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.lineWidth = 1.5;
      drawStar(topX, topY, 5, starSize * 0.85, starSize * 0.45 * 0.85);
      ctx.stroke();

      ctx.restore();

      // Tâm sáng trắng + rays
      const coreGrad = ctx.createRadialGradient(topX, topY, 0, topX, topY, starSize * 0.5);
      coreGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      coreGrad.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
      coreGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(topX, topY, starSize * 0.5, 0, Math.PI * 2);
      ctx.fill();

      // Rays xung quanh ngôi sao
      ctx.save();
      ctx.translate(topX, topY);
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + starRotation * 2;
        const rayLength = 15 + starPulse * 8;
        const rayGrad = ctx.createLinearGradient(0, 0, Math.cos(angle) * rayLength, Math.sin(angle) * rayLength);
        rayGrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        rayGrad.addColorStop(0.5, 'rgba(255, 255, 150, 0.4)');
        rayGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.strokeStyle = rayGrad;
        ctx.lineWidth = 2;
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * rayLength, Math.sin(angle) * rayLength);
        ctx.stroke();
      }
      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.8, ease: "easeOut" }}
      className="relative flex items-center justify-center -mt-24 -mb-24 pointer-events-none" 
    >
        {/* Multi-layer background glow */}
        <div className="absolute inset-0 bg-gradient-radial from-yellow-400/10 via-blue-600/15 to-transparent blur-[140px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-gradient-radial from-white/5 via-transparent to-transparent blur-[100px] rounded-full" />
        <canvas ref={canvasRef} className="z-10 drop-shadow-2xl" style={{ filter: 'drop-shadow(0 0 40px rgba(255,215,0,0.3))' }} />
    </motion.div>
  );
};

export default SparklingTree;