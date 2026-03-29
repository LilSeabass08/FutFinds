/*
 * Loads the signed-in user's Firestore profile (`users/{uid}`) by uid.
 */
import { getUserById } from '@/firebase/users';
import type { AppUser } from '@/types';
import { useEffect, useState } from 'react';

export interface UseUserResult {
  userData: AppUser | null;
  loading: boolean;
}

export function useUser(userId: string | undefined): UseUserResult {
  const [userData, setUserData] = useState<AppUser | null>(null);
  const [loading, setLoading] = useState<boolean>(Boolean(userId));

  useEffect(() => {
    if (!userId) {
      setUserData(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const data = await getUserById(userId);
        if (!cancelled) {
          setUserData(data);
        }
      } catch {
        if (!cancelled) {
          setUserData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  return { userData, loading };
}
