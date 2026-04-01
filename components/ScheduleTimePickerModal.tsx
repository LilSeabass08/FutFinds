/*
 * Modal sheet with Done: hosts iOS time wheels or web quarter-hour list.
 */
import type { getScheduleTimePickerModalStyles } from '@/styles/components/ScheduleTimePickerModal.styles';
import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';

export type ScheduleTimeSheetStyles = ReturnType<typeof getScheduleTimePickerModalStyles>;

interface ScheduleTimePickerModalProps {
  visible: boolean;
  onClose: () => void;
  styles: ScheduleTimeSheetStyles;
  children: React.ReactNode;
}

export function ScheduleTimePickerModal({
  visible,
  onClose,
  styles,
  children,
}: ScheduleTimePickerModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.scheduleModalRoot}>
        <Pressable
          style={styles.scheduleModalBackdrop}
          onPress={onClose}
          accessibilityLabel="Dismiss time picker"
        />
        <View style={styles.scheduleModalCard}>
          {children}
          <Pressable style={styles.scheduleModalDone} onPress={onClose}>
            <Text style={styles.scheduleModalDoneText}>Done</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}
