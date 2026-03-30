/**
 * Game type labels for UI (not styling). Surface badge colors live in styles/theme.ts.
 */
import type { Game } from '@/types';

export function getGameTypeLabel(game: Game): string {
  if (game.type === 'scrimmage') {
    return 'Scrimmage';
  }
  return game.minigameType?.trim() ? game.minigameType : 'Minigame';
}
