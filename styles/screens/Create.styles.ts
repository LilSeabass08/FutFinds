/**
 * Create Game screen layout, scroll, and submit control.
 */
import { palette } from '@/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.gray50,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  submitButton: {
    marginTop: 8,
    backgroundColor: palette.green600,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonBusy: {
    opacity: 0.85,
  },
  submitLabel: {
    color: palette.white,
    fontWeight: '700',
    fontSize: 16,
  },
  submitError: {
    color: palette.red700,
    marginTop: 12,
    textAlign: 'center',
  },
});
