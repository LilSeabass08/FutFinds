/**
 * Styles for the GameCard list item.
 */
import { palette } from '@/styles/theme';
import { Platform, StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.white,
    borderRadius: 14,
    padding: 16,
    marginVertical: 6,
    ...Platform.select({
      ios: {
        shadowColor: palette.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
      },
      android: { elevation: 3 },
      default: {},
    }),
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: palette.slate900,
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  surfacePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  surfacePillText: {
    fontSize: 12,
    fontWeight: '700',
  },
  typePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: palette.slate100,
  },
  typePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: palette.slate700,
  },
  fullPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#fee2e2',
  },
  fullPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: palette.red700,
  },
  meta: {
    fontSize: 14,
    color: palette.slate600,
    marginBottom: 4,
  },
  metaLast: {
    fontSize: 14,
    color: palette.slate600,
    marginBottom: 12,
  },
  playersLine: {
    fontSize: 14,
    fontWeight: '600',
    color: palette.slate900,
    marginBottom: 8,
  },
  track: {
    height: 6,
    borderRadius: 3,
    backgroundColor: palette.slate200,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 3,
  },
  fillOpen: {
    backgroundColor: palette.green500,
  },
  fillFull: {
    backgroundColor: palette.slate400,
  },
});
