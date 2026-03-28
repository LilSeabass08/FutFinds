/**
 * FutFinds palette: pitch greens, clean whites, and a bright “jersey” accent for energy.
 * Light mode reads like sun on a field; dark mode reads like night under stadium lights.
 *
 * Related: composed screen styles live next to this file — `authFormStyles.ts`, `accountScreenStyles.ts`.
 * Navigation chrome colors: `NavigationTheme` below.
 */

import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Platform } from 'react-native';

/** Primary pitch green (light UI) */
const pitchGreen = '#15803d';
/** Bright grass accent (dark UI, CTAs) */
const pitchGreenBright = '#4ade80';
/** Gold / kit accent — links, highlights */
const kitGold = '#f59e0b';
const kitGoldBright = '#fde047';

export const Colors = {
  light: {
    text: '#0f172a',
    background: '#f0fdf4',
    tint: pitchGreen,
    icon: '#52796f',
    tabIconDefault: '#94a3b8',
    tabIconSelected: pitchGreen,
    surface: '#ffffff',
    surfaceMuted: '#dcfce7',
    border: '#86efac',
    accent: kitGold,
  },
  dark: {
    text: '#ecfdf5',
    background: '#052e16',
    tint: pitchGreenBright,
    icon: '#a7c4b5',
    tabIconDefault: '#6b8f7e',
    tabIconSelected: pitchGreenBright,
    surface: '#14532d',
    surfaceMuted: '#166534',
    border: '#22c55e',
    accent: kitGoldBright,
  },
};

/** React Navigation themes for stack headers (e.g. game detail). */
export const NavigationTheme = {
  light: {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: pitchGreen,
      background: Colors.light.background,
      card: Colors.light.surface,
      text: Colors.light.text,
      border: Colors.light.border,
      notification: kitGold,
    },
  },
  dark: {
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      primary: pitchGreenBright,
      background: Colors.dark.background,
      card: Colors.dark.surface,
      text: Colors.dark.text,
      border: Colors.dark.border,
      notification: kitGoldBright,
    },
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
