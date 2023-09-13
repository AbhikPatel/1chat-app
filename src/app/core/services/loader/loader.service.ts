import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public allUsers:Subject<boolean>
  public conversation:Subject<boolean>
  public eod:Subject<boolean>
  constructor() { 
    this.allUsers = new Subject();
    this.conversation = new Subject();
    this.eod = new Subject();
  }
}
