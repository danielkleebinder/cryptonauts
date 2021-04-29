export interface Planet {

  /**
   * A planets unique ID.
   */
  id: string;

  /**
   * The planets name.
   */
  name: string;

  /**
   * It's age in billion years.
   */
  age: number;

  /**
   * The gravity on the surface in m/s^2.
   */
  gravity: number;

  /**
   * The average temperature on the planet in degrees celcius.
   */
  temperature: number;

  /**
   * The planets (longer) description.
   */
  description: string;

  /**
   * The image of the planet.
   */
  imageUrl: string;
}
