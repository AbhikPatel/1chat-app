import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { IndividualConfig, Toast } from 'ngx-toastr';

@Component({
  selector: 'app-custom-toastr',
  templateUrl: './custom-toastr.component.html',
  animations: [
    trigger('flyInOut', [
      state('inactive', style({
        display: 'none',
        opacity: 0
      })),
      transition('inactive => active', animate('400ms ease-out', keyframes([
        style({
          opacity: 0,
        }),
        style({
          opacity: 1,
        })
      ]))),
      transition('active => removed', animate('400ms ease-out', keyframes([
        style({
          opacity: 1,
        }),
        style({
          transform: 'translate3d(10%, 0, 0) skewX(10deg)',
          opacity: 0,
        }),
      ]))),
    ]),
  ],
  preserveWhitespaces: false
})

export class CustomToastrComponent extends Toast {

  

}
