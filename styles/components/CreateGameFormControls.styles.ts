/**
 * Pills and cards for Create Game form controls (surface, type, minigame).
 */
import { palette } from '@/styles/theme';
import { StyleSheet } from 'react-native';

export const PILL_SELECTED = {
  borderColor: palette.green500,
  backgroundColor: 'rgba(34, 197, 94, 0.18)',
} as const;

export const PILL_UNSELECTED = {
  borderColor: '#d1d5db',
  backgroundColor: 'rgba(0, 0, 0, 0.04)',
} as const;

export const styles = StyleSheet.create({
  block: {
    marginBottom: 12,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  surfacePill: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
    borderWidth: 2,
  },
  surfacePillLabel: {
    fontWeight: '600',
    color: palette.gray900,
  },
  typeCard: {
    flex: 1,
    minHeight: 88,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
  },
  typeCardLabel: {
    fontSize: 17,
    fontWeight: '700',
    color: palette.gray900,
  },
  minigameScroll: {
    gap: 8,
  },
  minigamePill: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 2,
  },
  minigamePillLabel: {
    fontWeight: '600',
    color: palette.gray900,
  },
  fieldError: {
    color: palette.red700,
    marginTop: 6,
    fontSize: 13,
  },
});
