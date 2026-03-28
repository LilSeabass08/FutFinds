/*
 * Subscribes to the Firestore games collection; exposes loading, errors, and optional surface filtering.
 */
import { getGamesListener } from '@/firebase/games';
import type { Game, SurfaceFilter } from '@/types';
import { useEffect, useMemo, useState } from 'react';

function listenerErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }
  return 'Failed to load games.';
}

export function useGames(surfaceFilter?: SurfaceFilter) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let unsubscribe: (() => void) | undefined;

    try {
      unsubscribe = getGamesListener(
        (nextGames) => {
          if (!active) {
            return;
          }
          setGames(nextGames);
          setError(null);
          setLoading(false);
        },
        (err) => {
          if (!active) {
            return;
          }
          setGames([]);
          setError(listenerErrorMessage(err));
          setLoading(false);
        },
      );
    } catch (err) {
      if (active) {
        setError(listenerErrorMessage(err));
        setLoading(false);
      }
    }

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const filteredGames = useMemo(() => {
    if (!surfaceFilter || surfaceFilter.type === 'all') {
      return games;
    }
    return games.filter((g) => g.surface === surfaceFilter.type);
  }, [games, surfaceFilter]);

  return { games: filteredGames, loading, error };
}
