/*
 * Games list: live Firestore feed with surface filters, pull-to-refresh, and navigation to detail.
 */
import { GameCard } from '@/components/GameCard';
import { GameListSurfaceFilterRow } from '@/components/GameListSurfaceFilterRow';
import { useGames } from '@/hooks/useGames';
import { useThemeMode } from '@/hooks/ThemeModeContext';
import { getHomeScreenStyles } from '@/styles/screens/Home.styles';
import { Colors } from '@/styles/theme';
import type { Game, SurfaceFilter } from '@/types';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ListScreen() {
  const router = useRouter();
  const { colorScheme } = useThemeMode();
  const styles = useMemo(() => getHomeScreenStyles(colorScheme), [colorScheme]);
  const theme = Colors[colorScheme];

  const [filterType, setFilterType] = useState<SurfaceFilter['type']>('all');
  const [refreshing, setRefreshing] = useState(false);

  const surfaceFilter = useMemo((): SurfaceFilter => ({ type: filterType }), [filterType]);
  const { games, loading, error } = useGames(surfaceFilter);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 450);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Game }) => (
      <GameCard game={item} onPress={() => router.push(`/game/${item.id}`)} />
    ),
    [router],
  );

  const keyExtractor = useCallback((item: Game) => item.id, []);

  const listEmpty = useCallback(() => {
    if (error) {
      return null;
    }
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText}>No games found</Text>
      </View>
    );
  }, [error, styles.emptyState, styles.emptyText]);

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>FutFinds</Text>
        <GameListSurfaceFilterRow active={filterType} onChange={setFilterType} />
      </View>

      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      {loading ? (
        <View style={styles.centerFill}>
          <ActivityIndicator size="large" color={theme.tint} />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={games}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={listEmpty}
          contentContainerStyle={[
            styles.listContent,
            games.length === 0 ? styles.listContentEmpty : null,
          ]}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.tint} />
          }
        />
      )}
    </SafeAreaView>
  );
}
