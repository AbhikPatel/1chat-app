import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Chat, Member, NewUser } from 'src/app/shared/models/user.model';
import { CreateChat, Message, NewMessage } from '../../models/chat.model';
import { OneChatPresenterService } from '../one-chat-presenter/one-chat-presenter.service';

@Component({
  selector: 'app-one-chat-presentation',
  templateUrl: './one-chat-presentation.component.html',
  viewProviders: [OneChatPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneChatPresentationComponent implements OnInit {

  // This property is used to get new chat Object
  @Input() public set getNewChatId(v: CreateChat | null) {
    if (v) {
      this._getNewChatId = v;
      this.getChatId(v._id)
      this._service.updatedChatObj();
    }
  }
  public get getNewChatId(): CreateChat | null {
    return this._getNewChatId;
  }
  
  // This property is used to get chat array
  @Input() public set getChatArray(v: NewMessage[] | null) {
    if (v) {
      this._getChatArray = v;
      this._service.getChatArray(v)
    }
  }
  public get getChatArray(): NewMessage[] | null {
    return this._getChatArray;
  }


  @Input() public set getAllUser(v: NewUser[] | null) {
    if (v) {
      this._getAllUser = v;
      this._service.removeOwner(v)
    }
  }

  public get getAllUser(): NewUser[] | null {
    return this._getAllUser;
  }

  @Input() public set getWelcomeData(v: any) {
    this._getWelcomeData = v;
  }

  public get getWelcomeData(): any {
    return this._getWelcomeData;
  }

  @Input() public set getConversationUsers(v: Chat[] | null) {
    if (v) {
      this._getConversationUsers = v;
      this._service.removeUserData(v)
    }
  }

  public get getConversationUsers(): Chat[] | null {
    return this._getConversationUsers;
  }


  @Input() public set newChat(v: NewMessage | null) {
    if (v) {
      this._newChat = v;
      this._service.addNewChat(v);
    }
  }
  public get newChat(): NewMessage | null {
    return this._newChat;
  }


  @Output() public emitConversationId: EventEmitter<string>;
  @Output() public emitChatData: EventEmitter<Message>;
  @Output() public emitNewConversation: EventEmitter<CreateChat>;

  private _newChat: NewMessage | null;
  private _getNewChatId: CreateChat | null
  private _getWelcomeData: any;
  private _getAllUser: NewUser[] | null;
  private _getConversationUsers: Chat[] | null;
  public destroy: Subject<void>;
  public transferAllUser$: Observable<NewUser[]>;
  public receiverData$: Observable<NewUser>;
  public transferConversationUser$: Observable<Member[]>;
  private _getChatArray: NewMessage[] | null;
  public updatedChatArray$: Observable<NewMessage[]>;
  public newConversationUser:Observable<Member>;

  constructor(
    private _service: OneChatPresenterService
  ) {
    this.destroy = new Subject();
    this.emitConversationId = new EventEmitter();
    this.emitNewConversation = new EventEmitter();
    this.emitChatData = new EventEmitter();
    this._getConversationUsers = [];
    this.transferAllUser$ = new Observable();
    this.transferConversationUser$ = new Observable();
    this.receiverData$ = new Observable();
    this.updatedChatArray$ = new Observable();
    this.newConversationUser = new Observable();
    this._getAllUser = [];
    this._getChatArray = [];
    this._newChat = null;
    this._getNewChatId = {} as CreateChat
  }

  ngOnInit(): void {
    this.props();
  }

  /**
   * @name props
   * @description This method is called in ngOnInit
   */
  public props() {
    this.transferAllUser$ = this._service.allUsers$;
    this.transferConversationUser$ = this._service.onlyConversationUsers$;
    this._service.chatData$.pipe(takeUntil(this.destroy)).subscribe((chat: Message) => this.emitChatData.emit(chat))
    this.updatedChatArray$ = this._service.chatArray$
    this.receiverData$ = this._service.receiverData$
    this._service.startNewChat$.pipe(takeUntil(this.destroy)).subscribe((chat: CreateChat) => this.emitNewConversation.emit(chat))
    this.newConversationUser = this._service.newConversationUser$
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public getChatId(chatId?: string) {
    if (chatId) {
      this.emitConversationId.emit(chatId);
      this._service.chatId = chatId
    }
  }

  public getReceiverId(id: string) {
    this._service.getReceiverId(id)
  }

  public getChat(chat: string) {
    this._service.getMessage(chat)
  }

  public getNewChatState() {
    this._service.newChatState = true;
  }
}
