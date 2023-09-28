import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user.model';
import { login } from 'src/app/chat/models/login.model';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  /** This Subject will be api call  */
  public userApiCall: Subject<boolean>;
  /** This Subject will be api call  */
  public userApiCallForGroup: Subject<boolean>;
  /** This Subject will be api call  */
  public stateActivityTypeApiCall: Subject<boolean>;
  /**  This variable Observable receiverId  * */
  public receiverId$: Observable<string>;
    /** This variable Subject  to store receiverId  * */
    public receiverId: Subject<string>;
  /** This Subject will store the user details */
  public user$: Subject<User>;
  public closeModel: Subject<boolean>;
  public statusDelete: BehaviorSubject<boolean>;
  public submitEod: BehaviorSubject<boolean>;
  public eodChatOpen: Subject<any>;
  public closeOverlaySubject: Subject<void>
  public closeOverlayS$: Observable<any>
  /**
   * This Variable false replay message click on tab
   */
  public isReplyModeFalse: Subject<boolean>
  constructor() {

    this.userApiCall = new Subject();
    this.userApiCallForGroup = new Subject();
    this.stateActivityTypeApiCall = new Subject();
    this.receiverId$ = new Observable();
    this.receiverId = new Subject();
    this.user$ = new Subject();
    this.closeModel = new Subject();
    this.isReplyModeFalse = new Subject();
    this.statusDelete = new BehaviorSubject(false);
    this.submitEod = new BehaviorSubject(false);
    this.eodChatOpen = new Subject();
    this.closeOverlaySubject = new Subject();
    this.closeOverlayS$ = this.closeOverlaySubject.asObservable();
    this.receiverId$ = this.receiverId.asObservable();
  }
  /**
   * @name closeOverlay
   * @description This method net closeOverlaySubject
   */
  closeOverlay() {
    this.closeOverlaySubject.next();
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

  public getAccessToken(): string {
    return localStorage.getItem('token')
  }

  public getRefreshToken(): string {
    return localStorage.getItem('token')
  }

  /**
   * @name getLoginDetails
   * @returns This method get login User details in localStorage and return
   */
  public getLoginDetails() {
    const storedUserLocalStorageDataJSON: string = localStorage.getItem('userLocalStorageData');
    const storedUserLocalStorageData: login = JSON.parse(storedUserLocalStorageDataJSON);
    return storedUserLocalStorageData
  }
}
