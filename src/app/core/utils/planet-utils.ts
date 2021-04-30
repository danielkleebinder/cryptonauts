import {Planet} from '../../planets/models';


export const earthRadiusInMeters = 6_371_000;
export const earthRadiusInKilometers = earthRadiusInMeters / 1000.0;

export const earthMassInKilograms = 5.972 * Math.pow(10, 24);
export const earthMassInTons = earthMassInKilograms / 1000.0;

export const earthSurfaceGravity = 9.807;


/**
 * Computes the surface gravity of the given planet.
 * @param planet Planet.
 * @see https://en.wikipedia.org/wiki/Surface_gravity
 */
export function computePlanetSurfaceGravity(planet: Planet): number {
  if (planet == null) {
    return 0;
  }
  const relativeSize = computeRelativePlanetSize(planet);
  const relativeMass = computeRelativePlanetMass(planet);
  const relativeGravity = relativeMass / (relativeSize * relativeSize);
  return relativeGravity * earthSurfaceGravity;
}

/**
 * Computes the size value relative to earths size.
 * @param planet Planet.
 */
export function computeRelativePlanetSize(planet: Planet): number {
  if (planet == null) {
    return 0;
  }
  return planet.radius / earthRadiusInMeters;
}

/**
 * Computes the mass value relative to earths mass.
 * @param planet Planet.
 */
export function computeRelativePlanetMass(planet: Planet): number {
  if (planet == null) {
    return 0;
  }
  return planet.mass / earthMassInKilograms;
}
