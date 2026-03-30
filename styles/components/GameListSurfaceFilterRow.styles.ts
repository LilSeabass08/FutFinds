/**
 * Surface filter pill row on the home games list.
 */
import { palette } from '@/styles/theme';
import { StyleSheet } from 'react-native';

export const FILTER_PILL_ACTIVE = {
  borderColor: palette.green600,
  backgroundColor: 'rgba(34, 197, 94, 0.2)',
} as const;

export const FILTER_PILL_INACTIVE = {
  borderColor: '#d1d5db',
  backgroundColor: palette.white,
} as const;

export const styles = StyleSheet.create({
  scrollContent: {
    gap: 8,
    paddingVertical: 4,
    paddingBottom: 12,
  },
  pill: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 2,
  },
  pillLabel: {
    fontWeight: '600',
  },
  pillLabelActive: {
    color: palette.green700,
  },
  pillLabelInactive: {
    color: palette.gray700,
  },
});
