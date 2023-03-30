import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Chat, Member, NewUser } from 'src/app/shared/models/user.model';
import { Message } from '../../models/chat.model';

@Injectable()

export class OneChatPresenterService {

  public userId: string | null;

  private allUsers: Subject<NewUser[]>;
  public allUsers$: Observable<NewUser[]>;

  private onlyConversationUsers: Subject<Member[]>;
  public onlyConversationUsers$: Observable<Member[]>;

  private chatData: Subject<Message>;
  public chatData$: Observable<Message>;

  private chatArray: Subject<Message[]>;
  public chatArray$: Observable<Message[]>;

  private receiverData: Subject<NewUser>;
  public receiverData$: Observable<NewUser>;

  public receiverId: string;
  public chatId: string;
  public chats: Message[];
  public users: NewUser[];

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

    this.userId = localStorage.getItem('userId')

    this.receiverId = '';
    this.chatId = '';
    this.chats = [];
    this.users = [];
  }

  public removeUserData(chat: Chat[]) {
    let filteredData = chat.map(data => {
      let item = [];
      let user = data.members.filter(user => user._id !== this.userId)
      item.push(
        Object.assign(user[0],
          {
            chatId: data._id,
          })
      )
      return item
    }).flat();
    this.onlyConversationUsers.next(filteredData)
  }

  public removeOwner(user: NewUser[]) {
    let data = user.filter((items: NewUser) => items._id !== this.userId)
    this.allUsers.next(data)
    this.users = data;
  }

  public getMessage(message: string) {
    if (this.userId) {
      let chatObj = {
        is_read: false,
        chat: this.chatId,
        sender: this.userId,
        receiver: this.receiverId,
        time: new Date(),
        type: 'text',
        content: {
          text: message
        }
      }

      this.chatData.next(chatObj);
      this.chats.push(chatObj);
      this.getChatArray(this.chats)
    }
  }

  public getChatArray(chat: Message[]): void {
    this.chats = chat;
    this.chatArray.next(chat);
  }

  public addNewChat(newChat: Message): void {
    this.chats.push(newChat)
    this.getChatArray(this.chats)
  }

  public getReceiverId(id: string) {
    this.receiverId = id;
    let receiver: NewUser | undefined = this.users.find((items: NewUser) => items._id === this.receiverId)
    if (receiver)
      this.receiverData.next(receiver)
  }
}
