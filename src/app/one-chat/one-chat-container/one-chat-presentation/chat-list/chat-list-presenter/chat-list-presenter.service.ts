import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ConversationUser } from 'src/app/one-chat/models/chat.model';
import { NewUser } from 'src/app/shared/models/user.model';

@Injectable()

export class ChatListPresenterService {

  private newConversationUser: Subject<ConversationUser>;
  public newConversationUser$: Observable<ConversationUser>;

  constructor() {
    this.newConversationUser = new Subject();
    this.newConversationUser$ = new Observable();
    this.newConversationUser$ = this.newConversationUser.asObservable();
  }

  public getNewConversationUser(user: NewUser): void {
    let obj: ConversationUser = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      photo: user.photo,
      full_name: user.full_name,
      chatId: '',
      time:null,
      message:null,
      notificationCount:0,
    }
    this.newConversationUser.next(obj)
  }
}
