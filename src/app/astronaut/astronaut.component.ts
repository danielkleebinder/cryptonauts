import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AstronautFacade} from './store';

@Component({
  selector: 'app-astronaut',
  templateUrl: './astronaut.component.html',
  styleUrls: ['./astronaut.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstronautComponent implements OnInit, AfterViewInit {

  drawerOpen = false;

  constructor(private astronautFacade: AstronautFacade,
              private cdRef: ChangeDetectorRef) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.astronautFacade.loadMyAstronaut();
  }

  /** @inheritDoc */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.drawerOpen = true;
      this.cdRef.markForCheck();
    }, 600);
  }
}
