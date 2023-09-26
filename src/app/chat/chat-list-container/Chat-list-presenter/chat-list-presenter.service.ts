import { Injectable } from '@angular/core';
import { ConversationUsers } from '../../models/chat.model';
import { Observable, Subject } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';

@Injectable()

export class ChatListPresenterService {
  /** Observable for conversation users */
  public conversationUser$: Observable<ConversationUsers[]>;
  /** Observable for current conversation user */
  public currentConversationUser$: Observable<ConversationUsers>;
  /** Observable for new conversation user */
  public newConversation$: Observable<ConversationUsers>;
  /** variable for conversation list */
  public conversationList: ConversationUsers[];
  /** variable for all the chat Ids */
  public allChatIds: string[];
  /** This variable for store all users */
  public allUsers: User[];
  /** Subject for current conversation user */
  private currentConversationUser: Subject<ConversationUsers>;
  /** Subject for new conversation users*/
  private newConversation: Subject<ConversationUsers>;
  /** Subject for conversation users */
  private conversationUser: Subject<ConversationUsers[]>;
  constructor() {
    this.conversationUser$ = new Observable();
    this.newConversation$ = new Observable();
    this.currentConversationUser$ = new Observable();

    this.conversationUser = new Subject();
    this.newConversation = new Subject();
    this.currentConversationUser = new Subject();
    this.conversationUser$ = this.conversationUser.asObservable();
    this.currentConversationUser$ = this.currentConversationUser.asObservable();
    this.newConversation$ = this.newConversation.asObservable();
    this.conversationList = [];
    this.allChatIds = [];
  }
  /**
    * @name getConversationUser
    * @param users 
    * @description This method will separate the one to one and group chat data
    */
  public getConversationUsers(conversation: ConversationUsers[]): void {
    this.conversationList = [...conversation];
    this.conversationUser.next(conversation);
  
  }
  /**
   * @name getAllUsers
   * @param users 
   * @description This method get all users in chat list presentation
   */
  public getAllUsers(users: User[]): void {
    this.allUsers = users
  }
  /**
     * @name createNewConversation
     * @param user 
     * @description This method will create a new Conversation user
     */
  public createNewConversation(user: User): void {
    let newConversationUser: ConversationUsers = {
      chatId: user._id,
      owner: user._id,
      chat_type: 'dm',
      members: [{
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        photo: user.photo,
        role: user.role,
        full_name: user.full_name,
      }],
      sender: '',
      receiver: '',
      time: '',
      lastMessage: '-',
      lastMessageId: '',
      isRead: false,
      isEdit: false,
      standardTime: '',
      profile: user.photo,
      displayName: user.full_name,
      notificationCount: 0,
      showIsOnline: false,
      eodNotification: false
    };
    this.newConversation.next(newConversationUser);
    this.currentConversationUser.next(newConversationUser);

  }
}
