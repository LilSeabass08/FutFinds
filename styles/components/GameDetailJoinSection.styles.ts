/**
 * Styles for join / leave / full actions on game detail.
 */
import { palette } from '@/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  creatorNote: {
    fontSize: 14,
    color: palette.slate500,
    fontStyle: 'italic',
    marginTop: 8,
  },
  leaveButton: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: palette.red600,
    backgroundColor: palette.white,
    alignItems: 'center',
  },
  leaveButtonPending: {
    opacity: 0.7,
  },
  leaveText: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.red600,
  },
  fullButton: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: palette.gray200,
    alignItems: 'center',
  },
  fullText: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.gray400,
  },
  joinButton: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  joinButtonDisabled: {
    backgroundColor: '#86efac',
    opacity: 0.85,
  },
  joinButtonEnabled: {
    backgroundColor: palette.green600,
    opacity: 1,
  },
  joinText: {
    fontSize: 16,
    fontWeight: '700',
    color: palette.white,
  },
});
