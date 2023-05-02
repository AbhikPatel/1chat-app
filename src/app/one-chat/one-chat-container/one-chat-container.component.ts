import { Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NewUser } from 'src/app/shared/models/user.model';
import { Alive, Conversation, CreateChat, Message, MessageRead, NewMessage, Typing } from '../models/chat.model';
import { NewChatAdaptor } from '../one-chat-adaptor/one-chat.adaptor';
import { OneChatService } from '../one-chat.service';

@Component({
  selector: 'app-one-chat-container',
  templateUrl: './one-chat-container.component.html',
})
export class OneChatContainerComponent implements OnInit {

  /** This Subject is used to unsubscribe all the rxjs on destroy */
  public destroy: Subject<void>;
  /** This Subject is used to pass the new chatID  */
  public newChatId$: Subject<CreateChat>;
  /** This observable will pass the socket listen data */
  public listen$: Observable<any>;
  /** This Subject will pass the new Message Object */
  public newMessage: Subject<NewMessage>;
  /** This observable will pass all the users data */
  public allUser$: Observable<NewUser[]>;
  /** This observable will pass all the users which has conversation with the sender */
  public conversationUser$: Subject<Conversation[]>;
  /** This observable will pass all the Messages data */
  public getAllMessages$: Observable<NewMessage[]>;
  /** This observable will pass all the Messages data */
  public getTypingData$: Observable<Typing>;
  /** This observable will pass all the is_read data */
  public getIsReadData$: Observable<MessageRead>;
  /** This observable will pass all the online users */
  public aliveData$: Observable<Alive[]>;

  constructor(
    private _service: OneChatService,
    private _newChatAdaptor: NewChatAdaptor,
  ) {
    this.destroy = new Subject();
    this.listen$ = new Observable();
    this.newMessage = new Subject();
    this.allUser$ = new Observable();
    this.getAllMessages$ = new Observable();
    this.getTypingData$ = new Observable();
    this.conversationUser$ = new Subject();
    this.getIsReadData$ = new Observable();
    this.aliveData$ = new Observable();
    this.newChatId$ = new Subject();
  }

  ngOnInit(): void {
    this.props()
  }

  /**
   * @name props
   * @description This method is used to call on OnInit
   */
  public props(): void {
    this._service.setMap();
    this.allUser$ = this._service.getAllUserData();

    this._service.getConversationUser().pipe(takeUntil(this.destroy)).subscribe((users: Conversation[]) => {
      this.conversationUser$.next(users);
      var groupIds: string[] = [];
      users.map((data: Conversation) => {
        if (data.chat_type === 'group')
          groupIds.push(data._id)
      })
      this._service.emit('group:join', groupIds)
    })

    this._service.listen('dm:message').pipe(takeUntil(this.destroy)).subscribe((chat: Message) => this.newMessage.next(this._newChatAdaptor.toResponse(chat)));
    this._service.listen('group:message').pipe(takeUntil(this.destroy)).subscribe((chat: Message) => this.newMessage.next(this._newChatAdaptor.toResponse(chat)));
    this._service.listen('welcome').pipe(takeUntil(this.destroy)).subscribe((data) => console.log(data))

    this.getTypingData$ = this._service.listen('typing');
    this.getIsReadData$ = this._service.listen('dm:messageRead')
    this.aliveData$ = this._service.listen('alive');
  }

  /**
   * @name getConversationId
   * @param chatId 
   * @description This method is called to get conversation Id to pass the messages Data
   */
  public getConversationId(chatId: string): void {
    this.getAllMessages$ = this._service.getChatMessages(chatId);
  }

  /**
   * @name getChatObject
   * @param chat 
   * @description This method is called to get chat object to emit on chat event
   */
  public getChatObject(chat: NewMessage): void {
    const data: Message = this._newChatAdaptor.toRequest(chat);
    chat.chat_type === 'dm' ? this._service.emit('dm:message', data) : this._service.emit('group:message', data)
  }

  /**
   * @name getNewConservation
   * @param newChat 
   * @description This method is called to post new chat data
   */
  public getNewConservation(newChat: CreateChat): void {
    this._service.postNewChat(newChat).subscribe((data: CreateChat) => this.newChatId$.next(data));
  }

  /**
   * @name getTypingId
   * @param data
   * @description This method is called to emit typing event
   */
  public getTypingId(data: Typing): void {
    this._service.emit('typing', data);
  }

  /**
   * @name getReadMessagesData
   * @param data 
   * @description This method will emit the message read data into socket
   */
  public getReadMessagesData(data: MessageRead) {
    this._service.emit('dm:messageRead', data)
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
