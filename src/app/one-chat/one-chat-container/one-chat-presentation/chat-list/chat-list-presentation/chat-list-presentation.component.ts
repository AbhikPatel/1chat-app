import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Alive, ConversationUser, Group, MessageRead, Typing } from 'src/app/one-chat/models/chat.model';
import { NewUser } from 'src/app/shared/models/user.model';
import { ChatListPresenterService } from '../chat-list-presenter/chat-list-presenter.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-chat-list-presentation',
  templateUrl: './chat-list-presentation.component.html',
  viewProviders: [ChatListPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatListPresentationComponent implements OnInit {
@ViewChild('inputType')inputType:ElementRef

  /** This property is used to get Typing details */
  @Input() public notificationCount: any;

  /** This property is used to get Typing details */
  @Input() public getOnlineUsers: Alive[];

  /** This property is used to get Typing details */
  @Input() public set getGroupDetails(v: Group[]) {
    if (v) {
      this._getGroupDetails = v;
    }
  }
  public get getGroupDetails(): Group[] {
    return this._getGroupDetails;
  }

  /** This property is used to get Typing details */
  @Input() public set getTypingData(v: Typing) {
    if (v) {
      this._getTypingData = v;
      this.receivingTyping(v.sender)
    }
  }
  public get getTypingData(): Typing {
    return this._getTypingData;
  }

  /** This property is used to get sender Details */
  @Input() public set getSenderDetails(v: NewUser) {
    if (v) {
      this._getSenderDetails = v;
    }
  }
  public get getSenderDetails(): NewUser {
    return this._getSenderDetails;
  }

  /** This property is used to get conversation user */
  @Input() public set getConversationUser(v: ConversationUser[]) {
    if (v) {
      this._getConversationUser = v;
    }
  }
  public get getConversationUser(): ConversationUser[] {
    return this._getConversationUser;
  }

  /** This property is used to get new conversation user */
  @Input() public set newConversationUser(v: ConversationUser) {
    if (v) {
      this._newConversationUser = v;
      this._getConversationUser?.unshift(v)
    }
  }
  public get newConversationUser(): ConversationUser {
    return this._newConversationUser;
  }

  /** This property is used to get all the users */
  @Input() public set getAllUser(v: NewUser[]) {
    if (v)
      this._getAllUser = v;
  }
  public get getAllUser(): NewUser[] {
    return this._getAllUser;
  }

  /** This property is used to emit chat ID */
  @Output() public emitChatId: EventEmitter<string>;
  /** This property is used to emit receiver's ID */
  @Output() public emitReceiverId: EventEmitter<string>;
  /** This property is used to emit the state of new chat */
  @Output() public emitNewChatState: EventEmitter<void>;
  /** This property is used to emit the state of new chat */
  @Output() public emitIsReadData: EventEmitter<MessageRead>;
  /** This property is used to emit the type of the chat */
  @Output() public emitChatType: EventEmitter<string>;
  /** This property is use to store the text for search */
  public searchText: string;
  /** This property is use to store the chat ID */
  public chatId: string;
  /** This property is use to store the user ID */
  public userId: string;
  /** This property is use to store typing data as per subject */
  public showTyping: Subject<boolean>;
  /** This property is use to store the new message */
  public showNewMessage: Subject<boolean>;
  /** This property is use to store ID of typing */
  public typingId: string[];
  /** This property is used to store boolean data for */
  public typingStatus: boolean;
  // This property is used to reset form
  public resetSearch: FormGroup;
  /** This property is used for toggle feature to search user */
  @ViewChild('toggle') public toggle: any;
  /** This variable will store the destroy */
  public destroy: Subject<void>;
  /** This variable will store the tab count */
  public tabCount: boolean;
  /** This variable will store the group notification count */
  public groupNotificationCount: number;
  /** This variable will store the chat notification count */
  public chatNotificationCount: number;
  private _newConversationUser: ConversationUser;
  private _getConversationUser: ConversationUser[];
  private _getAllUser: NewUser[];
  private _getTypingData: Typing;
  private _getSenderDetails: NewUser;
  private _getGroupDetails: Group[];

  constructor(
    private _service: ChatListPresenterService,
    private _cdr: ChangeDetectorRef,
    private _route: Router,
  ) {
    this.emitChatId = new EventEmitter();
    this.emitReceiverId = new EventEmitter();
    this.emitNewChatState = new EventEmitter();
    this.emitIsReadData = new EventEmitter();
    this.emitChatType = new EventEmitter();
    this.destroy = new Subject();
    this.showNewMessage = new Subject();
    this._newConversationUser = {} as ConversationUser;
    this._getAllUser = [];
    this._getConversationUser = [];
    this.typingId = [];
    this.typingStatus = false;
    this.searchText = '';
    this.chatId = '';
    this.resetSearch = this._service.getGroup();
    this.tabCount = true;
    this.groupNotificationCount = 0;
    this.chatNotificationCount = 0;
  }

  ngOnInit(): void {
    this.props();
  }

  /**
   * @name props
   * @description This method is use to call in ngOnInit
   */
  public props(): void {
    this._service.newConversationUser$.pipe(takeUntil(this.destroy)).subscribe((user: ConversationUser) => this.getConversationUser.unshift(user))
    this._service.isReadData$.pipe(takeUntil(this.destroy)).subscribe((data: MessageRead) => this.emitIsReadData.emit(data))
    this.resetSearch.valueChanges.subscribe((data) => this.searchText = data.search);
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
      this.emitChatType.emit('dm');
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
  public onUser(data: any): void {
    this.chatId = data.chatId;
    this.emitChatId.emit(data.chatId);
    this.emitChatType.emit(data.type);
    this.emitReceiverId.emit(data._id);
    if (data.notificationCount !== 0 && data.type === 'dm')
      this._service.getIsReadData(data);
    this.userId = data._id;
    if (data.type === 'dm') {
      if (data.notificationCount > 0)
        this.notificationCount.chat = this.notificationCount.chat - 1
      let id = this.getConversationUser.findIndex((user: ConversationUser) => user === data);
      this.getConversationUser[id].notificationCount = 0;
      this.removeNonConversationUser();
    } else {
      if (data.notificationCount > 0)
        this.notificationCount.group = this.notificationCount.group - 1
      let id = this.getGroupDetails.findIndex((user: Group) => user === data);
      this.getGroupDetails[id].notificationCount = 0;
    }
  }

  /**
   * @name removeNonConversationUser
   * @description This method will remove the user which has not yet started any conversation
   */
  public removeNonConversationUser() {
    let removeUser = this.getConversationUser.filter((user: ConversationUser) => user.chatId === '')
    if (removeUser) {
      /** To remove the users which has not started the conversations  */
      removeUser.forEach((user: ConversationUser) => {
        let id = this.getConversationUser.findIndex((data: ConversationUser) => data === user)
        this.getConversationUser.splice(id, 1)
      })
    }
  }

  /**
   * @name convertPhoto
   * @param profileImg 
   * @returns image url
   * @description This method is use to convert the link into source link
   */
  public convertPhoto(profileImg: string): string {
    let converter = 'http://172.16.3.107:2132/img/user/' + profileImg;
    // let converter = 'https://onechat-jj9m.onrender.com/img/user/' + profileImg;
    return profileImg ? converter : '../../../../../../assets/images/avatar.png';
  }

  /**
   * @name receivingTyping
   * @param sender gets the sender Id
   * @description This method is used for the displaying the typing feature
   */
  public receivingTyping(sender: string): void {
    if (!this.typingId.includes(sender)) {
      this.typingId.push(sender)
    }
    this.typingStatus = true;
    setTimeout(() => {
      this.typingId = [];
      this.typingStatus = false;
      this._cdr.detectChanges();
    }, 3000);

  }

 /**
   * @name onLogOut
   * @description This method is use to logout the user
   */
 public onLogOut(): void {
  this._route.navigateByUrl('/login');
  localStorage.clear();
}
  /**
   * @name checkOnline
   * @param id 
   * @description This method will show if the user is online or not
   */
  public checkOnline(id: string): boolean {
    if (this.getOnlineUsers) {
      let isOnline = this.getOnlineUsers.find((data: Alive) => data.userId === id)
      return isOnline ? true : false;
    } else
      return false;
  }

  /**
   * @name onTab
   * @description This method is used to switch tab between chat and group chat
   */
  public onTab(): void {
    this.tabCount ? this.tabCount = false : this.tabCount = true;
    this.removeNonConversationUser();
  }

  /**
   * @name resetSearchForm
   * @description This method will reset search form
   */
  public resetSearchForm(): void {
    this.setFocus()
    setTimeout(() => {
      this.resetSearch.reset();
      this.searchText = ''
    }, 1000);
    
  }

  /**
 * @description This method set focus default
 */
 public setFocus():void {
  this.inputType.nativeElement.focus();
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
