import {Astronaut} from '../../astronaut/models';
import {AstronautFilters} from './astronaut-filters';

export function matchesFilter(astronaut: Astronaut, filter: AstronautFilters): boolean {
  if (filter == null || astronaut == null) {
    return true;
  }

  if (filter.id != null && filter.id.length > 0 && !astronaut.id.toLowerCase().includes(filter.id.toLowerCase())) {
    return false;
  }

  if (filter.minLevel != null && astronaut.level < filter.minLevel) {
    return false;
  }

  if (filter.maxLevel != null && astronaut.level > filter.maxLevel) {
    return false;
  }

  return true;
}
