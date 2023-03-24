import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()

export class OneChatPresenterService {

  private eventName:Subject<string>;
  public eventName$:Observable<string>;
  
  constructor() { 
    this.eventName = new Subject();
    this.eventName$ = new Observable();
    this.eventName$ = this.eventName.asObservable()
  }

  public getEvent(event:string){
    this.eventName.next(event);
  }
}
