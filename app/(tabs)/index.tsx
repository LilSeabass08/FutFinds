/*
 * This screen is the main list view placeholder for nearby games.
 * It will later show a feed of games users can browse and join.
 */
import React from 'react';
import { Text, View } from 'react-native';

export default function ListScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>List view placeholder</Text>
    </View>
  );
}
