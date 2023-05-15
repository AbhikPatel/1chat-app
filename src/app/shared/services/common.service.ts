import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public user$:Subject<User>
  public closeModel:Subject<boolean>
  constructor() { 
    this.user$ = new Subject();
    this.closeModel = new Subject();
  }
}
