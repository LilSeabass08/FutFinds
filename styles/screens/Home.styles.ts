/**
 * Games list (tab home) screen layout and typography.
 */
import { Colors } from '@/styles/theme';
import { StyleSheet } from 'react-native';

const light = Colors.light;

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: light.background,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: light.text,
    marginBottom: 4,
  },
  errorBanner: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  errorText: {
    color: '#b91c1c',
    textAlign: 'center',
  },
  centerFill: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  listContentEmpty: {
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    color: '#64748b',
  },
});
