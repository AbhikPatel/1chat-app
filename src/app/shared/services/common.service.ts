import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public user$:Subject<User>
  constructor() { 
    this.user$ = new Subject();
  }
}
