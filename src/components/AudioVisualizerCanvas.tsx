import React, { useEffect, useRef } from 'react';
import { webAudioEngine } from '../audio/WebAudioEngine';

interface AudioVisualizerCanvasProps {
  isPlaying: boolean;
  bpm: number;
}

export const AudioVisualizerCanvas: React.FC<AudioVisualizerCanvasProps> = ({ isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const dataArray = new Uint8Array(32);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    let phase = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const analyser = webAudioEngine.getAnalyser();
      if (analyser && isPlaying) {
        analyser.getByteFrequencyData(dataArray);
      } else {
        for (let i = 0; i < dataArray.length; i++) {
          dataArray[i] = Math.max(0, dataArray[i] - 4);
        }
      }

      phase += isPlaying ? 0.03 : 0.008;

      const numWaves = 3;
      for (let w = 0; w < numWaves; w++) {
        ctx.beginPath();
        const baseAlpha = 0.03 + (w * 0.015);
        ctx.strokeStyle = w === 0 
          ? `rgba(0, 242, 254, ${baseAlpha})` 
          : w === 1 
            ? `rgba(168, 85, 247, ${baseAlpha})` 
            : `rgba(79, 172, 254, ${baseAlpha})`;
        ctx.lineWidth = 1.5;

        const yOffset = canvas.height * (0.3 + w * 0.2);
        const freqAmp = isPlaying ? (dataArray[w * 4] || 20) * 0.4 : 10;

        for (let x = 0; x < canvas.width; x += 10) {
          const wave1 = Math.sin((x * 0.003) + phase + w) * (20 + freqAmp);
          const wave2 = Math.cos((x * 0.007) - phase * 0.5) * 15;
          const y = yOffset + wave1 + wave2;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, [isPlaying]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
    />
  );
};
