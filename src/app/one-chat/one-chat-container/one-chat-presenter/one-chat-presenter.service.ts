import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Chat, Member, NewUser } from 'src/app/shared/models/user.model';
import { CreateChat, Message, NewMessage } from '../../models/chat.model';

@Injectable()

export class OneChatPresenterService {

  private allUsers: Subject<NewUser[]>;
  public allUsers$: Observable<NewUser[]>;

  private onlyConversationUsers: Subject<Member[]>;
  public onlyConversationUsers$: Observable<Member[]>;

  private chatData: Subject<Message>;
  public chatData$: Observable<Message>;

  private chatArray: Subject<NewMessage[]>;
  public chatArray$: Observable<NewMessage[]>;

  private receiverData: Subject<NewUser>;
  public receiverData$: Observable<NewUser>;

  private startNewChat: Subject<CreateChat>;
  public startNewChat$: Observable<CreateChat>;

  private newConversationUser: Subject<Member>;
  public newConversationUser$: Observable<Member>;

  public users: NewUser[];
  public chats: NewMessage[];
  public newChatState: boolean;
  public userId: string | null;
  public receiverId: string;
  public chatId: string;
  public updatedChat: string;
  public allChatIds: string[];
  public userDetails: NewUser | undefined;

  constructor() {
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

    this.userId = localStorage.getItem('userId')

    this.receiverId = '';
    this.chatId = '';
    this.updatedChat = '';
    this.chats = [];
    this.users = [];
    this.allChatIds = [];
    this.newChatState = false;
    this.userDetails = {} as NewUser;

  }


  public removeUserData(chat: Chat[]): void {
    let filteredData = chat.map((data: Chat) => {
      let item = [];
      this.allChatIds.push(data._id)
      let user = data.members.filter(user => user._id !== this.userId)
      item.push(
        Object.assign(user[0],
          {
            chatId: data._id,
            full_name: user[0].first_name + ' ' + user[0].last_name
          })
      )
      return item
    }).flat();
    this.onlyConversationUsers.next(filteredData)
  }

  public removeOwner(user: NewUser[]): void {
    let data = user.filter((items: NewUser) => items._id !== this.userId)
    this.allUsers.next(data)
    this.users = data;
    this.userDetails = user.find((item: NewUser) => item._id === this.userId)
  }

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
        this.startNewChat.next(newChat)
        this.chats = [];
        this.newChatState = false;
        this.updatedChat = message;

      } else {
        let chatObj: NewMessage = {
          is_read: false,
          chat: this.chatId,
          sender: this.userId,
          receiver: this.receiverId,
          time: new Date(),
          type: 'text',
          is_sender: true,
          convertedTime: `${new Date().getHours()}:${new Date().getMinutes()}`,
          content: {
            text: message
          }
        }
        this.chatData.next(chatObj);
        this.chats.push(chatObj)
        this.getChatArray(this.chats);
      }

    }
  }

  public getChatArray(chat: NewMessage[]): void {
    this.chats = chat;
    this.chatArray.next(chat);
  }

  public addNewChat(newChat: NewMessage): void {
    let isChatId = this.allChatIds.filter((id: string) => id === newChat.chat)
    if (newChat.receiver === this.userId) {
      this.chats.push(newChat)
      this.getChatArray(this.chats)
    }
    // debugger
    if (isChatId.length === 0) {
      // debugger
      if (this.userDetails) {
        let obj: Member = {
          _id: this.userDetails._id,
          first_name: this.userDetails.first_name,
          last_name: this.userDetails.last_name,
          photo: this.userDetails.photo,
          full_name: this.userDetails.full_name,
          chatId: newChat.chat,
        }
        this.newConversationUser.next(obj)
        // debugger
      }
    }
  }

  public getReceiverId(id: string): void {
    this.receiverId = id;
    let receiver: NewUser | undefined = this.users.find((items: NewUser) => items._id === this.receiverId)
    if (receiver)
      this.receiverData.next(receiver)

    if (this.newChatState)
      this.chatArray.next([])
  }

  public updatedChatObj(): void {
    this.getMessage(this.updatedChat);
    this.updatedChat = '';
  }
}
