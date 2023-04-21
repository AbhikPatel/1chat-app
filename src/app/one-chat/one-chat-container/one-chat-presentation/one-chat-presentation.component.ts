import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NewUser } from 'src/app/shared/models/user.model';
import { ConversationUser, CreateChat, MessageRead, NewMessage, Typing } from '../../models/chat.model';
import { OneChatPresenterService } from '../one-chat-presenter/one-chat-presenter.service';

@Component({
  selector: 'app-one-chat-presentation',
  templateUrl: './one-chat-presentation.component.html',
  viewProviders: [OneChatPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneChatPresentationComponent implements OnInit {

  /** This property is used to get the details og the Typing event */
  @Input() public typingData: Observable<Typing>

  /** This property is used to get the details of all the users */
  @Input() public set getIsRead(v: MessageRead) {
    if (v) {
      this._getIsRead = v;
      this._service.updateChatArray(v)
    }
  }

  public get getIsRead(): MessageRead {
    return this._getIsRead;
  }

  /** This property is used to get the details of all the users */
  @Input() public set getAllUser(v: NewUser[]) {
    if (v) {
      this._getAllUser = v;
      this._service.removeOwner(v);
    }
  }

  public get getAllUser(): NewUser[] {
    return this._getAllUser;
  }

  /** This property is used to get new chat Object */
  @Input() public set getNewChatId(v: CreateChat) {
    if (v) {
      this._getNewChatId = v;
      this._service.updatedChatObj(v._id);
    }
  }
  public get getNewChatId(): CreateChat {
    return this._getNewChatId;
  }

  /** This property is used to get chat array */
  @Input() public set getChatArray(v: NewMessage[]) {
    if (v) {
      this._getChatArray = v;
      this._service.getChatArray(v)
    }

  }
  public get getChatArray(): NewMessage[] {
    return this._getChatArray;
  }

  /** This property is used to get the details of conversation users */
  @Input() public set getConversationUsers(v: ConversationUser[]) {
    if (v) {
      this._getConversationUsers = v;
      this._service.removeUserData(v);
    }
  }

  public get getConversationUsers(): ConversationUser[] {
    return this._getConversationUsers;
  }


  /** This property is used to get the object of the new chat */
  @Input() public set newChat(v: NewMessage) {
    if (v) {
      this._newChat = v;
      this._service.addNewChat(v);
    }
  }
  public get newChat(): NewMessage {
    return this._newChat;
  }

  @ViewChild('onScreen') public onScreen: ElementRef;
  @Output() public emitConversationId: EventEmitter<string>;
  @Output() public emitChatData: EventEmitter<NewMessage>;
  @Output() public emitNewConversation: EventEmitter<CreateChat>;
  @Output() public emitTypingData: EventEmitter<Typing>;
  @Output() public emitReadMessage: EventEmitter<MessageRead>;

  private _newChat: NewMessage;
  private _getNewChatId: CreateChat;
  private _getAllUser: NewUser[];
  private _getConversationUsers: ConversationUser[];
  private _getIsRead:MessageRead;
  public destroy: Subject<void>;
  public transferAllUser$: Observable<NewUser[]>;
  public receiverData$: Observable<NewUser>;
  public transferConversationUser$: Observable<ConversationUser[]>;
  public updatedChatArray$: Observable<NewMessage[]>;
  public senderDetails$: Observable<NewUser>;
  public newConversationUser: Observable<ConversationUser>;
  public _getChatArray: NewMessage[];

  constructor(
    private _service: OneChatPresenterService,
  ) {
    this.destroy = new Subject();
    this.emitConversationId = new EventEmitter();
    this.emitNewConversation = new EventEmitter();
    this.emitChatData = new EventEmitter();
    this.emitTypingData = new EventEmitter();
    this.emitReadMessage = new EventEmitter();
    this._getConversationUsers = [];
    this.transferAllUser$ = new Observable();
    this.transferConversationUser$ = new Observable();
    this.receiverData$ = new Observable();
    this.updatedChatArray$ = new Observable();
    this.senderDetails$ = new Observable();
    this.newConversationUser = new Observable();
    this._getAllUser = [];
    this._getNewChatId = {} as CreateChat;
    this.onScreen = {} as ElementRef;
  }

  ngOnInit(): void {
    this.props();
  }

  /**
   * @name props
   * @description This method is called in ngOnInit
   */
  public props() {
    this.senderDetails$ = this._service.senderDetails$
    this.transferAllUser$ = this._service.allUsers$;
    this.transferConversationUser$ = this._service.onlyConversationUsers$;
    this._service.chatData$.pipe(takeUntil(this.destroy)).subscribe((chat: NewMessage) => this.emitChatData.emit(chat))
    this.updatedChatArray$ = this._service.chatArray$
    this.receiverData$ = this._service.receiverData$
    this._service.startNewChat$.pipe(takeUntil(this.destroy)).subscribe((chat: CreateChat) => this.emitNewConversation.emit(chat))
    this.newConversationUser = this._service.newConversationUser$;
    this._service.typingData$.pipe(takeUntil(this.destroy)).subscribe((data: Typing) => this.emitTypingData.emit(data))
  }

  /**
   * @name getChatId
   * @param chatId 
   * @description This method is use to get chat Id
   */
  public getChatId(chatId?: string): void {
    if (chatId) {
      this.emitConversationId.emit(chatId);
      this._service.chatId = chatId
    }
  }

  /**
   * @name getReceiverId
   * @param id 
   * @description This method is use to get receiver ID
   */
  public getReceiverId(id: string): void {
    this._service.getReceiverId(id)
  }

  /**
   * @name getChat
   * @param chat 
   * @description This method is use to get the new message test
   */
  public getChat(chat: string): void {
    this._service.getMessage(chat)
  }

  /**
   * @name getNewChatState
   * @description This method is use to get the new chat state
   */
  public getNewChatState(): void {
    this._service.newChatState = true;
  }

  /**
   * @name getSenderId
   * @param id 
   * @description This method will get the sender id for typing event
   */
  public getSenderId(id: string): void {
    this._service.createTypingData(id)
  }

  /**
   * @name getIsReadData
   * @param data 
   * @description This method will transfer data of is_read into container
   */
  public getIsReadData(data:MessageRead){
    this.emitReadMessage.emit(data)
  }

  /**
   * @name ngOnDestroy
   * @description This method is called the component is destroyed
   */
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
