import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

const HIGH_RESOLUTION_WIDTH_THRESHOLD = 3000;
const HIGH_RESOLUTION_HEIGHT_THRESHOLD = 2000;
const BASE_STYLE_ID = "theme-switch-base-style";
const VIEWPORT_SIZE_BUFFER = 200;
const HIGH_RES_SCALE_FACTOR = 2.5;
const NORMAL_SCALE_FACTOR = 4;
const HIGH_RES_DURATION_MULTIPLIER = 0.8;
const MIN_DURATION = 500;
const MAX_MASK_SIZE = 5000;

const isBrowser = typeof window !== "undefined";

interface ViewTransition {
  ready: Promise<void>;
  finished: Promise<void>;
  updateCallbackDone: Promise<void>;
}

interface DocumentWithViewTransition {
  startViewTransition?: (callback: () => void) => ViewTransition;
}

const isHighResolution = (): boolean => {
  if (!isBrowser) return false;
  return (
    window.innerWidth >= HIGH_RESOLUTION_WIDTH_THRESHOLD ||
    window.innerHeight >= HIGH_RESOLUTION_HEIGHT_THRESHOLD
  );
};

const supportsViewTransition = (): boolean => {
  return isBrowser && "startViewTransition" in document;
};

const prefersReducedMotion = (): boolean => {
  if (!isBrowser) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

// Inject base CSS for view transitions
const injectBaseStyles = (): void => {
  if (!isBrowser) return;

  const existingStyle = document.getElementById(BASE_STYLE_ID);
  if (existingStyle) return;

  const style = document.createElement("style");
  style.id = BASE_STYLE_ID;
  const isHighRes = isHighResolution();

  style.textContent = `
    ::view-transition-old(root),
    ::view-transition-new(root) {
      animation: none;
      mix-blend-mode: normal;
      ${isHighRes ? "transform: translateZ(0);" : ""}
    }

    ${
      isHighRes
        ? `
    ::view-transition-group(root),
    ::view-transition-image-pair(root),
    ::view-transition-old(root),
    ::view-transition-new(root) {
      backface-visibility: hidden;
      perspective: 1000px;
      transform: translate3d(0, 0, 0);
    }
    `
        : ""
    }
  `;
  document.head.appendChild(style);
};

export enum ThemeAnimationType {
  CIRCLE = "circle",
  BLUR_CIRCLE = "blur-circle",
  QR_SCAN = "qr-scan",
}

interface ModeAnimationHook {
  ref: React.RefObject<HTMLButtonElement | null>;
  toggleSwitchTheme: () => Promise<void>;
  isDarkMode: boolean;
}

export interface ModeAnimationProps {
  duration?: number;
  easing?: string;
  pseudoElement?: string;
  globalClassName?: string;
  animationType?: ThemeAnimationType;
  blurAmount?: number;
  styleId?: string;
  isDarkMode?: boolean;
  onDarkModeChange?: (isDark: boolean) => void;
}

// Helper function to create blur circle mask
const createBlurCircleMask = (blur: number): string => {
  const isHighRes = isHighResolution();
  const circleRadius = isHighRes ? 20 : 25;
  const blurFilter = `<filter id="blur"><feGaussianBlur stdDeviation="${blur}" /></filter>`;

  return `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 100 100"><defs>${blurFilter}</defs><circle cx="0" cy="0" r="${circleRadius}" fill="white" filter="url(%23blur)"/></svg>')`;
};

// Calculate maximum radius to cover viewport
const calculateMaxRadius = (x: number, y: number): number => {
  if (!isBrowser) return 0;

  const topLeft = Math.hypot(x, y);
  const topRight = Math.hypot(window.innerWidth - x, y);
  const bottomLeft = Math.hypot(x, window.innerHeight - y);
  const bottomRight = Math.hypot(window.innerWidth - x, window.innerHeight - y);

  return Math.max(topLeft, topRight, bottomLeft, bottomRight);
};

// Calculate optimal mask size
const calculateOptimalMaskSize = (): number => {
  if (!isBrowser) return 0;

  const viewportSize =
    Math.max(window.innerWidth, window.innerHeight) + VIEWPORT_SIZE_BUFFER;
  const isHighRes = isHighResolution();
  const scaleFactor = isHighRes ? HIGH_RES_SCALE_FACTOR : NORMAL_SCALE_FACTOR;

  return isHighRes
    ? Math.min(viewportSize * scaleFactor, MAX_MASK_SIZE)
    : viewportSize * scaleFactor;
};

// Get initial theme from localStorage
const getInitialTheme = (): boolean => {
  if (!isBrowser) return false;
  return localStorage.getItem("theme") === "dark";
};

export const useModeAnimation = (
  props?: ModeAnimationProps
): ModeAnimationHook => {
  const {
    duration: propsDuration = 750,
    easing = "ease-in-out",
    pseudoElement = "::view-transition-new(root)",
    globalClassName = "dark",
    animationType = ThemeAnimationType.CIRCLE,
    blurAmount = 2,
    styleId = "theme-switch-style",
    isDarkMode: externalDarkMode,
    onDarkModeChange,
  } = props ?? {};

  const isHighRes = isHighResolution();
  const duration = isHighRes
    ? Math.max(propsDuration * HIGH_RES_DURATION_MULTIPLIER, MIN_DURATION)
    : propsDuration;

  // Inject base styles when the hook is initialized
  useEffect(() => {
    injectBaseStyles();
  }, []);

  const [internalDarkMode, setInternalDarkMode] = useState(getInitialTheme);

  const isDarkMode = externalDarkMode ?? internalDarkMode;

  const setIsDarkMode = (
    value: boolean | ((prev: boolean) => boolean)
  ): void => {
    const newValue = typeof value === "function" ? value(isDarkMode) : value;
    if (onDarkModeChange) {
      onDarkModeChange(newValue);
    } else {
      setInternalDarkMode(newValue);
    }
  };

  const ref = useRef<HTMLButtonElement>(null);

  const toggleSwitchTheme = async (): Promise<void> => {
    if (!ref.current || !supportsViewTransition() || prefersReducedMotion()) {
      setIsDarkMode((currentMode) => !currentMode);
      return;
    }

    // Remove existing style if present
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
    }

    const { top, left, width, height } = ref.current.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;

    const maxRadius = calculateMaxRadius(x, y);
    const optimalMaskSize = calculateOptimalMaskSize();

    if (animationType === ThemeAnimationType.BLUR_CIRCLE) {
      const styleElement = document.createElement("style");
      styleElement.id = styleId;

      const isHighRes = isHighResolution();
      const blurFactor = isHighRes ? 1.5 : 1.2;
      const finalMaskSize = Math.max(optimalMaskSize, maxRadius * 2.5);

      const timingFunction = isHighRes
        ? "cubic-bezier(0.2, 0, 0.2, 1)"
        : "linear(" +
          "0 0%, 0.2342 12.49%, 0.4374 24.99%," +
          "0.6093 37.49%, 0.6835 43.74%," +
          "0.7499 49.99%, 0.8086 56.25%," +
          "0.8593 62.5%, 0.9023 68.75%, 0.9375 75%," +
          "0.9648 81.25%, 0.9844 87.5%," +
          "0.9961 93.75%, 1 100%" +
          ")";

      styleElement.textContent = `
        ::view-transition-group(root) {
          animation-duration: ${duration}ms;
          animation-timing-function: ${timingFunction};
          will-change: transform;
        }

        ::view-transition-new(root) {
          mask: ${createBlurCircleMask(
            blurAmount * blurFactor
          )} 0 0 / 100% 100% no-repeat;
          mask-position: ${x}px ${y}px;
          animation: maskScale ${duration}ms ${easing};
          transform-origin: ${x}px ${y}px;
          will-change: mask-size, mask-position;
        }

        ::view-transition-old(root),
        .dark::view-transition-old(root) {
          animation: maskScale ${duration}ms ${easing};
          transform-origin: ${x}px ${y}px;
          z-index: -1;
          will-change: mask-size, mask-position;
        }

        @keyframes maskScale {
          0% {
            mask-size: 0px;
            mask-position: ${x}px ${y}px;
          }
          100% {
            mask-size: ${finalMaskSize}px;
            mask-position: ${x - finalMaskSize / 2}px ${
        y - finalMaskSize / 2
      }px;
          }
        }
      `;
      document.head.appendChild(styleElement);
    }

    const doc = document as DocumentWithViewTransition;
    await doc.startViewTransition?.(() => {
      flushSync(() => {
        setIsDarkMode((currentMode) => !currentMode);
      });
    })?.ready;

    if (animationType === ThemeAnimationType.CIRCLE) {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration,
          easing,
          pseudoElement,
        }
      );
    }

    if (animationType === ThemeAnimationType.QR_SCAN) {
      const isHighRes = isHighResolution();
      const scanLineWidth = isHighRes ? 8 : 4;

      document.documentElement.animate(
        {
          clipPath: [
            `polygon(0% 0%, ${scanLineWidth}px 0%, ${scanLineWidth}px 100%, 0% 100%)`,
            `polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)`,
          ],
        },
        {
          duration,
          easing,
          pseudoElement,
        }
      );
    }

    if (animationType === ThemeAnimationType.BLUR_CIRCLE) {
      setTimeout(() => {
        const styleElement = document.getElementById(styleId);
        if (styleElement) {
          styleElement.remove();
        }
      }, duration);
    }
  };

  useEffect(() => {
    if (!isBrowser) return;

    if (isDarkMode) {
      document.documentElement.classList.add(globalClassName);
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove(globalClassName);
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode, globalClassName]);

  return {
    ref,
    toggleSwitchTheme,
    isDarkMode,
  };
};
