/*
 * Theme mode override (Light/Dark/System Default) with AsyncStorage persistence.
 * Used to drive navigation theme + screen styles consistently across the app.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { ColorSchemeName, ThemeMode } from '@/types';
import { useColorScheme } from 'react-native';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ThemeModeContextValue = {
  mode: ThemeMode;
  colorScheme: ColorSchemeName;
  initializing: boolean;
  setMode: (nextMode: ThemeMode) => void;
};

const THEME_MODE_STORAGE_KEY = 'futfinds.themeMode';

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

function isValidThemeMode(value: unknown): value is ThemeMode {
  return value === 'system' || value === 'light' || value === 'dark';
}

export function ThemeModeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = (useColorScheme() ?? 'light') as ColorSchemeName;

  const [mode, setModeState] = useState<ThemeMode>('system');
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const stored = await AsyncStorage.getItem(THEME_MODE_STORAGE_KEY);
        if (stored && isValidThemeMode(stored)) {
          if (mounted) {
            setModeState(stored);
          }
        }
      } catch {
        // Ignore storage issues; default to system.
      } finally {
        if (mounted) {
          setInitializing(false);
        }
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const setMode = (nextMode: ThemeMode) => {
    setModeState(nextMode);
    AsyncStorage.setItem(THEME_MODE_STORAGE_KEY, nextMode).catch(() => {
      // Non-fatal: app still works without persistence.
    });
  };

  const colorScheme = useMemo<ColorSchemeName>(() => {
    return mode === 'system' ? systemColorScheme : mode;
  }, [mode, systemColorScheme]);

  const value = useMemo<ThemeModeContextValue>(
    () => ({ mode, colorScheme, initializing, setMode }),
    [mode, colorScheme, initializing],
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error('useThemeMode must be used within a ThemeModeProvider');
  }
  return ctx;
}

