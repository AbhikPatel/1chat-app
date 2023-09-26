import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Observable, Subject, finalize, of, takeUntil } from 'rxjs';
import { ConversationUsers, OnlineUser, Typing } from '../models/chat.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { User } from 'src/app/shared/models/user.model';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

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
  public allUsers: User[];
  /** Observable for new Chat Id */
  public typingInfo$: Observable<Typing>;
  constructor(private _chatService: ChatService,
    private _loaderService: LoaderService) {
    this.destroy = new Subject();
    this.getConversationUsers$ = new Observable();
    this.allUsers = [];
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
    this._chatService.getAllUserData().pipe(takeUntil(this.destroy)).subscribe((users: User[]) => {
      if (users) {
        this.allUsers = users
      }
    })

    this.getAllConversationUser();
  }
  /**
   * @name getAllConversationUser
   * @description This Method Get getAllConversationUser
   */
  public getAllConversationUser() {
    this._loaderService.showLoader();
       this._chatService.getConversationUser().subscribe((users: ConversationUsers[]) => {
       this._loaderService.hideLoader();
       this.getConversationUsers$ = of(users);
    });

    // this._chatService.getConversationUser() .subscribe(
    //   (users: ConversationUsers[]) => {
    //     // Process your data here
    //     this.getConversationUsers$ = of(users);
    //     // Hide the loader when the data is received
    //     this._loaderService.hideLoader();
    //   },
    //   (error) => {
    //     // Hide the loader in case of an error
    //     this._loaderService.hideLoader();
    //   }
    //   );
      // this._chatService.getConversationUser().pipe(takeUntil(this.destroy)).subscribe((users: ConversationUsers[]) => {
      //   if (users) {
      //     this.getConversationUsers$ = of(users);
      //     this._loaderService.hideLoader();
      //   }
  
      // })
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
