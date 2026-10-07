import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  driftX: number;
  driftY: number;
  size: number;
  brightness: number;
  phase: number;
};

type ParticleSectionTitleProps = {
  text: string;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smoothstep = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

export function ParticleSectionTitle({ text }: ParticleSectionTitleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d', { alpha: true });
    if (!canvas || !context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    let width = 0;
    let height = 0;
    let ratio = 1;
    let particles: Particle[] = [];
    let frame = 0;
    let dissolve = 1;
    let targetDissolve = 1;
    let visible = false;
    let mounted = true;

    const createParticles = () => {
      const source = document.createElement('canvas');
      const sourceContext = source.getContext('2d', { willReadFrequently: true });
      if (!sourceContext) return;

      let fontSize = Math.min(width * 0.115, 92);
      const maxTextWidth = width * 0.94;
      sourceContext.font = `600 ${fontSize}px "Space Grotesk", Arial, sans-serif`;
      while (sourceContext.measureText(text).width > maxTextWidth && fontSize > 18) {
        fontSize -= 1;
        sourceContext.font = `600 ${fontSize}px "Space Grotesk", Arial, sans-serif`;
      }

      const textWidth = Math.ceil(sourceContext.measureText(text).width);
      source.width = textWidth + 24;
      source.height = Math.ceil(fontSize * 1.42) + 24;
      sourceContext.font = `600 ${fontSize}px "Space Grotesk", Arial, sans-serif`;
      sourceContext.fillStyle = '#ffffff';
      sourceContext.textBaseline = 'middle';
      sourceContext.fillText(text, 12, source.height / 2 + fontSize * 0.018);

      const pixels = sourceContext.getImageData(0, 0, source.width, source.height).data;
      const sampleStep = coarsePointer ? 3 : 2;
      const maxParticles = coarsePointer ? 1800 : 4200;
      const sampled: Particle[] = [];
      const centeredX = (width - source.width) / 2;
      const centeredY = (height - source.height) / 2;

      for (let y = 0; y < source.height; y += sampleStep) {
        for (let x = 0; x < source.width; x += sampleStep) {
          if (pixels[(y * source.width + x) * 4 + 3] < 96) continue;
          const direction = Math.sign(x - source.width / 2 || (Math.random() - 0.5));
          sampled.push({
            x: centeredX + x,
            y: centeredY + y,
            driftX: direction * width * (0.035 + Math.random() * 0.07) + (Math.random() - 0.5) * 28,
            driftY: (Math.random() - 0.42) * height * 0.28,
            size: 0.52 + Math.random() * 0.96,
            brightness: 0.58 + Math.random() * 0.42,
            phase: Math.random() * Math.PI * 2,
          });
        }
      }

      const stride = Math.max(1, Math.ceil(sampled.length / maxParticles));
      particles = sampled.filter((_, index) => index % stride === 0);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      createParticles();
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        const formation = entry.isIntersecting ? Math.min(1, entry.intersectionRatio * 1.18) : 0;
        targetDissolve = 1 - formation;
      },
      { threshold: [0, 0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1] },
    );
    observer.observe(canvas);

    const draw = (time: number) => {
      if (!visible && Math.abs(dissolve - targetDissolve) < 0.01) {
        frame = window.requestAnimationFrame(draw);
        return;
      }

      dissolve += (targetDissolve - dissolve) * (reducedMotion ? 0.23 : 0.14);
      const spread = smoothstep(dissolve);
      const seconds = time / 1000;
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'screen';

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        const idleX = reducedMotion ? 0 : Math.sin(seconds * 0.72 + particle.phase) * 0.85;
        const idleY = reducedMotion ? 0 : Math.cos(seconds * 0.6 + particle.phase) * 0.85;
        const x = particle.x + particle.driftX * spread + idleX;
        const y = particle.y + particle.driftY * spread + idleY;
        const alpha = (0.63 + particle.brightness * 0.35) * (1 - spread * 0.28);

        context.globalAlpha = alpha;
        context.fillStyle = particle.brightness > 0.88 ? '#ffffff' : '#d9e6ff';
        context.fillRect(x, y, particle.size, particle.size);

        if (index % 127 === 0) {
          context.globalAlpha = alpha * 0.2;
          context.beginPath();
          context.arc(x, y, particle.size * 3.2, 0, Math.PI * 2);
          context.fillStyle = '#abc6ff';
          context.fill();
        }
      }

      context.globalAlpha = 1;
      frame = window.requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    void document.fonts?.ready.then(() => {
      if (mounted) resize();
    });
    frame = window.requestAnimationFrame(draw);

    return () => {
      mounted = false;
      observer.disconnect();
      resizeObserver.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [text]);

  return <canvas ref={canvasRef} className="particle-section-title__canvas" aria-hidden="true" />;
}
