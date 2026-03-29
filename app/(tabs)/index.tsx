/*
 * Games list: live Firestore feed with surface filters, pull-to-refresh, and navigation to detail.
 */
import { GameCard } from '@/components/GameCard';
import { GameListSurfaceFilterRow } from '@/components/GameListSurfaceFilterRow';
import { useGames } from '@/hooks/useGames';
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
      <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 48 }}>
        <Text style={{ fontSize: 16, color: '#64748b' }}>No games found</Text>
      </View>
    );
  }, [error]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0fdf4' }} edges={['top']}>
      <View style={{ paddingHorizontal: 16, paddingTop: 8 }}>
        <Text style={{ fontSize: 26, fontWeight: '800', color: '#0f172a', marginBottom: 4 }}>
          FutFinds
        </Text>
        <GameListSurfaceFilterRow active={filterType} onChange={setFilterType} />
      </View>

      {error ? (
        <View style={{ paddingHorizontal: 16, marginBottom: 8 }}>
          <Text style={{ color: '#b91c1c', textAlign: 'center' }}>{error}</Text>
        </View>
      ) : null}

      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#15803d" />
        </View>
      ) : (
        <FlatList
          style={{ flex: 1 }}
          data={games}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          ListEmptyComponent={listEmpty}
          contentContainerStyle={{
            flexGrow: 1,
            paddingHorizontal: 16,
            paddingBottom: 24,
            ...(games.length === 0 ? { justifyContent: 'center' } : {}),
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#15803d" />
          }
        />
      )}
    </SafeAreaView>
  );
}
