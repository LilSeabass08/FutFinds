/**
 * Global design tokens: navigation themes, fonts, and shared UI colors.
 * Composed screen styles live under styles/screens/; component styles under styles/components/.
 */
import type { Game } from "@/types";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { Platform } from "react-native";

/** Primary pitch green (light UI) */
const pitchGreen = "#15803d";
/** Bright grass accent (dark UI, CTAs) */
const pitchGreenBright = "#4ade80";
/** Gold / kit accent — links, highlights */
const kitGold = "#f59e0b";
const kitGoldBright = "#fde047";

export const Colors = {
  light: {
    text: "#0f172a",
    /** Tab / screen canvas — a step greener than mint so light mode reads clearly as green vs white cards. */
    background: "#d8eadc",
    tint: pitchGreen,
    icon: "#52796f",
    tabIconDefault: "#94a3b8",
    tabIconSelected: pitchGreen,
    surface: "#ffffff",
    surfaceMuted: "#d4edda",
    border: "#86efac",
    accent: kitGold,
  },
  dark: {
    text: "#ecfdf5",
    background: "#052e16",
    tint: pitchGreenBright,
    icon: "#a7c4b5",
    tabIconDefault: "#6b8f7e",
    tabIconSelected: pitchGreenBright,
    surface: "#14532d",
    surfaceMuted: "#166534",
    border: "#22c55e",
    accent: kitGoldBright,
  },
};

/** Surface badge colors for game cards and detail (shared across list + detail). */
export const GAME_SURFACE_BADGE: Record<
  Game["surface"],
  { label: string; bg: string; text: string }
> = {
  outdoor: { label: "Outdoor", bg: "#dcfce7", text: "#15803d" },
  indoor: { label: "Indoor", bg: "#dbeafe", text: "#1d4ed8" },
  futsal: { label: "Futsal", bg: "#ffedd5", text: "#c2410c" },
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
    sans: "system-ui",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});

/** Static tokens for screens not yet driven by color scheme. */
export const palette = {
  slate50: "#f8fafc",
  slate100: "#f1f5f9",
  slate200: "#e2e8f0",
  slate300: "#cbd5e1",
  slate400: "#94a3b8",
  slate500: "#64748b",
  slate600: "#475569",
  slate700: "#334155",
  slate900: "#0f172a",
  gray50: "#f9fafb",
  gray200: "#e5e7eb",
  gray400: "#9ca3af",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray700: "#374151",
  gray900: "#111827",
  red600: "#dc2626",
  red700: "#b91c1c",
  green500: "#22c55e",
  green600: "#16a34a",
  green700: "#15803d",
  white: "#ffffff",
  black: "#000000",
} as const;
