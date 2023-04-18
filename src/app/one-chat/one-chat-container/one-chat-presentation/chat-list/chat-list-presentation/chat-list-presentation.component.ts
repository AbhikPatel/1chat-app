import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';
import { ConversationUser, Typing } from 'src/app/one-chat/models/chat.model';
import { NewUser } from 'src/app/shared/models/user.model';
import { ChatListPresenterService } from '../chat-list-presenter/chat-list-presenter.service';

@Component({
  selector: 'app-chat-list-presentation',
  templateUrl: './chat-list-presentation.component.html',
  viewProviders: [ChatListPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatListPresentationComponent implements OnInit {

  // This property is used to get Typing details
  @Input() public set getTypingData(v: Typing) {
    if (v) {
      this._getTypingData = v;
      this.receivingTyping(v.sender)
    }
  }
  public get getTypingData(): Typing {
    return this._getTypingData;
  }

  // This property is used to get sender Details
  @Input() public set getSenderDetails(v: NewUser) {
    if (v) {
      this._getSenderDetails = v;
    }
  }
  public get getSenderDetails(): NewUser {
    return this._getSenderDetails;
  }

  // This property is used to get conversation user
  @Input() public set getConversationUser(v: ConversationUser[]) {
    if (v) {
      this._getConversationUser = v;
      this.onUser(v[0])
    }
  }
  public get getConversationUser(): ConversationUser[] {
    return this._getConversationUser;
  }

  // This property is used to get new conversation user
  @Input() public set newConversationUser(v: ConversationUser) {
    if (v) {
      this._newConversationUser = v;
      this._getConversationUser?.unshift(v)
    }
  }
  public get newConversationUser(): ConversationUser {
    return this._newConversationUser;
  }

  // This property is used to get all the users
  @Input() public set getAllUser(v: NewUser[]) {
    if (v)
      this._getAllUser = v;
  }
  public get getAllUser(): NewUser[] {
    return this._getAllUser;
  }

  // This property is used to emit chat ID
  @Output() public emitChatId: EventEmitter<string>;
  // This property is used to emit receiver's ID
  @Output() public emitReceiverId: EventEmitter<string>;
  // This property is used to emit the state of new chat
  @Output() public emitNewChatState: EventEmitter<void>;
  // This property is used for toggle feature to search user
  @ViewChild('toggle') public toggle: any;
  private _newConversationUser: ConversationUser;
  private _getConversationUser: ConversationUser[];
  private _getAllUser: NewUser[];
  private _getTypingData: Typing;
  private _getSenderDetails: NewUser;
  public destroy: Subject<void>;
  // This property is use to store the text for search
  public searchText: string;
  // This property is use to store the chat ID
  public chatId: string;
  // This property is use to store the user ID
  public userId: string;
  // This property is use to store the new message
  public showNewMessage: Subject<boolean>;
  // This property is use to store ID of typing
  public typingId: string[];
  public typingStatus: boolean;

  constructor(
    private _service: ChatListPresenterService,
    private _cdr:ChangeDetectorRef
  ) {
    this.emitChatId = new EventEmitter();
    this.emitReceiverId = new EventEmitter();
    this.emitNewChatState = new EventEmitter();
    this.destroy = new Subject();
    this.showNewMessage = new Subject();
    this._newConversationUser = {} as ConversationUser;
    this._getAllUser = [];
    this._getConversationUser = [];
    this.typingId = [];
    this.searchText = '';
    this.chatId = '';
    this.userId = '';

  }

  ngOnInit(): void {
    this.props();
  }

  /**
   * @name props
   * @description This method is use to call in ngOnInit
   */
  public props(): void {
    this._service.newConversationUser$.pipe(takeUntil(this.destroy)).subscribe((user: ConversationUser) => this._getConversationUser?.unshift(user))
  }

  /**
   * @name onNewChat
   * @param user 
   * @description This method is use when the user tru to create chat with a new user
   */
  public onNewChat(user: NewUser): void {
    let isUser = this.getConversationUser?.find((item: ConversationUser) => user._id === item._id)
    if (isUser) {
      this.toggle.nativeElement.checked = false;
      this.onUser(isUser);
    } else {
      this.emitNewChatState.emit();
      this._service.getNewConversationUser(user);
      this.toggle.nativeElement.checked = false;
      this.emitReceiverId.emit(user._id);
      this.userId = user._id;
    }
  }

  /**
   * @name onUser
   * @param data 
   * @description This method is use to get the details of the user on click
   */
  public onUser(data: ConversationUser): void {
    this.chatId = data.chatId;
    this.emitChatId.emit(data.chatId)
    this.emitReceiverId.emit(data._id)
    this.userId = data._id
    let id = this.getConversationUser.findIndex((user:ConversationUser) => user === data)
    this.getConversationUser[id].notificationCount = 0
    // this._cdr.detectChanges();
  }

  /**
   * @name convertPhoto
   * @param profileImg 
   * @returns image url
   * @description This method is use to convert the link into soucre link
   */
  public convertPhoto(profileImg: string): string {
    let converter = 'http://172.16.3.107:21321/img/users/' + profileImg;
    // let converter = 'https://anonychat.onrender.com/img/users/' + profileImg;
    return profileImg ? converter : '../../../../../../assets/images/avatar.png';
  }

  /**
   * @name receivingTyping
   * @param sender gets the sender Id
   * @description This method is used for the displaying the typing feature
   */
  public receivingTyping(sender: string): void {
    if(!this.typingId.includes(sender)){
      this.typingId.push(sender)
    }
    this.typingStatus = true;
    console.log(this.typingId);
    setTimeout(() => {
      this.typingId = [];
      this.typingStatus = false;
      this._cdr.detectChanges();
    }, 5000);

  }

  /**
   * @name ngOnDestroy
   * @description This method is called the component is destoryed
   */
  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
