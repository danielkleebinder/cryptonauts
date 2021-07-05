import {animate, query, style, transition, trigger} from '@angular/animations';

export const routeAnimation = trigger('routeAnimation', [
  transition('* => *', [
    query(':leave', style({position: 'absolute', left: 0, right: 0, opacity: 1, transform: 'scale(1)'}), {optional: true}),
    query(':enter', style({position: 'absolute', left: 0, right: 0, opacity: 0, transform: 'scale(0.8)'}), {optional: true}),
    query(':leave', animate('200ms', style({opacity: 0, transform: 'scale(1.2)'})), {optional: true}),
    query(':enter', animate('200ms', style({opacity: 1, transform: 'scale(1)'})), {optional: true})
  ])
]);
