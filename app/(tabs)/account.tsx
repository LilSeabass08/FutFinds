/*
 * Account tab: profile from Firestore, stats, and sign-out.
 */
import { getAccountScreenStyles } from '@/constants/accountScreenStyles';
import { signOutUser } from '@/firebase';
import { useAuth } from '@/hooks/AuthContext';
import { useUser } from '@/hooks/useUser';
import type { ColorSchemeName } from '@/types';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function displayInitial(name: string): string {
  const trimmed = name.trim();
  if (trimmed.length === 0) {
    return '?';
  }
  return trimmed[0]?.toUpperCase() ?? '?';
}

export default function AccountScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as ColorSchemeName;

  const styles = useMemo(() => getAccountScreenStyles(colorScheme), [colorScheme]);

  const { user } = useAuth();
  const { userData, loading } = useUser(user?.uid);

  const displayName =
    userData?.displayName?.trim() ||
    user?.displayName?.trim() ||
    user?.email?.split('@')[0] ||
    'Player';

  const gamesCreated = userData?.gamesCreated ?? 0;
  const gamesJoined = userData?.gamesJoined ?? 0;

  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSignOut = async () => {
    setError(null);
    setSigningOut(true);
    try {
      await signOutUser();
    } catch {
      setError('Could not sign out. Try again.');
    } finally {
      setSigningOut(false);
    }
  };

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.container}>
        <View style={styles.headerBlock}>
          <Text style={styles.displayName}>{displayName}</Text>
          <View style={styles.avatarCircle}>
            {loading ? (
              <ActivityIndicator color={styles.avatarActivityIndicatorColor} />
            ) : (
              <Text style={styles.avatarInitial}>{displayInitial(displayName)}</Text>
            )}
          </View>
        </View>

        <View style={styles.statsBlock}>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Games Created</Text>
            <Text style={styles.statValue}>{loading ? '—' : String(gamesCreated)}</Text>
          </View>
          <View style={[styles.statRow, styles.statRowDivider]}>
            <Text style={styles.statLabel}>Games Joined</Text>
            <Text style={styles.statValue}>{loading ? '—' : String(gamesJoined)}</Text>
          </View>
        </View>

        <View style={styles.spacer} />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={[styles.button, signingOut && styles.buttonDisabled]}
          onPress={onSignOut}
          disabled={signingOut}>
          {signingOut ? (
            <ActivityIndicator color={styles.activityIndicatorColor} />
          ) : (
            <Text style={styles.buttonText}>Sign Out</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
