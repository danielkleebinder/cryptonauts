import {animate, style, transition, trigger} from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({opacity: 0, transform: 'translate(-400px)'}),
    animate('300ms ease-out', style({opacity: 1, transform: 'translate(0)'}))
  ]),
  transition(':leave', [
    style({opacity: 1, transform: 'translate(0)'}),
    animate('300ms ease-out', style({opacity: 0, transform: 'translate(-400px)'}))
  ])
]);
