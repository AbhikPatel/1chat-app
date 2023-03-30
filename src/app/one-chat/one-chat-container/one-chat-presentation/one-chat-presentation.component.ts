import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Chat, Member, NewUser } from 'src/app/shared/models/user.model';
import { Message } from '../../models/chat.model';
import { OneChatPresenterService } from '../one-chat-presenter/one-chat-presenter.service';

@Component({
  selector: 'app-one-chat-presentation',
  templateUrl: './one-chat-presentation.component.html',
  viewProviders: [OneChatPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneChatPresentationComponent implements OnInit {

  @Input() public set getChatArray(v: Message[] | null) {
    if (v) {
      this._getChatArray = v;
      this._service.getChatArray(v)
    }
  }
  public get getChatArray(): Message[] | null {
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


  @Input() public set newChat(v: Message | null) {
    if (v) {
      this._newChat = v;
      this._service.addNewChat(v);
    }
  }
  public get newChat(): Message | null {
    return this._newChat;
  }

  private _newChat: Message | null;

  @Output() public emitConversationId: EventEmitter<string>;
  @Output() public emitChatData: EventEmitter<Message>;

  private _getWelcomeData: any;
  private _getAllUser: NewUser[] | null;
  private _getConversationUsers: Chat[] | null;
  public destroy: Subject<void>;
  public transferAllUser$: Observable<NewUser[]>;
  public receiverData$: Observable<NewUser>;
  public transferConversationUser$: Observable<Member[]>;
  private _getChatArray: Message[] | null;
  public updatedChatArray:Message[]

  constructor(
    private _service: OneChatPresenterService
  ) {
    this.destroy = new Subject();
    this.emitConversationId = new EventEmitter();
    this.emitChatData = new EventEmitter();
    this._getConversationUsers = [];
    this.transferAllUser$ = new Observable();
    this.transferConversationUser$ = new Observable();
    this.receiverData$ = new Observable();
    this.updatedChatArray = []
    this._getAllUser = [];
    this._getChatArray = [];
    this._newChat = null;
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
    this._service.chatArray$.pipe(takeUntil(this.destroy)).subscribe((data) => this.updatedChatArray = data)
    this.receiverData$ = this._service.receiverData$
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public getChatId(chatId: string) {
    this.emitConversationId.emit(chatId);
    this._service.chatId = chatId
  }

  public getReceiverId(id: string) {
    this._service.getReceiverId(id)
  }

  public getChat(chat: string) {
    this._service.getMessage(chat)
  }
}
