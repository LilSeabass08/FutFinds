/*
 * Great-circle distance (Haversine) in statute miles and helpers to sort approved soccer fields.
 */
import type { SoccerField, UserLocationCoords } from '@/types';

const EARTH_RADIUS_MILES = 3958.7613;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/** Haversine distance in miles between two WGS-84 lat/lng points. */
export function haversineMiles(from: UserLocationCoords, to: UserLocationCoords): number {
  const dLat = toRadians(to.lat - from.lat);
  const dLng = toRadians(to.lng - from.lng);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(Math.max(0, 1 - a)));
  return EARTH_RADIUS_MILES * c;
}

/** Miles from `from` to a field (uses field `lat` / `lng`). */
export function milesFromPointToField(from: UserLocationCoords, field: SoccerField): number {
  return haversineMiles(from, { lat: field.lat, lng: field.lng });
}

/** New array: `fields` sorted by ascending distance from `from` (closest first). Ties broken by `id`. */
export function sortSoccerFieldsByDistance(
  fields: readonly SoccerField[],
  from: UserLocationCoords
): SoccerField[] {
  return [...fields].sort((a, b) => {
    const da = milesFromPointToField(from, a);
    const db = milesFromPointToField(from, b);
    if (da !== db) {
      return da - db;
    }
    return a.id.localeCompare(b.id);
  });
}
