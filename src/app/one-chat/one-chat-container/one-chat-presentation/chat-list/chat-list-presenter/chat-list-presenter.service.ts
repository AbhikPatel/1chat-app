import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { FormatTime } from 'src/app/core/utilities/formatTime';
import { ConversationUser, MessageRead } from 'src/app/one-chat/models/chat.model';
import { NewUser } from 'src/app/shared/models/user.model';

@Injectable()

export class ChatListPresenterService {

  private newConversationUser: Subject<ConversationUser>;
  public newConversationUser$: Observable<ConversationUser>;

  private isReadData: Subject<MessageRead>;
  public isReadData$: Observable<MessageRead>;

  public userId:string = localStorage.getItem('userId')

  constructor(
    private _formatter:FormatTime
  ) {
    this.newConversationUser = new Subject();
    this.newConversationUser$ = new Observable();
    this.newConversationUser$ = this.newConversationUser.asObservable();

    this.isReadData = new Subject();
    this.isReadData$ = new Observable();
    this.isReadData$ = this.isReadData.asObservable();
  }

  /**
   * @name getNewConversationUser
   * @param user 
   * @description This method is use to create new Conversation user
   */
  public getNewConversationUser(user: NewUser): void {
    let obj: ConversationUser = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      photo: user.photo,
      full_name: user.full_name,
      chatId: '',
      time:this._formatter.Formatter(new Date()),
      message:'New Conversation Created',
      notificationCount:0,
    }
    this.newConversationUser.next(obj)
  }

  /**
   * @name getIsReadData
   * @param data 
   * @description This method will create the message Read object
   */
  public getIsReadData(data:ConversationUser): void{
    let obj: MessageRead = {
      chatId:data.chatId,
      sender: data._id,
      receiver: this.userId,
      count: data.notificationCount
    }
    this.isReadData.next(obj)
  }
}
