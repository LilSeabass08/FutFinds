/*
 * This screen is the map view placeholder.
 * It will later display games on a map with location pins.
 */
import { styles } from '@/styles/screens/Map.styles';
import React from 'react';
import { Text, View } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.root}>
      <Text>Map view placeholder</Text>
    </View>
  );
}
