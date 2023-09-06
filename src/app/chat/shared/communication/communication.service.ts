import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConversationUsers } from '../../models/chat.model';

@Injectable()
export class CommunicationService {
  /** This variable Observable conversationDetails */
  public ConversationUser$: Observable<ConversationUsers>
  /** This variable Observable conversationDetails */
  private ConversationUser: Subject<ConversationUsers>
  constructor() {
    this.ConversationUser$ = new Observable();
    this.ConversationUser = new Subject();
    this.ConversationUser$ = this.ConversationUser.asObservable()
  }
  /**
   *@name setHeaderDetails
   * @param ConversationUser 
   * @description This method next conversation user
   */
  public setHeaderDetails(ConversationUser: ConversationUsers) {
    this.ConversationUser.next(ConversationUser)
  }
}
