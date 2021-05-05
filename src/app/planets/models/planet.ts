export interface Planet {

  /**
   * A planets unique ID.
   */
  id: number;

  /**
   * The planets name.
   */
  name: string;

  /**
   * Number of explorers currently on this planet.
   */
  explorerCount: number;

  /**
   * It's age in years.
   */
  age: number;

  /**
   * The radius of the planet in meters.
   * Example: Earth sized planets have a radius of around 6_371_000 km.
   */
  radius: number;

  /**
   * The mass of the planet in kilograms.
   */
  mass: number;

  /**
   * The average temperature on the planet in degrees celcius.
   */
  temperature: number;
}
