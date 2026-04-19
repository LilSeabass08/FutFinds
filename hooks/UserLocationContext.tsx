/*
 * Requests foreground location once on mount and exposes lat/lng for Phase 3 field sorting.
 * Falls back to the approved-fields region center when permission is denied or position fails.
 */
import { APPROVED_FIELDS_REGION_CENTER } from '@/constants/fields';
import type { UserLocationContextValue, UserLocationCoords, UserLocationPermissionStatus } from '@/types';
import * as Location from 'expo-location';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const UserLocationContext = createContext<UserLocationContextValue | undefined>(undefined);

export function UserLocationProvider({ children }: { children: React.ReactNode }) {
  const [permission, setPermission] = useState<UserLocationPermissionStatus>('pending');
  const [coords, setCoords] = useState<UserLocationCoords>(APPROVED_FIELDS_REGION_CENTER);
  const [isApproximate, setIsApproximate] = useState(true);
  const [ready, setReady] = useState(false);

  const applyFallback = useCallback((nextPermission: Exclude<UserLocationPermissionStatus, 'pending' | 'granted'>) => {
    setPermission(nextPermission);
    setCoords(APPROVED_FIELDS_REGION_CENTER);
    setIsApproximate(true);
    setReady(true);
  }, []);

  const refresh = useCallback(async () => {
    setReady(false);
    setPermission('pending');

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      applyFallback('denied');
      return;
    }

    setPermission('granted');

    try {
      const pos = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });
      setCoords({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
      setIsApproximate(false);
    } catch {
      applyFallback('unavailable');
      return;
    }

    setReady(true);
  }, [applyFallback]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({ coords, permission, isApproximate, ready, refresh }),
    [coords, permission, isApproximate, ready, refresh]
  );

  return <UserLocationContext.Provider value={value}>{children}</UserLocationContext.Provider>;
}

export function useUserLocation(): UserLocationContextValue {
  const ctx = useContext(UserLocationContext);
  if (ctx === undefined) {
    throw new Error('useUserLocation must be used within UserLocationProvider');
  }
  return ctx;
}
