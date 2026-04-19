/*
 * Fields tab: scrollable list of approved soccer venues sorted by distance (no map SDK).
 */
import { FieldListCard } from '@/components/FieldListCard';
import { APPROVED_FIELDS } from '@/constants/fields';
import { useThemeMode } from '@/hooks/ThemeModeContext';
import { useUserLocation } from '@/hooks/UserLocationContext';
import { getFieldsScreenStyles } from '@/styles/screens/Fields.styles';
import type { SoccerField } from '@/types';
import { milesFromPointToField, sortSoccerFieldsByDistance } from '@/utils/distance';
import { useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type FieldRow = { field: SoccerField; distanceMiles: number };

export default function FieldsScreen() {
  const router = useRouter();
  const { colorScheme } = useThemeMode();
  const styles = useMemo(() => getFieldsScreenStyles(colorScheme), [colorScheme]);
  const { coords, ready, isApproximate } = useUserLocation();

  const rows: FieldRow[] = useMemo(() => {
    if (!ready) {
      return [];
    }
    const sorted = sortSoccerFieldsByDistance(APPROVED_FIELDS, coords);
    return sorted.map((field) => ({
      field,
      distanceMiles: milesFromPointToField(coords, field),
    }));
  }, [ready, coords]);

  const onFieldPress = useCallback(
    (field: SoccerField) => {
      router.push({
        pathname: '/(tabs)/create',
        params: {
          fieldName: encodeURIComponent(field.name),
          address: encodeURIComponent(field.address),
          lat: String(field.lat),
          lng: String(field.lng),
        },
      });
    },
    [router]
  );

  const renderItem = useCallback(
    ({ item }: { item: FieldRow }) => (
      <FieldListCard
        field={item.field}
        distanceMiles={item.distanceMiles}
        onPress={() => onFieldPress(item.field)}
      />
    ),
    [onFieldPress]
  );

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Fields</Text>
        <Text style={styles.subtitle}>Approved venues · sorted by distance</Text>
      </View>
      {ready && isApproximate ? (
        <View style={styles.approximateBanner}>
          <Text style={styles.approximateText}>
            Location unavailable or denied. Distances use the region center so you can still browse venues.
          </Text>
        </View>
      ) : null}
      {!ready ? (
        <View style={styles.centerFill}>
          <ActivityIndicator size="large" color={styles.activityIndicatorColor} />
        </View>
      ) : (
        <FlatList
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={rows}
          keyExtractor={(item) => item.field.id}
          renderItem={renderItem}
          keyboardShouldPersistTaps="handled"
        />
      )}
    </SafeAreaView>
  );
}
