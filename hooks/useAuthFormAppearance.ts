/*
 * Subscribes to color scheme and returns auth form styles from styles/screens/auth.
 */
import { getAuthFormStyles } from '@/styles/screens/auth/AuthForm.styles';
import { useMemo } from 'react';
import { useThemeMode } from '@/hooks/ThemeModeContext';

export function useAuthFormAppearance() {
  const { colorScheme } = useThemeMode();

  return useMemo(() => getAuthFormStyles(colorScheme), [colorScheme]);
}
