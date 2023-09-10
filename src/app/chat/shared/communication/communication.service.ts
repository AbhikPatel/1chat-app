import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConversationUsers } from '../../models/chat.model';

@Injectable()
export class CommunicationService {
  /** This variable Observable New conversationDetails to set header */
  public ConversationUser$: Observable<ConversationUsers>
  /** This variable Subject New conversationDetails to set header * */
  private ConversationUser: Subject<ConversationUsers>
  /** This variable Observable   NewGroupConversation store */
  public NewGroupConversation$: Observable<ConversationUsers>
  /** This variable Subject NewGroupConversation store  * */
  private NewGroupConversation: Subject<ConversationUsers>
  /** This variable Subject  to stora tabData boolean  * */
  public tabData: Subject<boolean>

  constructor() {
    this.ConversationUser$ = new Observable();
    this.NewGroupConversation$ = new Observable();
    this.ConversationUser = new Subject();
    this.tabData = new Subject();
    this.NewGroupConversation = new Subject();
    this.ConversationUser$ = this.ConversationUser.asObservable();
    this.NewGroupConversation$ = this.NewGroupConversation.asObservable();
  }
  /**
   *@name setHeaderDetails
   * @param ConversationUser 
   * @description This method next conversation user
   */
  public setHeaderDetails(ConversationUser: ConversationUsers) {
    this.ConversationUser.next(ConversationUser)
  }
  /**
   *@name setHeaderDetails
   * @param ConversationUser 
   * @description This method next NewGroupConversation  
   */
  public setNewGroupConversation(NewGroupConversation: ConversationUsers) {
    this.NewGroupConversation.next(NewGroupConversation)
  }


}
