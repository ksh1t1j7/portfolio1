import { useEffect, useRef } from 'react';

type PointerState = {
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
};

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export default function RibbonCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef<PointerState>({
    currentX: 0.5,
    currentY: 0.45,
    targetX: 0.5,
    targetY: 0.45,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    let animationFrame = 0;
    let cssWidth = 0;
    let cssHeight = 0;
    let devicePixelRatio = 1;

    const resize = () => {
      cssWidth = window.innerWidth;
      cssHeight = window.innerHeight;
      devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(cssWidth * devicePixelRatio);
      const height = Math.floor(cssHeight * devicePixelRatio);

      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };

    const updatePointer = (x: number, y: number) => {
      pointerRef.current.targetX = clamp(x / window.innerWidth, 0, 1);
      pointerRef.current.targetY = clamp(y / window.innerHeight, 0, 1);
    };

    const onMouseMove = (event: MouseEvent) => {
      updatePointer(event.clientX, event.clientY);
    };

    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      updatePointer(touch.clientX, touch.clientY);
    };

    const onPointerLeave = () => {
      pointerRef.current.targetX = 0.5;
      pointerRef.current.targetY = 0.45;
    };

    const drawBackground = () => {
      const backdrop = context.createLinearGradient(0, 0, 0, cssHeight);
      backdrop.addColorStop(0, '#050505');
      backdrop.addColorStop(0.45, '#101010');
      backdrop.addColorStop(1, '#020202');
      context.fillStyle = backdrop;
      context.fillRect(0, 0, cssWidth, cssHeight);

      const glow = context.createRadialGradient(
        cssWidth * 0.5,
        cssHeight * 0.62,
        0,
        cssWidth * 0.5,
        cssHeight * 0.62,
        Math.max(cssWidth, cssHeight) * 0.75,
      );
      glow.addColorStop(0, 'rgba(255, 149, 61, 0.14)');
      glow.addColorStop(0.4, 'rgba(255, 149, 61, 0.05)');
      glow.addColorStop(1, 'rgba(255, 149, 61, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, cssWidth, cssHeight);
    };

    const animate = (timestamp: number) => {
      const time = timestamp * 0.00038;
      const pointer = pointerRef.current;
      pointer.currentX += (pointer.targetX - pointer.currentX) * 0.035;
      pointer.currentY += (pointer.targetY - pointer.currentY) * 0.035;

      drawBackground();

      const rows = cssWidth < 768 ? 18 : 24;
      const cols = cssWidth < 768 ? 34 : 48;
      const horizon = cssHeight * 0.24;
      const fieldDepth = cssHeight * 0.84;
      const centerX = cssWidth * (0.5 + (pointer.currentX - 0.5) * 0.08);
      const lineColor = 'rgba(255, 166, 92, 0.16)';

      context.lineWidth = 1;
      context.strokeStyle = lineColor;

      for (let row = 0; row <= rows; row += 1) {
        const progress = row / rows;
        const eased = Math.pow(progress, 1.65);
        const y = horizon + eased * fieldDepth;
        const baseSpread = cssWidth * (0.08 + eased * 0.88);
        const waveOffset =
          Math.sin(time * 2.2 + progress * 10 + pointer.currentX * 3.2) * (24 + eased * 50) +
          Math.cos(time * 1.35 + progress * 14 - pointer.currentY * 4) * 12;

        context.beginPath();

        for (let col = 0; col <= cols; col += 1) {
          const normalized = col / cols - 0.5;
          const arc = normalized * normalized;
          const x = centerX + normalized * baseSpread * 2;
          const yOffset =
            waveOffset * (0.3 + eased) * (1 - arc * 0.8) +
            Math.sin(time * 4.5 + col * 0.32 + row * 0.21) * (3 + eased * 6);
          const projectedY = y + yOffset;

          if (col === 0) {
            context.moveTo(x, projectedY);
          } else {
            context.lineTo(x, projectedY);
          }
        }

        context.stroke();
      }

      for (let col = 0; col <= cols; col += 1) {
        const normalized = col / cols - 0.5;
        context.beginPath();

        for (let row = 0; row <= rows; row += 1) {
          const progress = row / rows;
          const eased = Math.pow(progress, 1.65);
          const y = horizon + eased * fieldDepth;
          const baseSpread = cssWidth * (0.08 + eased * 0.88);
          const arc = normalized * normalized;
          const x = centerX + normalized * baseSpread * 2;
          const waveOffset =
            Math.sin(time * 2.2 + progress * 10 + pointer.currentX * 3.2) * (24 + eased * 50) +
            Math.cos(time * 1.35 + progress * 14 - pointer.currentY * 4) * 12;
          const yOffset =
            waveOffset * (0.3 + eased) * (1 - arc * 0.8) +
            Math.sin(time * 4.5 + col * 0.32 + row * 0.21) * (3 + eased * 6);
          const projectedY = y + yOffset;

          if (row === 0) {
            context.moveTo(x, projectedY);
          } else {
            context.lineTo(x, projectedY);
          }
        }

        context.stroke();
      }

      for (let row = 0; row < rows; row += 1) {
        const progress = row / rows;
        const eased = Math.pow(progress, 1.65);
        const y = horizon + eased * fieldDepth;
        const baseSpread = cssWidth * (0.08 + eased * 0.88);
        const waveOffset =
          Math.sin(time * 2.2 + progress * 10 + pointer.currentX * 3.2) * (24 + eased * 50) +
          Math.cos(time * 1.35 + progress * 14 - pointer.currentY * 4) * 12;

        for (let col = 0; col <= cols; col += 1) {
          const normalized = col / cols - 0.5;
          const arc = normalized * normalized;
          const x = centerX + normalized * baseSpread * 2;
          const yOffset =
            waveOffset * (0.3 + eased) * (1 - arc * 0.8) +
            Math.sin(time * 4.5 + col * 0.32 + row * 0.21) * (3 + eased * 6);
          const projectedY = y + yOffset;
          const pulse = 0.4 + 0.6 * Math.sin(time * 3.2 + row * 0.7 + col * 0.18);
          const radius = eased > 0.08 ? (cssWidth < 768 ? 0.85 : 1.1) + eased * 1.25 : 0;

          if (radius <= 0) continue;

          context.beginPath();
          context.fillStyle = `rgba(255, 205, 160, ${0.02 + eased * 0.16 * pulse})`;
          context.arc(x, projectedY, radius, 0, Math.PI * 2);
          context.fill();
        }
      }

      const bloom = context.createRadialGradient(
        centerX,
        cssHeight * 0.54,
        0,
        centerX,
        cssHeight * 0.54,
        cssWidth * 0.26,
      );
      bloom.addColorStop(0, 'rgba(255, 214, 170, 0.22)');
      bloom.addColorStop(0.45, 'rgba(255, 170, 105, 0.08)');
      bloom.addColorStop(1, 'rgba(255, 170, 105, 0)');
      context.fillStyle = bloom;
      context.fillRect(0, 0, cssWidth, cssHeight);

      animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave);

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mouseleave', onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
