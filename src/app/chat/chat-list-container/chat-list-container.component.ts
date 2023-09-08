import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { ConversationUsers, OnlineUser, Typing } from '../models/chat.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-chat-list-container',
  templateUrl: './chat-list-container.component.html'
})
export class ChatListContainerComponent implements OnInit, OnDestroy {
  /** stops the subscription on ngDestroy */
  private destroy: Subject<void>;
  /** Observable for the details of all the conversation users */
  public getConversationUsers$: Observable<ConversationUsers[]>;
  /** Observable for the details of online users */
  public getOnlineUsersData$: Observable<OnlineUser[]>;
  /**This Variable the details of all the users */
  public allUsers:User[];
  /** Observable for new Chat Id */
  public typingInfo$: Observable<Typing>;
  constructor(private _chatService: ChatService,
    private _commonService: CommonService) {
    this.destroy = new Subject();
    this.getConversationUsers$ = new Observable();
    this.allUsers= [];
    this.getOnlineUsersData$ = new Observable();
    this.typingInfo$ = new Observable();
  }

  ngOnInit(): void {
    this.props();
  }

  /**
  * @name props
  * @description This method will be invoked on ngOnInit
  */
  private props(): void {
    this._chatService.setMap();
    this.getOnlineUsersData$ = this._chatService.listen('alive');
    this.typingInfo$ = this._chatService.listen('typing');
    this._commonService.userApiCall.subscribe((data: any) => {
      if (data == true)
        this._chatService.getAllUserData().pipe(takeUntil(this.destroy)).subscribe((users: User[]) => {
          if (users) {
            this.allUsers = users
          }
        })
    })
    this._chatService.getConversationUser().pipe(takeUntil(this.destroy)).subscribe((users: ConversationUsers[]) => {
      this.getConversationUsers$ = of(users);
      })
 
  }
 
  /**
* @name ngOnDestroy
* @description This method is called the component is destroyed
*/
  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();

  }
}
