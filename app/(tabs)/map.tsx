/*
 * This screen is the map view placeholder.
 * It will later display games on a map with location pins.
 */
import { getMapScreenStyles } from '@/styles/screens/Map.styles';
import { useThemeMode } from '@/hooks/ThemeModeContext';
import React, { useMemo } from 'react';
import { Text, View } from 'react-native';

export default function MapScreen() {
  const { colorScheme } = useThemeMode();
  const styles = useMemo(() => getMapScreenStyles(colorScheme), [colorScheme]);

  return (
    <View style={styles.root}>
      <Text style={styles.placeholderText}>Map view placeholder</Text>
    </View>
  );
}
