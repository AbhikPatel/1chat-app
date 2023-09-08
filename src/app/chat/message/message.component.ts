import { getLocaleMonthNames } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent {
  constructor(private activated:ActivatedRoute){
        console.log(this.activated);
        
  }
  
}
