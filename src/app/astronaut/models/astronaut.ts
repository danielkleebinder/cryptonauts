/**
 * Every player has just one astronaut.
 */
export interface Astronaut {

  /**
   * The astronauts unique ID.
   */
  id: number;

  /**
   * The astronauts level (level >= 1).
   */
  level: number;
}
