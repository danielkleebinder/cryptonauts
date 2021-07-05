import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'spaceDiamonds'})
export class SpaceDiamondsPipe implements PipeTransform {

  /** @inheritDoc */
  transform(value: number | string, ...args: unknown[]): string {
    value = '' + value;
    let index = value.length - 2;
    while (index > 0) {
      value = value.substring(0, index - 1) + ' ' + value.substring(index - 1);
      index -= 3;
    }
    return value;
  }
}
