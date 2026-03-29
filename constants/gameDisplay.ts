/*
 * Shared labels and surface badge colors for game cards and detail screens.
 */
import type { Game } from '@/types';

export const GAME_SURFACE_BADGE: Record<
  Game['surface'],
  { label: string; bg: string; text: string }
> = {
  outdoor: { label: 'Outdoor', bg: '#dcfce7', text: '#15803d' },
  indoor: { label: 'Indoor', bg: '#dbeafe', text: '#1d4ed8' },
  futsal: { label: 'Futsal', bg: '#ffedd5', text: '#c2410c' },
};

export function getGameTypeLabel(game: Game): string {
  if (game.type === 'scrimmage') {
    return 'Scrimmage';
  }
  return game.minigameType?.trim() ? game.minigameType : 'Minigame';
}
