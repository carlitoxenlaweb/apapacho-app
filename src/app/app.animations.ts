import { trigger, style, animate, transition, state } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 }))
    ])
]);

export const slideIn = trigger('slideIn', [
    state('*', style({
        transform: 'translateX(100%)',
    })),
    state('in', style({
        transform: 'translateX(0)',
    })),
    state('out', style({
        transform: 'translateX(-100%)',
    })),
    transition('* => in', animate('600ms ease-in')),
    transition('in => out', animate('600ms ease-in'))
]);

export const slideInOut = trigger('slideInOut', [
    transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms 300ms ease-in', style({ transform: 'translateX(0%)' }))
    ]),
    transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)' }))
    ])
]);