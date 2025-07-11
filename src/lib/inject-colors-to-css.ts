import { colors } from './colors';

export function injectColorsToCss() {
  if (typeof document === 'undefined') return;

  const root = document.documentElement;

  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });
}