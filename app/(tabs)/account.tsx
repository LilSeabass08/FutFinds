/*
 * Account tab: signed-in user info and sign-out (Phase 1 shell).
 */
import { getAccountScreenStyles } from '@/constants/accountScreenStyles';
import type { ColorSchemeName } from '@/types';
import { signOutUser } from '@/firebase';
import { useAuth } from '@/hooks/AuthContext';
import React, { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountScreen() {
  const colorScheme = (useColorScheme() ?? 'light') as ColorSchemeName;

  const styles = useMemo(() => getAccountScreenStyles(colorScheme), [colorScheme]);

  const { user } = useAuth();
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
        <Text style={styles.title}>Account</Text>
        <Text style={styles.email}>{user?.email ?? '—'}</Text>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <Pressable
          style={[styles.button, signingOut && styles.buttonDisabled]}
          onPress={onSignOut}
          disabled={signingOut}>
          {signingOut ? (
            <ActivityIndicator color={styles.activityIndicatorColor} />
          ) : (
            <Text style={styles.buttonText}>Sign out</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
