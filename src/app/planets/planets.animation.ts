import {animate, style, transition, trigger} from '@angular/animations';

export const slideOut = trigger('slideOut', [
  transition(':leave', [
    style({opacity: 1, bottom: '48px'}),
    animate('250ms', style({opacity: 0, bottom: 0}))
  ]),
  transition(':enter', [
    style({opacity: 0, bottom: 0}),
    animate('250ms', style({opacity: 1, bottom: '48px'}))
  ])
])
