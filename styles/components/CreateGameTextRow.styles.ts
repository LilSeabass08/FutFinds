/**
 * Labeled text field rows on the Create Game screen.
 */
import { palette } from '@/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  row: {
    marginBottom: 14,
  },
  label: {
    fontWeight: '600',
    marginBottom: 6,
    color: palette.gray700,
  },
  hint: {
    fontSize: 12,
    color: palette.gray500,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: palette.gray900,
    backgroundColor: palette.white,
  },
  fieldError: {
    color: palette.red700,
    fontSize: 13,
    marginTop: 4,
  },
});
