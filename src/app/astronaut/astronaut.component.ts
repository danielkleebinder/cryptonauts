import {AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {filter, switchMap, take} from 'rxjs/operators';
import {AstronautFacade} from './store';
import {MatDialog} from "@angular/material/dialog";
import {NewAstronautComponent} from "./new-astronaut/new-astronaut.component";

@Component({
  selector: 'app-astronaut',
  templateUrl: './astronaut.component.html',
  styleUrls: ['./astronaut.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AstronautComponent implements OnInit, AfterViewInit {

  drawerOpen = false;

  constructor(private astronautFacade: AstronautFacade,
              private dialog: MatDialog,
              private cdRef: ChangeDetectorRef) {
  }

  /** @inheritDoc */
  ngOnInit(): void {
    this.astronautFacade.loadMyAstronaut();
    this.astronautFacade.isNewPlayer$
      .pipe(
        filter(isNewPlayer => isNewPlayer),
        take(1),
        filter(() => localStorage.getItem('veteran') == null),
        switchMap(() => this.dialog.open(NewAstronautComponent, {width: '600px'}).afterClosed()))
      .subscribe(() => localStorage.setItem('veteran', 'true'));
  }

  /** @inheritDoc */
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.drawerOpen = true;
      this.cdRef.markForCheck();
    }, 600);
  }
}
