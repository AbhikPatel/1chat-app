import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn:'root'
})

export class CommonService {

  /** This Subject will store the user details */
  public user$: Subject<User>;
  public closeModel: Subject<boolean>;

  constructor() {
    this.user$ = new Subject();
    this.closeModel = new Subject();
  }

  /**
   * @name getUserId
   * @returns The Id of the logged user
   */
  public getUserId(): string {
    return localStorage.getItem('userId');
  }

  /**
   * @name getUserFullName
   * @returns The full name of the logged user
   */
  public getUserFullName(): string {
    return localStorage.getItem('fullName');
  }

  /**
   * @name getUserRole
   * @returns The role of the logged user
   */
  public getUserRole(): string {
    return localStorage.getItem('role');
  }
}
