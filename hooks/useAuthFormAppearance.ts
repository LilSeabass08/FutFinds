/*
 * Subscribes to color scheme and returns auth form styles from constants/authFormStyles.
 */
import { getAuthFormStyles } from '@/constants/authFormStyles';
import type { ColorSchemeName } from '@/types';
import { useMemo } from 'react';
import { useColorScheme } from 'react-native';

export function useAuthFormAppearance() {
  const colorScheme = (useColorScheme() ?? 'light') as ColorSchemeName;

  return useMemo(() => getAuthFormStyles(colorScheme), [colorScheme]);
}
