import {animate, style, transition, trigger} from '@angular/animations';

export const slideOutNotes = trigger('slideOutNotes', [
  transition(':leave', [
    style({opacity: 1, bottom: '48px'}),
    animate('250ms', style({opacity: 0, bottom: 0}))
  ]),
  transition(':enter', [
    style({opacity: 0, bottom: 0}),
    animate('250ms', style({opacity: 1, bottom: '48px'}))
  ])
]);

export const slideOutTravelTimer = trigger('slideOutTravelTimer', [
  transition(':leave', [
    style({opacity: 1, top: '48px'}),
    animate('250ms', style({opacity: 0, top: 0}))
  ]),
  transition(':enter', [
    style({opacity: 0, top: 0}),
    animate('250ms', style({opacity: 1, top: '48px'}))
  ])
]);

