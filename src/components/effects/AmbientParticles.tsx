import { useEffect, useRef } from 'react';

type AmbientParticle = {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  size: number;
  opacity: number;
  phase: number;
  brightness: number;
};

export function AmbientParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    let width = 0;
    let height = 0;
    let ratio = 1;
    let animationFrame = 0;
    let particles: AmbientParticle[] = [];

    const createParticles = () => {
      const count = coarsePointer ? 260 : 680;
      particles = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        velocityX: (Math.random() - 0.5) * (index % 31 === 0 ? 0.56 : 0.2),
        velocityY: (Math.random() - 0.5) * 0.14,
        size: index % 37 === 0 ? 1.75 : 0.48 + Math.random() * 1.05,
        opacity: index % 37 === 0 ? 0.82 : 0.26 + Math.random() * 0.43,
        phase: Math.random() * Math.PI * 2,
        brightness: 0.5 + Math.random() * 0.5,
      }));
    };

    const resize = () => {
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createParticles();
    };

    const draw = (time: number) => {
      const seconds = time / 1000;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'screen';

      for (const particle of particles) {
        if (!reducedMotion) {
          particle.x += particle.velocityX;
          particle.y += particle.velocityY + Math.sin(seconds * 0.58 + particle.phase) * 0.04;
        }

        if (particle.x < -20) particle.x = width + 20;
        if (particle.x > width + 20) particle.x = -20;
        if (particle.y < -20) particle.y = height + 20;
        if (particle.y > height + 20) particle.y = -20;

        const shimmer = (Math.sin(seconds * (2 + particle.brightness * 1.8) + particle.phase) + 1) * 0.5;
        const sparkle = particle.brightness > 0.78 ? Math.pow(shimmer, 4) * 0.52 : 0;
        const twinkle = reducedMotion ? 1 : 0.56 + shimmer * 0.34 + sparkle;
        const alpha = particle.opacity * twinkle;
        context.globalAlpha = alpha;
        context.fillStyle = particle.brightness > 0.82 ? '#edf3ff' : '#8bb0ff';
        context.fillRect(particle.x, particle.y, particle.size, particle.size);

        if (particle.size > 1.2 || particle.brightness > 0.92) {
          const glowRadius = particle.size * (particle.brightness > 0.92 ? 10 : 6.5);
          const glow = context.createRadialGradient(
            particle.x,
            particle.y,
            0,
            particle.x,
            particle.y,
            glowRadius,
          );
          glow.addColorStop(0, `rgba(157, 188, 255, ${Math.min(alpha * 0.92, 0.72)})`);
          glow.addColorStop(0.22, `rgba(102, 145, 255, ${alpha * 0.32})`);
          glow.addColorStop(1, 'rgba(74, 114, 255, 0)');
          context.globalAlpha = 1;
          context.fillStyle = glow;
          context.fillRect(
            particle.x - glowRadius,
            particle.y - glowRadius,
            glowRadius * 2,
            glowRadius * 2,
          );
        }
      }

      context.globalAlpha = 1;
      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas ref={canvasRef} className="ambient-particles" aria-hidden="true" />;
}
