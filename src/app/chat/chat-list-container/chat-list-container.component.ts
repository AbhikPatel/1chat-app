import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { ConversationUsers, OnlineUser, Typing } from '../models/chat.model';

@Component({
  selector: 'app-chat-list-container',
  templateUrl: './chat-list-container.component.html'
})
export class ChatListContainerComponent  implements OnInit,OnDestroy {
    /** stops the subscription on ngDestroy */
    private destroy: Subject<void>;
     /** Observable for the details of all the conversation users */
  public getConversationUsers$: Observable<ConversationUsers[]>;
    /** Observable for the details of online users */
    public getOnlineUsersData$: Observable<OnlineUser[]>;
      /** Observable for new Chat Id */
  public typingInfo$: Observable<Typing>;
  constructor(private _chatService:ChatService) {
    this.destroy = new Subject();
    this.getConversationUsers$ = new Observable();
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
    this. joinGroupChatById()
    this.getOnlineUsersData$ = this._chatService.listen('alive');
    this.typingInfo$ = this._chatService.listen('typing');
  }
  /**
   * @name joinGroupChatById
   * @description This method will emit the id in the socket of all the users to join the room 
   */
  private joinGroupChatById(): void {
    this._chatService.getConversationUser().pipe(takeUntil(this.destroy)).subscribe((users: ConversationUsers[]) => {
      this.getConversationUsers$ = of(users);
      var groupIds: string[] = [];
      users.map((data: ConversationUsers) => {
        if (data.chat_type === 'group')
          groupIds.push(data.chatId)
      })
      // this._chatService.emit('group:join', groupIds);
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
