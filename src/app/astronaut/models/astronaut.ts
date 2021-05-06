/**
 * Every player has just one astronaut.
 */
export interface Astronaut {

  /**
   * The astronauts unique ID.
   */
  id: number;

  winCount: number;
  lossCount: number;

  health: number;
  mining: number;
  attack: number;
  defense: number;

  /**
   * The astronauts level (level >= 1).
   */
  level: number;
}
