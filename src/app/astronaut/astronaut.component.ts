import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {Astronaut} from './models';

@Component({
  selector: 'app-astronaut',
  templateUrl: './astronaut.component.html',
  styleUrls: ['./astronaut.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstronautComponent implements AfterViewInit {

  me: Astronaut = {id: 0, level: 12};
  drawerOpen = false;

  constructor(private cdRef: ChangeDetectorRef) {
  }

  /** @inheritDoc */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.drawerOpen = true;
      this.cdRef.markForCheck();
    }, 600);
  }
}
