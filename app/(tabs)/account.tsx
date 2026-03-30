/*
 * Account tab: profile from Firestore, stats, and sign-out.
 */
import { signOutUser } from '@/firebase';
import { useAuth } from '@/hooks/AuthContext';
import { useThemeMode } from '@/hooks/ThemeModeContext';
import { useUser } from '@/hooks/useUser';
import { ThemeModePicker } from '@/components/ThemeModePicker';
import { getAccountScreenStyles } from '@/styles/screens/Account.styles';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
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
  const { colorScheme } = useThemeMode();

  const screenStyles = useMemo(() => getAccountScreenStyles(colorScheme), [colorScheme]);

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
    <SafeAreaView style={screenStyles.safe} edges={['top']}>
      <View style={screenStyles.container}>
        <View style={screenStyles.headerBlock}>
          <Text style={screenStyles.displayName}>{displayName}</Text>
          <View style={screenStyles.avatarCircle}>
            {loading ? (
              <ActivityIndicator color={screenStyles.avatarActivityIndicatorColor} />
            ) : (
              <Text style={screenStyles.avatarInitial}>{displayInitial(displayName)}</Text>
            )}
          </View>
        </View>

        <View style={screenStyles.statsBlock}>
          <View style={screenStyles.statRow}>
            <Text style={screenStyles.statLabel}>Games Created</Text>
            <Text style={screenStyles.statValue}>{loading ? '—' : String(gamesCreated)}</Text>
          </View>
          <View style={[screenStyles.statRow, screenStyles.statRowDivider]}>
            <Text style={screenStyles.statLabel}>Games Joined</Text>
            <Text style={screenStyles.statValue}>{loading ? '—' : String(gamesJoined)}</Text>
          </View>
        </View>

        <ThemeModePicker />

        <View style={screenStyles.spacer} />

        {error ? <Text style={screenStyles.error}>{error}</Text> : null}

        <Pressable
          style={[screenStyles.button, signingOut && screenStyles.buttonDisabled]}
          onPress={onSignOut}
          disabled={signingOut}>
          {signingOut ? (
            <ActivityIndicator color={screenStyles.activityIndicatorColor} />
          ) : (
            <Text style={screenStyles.buttonText}>Sign Out</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
