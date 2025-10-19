"use client";
import React, { useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import StyledH2 from "./StyledH2";
import Link from "next/link";
import { Dancing_Script } from "next/font/google";

const dancingScript = Dancing_Script({ subsets: ["latin"], weight: "400" });

// Import the NavTab component
// import NavTab from './NavTab';

// ------------------------- LetterGlitch Background (inlined) -------------------------
// ... (The Particle, ColorUtils, useMatrixAnimation, and LetterGlitch logic remains unchanged)
const FONT_SIZE = 16;
const CHAR_WIDTH = 10;
const CHAR_HEIGHT = 20;
const CHARACTER_SET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*()-_{}[]:;<>,.?/";

class Particle {
  x: number;
  y: number;
  char: string;
  initialColor: string;
  currentColor: string;
  targetColor: string;
  colorProgress: number;

  constructor(
    x: number,
    y: number,
    char: string,
    color: string,
    targetColor: string
  ) {
    this.x = x;
    this.y = y;
    this.char = char;
    this.initialColor = color;
    this.currentColor = color;
    this.targetColor = targetColor;
    this.colorProgress = 1.0;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.currentColor;
    ctx.fillText(this.char, this.x, this.y);
  }

  randomizeCharacter() {
    this.char = CHARACTER_SET[Math.floor(Math.random() * CHARACTER_SET.length)];
  }

  setNewTargetColor(newColor: string, smooth: boolean) {
    if (!smooth) {
      this.currentColor = newColor;
      this.targetColor = newColor;
      this.colorProgress = 1.0;
    } else {
      this.initialColor = this.currentColor;
      this.targetColor = newColor;
      this.colorProgress = 0.0;
    }
  }

  updateColorTransition(): boolean {
    if (this.colorProgress >= 1) return false;
    this.colorProgress = Math.min(this.colorProgress + 0.05, 1);
    const start = ColorUtils.hexToRgb(this.initialColor);
    const end = ColorUtils.hexToRgb(this.targetColor);
    if (start && end) {
      this.currentColor = ColorUtils.interpolateRgb(
        start,
        end,
        this.colorProgress
      );
    }
    return true;
  }
}

interface RgbColor {
  r: number;
  g: number;
  b: number;
}
const ColorUtils = {
  hexToRgb(hex: string): RgbColor | null {
    if (!hex || hex.charAt(0) !== "#") return null;
    const cleanHex = hex.substring(1);
    const fullHex =
      cleanHex.length === 3
        ? cleanHex
            .split("")
            .map((c: string) => c + c)
            .join("")
        : cleanHex;
    if (fullHex.length !== 6) return null;
    return {
      r: parseInt(fullHex.substring(0, 2), 16),
      g: parseInt(fullHex.substring(2, 4), 16),
      b: parseInt(fullHex.substring(4, 6), 16),
    };
  },
  interpolateRgb(start: RgbColor, end: RgbColor, factor: number): string {
    const r = Math.round(start.r + (end.r - start.r) * factor);
    const g = Math.round(start.g + (end.g - start.g) * factor);
    const b = Math.round(start.b + (end.b - start.b) * factor);
    return `rgb(${r}, ${g}, ${b})`;
  },
  getRandomColor(colors: string[]): string {
    return colors[Math.floor(Math.random() * colors.length)];
  },
};

interface AnimationOptions {
  colors?: string[];
  speed?: number;
  smooth?: boolean;
}
const useMatrixAnimation = (
  canvasRef: React.RefObject<HTMLCanvasElement>,
  options: AnimationOptions,
  getContainerSize: () => { width: number; height: number }
) => {
  const {
    colors = ["#2b4539", "#61dca3", "#61b3dc"],
    speed = 50,
    smooth = true,
  } = options;
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameId = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const getRandomColorMemoized = useCallback(
    () => ColorUtils.getRandomColor(colors),
    [colors]
  );

  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d", {
      willReadFrequently: true,
    })!;
    contextRef.current = context;
    const grid = { cols: 0, rows: 0 };

    const setup = (width: number, height: number) => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.font = `${FONT_SIZE}px monospace`;
      context.textBaseline = "top";
      grid.cols = Math.ceil(width / CHAR_WIDTH);
      grid.rows = Math.ceil(height / CHAR_HEIGHT);
      particlesRef.current = [];
      for (let row = 0; row < grid.rows; row++) {
        for (let col = 0; col < grid.cols; col++) {
          const x = col * CHAR_WIDTH;
          const y = row * CHAR_HEIGHT;
          const char =
            CHARACTER_SET[Math.floor(Math.random() * CHARACTER_SET.length)];
          const color = getRandomColorMemoized();
          const targetColor = getRandomColorMemoized();
          particlesRef.current.push(
            new Particle(x, y, char, color, targetColor)
          );
        }
      }
    };

    const animate = (timestamp: number) => {
      let needsRedraw = false;
      const elapsed = timestamp - lastUpdateTime.current;
      if (elapsed > speed) {
        const updateCount = Math.max(
          1,
          Math.floor(particlesRef.current.length * 0.05)
        );
        for (let i = 0; i < updateCount; i++) {
          const index = Math.floor(Math.random() * particlesRef.current.length);
          const particle = particlesRef.current[index];
          if (particle) {
            particle.randomizeCharacter();
            particle.setNewTargetColor(getRandomColorMemoized(), smooth);
          }
        }
        lastUpdateTime.current = timestamp;
        needsRedraw = true;
      }
      if (smooth) {
        particlesRef.current.forEach((p) => {
          if (p.updateColorTransition()) needsRedraw = true;
        });
      }
      if (needsRedraw) {
        const canvasWidth = canvas.width / (window.devicePixelRatio || 1);
        const canvasHeight = canvas.height / (window.devicePixelRatio || 1);
        context.clearRect(0, 0, canvasWidth, canvasHeight);
        particlesRef.current.forEach((p) => p.draw(context));
      }
      animationFrameId.current = requestAnimationFrame(animate);
    };

    const { width, height } = getContainerSize();
    setup(width, height);

    window.addEventListener("resize", () => setup(width, height));

    // set lastUpdateTime so the first frame can run immediately
    lastUpdateTime.current =
      performance && performance.now && performance.now()
        ? performance.now() - speed - 1
        : 0;
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", () => setup(width, height));
    };
  }, [colors, speed, smooth, canvasRef, getRandomColorMemoized, getContainerSize]);
};

interface LetterGlitchProps {
  glitchColors?: string[];
  glitchSpeed?: number;
  smooth?: boolean;
  centerVignette?: boolean;
  outerVignette?: boolean;
  className?: string;
}

const LetterGlitch = ({
  glitchColors,
  glitchSpeed,
  smooth,
  centerVignette = false,
  outerVignette = true,
  className,
}: LetterGlitchProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getContainerSize = useCallback(() => {
    if (containerRef.current) {
      return {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      };
    }
    return { width: 0, height: 0 };
  }, []);

  useMatrixAnimation(canvasRef as React.RefObject<HTMLCanvasElement>, { colors: glitchColors, speed: glitchSpeed, smooth }, getContainerSize);

  return (
    // keep background in normal stacking context (z-0) so it stays behind the card but not under the page
    <div ref={containerRef} className={`absolute inset-0 z-0 overflow-hidden ${className}`}>
      <canvas ref={canvasRef} className="block w-full h-full" />
      {/* soften vignette so characters remain visible */}
      {outerVignette && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,0.45) 100%)",
          }}
        />
      )}
      {centerVignette && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 60%)",
          }}
        />
      )}
    </div>
  );
};

// ------------------------- Portfolio Component -------------------------
const LinkedInIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
  </svg>
);
const GithubIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 496 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3.3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-23.3 2.6-57.5 0 0 21.9-7 72.1 25.6 20.9-6.2 43.6-9.4 66.3-9.4 22.7 0 45.4 3.1 66.3 9.4 50.2-32.6 72.1-25.6 72.1-25.6 13.7 34.2 5.2 51 2.6 57.5 16 17.6 23.6 31.4 23.6 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path>
  </svg>
);
const CustomIcon = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 24 24"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M 9.3769531 4.0039062 C 8.5089531 4.0039062 6.1811406 4.3226094 5.2441406 4.5996094 C 4.3761406 4.8556094 3.6552344 5.4479531 3.2402344 6.2519531 C 2.3502344 7.9739531 0.997 11.501531 1 17.019531 C 2.067 18.340531 5.7198125 20 8.0078125 20 L 9 18.65625 C 9 18.65625 10.653 19.019531 12 19.019531 L 12.013672 19.019531 C 13.360672 19.019531 15.013672 18.65625 15.013672 18.65625 L 16 20 C 17 20 20.494672 19.461531 23.013672 17.019531 C 23.016672 11.501531 21.663438 7.9729531 20.773438 6.2519531 C 20.358438 5.4489531 19.636531 4.8556094 18.769531 4.5996094 C 17.339531 4.1056094 14.521484 4.0039063 14.521484 4.0039062 L 14.001953 5.1425781 C 14.001953 5.1425781 12.672 5 12 5 C 11.329 5 10.013672 5.1425781 10.013672 5.1425781 L 9.3769531 4.0039062 z M 8.1972656 6.0078125 C 8.4792656 6.7598125 8.8789062 7.1464844 8.8789062 7.1464844 C 8.8789062 7.1464844 11.597672 6.9882813 12.013672 6.9882812 C 12.415672 6.9882812 15.158203 7.1464844 15.158203 7.1464844 C 15.158203 7.1464844 15.534406 6.7598125 15.816406 6.0078125 C 16.113406 6.0248125 16.833125 6.1125781 18.203125 6.5175781 C 18.550125 6.6205781 18.832094 6.8509219 18.996094 7.1699219 C 19.684094 8.5009219 20.858 11.424547 21 16.060547 C 21.001 16.101547 20.979359 16.146781 20.943359 16.175781 C 19.737359 17.143781 18.380313 17.748609 16.945312 17.974609 L 16.869141 17.853516 C 17.770624 17.449485 18.400391 17.080078 18.400391 17.080078 L 17.349609 15.376953 C 17.349609 15.376953 14.606222 17 12 17 C 9.3937778 17 6.6503906 15.376953 6.6503906 15.376953 L 5.5996094 17.080078 C 5.5996094 17.080078 6.2328457 17.451408 7.140625 17.857422 L 7.0703125 17.972656 C 5.6123125 17.740656 4.2663125 17.136781 3.0703125 16.175781 C 3.0343125 16.146781 3.0126719 16.1035 3.0136719 16.0625 C 3.1556719 11.4255 4.3295781 8.5009219 5.0175781 7.1699219 C 5.1815781 6.8519219 5.4635469 6.6205781 5.8105469 6.5175781 C 7.1805469 6.1135781 7.9012656 6.0258125 8.1972656 6.0078125 z M 8.5 10 A 1.5 2 0 0 0 8.5 14 A 1.5 2 0 0 0 8.5 10 z M 15.5 10 A 1.5 2 0 0 0 15.5 14 A 1.5 2 0 0 0 15.5 10 z"></path>
  </svg>
);

export default function Portfolio2WithBg() {
  const glitchColors = [
    "#32a852",
    "#4287f5",
    "#d942f5",
    "#f54242",
    "#f5e342",
    "#42f5f5",
    "#f5a142",
  ];
  return (
    // FIX 1: Use min-h-screen for full browser height flexing
    <div className="w-full min-h-screen flex items-center justify-center font-sans relative overflow-hidden bg-black text-white p-4">
      {/* LetterGlitch background */}
      <LetterGlitch
        glitchColors={glitchColors}
        glitchSpeed={50}
        smooth={true}
        outerVignette={true}
        centerVignette={false}
      />

      {/* FIX 2: RENDER AND POSITION THE NAVTAB 
        - Positioned absolutely to the top center.
        - High z-index (z-50) to sit above the glitch effect (z-0) and the profile card (z-10).
      */}
      {/* <div className="absolute top-4 md:top-6 left-1/2 transform -translate-x-1/2 z-50">
          <NavTab onTabChange={(tab) => console.log('Navigating to', tab)} />
      </div> */}

      {/* Content card - Design is NOT changed */}
      <div className="relative w-full max-w-5xl p-6 md:p-10 rounded-2xl border border-white/10 bg-black/70 backdrop-blur-sm shadow-2xl z-10">
        <main className="flex flex-col md:flex-row items-center justify-between gap-8 py-6 px-4">
          <div className="text-left md:w-1/2">
            {/* Animated gray-white gradient name */}
            <h1 className={`text-4xl md:text-5xl mb-4 bg-gradient-to-r from-gray-300 via-white to-gray-300 text-transparent bg-clip-text animate-gradient-x ${dancingScript.className}`}>
              {"Hi I'm Sharath".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    delay: i * 0.1,
                    type: "spring",
                    stiffness: 120,
                    damping: 12,
                  }}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </h1>

            {/* Digital-style secondary heading */}
            <StyledH2 text="Crafting Digital Experiences" />

            <p className="mt-4 text-gray-300 text-lg max-w-md">
              A passionate Web Designer creating modern, responsive, and
              user-friendly websites.
            </p>

            <div className="flex">
              <Link href="/contact">
                <button className="mt-8 mr-4 inline-block px-8 py-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition">
                  Let&apos;s Talk
                </button>
              </Link>

              <Link href="https://drive.google.com/file/d/1fy3MOzBU4IkWDWHaSnoolgUnpsAXmTHi/view?usp=drive_link">
                <button className="mt-8 inline-block px-8 py-3 rounded-lg bg-white/10 border border-white/20 hover:bg-white/20 transition">
                  CV
                </button>
              </Link>
            </div>
          </div>

          <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 flex-shrink-0">
            <div className="w-full h-full overflow-hidden shadow-xl rounded-full border-2 border-white/10">
              <img
                src="https://i.pinimg.com/736x/3c/a0/23/3ca023b594a47949e4664190d0c30e1a.jpg"
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>
        </main>

        <footer className="flex justify-start pt-6 px-4">
          <div className="flex space-x-5 text-gray-300 text-xl">
            <a
              href="https://www.linkedin.com/in/sharath-gowda-g-r-372832281/"
              className="hover:text-white transition"
            >
              {LinkedInIcon()}
            </a>
            <a
              href="https://github.com/DiganthGowdaGR"
              className="hover:text-white transition"
            >
              {GithubIcon()}
            </a>
            <a href="#" className="hover:text-white transition">
              {CustomIcon()}
            </a>
          </div>
        </footer>
      </div>

      {/* small css for gradient text */}
      <style>{`
        .text-gradient {
          background: linear-gradient(90deg, #60a5fa, #7c3aed, #06b6d4);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
      `}</style>
    </div>
  );
}
