import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Chat, ConversationUsers, CreateChat, Message, OnlineUser, Typing } from '../../models/chat.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { FormatTime } from 'src/app/core/utilities/formatTime';
import { User } from 'src/app/shared/models/user.model';
import { EOD } from '../../models/eod.model';

@Injectable()

export class OneChatPresenterService implements OnDestroy {

  /** Observable for conversation users */
  public conversationUser$: Observable<ConversationUsers[]>;
  /** Observable for chat message array conversation user */
  public chatArray$: Observable<Message[]>;
  /** Observable for chat message array conversation user */
  public receiverConversation$: Observable<ConversationUsers>;
  /** Observable for chat message array conversation user */
  public newMessage$: Observable<Message>;
  /** Observable for create new conversation chat */
  public createChat$: Observable<CreateChat>;
  /** Observable for currentChatId */
  public currentChatId$: Observable<string>;
  /** Observable for details of all the users */
  public allUsers$: Observable<User[]>;
  /** Observable for typing info */
  public typingInfo$: Observable<Typing>;
  /** variable for sender Id */
  public senderId: string;
  /** variable for chat array */
  public chats: Message[];
  /** variable for receivers data */
  public receiversConversation: ConversationUsers;
  /** variable for conversation list */
  public conversationList: ConversationUsers[];
  /** variable for all the chat Ids */
  public allChatIds: string[];
  /** variable for storing the message */
  public messageText: string;
  /** variable for storing the details of all the users */
  public allDbUsers: User[];
  /** variable for storing the details of sender */
  public senderDetails: User;
  /** variable for current chat type */
  public currentChatType: string;

  /** Subject for conversation users */
  private conversationUser: Subject<ConversationUsers[]>;
  /** Subject for chat Array */
  private chatArray: Subject<Message[]>;
  /** Subject for receivers conversation data */
  private receiverConversation: Subject<ConversationUsers>;
  /** Subject for receivers conversation data */
  private newMessage: Subject<Message>;
  /** Subject for new conversation chat */
  private createChat: Subject<CreateChat>;
  /** Subject for new conversation chat */
  private currentChatId: Subject<string>;
  /** Subject for details of all the users */
  private allUsers: Subject<User[]>;
  /** Subject for details typing info */
  private typingInfo: Subject<Typing>;
  /** stops the subscription on destroy */
  private destroy: Subject<void>;

  constructor(
    private _commonService: CommonService,
    private _formatter: FormatTime
  ) {
    this.conversationUser$ = new Observable();
    this.receiverConversation$ = new Observable();
    this.chatArray$ = new Observable();
    this.newMessage$ = new Observable();
    this.createChat$ = new Observable();
    this.currentChatId$ = new Observable();
    this.allUsers$ = new Observable();
    this.typingInfo$ = new Observable();

    this.conversationUser = new Subject();
    this.receiverConversation = new Subject();
    this.chatArray = new Subject();
    this.newMessage = new Subject();
    this.createChat = new Subject();
    this.currentChatId = new Subject();
    this.allUsers = new Subject();
    this.typingInfo = new Subject();
    this.destroy = new Subject();

    this.conversationUser$ = this.conversationUser.asObservable();
    this.receiverConversation$ = this.receiverConversation.asObservable();
    this.chatArray$ = this.chatArray.asObservable();
    this.newMessage$ = this.newMessage.asObservable();
    this.createChat$ = this.createChat.asObservable();
    this.currentChatId$ = this.currentChatId.asObservable();
    this.allUsers$ = this.allUsers.asObservable();
    this.typingInfo$ = this.typingInfo.asObservable();
    this.senderId = this._commonService.getUserId();

    this.chats = [];
    this.allDbUsers = [];
    this.conversationList = [];
    this.allChatIds = [];

    this.receiversConversation = {} as ConversationUsers;
    this.messageText = null;
  }

  /**
   * @name getAllUsers
   * @param users 
   * @description This method will get all the details of all the users
   */
  public getAllUsers(users: User[]): void {
    this.allDbUsers = users;
    this.senderDetails = users.find((user: User) => user._id === this.senderId);
    this.allUsers.next(users);
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

  /**
   * @name getChatMessagesArray
   * @param chat 
   * @description This method is used to get the array of chats
   */
  public getChatMessagesArray(chat: Message[]): void {
    this.chats = [...chat];
    this.chatArray.next(chat);
  }

  /**
   * @name getReceiversConversation
   * @param receiversConversation 
   * @description This method is used to get the receivers details
   */
  public getReceiversConversation(receivers: ConversationUsers): void {
    console.log(receivers);
    
    this.currentChatType = receivers.chat_type;
    this.receiversConversation = receivers;
    this.receiverConversation.next(receivers);
    this.allChatIds.includes(receivers.chatId) ? this.currentChatId.next(receivers.chatId) : this.conversationList.unshift(receivers)
  }

  /**
   * @name updateConversationList
   * @param message 
   * @description This method will update the list of conversation users
   */
  public updateConversationList(message: string, chatId: string, increaseCount?: boolean, id?:string): void {
    let latestConversation: ConversationUsers = this.conversationList.find((user: ConversationUsers) => user.chatId === chatId);
    latestConversation.lastMessage = message;
    latestConversation.lastMessageId = id;
    latestConversation.time = new Date();
    latestConversation.standardTime = this._formatter.Formatter(new Date());
    let index: number = this.conversationList.indexOf(latestConversation);
    this.conversationList.splice(index, 1);
    this.conversationList.unshift(latestConversation);
    if (increaseCount)
      latestConversation.notificationCount++;
    this.getConversationUsers(this.conversationList);
  }

  /**
   * @name getChatData
   * @param message 
   * @description This method is used to add new chat in the chat array
   */
  public getChatData(message: string, replied?: Message): void {
    let currentTime: Date = new Date();
    if (!this.allChatIds.includes(this.receiversConversation.chatId)) {
      let newChat: CreateChat = {
        owner: this.senderId,
        chat_type: 'dm',
        title: 'dm',
        members: [
          this.senderId,
          this.receiversConversation.chatId
        ],
      };
      this.messageText = message;
      this.createChat.next(newChat);
    } else {

      let messageObj: Message = {
        _id: '',
        is_read: false,
        is_edit: false,
        chat: this.receiversConversation.chatId,
        sender: this.senderId,
        receiver: this.receiversConversation.members[0]._id,
        time: currentTime,
        type: 'text',
        content: {
          text: this.messageText || message,
        },
        is_sender: true,
        displayTime: this._formatter.Formatter(currentTime),
        replied_to: replied || undefined,
        chat_type: this.currentChatType
      };
      this.newMessage.next(messageObj);
      this.chats.push(messageObj);
      this.getChatMessagesArray(this.chats);
      this.updateConversationList(message, this.receiversConversation.chatId, false);
      this.messageText = null;
    }
  }

  /**
   * @name newMessageFromSocket
   * @param message 
   * @description This method will get the new message from the socket
   */
  public newMessageFromSocket(message: Message): void {
    if (this.receiversConversation.chatId === message.chat) {
      message.is_read = true;
      this.chats.push(message);
      this.chatArray.next(this.chats);
    } else {
      if (this.allChatIds.includes(message.chat))
        this.updateConversationList(message.content.text, message.chat, true, message._id);
      else {
        this.allChatIds.push(message.chat);
        let generateNewConversationUser: ConversationUsers = {
          chatId: message.chat,
          owner: message.sender,
          chat_type: 'dm',
          members: [{
            _id: this.senderDetails._id,
            first_name: this.senderDetails.first_name,
            last_name: this.senderDetails.last_name,
            photo: this.senderDetails.photo,
            role: this.senderDetails.role,
            full_name: this.senderDetails.full_name,
          }],
          sender: message.sender,
          receiver: message.receiver,
          time: message.time,
          lastMessage: message.content.text,
          lastMessageId: message._id,
          isRead: false,
          isEdit: false,
          standardTime: message.displayTime,
          profile: this.senderDetails.photo,
          displayName: this.senderDetails.full_name,
          notificationCount: 1,
          showIsOnline: true,
          eodNotification: false
        }
        this.conversationList.unshift(generateNewConversationUser);
        this.getConversationUsers(this.conversationList);
      }
    }
    this.updateConversationList(message.content.text, message.chat);
  }

  /**
   * @name newGeneratedChatId
   * @param chatId 
   * @description This method will get the new generated chat Id
   */
  public newGeneratedChatId(chatId: string): void {
    this.allChatIds.push(chatId);
    this.receiversConversation.chatId = chatId;
    this.conversationList[0].chatId = chatId;
    this.getChatData(this.messageText);
  }

  /**
   * @name getReadChatId
   * @param chatId
   * @description This method will update the chat array is read to true 
   */
  public getReadChatId(chatId: string): void {
    if (this.receiversConversation.chatId === chatId) {
      this.chats.forEach((message: Message) => message.is_read = true);
      this.chatArray.next(this.chats);
    }
  }

  /**
   * @name getMessageTyping
   * @description This method is used to create the typing Object
   */
  public getMessageTyping(): void {
    let typingObj: Typing = {
      sender: this.senderId,
      receiver: this.receiversConversation.chat_type === 'dm' ? this.receiversConversation.members[0]._id : this.receiversConversation.chatId,
      isGroup: this.receiversConversation.chat_type === 'dm' ? false : true,
      typerName: this.senderDetails.full_name
    };

    this.typingInfo.next(typingObj);
  }

  /**
   * @name eodFromSocket
   * @param eod 
   * @description This method will push the eod into the eod collection
   */
  public eodFromSocket(eod: EOD): number {
    let id: number = this.conversationList.findIndex((user: ConversationUsers) => user.chatId === eod.chatId);
    this.conversationList[id].eodNotification = true;
    return id
  }

  /**
   * @name getEditedMessage
   * @param message 
   * @description This method will update the chat list of the edit message
   */
  public getEditedMessage(message: Message): void {
    let index: number = this.chats.findIndex((data: Message) => data._id === message._id);
    this.chats[index] = message;
    this.getChatMessagesArray(this.chats);
  }

  /**
   * @name getRecentId
   * @param id 
   * @description This method is used to set the recent chat id
   */
  public getRecentId(id: string): void {
    this.chats[this.chats.length - 1]._id = id;
    this.getChatMessagesArray(this.chats);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
