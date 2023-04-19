import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormatTime } from 'src/app/core/utilities/formatTime';
import { NewUser } from 'src/app/shared/models/user.model';
import { ConversationUser, CreateChat, MessageRead, NewMessage, Typing } from '../../models/chat.model';

@Injectable()

export class OneChatPresenterService {

  /** This property is used to transfer the details of all the users */
  private allUsers: Subject<NewUser[]>;
  public allUsers$: Observable<NewUser[]>;

  /** This property is used to transfer the details of only the conversation users */
  private onlyConversationUsers: Subject<ConversationUser[]>;
  public onlyConversationUsers$: Observable<ConversationUser[]>;

  /** This property is used to transfer the data of the new chat */
  private chatData: Subject<NewMessage>;
  public chatData$: Observable<NewMessage>;

  /** This property is used to transfer the array of chats */
  private chatArray: Subject<NewMessage[]>;
  public chatArray$: Observable<NewMessage[]>;

  /** This property is used to transfer the details of the receiver */
  private receiverData: Subject<NewUser>;
  public receiverData$: Observable<NewUser>;

  /** This property is used to transfer the object of new chat */
  private startNewChat: Subject<CreateChat>;
  public startNewChat$: Observable<CreateChat>;

  /** This property is used to transfer the details of the new conversation user */
  private newConversationUser: Subject<ConversationUser>;
  public newConversationUser$: Observable<ConversationUser>;

  /** This property is used to transfer the details of the sender */
  private senderDetails: Subject<NewUser>;
  public senderDetails$: Observable<NewUser>;

  /** This property is used to create typing event */
  private typingData: Subject<Typing>;
  public typingData$: Observable<Typing>;

  /** This property is used to store all the users */
  public users: NewUser[];
  /** This property is used to store array of chats */
  public chats: NewMessage[];
  /** This property is used to store the state of new chat */
  public newChatState: boolean;
  /** This property is used to store the user ID */
  public userId: string | null;
  /** This property is used to store role of the user */
  public role: string | null;
  /** This property is used to store receiver ID */
  public receiverId: string;
  /** This property is used to store chat ID */
  public chatId: string;
  /** This property is used to store the updated chat */
  public updatedChat: string;
  /** This property is used to store the all the chat Id in an array */
  public allChatIds: string[];
  /** This property is used to store the details of the user */
  public userDetails: NewUser | undefined;
  /** This property is used to store the details of all the leads */
  public onlyLeads: NewUser[];
  public conversationUser: ConversationUser[];

  constructor(
    private _formatter: FormatTime
  ) {
    this.allUsers = new Subject();
    this.allUsers$ = new Observable();
    this.allUsers$ = this.allUsers.asObservable();

    this.onlyConversationUsers = new Subject();
    this.onlyConversationUsers$ = new Observable();
    this.onlyConversationUsers$ = this.onlyConversationUsers.asObservable();

    this.chatData = new Subject();
    this.chatData$ = new Observable();
    this.chatData$ = this.chatData.asObservable();

    this.chatArray = new Subject();
    this.chatArray$ = new Observable();
    this.chatArray$ = this.chatArray.asObservable();

    this.receiverData = new Subject();
    this.receiverData$ = new Observable();
    this.receiverData$ = this.receiverData.asObservable();

    this.startNewChat = new Subject();
    this.startNewChat$ = new Observable();
    this.startNewChat$ = this.startNewChat.asObservable();

    this.newConversationUser = new Subject();
    this.newConversationUser$ = new Observable();
    this.newConversationUser$ = this.newConversationUser.asObservable();

    this.senderDetails = new Subject();
    this.senderDetails$ = new Observable();
    this.senderDetails$ = this.senderDetails.asObservable();

    this.typingData = new Subject();
    this.typingData$ = new Observable();
    this.typingData$ = this.typingData.asObservable();

    this.userId = localStorage.getItem('userId');
    this.role = localStorage.getItem('role');

    this.receiverId = '';
    this.chatId = '';
    this.updatedChat = '';
    this.chats = [];
    this.users = [];
    this.allChatIds = [];
    this.onlyLeads = [];
    this.conversationUser = [];
    this.newChatState = false;
    this.userDetails = {} as NewUser;
  }

  /**
   * @name removeUserData
   * @param chat 
   * @description This method is use to filter the data and get only conversation user and also only chat Ids
   */
  public removeUserData(users: ConversationUser[]): void {
    let localData = JSON.parse(localStorage.getItem('conversation'))
    localData ? this.conversationUser = localData : this.conversationUser = users
    this.allChatIds = this.conversationUser.map((user: ConversationUser) => user.chatId);
    this.onlyConversationUsers.next(this.conversationUser);
  }

  /**
   * @name removeOwner
   * @param user 
   * @description This method will remove the owner from the array of users
   */
  public removeOwner(user: NewUser[]): void {
    this.users = user;
    this.onlyLeads = user.filter((items: NewUser) => items.role === 'lead' || items.role === 'mentor');
    let filteredUsers = this.users.filter((items: NewUser) => items._id !== this.userId);
    this.role === 'intern' ? this.allUsers.next(this.onlyLeads) : this.allUsers.next(filteredUsers);
    let sender = this.users.find((items: NewUser) => items._id === this.userId);
    this.senderDetails.next(sender);
  }

  /**
   * @name getMessage
   * @param message 
   * @description This method is use to create the object of the new message and send it to server
   */
  public getMessage(message: string): void {
    if (this.userId) {
      if (this.newChatState) {
        let newChat: CreateChat = {
          owner: this.userId,
          chat_type: 'dm',
          title: 'dm',
          members: [
            this.userId,
            this.receiverId
          ]
        }
        this.startNewChat.next(newChat);
        this.chats = [];
        this.newChatState = false;
        this.updatedChat = message;

      } else {
        let currentTime = new Date()
        let chatObj: NewMessage = {
          is_read: false,
          chat: this.chatId,
          sender: this.userId,
          receiver: this.receiverId,
          time: currentTime,
          type: 'text',
          is_sender: true,
          convertedTime: this._formatter.Formatter(currentTime),
          content: {
            text: message
          }
        }
        this.chatData.next(chatObj);
        this.chats.push(chatObj)
        this.getChatArray(this.chats);
        let id = this.conversationUser.findIndex((user: ConversationUser) => user.chatId === this.chatId);
        this.conversationUser[id].message = message;
        this.conversationUser[id].time = this._formatter.Formatter(currentTime);
        this.conversationUser.unshift(this.conversationUser.splice(id, 1)[0]);
        this.onlyConversationUsers.next(this.conversationUser);
      }

    }
  }

  /**
   * @name getChatArray
   * @param chat
   * @description This method will store the chat in chats variable and pass it
   */
  public getChatArray(chat: NewMessage[]): void {
    this.chats = chat;
    this.chatArray.next(chat);
  }

  /**
   * @name addNewChat
   * @param newChat 
   * @description This method is use to add new conversation user
   */
  public addNewChat(newChat: NewMessage): void {
    let isChatId = this.allChatIds.filter((id: string) => id === newChat.chat);
    if (this.receiverId === newChat.sender) {
      this.chats.push(newChat);
      this.getChatArray(this.chats);
    }
    if (isChatId.length === 0) {
      this.userDetails = this.users.find((items: NewUser) => items._id === newChat.sender);

      if (this.userDetails) {

        let obj: ConversationUser = {
          _id: this.userDetails._id,
          first_name: this.userDetails.first_name,
          last_name: this.userDetails.last_name,
          photo: this.userDetails.photo,
          full_name: this.userDetails.full_name,
          chatId: newChat.chat,
          time: this._formatter.Formatter(new Date()),
          message: newChat.content.text,
          notificationCount: 1,
        }

        if (this.conversationUser.length === 0)
          this.chatId = newChat.chat;

        this.newConversationUser.next(obj);
        this.allChatIds.push(newChat.chat);
      }
    } else {
      let userId: number = this.conversationUser.findIndex((items: ConversationUser) => items.chatId === newChat.chat);
      this.conversationUser[userId].message = newChat.content.text;
      this.conversationUser[userId].time = newChat.convertedTime;
      if (newChat.sender !== this.receiverId)
        this.conversationUser[userId].notificationCount === 0 ? this.conversationUser[userId].notificationCount = 1 : this.conversationUser[userId].notificationCount++;
      this.conversationUser.unshift(this.conversationUser.splice(userId, 1)[0]);
      this.onlyConversationUsers.next(this.conversationUser);
    }
    localStorage.setItem('conversation', JSON.stringify(this.conversationUser))
  }

  /**
   * @name getReceiverId
   * @param id 
   * @description This method is use to get the details of the receiver from Id
   */
  public getReceiverId(id: string): void {
    this.receiverId = id;
    let receiver: NewUser | undefined = this.users.find((items: NewUser) => items._id === this.receiverId);
    if (receiver)
      this.receiverData.next(receiver);

    if (this.newChatState)
      this.chatArray.next([]);
  }

  /**
   * @name updatedChatObj
   * @description This method is use to update the chat object
   */
  public updatedChatObj(id: string): void {
    this.chatId = id;
    this.getMessage(this.updatedChat);
    this.updatedChat = '';
    let index = this.conversationUser.findIndex((user: ConversationUser) => user.chatId === '');
    this.conversationUser[index].chatId = id;
    this.allChatIds.push(id);
  }

  /**
   * @name createTypingData
   * @param id 
   * @description This method is use to create obj for typing event
   */
  public createTypingData(id: string): void {
    let obj: Typing = {
      receiver: this.receiverId,
      sender: id
    }
    this.typingData.next(obj)
  }

  /**
   * @name updateChatArray
   * @param data 
   * @description This method will update the chat array
   */
  public updateChatArray(data: MessageRead) {
    if (this.chatId === data.chatId) {
      this.chats.map((message: NewMessage) => message.is_read = true)
      this.getChatArray(this.chats)
    }
  }
}
