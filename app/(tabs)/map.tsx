/*
 * This screen is the map view placeholder.
 * It will later display games on a map with location pins.
 */
import React from 'react';
import { Text, View } from 'react-native';

export default function MapScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Map view placeholder</Text>
    </View>
  );
}
