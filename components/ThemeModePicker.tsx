/*
 * ThemeModePicker: dropdown-style selector for Light / Dark / System Default.
 * Used in the Account tab to persist a user theme preference.
 */
import { getThemeModePickerStyles } from '@/styles/components/ThemeModePicker.styles';
import { useThemeMode } from '@/hooks/ThemeModeContext';
import type { ThemeMode } from '@/types';
import React, { useMemo, useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

const OPTIONS: Array<{ mode: ThemeMode; label: string }> = [
  { mode: 'light', label: 'Light' },
  { mode: 'dark', label: 'Dark' },
  { mode: 'system', label: 'System Default' },
];

export function ThemeModePicker() {
  const { mode, colorScheme, setMode } = useThemeMode();
  const styles = useMemo(() => getThemeModePickerStyles(colorScheme), [colorScheme]);
  const [open, setOpen] = useState(false);

  const currentLabel = useMemo(() => {
    if (mode === 'system') return 'System Default';
    return mode === 'light' ? 'Light' : 'Dark';
  }, [mode]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Theme</Text>

      <Pressable
        onPress={() => setOpen(true)}
        style={styles.row}
        accessibilityRole="button"
        accessibilityLabel={`Theme: ${currentLabel}`}>
        <View style={styles.valuePressable}>
          <Text style={styles.valueText}>{currentLabel}</Text>
        </View>
        <Text style={styles.chevron}>v</Text>
      </Pressable>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}>
        <Pressable
          style={styles.modalBackdrop}
          onPress={() => setOpen(false)}
          accessibilityRole="button"
        />
        <View style={styles.modalCardPosition}>
          <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Select Theme</Text>
          {OPTIONS.map((opt) => {
            const selected = opt.mode === mode;
            return (
              <Pressable
                key={opt.mode}
                onPress={() => {
                  setMode(opt.mode);
                  setOpen(false);
                }}
                style={[styles.optionRow, selected ? styles.optionRowSelected : null]}>
                <Text style={styles.optionText}>{opt.label}</Text>
                <Text style={selected ? styles.check : styles.checkEmpty}>
                  {selected ? 'Selected' : ''}
                </Text>
              </Pressable>
            );
          })}
          </View>
        </View>
      </Modal>
    </View>
  );
}

