import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Chat, NewUser } from 'src/app/shared/models/user.model';
import { CreateChat, Message, NewMessage, Typing } from '../models/chat.model';
import { NewChatAdaptor } from '../one-chat-adaptor/one-chat.adaptor';
import { OneChatService } from '../one-chat.service';

@Component({
  selector: 'app-one-chat-container',
  templateUrl: './one-chat-container.component.html',
})
export class OneChatContainerComponent implements OnInit {

  // This Subject is used to unsubcribe all the rxjs on destroy
  public destroy: Subject<void>;
  // This Subject is used to pass the new chatID 
  public newChatId$: Subject<CreateChat>;
  // This observable will pass the socket listen data
  public listen$: Observable<any>;
  // This Subject will pass the new Message Object
  public newMessage: Subject<NewMessage>;
  // This observable will pass all the users data
  public allUser$: Observable<NewUser[]>;
  public onlyLeads$: Observable<NewUser[]>;
  // This observable will pass all the users which has conversation with the sender
  public conversationUser$: Observable<Chat[]>;
  // This observable will pass all the Messages data
  public getAllMessages$: Observable<NewMessage[]>;
  // This observable will pass all the Messages data
  public getTypingData$: Observable<Typing>;

  constructor(
    private _service: OneChatService,
    private _newChatAdaptor: NewChatAdaptor,
    private _cdr: ChangeDetectorRef
  ) {
    this.destroy = new Subject();
    this.listen$ = new Observable();
    this.newMessage = new Subject();
    this.onlyLeads$ = new Observable();
    this.allUser$ = new Observable();
    this.getAllMessages$ = new Observable();
    this.getTypingData$ = new Observable();
    this.conversationUser$ = new Observable();
    this.newChatId$ = new Subject();
  }

  ngOnInit(): void {
    this.props()
  }

  /**
   * @name props
   * @description This method is used to call on OnInit
   */
  public props() {
    this._service.setMap();
    this.onlyLeads$ = this._service.getOnlyLeads();
    this.allUser$ = this._service.getAllUserData();
    this.conversationUser$ = this._service.getConversationUser();
    this._service.listen('chat').pipe(takeUntil(this.destroy)).subscribe((chat: Message) => this.newMessage.next(this._newChatAdaptor.toResponse(chat)))
    this._service.listen('welcome').subscribe((data) => console.log(data))
    // this.getTypingData$ = this._service.listen('typing')
    this._service.listen('typing').subscribe((data) => console.log(data))
  }

  /**
   * @name getConversationId
   * @param chatId 
   * @description This method is called to get conversation Id to pass the messages Data
   */
  public getConversationId(chatId: string) {
    this.getAllMessages$ = this._service.getChatMessages(chatId)
  }

  /**
   * @name getChatObject
   * @param chat 
   * @description This method is called to get chat object to emit on chat event
   */
  public getChatObject(chat: NewMessage) {
    const data: Message = this._newChatAdaptor.toRequest(chat);
    this._service.emit('chat', data);
  }

  /**
   * @name getNewConservation
   * @param newChat 
   * @description This method is called to post new chat data
   */
  public getNewConservation(newChat: CreateChat) {
    this._service.postNewChat(newChat).subscribe((data: CreateChat) => this.newChatId$.next(data))
  }

  /**
   * @name getTypingId
   * @param data
   * @description This method is called to emit typing event
   */
  public getTypingId(data:Typing){
    this._service.emit('typing', data)
  }

  /**
   * @name ngOnDestroy
   * @description This method is called the component is destoryed
   */
  ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
