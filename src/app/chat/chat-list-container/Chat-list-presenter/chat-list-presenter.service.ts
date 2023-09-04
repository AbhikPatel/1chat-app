import { Injectable } from '@angular/core';
import { ConversationUsers } from '../../models/chat.model';
import { Observable, Subject } from 'rxjs';

@Injectable()

export class ChatListPresenterService {
  /** Observable for conversation users */
  public conversationUser$: Observable<ConversationUsers[]>;

  /** variable for conversation list */
  public conversationList: ConversationUsers[];
  /** variable for all the chat Ids */
  public allChatIds: string[];
    /** Subject for conversation users */
    private conversationUser: Subject<ConversationUsers[]>;
  constructor() {
    this.conversationUser$ = new Observable();

    this.conversationUser = new Subject();

    this.conversationUser$ = this.conversationUser.asObservable();
    this.conversationList = [];
    this.allChatIds = [];
   }
 /**
   * @name getConversationUser
   * @param users 
   * @description This method will separate the one to one and group chat data
   */
 public getConversationUsers(users: ConversationUsers[]): void {
  this.conversationList = [...users];
  this.allChatIds = users.map((user: ConversationUsers) => user.chatId);
  this.conversationUser.next(users);
}
}
