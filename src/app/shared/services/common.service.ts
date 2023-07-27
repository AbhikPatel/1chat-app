import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Subject } from 'rxjs/internal/Subject';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn:'root'
})

export class CommonService {

  /** This Subject will store the user details */
  public user$: Subject<User>;
  public closeModel: Subject<boolean>;
  public statusDelete: BehaviorSubject<boolean>;
  public submitEod: BehaviorSubject<boolean>;
  public eodChatOpen: Subject<any>;

  constructor() {
    this.user$ = new Subject();
    this.closeModel = new Subject();
    this.statusDelete = new BehaviorSubject(false);
    this.submitEod = new BehaviorSubject(false);
    this.eodChatOpen = new Subject();
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

  /**
   * @name getUserEmail
   * @returns The email of the logged user
   */
  public getUserEmail(): string {
    return localStorage.getItem('email');
  }
}
