import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Member, NewUser } from 'src/app/shared/models/user.model';

@Injectable()

export class ChatListPresenterService {

  private newConversationUser: Subject<Member>;
  public newConversationUser$: Observable<Member>;

  constructor() {
    this.newConversationUser = new Subject();
    this.newConversationUser$ = new Observable();
    this.newConversationUser$ = this.newConversationUser.asObservable();
  }

  public getNewConversationUser(user: NewUser): void {
    let obj: Member = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      photo: user.photo,
      full_name: user.full_name,
      chatId: ''
    }
    this.newConversationUser.next(obj)
  }
}
