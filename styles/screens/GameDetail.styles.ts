/**
 * Game detail screen layout, badges, and player list.
 */
import { Colors } from '@/styles/theme';
import { StyleSheet } from 'react-native';

const light = Colors.light;

export const styles = StyleSheet.create({
  loadingRoot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: light.background,
  },
  safe: {
    flex: 1,
    backgroundColor: light.background,
  },
  errorCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: '#b91c1c',
    textAlign: 'center',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  gameTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: light.text,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
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
    backgroundColor: '#f1f5f9',
  },
  typePillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  meta: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 8,
  },
  metaSpaced: {
    fontSize: 15,
    color: '#475569',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: light.text,
    marginBottom: 8,
  },
  playersSummary: {
    fontSize: 15,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 8,
  },
  progressTrack: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e2e8f0',
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressFillOpen: {
    backgroundColor: '#22c55e',
  },
  progressFillFull: {
    backgroundColor: '#94a3b8',
  },
  joinedHeading: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  joinedRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 8,
  },
  playerAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#e2e8f0',
    borderWidth: 2,
    borderColor: '#cbd5e1',
  },
  actionError: {
    color: '#b91c1c',
    marginTop: 12,
    textAlign: 'center',
  },
});
