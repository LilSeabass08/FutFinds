/*
 * This file defines the bottom tab navigation used in Phase 1.
 * It connects the main FutFinds screens: list, fields, create, and account.
 */
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/styles/theme';
import { Tabs } from 'expo-router';
import React from 'react';
import { useThemeMode } from '@/hooks/ThemeModeContext';

export default function TabLayout() {
  const { colorScheme } = useThemeMode();
  const theme = Colors[colorScheme];

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.tabIconSelected,
        tabBarInactiveTintColor: theme.tabIconDefault,
        tabBarStyle: {
          backgroundColor: theme.surface,
          borderTopColor: theme.border,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'List',
        }}
      />
      <Tabs.Screen
        name="fields"
        options={{
          title: 'Fields',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="create"
        options={{
          title: 'Create',
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
        }}
      />
    </Tabs>
  );
}
