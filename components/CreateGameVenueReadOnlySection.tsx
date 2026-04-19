/*
 * Approved-venue display for Create Game: field name and address are set from the Fields tab only (no text inputs).
 */
import { getCreateGameVenueReadOnlySectionStyles } from '@/styles/components/CreateGameVenueReadOnlySection.styles';
import type { CreateGameScreenFormValues } from '@/types';
import { useThemeMode } from '@/hooks/ThemeModeContext';
import { useRouter } from 'expo-router';
import React, { useMemo } from 'react';
import { Control, useController } from 'react-hook-form';
import { Pressable, Text, View } from 'react-native';

interface CreateGameVenueReadOnlySectionProps {
  control: Control<CreateGameScreenFormValues>;
}

export function CreateGameVenueReadOnlySection({ control }: CreateGameVenueReadOnlySectionProps) {
  const { colorScheme } = useThemeMode();
  const styles = useMemo(() => getCreateGameVenueReadOnlySectionStyles(colorScheme), [colorScheme]);
  const router = useRouter();

  const {
    field: { value: fieldName },
    fieldState: { error },
  } = useController({
    control,
    name: 'fieldName',
    rules: {
      validate: (_, values) =>
        values.fieldName?.trim() && values.address?.trim()
          ? true
          : 'Choose an approved field from the Fields tab.',
    },
  });

  const { field: { value: address } } = useController({
    control,
    name: 'address',
  });

  const hasVenue = Boolean(fieldName?.trim() && address?.trim());

  return (
    <View>
      <Text style={styles.fieldLabel}>Field name</Text>
      <View style={styles.valueBox}>
        <Text style={hasVenue ? styles.valueText : styles.placeholder}>
          {hasVenue ? fieldName : 'No field selected'}
        </Text>
      </View>

      <Text style={styles.labelSpaced}>Address</Text>
      <View style={styles.valueBox}>
        <Text style={hasVenue ? styles.valueMuted : styles.placeholder}>
          {hasVenue ? address : 'Select a field on the Fields tab to set the address.'}
        </Text>
      </View>

      {!hasVenue ? (
        <>
          <Text style={styles.hint}>Games can only be posted at approved venues. Pick one from the list.</Text>
          <Pressable
            onPress={() => router.push('/(tabs)/fields')}
            style={styles.linkPressable}
            accessibilityRole="link"
            accessibilityLabel="Open Fields tab to choose a venue">
            <Text style={styles.linkText}>Browse approved fields</Text>
          </Pressable>
        </>
      ) : null}

      {error?.message ? <Text style={styles.errorText}>{error.message}</Text> : null}
    </View>
  );
}
