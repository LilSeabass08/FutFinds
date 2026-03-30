/**
 * Typography and labels for the Create Game form body.
 */
import { palette } from '@/styles/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: palette.gray900,
  },
  fieldLabel: {
    fontWeight: '600',
    marginBottom: 6,
    color: palette.gray700,
  },
});
