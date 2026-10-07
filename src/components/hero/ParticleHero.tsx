import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  startX: number;
  startY: number;
  driftX: number;
  driftY: number;
  depth: number;
  size: number;
  phase: number;
  brightness: number;
  offsetX: number;
  offsetY: number;
  velocityX: number;
  velocityY: number;
};

const clamp = (value: number, min = 0, max = 1) => Math.min(max, Math.max(min, value));
const smoothstep = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

export function ParticleHero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const canvas = canvasRef.current;
    const indicator = indicatorRef.current;
    if (!hero || !canvas || !indicator) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const particleDensity = coarsePointer ? 2 : 3;
    const maxParticles = coarsePointer ? 5200 : 6200;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let pixelRatio = 1;
    let targetProgress = 0;
    let displayedProgress = 0;
    let animationFrame = 0;
    let isMounted = true;
    const introStartTime = performance.now();
    const pointer = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      screenX: 0,
      screenY: 0,
      targetScreenX: 0,
      targetScreenY: 0,
      dragX: 0,
      dragY: 0,
      isDown: false,
    };

    const createTextParticles = (viewportWidth: number, viewportHeight: number) => {
      const source = document.createElement('canvas');
      const sourceContext = source.getContext('2d', { willReadFrequently: true });
      if (!sourceContext) return [];

      const compactLayout = viewportWidth <= 600;
      const words = compactLayout ? ['VISHNU', 'VIKAS'] : ['VISHNU VIKAS'];
      const fontWeight = compactLayout ? 700 : 600;
      let fontSize = Math.min(viewportWidth * (compactLayout ? 0.17 : coarsePointer ? 0.15 : 0.115), coarsePointer ? 120 : 148);
      const maxTextWidth = viewportWidth * (compactLayout ? 0.86 : coarsePointer ? 0.92 : 0.76);
      sourceContext.font = `${fontWeight} ${fontSize}px "Space Grotesk", Arial, sans-serif`;
      while (Math.max(...words.map((word) => sourceContext.measureText(word).width)) > maxTextWidth && fontSize > 24) {
        fontSize -= 1;
        sourceContext.font = `${fontWeight} ${fontSize}px "Space Grotesk", Arial, sans-serif`;
      }

      const textWidth = Math.ceil(Math.max(...words.map((word) => sourceContext.measureText(word).width)));
      const lineAdvance = fontSize * (compactLayout ? 1.2 : 1.05);
      const textHeight = Math.ceil(compactLayout ? fontSize * 2.4 : fontSize * 1.45);
      source.width = textWidth + 28;
      source.height = textHeight + 28;
      sourceContext.clearRect(0, 0, source.width, source.height);
      sourceContext.font = `${fontWeight} ${fontSize}px "Space Grotesk", Arial, sans-serif`;
      sourceContext.fillStyle = '#ffffff';
      sourceContext.textBaseline = 'middle';
      sourceContext.textAlign = 'center';
      words.forEach((word, index) => {
        const lineOffset = (index - (words.length - 1) / 2) * lineAdvance;
        sourceContext.fillText(word, source.width / 2, source.height / 2 + lineOffset);
      });

      const pixels = sourceContext.getImageData(0, 0, source.width, source.height).data;
      const sampled: Particle[] = [];
      const centerX = viewportWidth / 2;
      const centerY = viewportHeight * 0.47;

      for (let y = 0; y < source.height; y += particleDensity) {
        for (let x = 0; x < source.width; x += particleDensity) {
          const alpha = pixels[(y * source.width + x) * 4 + 3];
          if (alpha < 90) continue;

          const normalizedX = (x - source.width / 2) / source.width;
          const normalizedY = (y - source.height / 2) / source.height;
          const outward = Math.sign(normalizedX || (Math.random() - 0.5)) * (0.45 + Math.random() * 0.7);
          sampled.push({
            x: centerX + x - source.width / 2,
            y: centerY + y - source.height / 2,
            startX: Math.random() * viewportWidth,
            startY: Math.random() * viewportHeight,
            driftX: outward * viewportWidth * (0.52 + Math.random() * 0.65) + (Math.random() - 0.5) * 180,
            driftY: viewportHeight * (0.3 + Math.random() * 0.7) + normalizedY * 160,
            depth: (Math.random() - 0.45) * 2.4,
            size: coarsePointer ? 1.25 + Math.random() * 0.6 : 0.6 + Math.random() * 1.1,
            phase: Math.random() * Math.PI * 2,
            brightness: 0.56 + Math.random() * 0.44,
            offsetX: 0,
            offsetY: 0,
            velocityX: 0,
            velocityY: 0,
          });
        }
      }

      if (sampled.length <= maxParticles) return sampled;
      const stride = Math.ceil(sampled.length / maxParticles);
      return sampled.filter((_, index) => index % stride === 0);
    };

    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      width = Math.max(1, Math.floor(bounds.width));
      height = Math.max(1, Math.floor(bounds.height));
      pixelRatio = Math.min(window.devicePixelRatio || 1, coarsePointer ? 1.25 : 1.75);
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      particles = createTextParticles(width, height);
    };

    const updateProgress = () => {
      const scrollableDistance = Math.max(1, hero.offsetHeight - window.innerHeight);
      targetProgress = clamp(-hero.getBoundingClientRect().top / scrollableDistance);
      indicator.style.opacity = String(Math.max(0, 1 - targetProgress * 6));
      indicator.style.transform = `translate(-50%, ${targetProgress * 12}px)`;
    };

    const onPointerMove = (event: PointerEvent) => {
      const deltaX = event.clientX - pointer.targetScreenX;
      const deltaY = event.clientY - pointer.targetScreenY;
      pointer.targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      pointer.targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      pointer.targetScreenX = event.clientX;
      pointer.targetScreenY = event.clientY;

      if (pointer.isDown && !reducedMotion) {
        const distance = Math.hypot(deltaX, deltaY);
        const scale = distance > 24 ? 24 / distance : 1;
        pointer.dragX = pointer.dragX * 0.35 + deltaX * scale * 0.65;
        pointer.dragY = pointer.dragY * 0.35 + deltaY * scale * 0.65;
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      pointer.targetScreenX = event.clientX;
      pointer.targetScreenY = event.clientY;
      pointer.screenX = event.clientX;
      pointer.screenY = event.clientY;
      pointer.isDown = true;
    };

    const onPointerUp = () => {
      pointer.isDown = false;
      pointer.dragX = 0;
      pointer.dragY = 0;
    };

    const draw = (time: number) => {
      displayedProgress += (targetProgress - displayedProgress) * (reducedMotion ? 0.18 : 0.085);
      pointer.x += (pointer.targetX - pointer.x) * 0.045;
      pointer.y += (pointer.targetY - pointer.y) * 0.045;
      pointer.screenX += (pointer.targetScreenX - pointer.screenX) * 0.2;
      pointer.screenY += (pointer.targetScreenY - pointer.screenY) * 0.2;
      pointer.dragX *= 0.86;
      pointer.dragY *= 0.86;

      const dissolve = smoothstep(displayedProgress);
      const seconds = time * 0.001;
      const introDuration = width <= 600 ? 2200 : coarsePointer ? 1200 : 3200;
      const introProgress = reducedMotion ? 1 : clamp((time - introStartTime) / introDuration);
      context.clearRect(0, 0, width, height);
      context.globalCompositeOperation = 'screen';

      for (let index = 0; index < particles.length; index += 1) {
        const particle = particles[index];
        const delay = particle.phase / (Math.PI * 2) * 0.34;
        const formation = reducedMotion ? 1 : smoothstep(clamp((introProgress - delay) / 0.66));
        const idleMotion = coarsePointer ? 0.35 : 2.2;
        const idleX = reducedMotion ? 0 : Math.sin(seconds * 0.72 + particle.phase) * idleMotion;
        const idleY = reducedMotion ? 0 : Math.cos(seconds * 0.61 + particle.phase) * idleMotion;
        const formedX = particle.startX + (particle.x - particle.startX) * formation;
        const formedY = particle.startY + (particle.y - particle.startY) * formation;
        const scatter = dissolve * formation * (0.56 + particle.brightness * 0.44);
        const perspective = 1 + particle.depth * dissolve * 0.18;
        const originX = formedX + particle.driftX * scatter;
        const originY = formedY + particle.driftY * scatter;
        if (pointer.isDown && !reducedMotion) {
          const deltaX = originX - pointer.screenX;
          const deltaY = originY - pointer.screenY;
          const distance = Math.hypot(deltaX, deltaY);
          const radius = coarsePointer ? 120 : 190;
          const influence = Math.exp(-(distance * distance) / (2 * radius * radius));
          const dragStrength = (1 - dissolve * 0.65) * influence;
          const outward = (Math.hypot(pointer.dragX, pointer.dragY) * 0.012 * dragStrength);
          particle.velocityX += (pointer.dragX * 0.11 + (distance ? (deltaX / distance) * outward : 0));
          particle.velocityY += (pointer.dragY * 0.11 + (distance ? (deltaY / distance) * outward : 0));
        }

        particle.velocityX = (particle.velocityX - particle.offsetX * 0.035) * 0.86;
        particle.velocityY = (particle.velocityY - particle.offsetY * 0.035) * 0.86;
        particle.offsetX += particle.velocityX;
        particle.offsetY += particle.velocityY;

        const x = originX + particle.offsetX + idleX + pointer.x * 9 * (1 - dissolve) * particle.brightness;
        const y = originY + particle.offsetY + idleY + pointer.y * 5 * (1 - dissolve);
        const radius = Math.max(0.5, particle.size * perspective * (1 + dissolve * 0.32));
        const baseOpacity = coarsePointer || width <= 600 ? 1 : 0.52 + particle.brightness * 0.42;
        const alpha = baseOpacity * (1 - dissolve * 0.3);

        context.globalAlpha = alpha;
        context.fillStyle = width <= 600 || particle.brightness > 0.88 ? '#eef4ff' : '#8bb0ff';
        context.fillRect(x, y, radius, radius);

        const glowStride = coarsePointer ? 52 : 89;
        if (index % glowStride === 0 && formation > 0.4 && dissolve < 0.86) {
          context.globalAlpha = alpha * (coarsePointer ? 0.07 : 0.16);
          context.fillStyle = '#7a9fff';
          context.beginPath();
          context.arc(x, y, radius * (coarsePointer ? 3 : 4.2), 0, Math.PI * 2);
          context.fill();
        }
      }

      context.globalAlpha = 1;
      animationFrame = window.requestAnimationFrame(draw);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    void document.fonts?.ready.then(() => {
      if (isMounted) resize();
    });
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });
    window.addEventListener('blur', onPointerUp);
    animationFrame = window.requestAnimationFrame(draw);

    return () => {
      isMounted = false;
      resizeObserver.disconnect();
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('blur', onPointerUp);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <section id="home" ref={heroRef} className="hero" aria-labelledby="hero-title">
      <div className="hero__sticky">
        <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
        <h1 id="hero-title" className="sr-only">Vishnu Vikas</h1>
        <p className="hero__meta" aria-hidden="true">PORTFOLIO / 2026</p>
        <div ref={indicatorRef} className="hero__indicator" aria-hidden="true">
          <span className="hero__mouse" />
          <span>DRAG DOWN</span>
          <b>↓</b>
        </div>
      </div>
    </section>
  );
}
