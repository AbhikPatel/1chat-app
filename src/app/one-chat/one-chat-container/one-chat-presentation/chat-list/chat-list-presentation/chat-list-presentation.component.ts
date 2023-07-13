import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';

import { ConversationUsers, GroupDetails, MessageRead, OnlineUser } from 'src/app/one-chat/models/chat.model';
import { User } from 'src/app/shared/models/user.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { OneChatPresentationBase } from '../../../one-chat-presentation-base/one-chat-presentation.base';
import { ChatListPresenterService } from '../chat-list-presenter/chat-list-presenter.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-chat-list-presentation',
  templateUrl: './chat-list-presentation.component.html',
  viewProviders: [ChatListPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatListPresentationComponent extends OneChatPresentationBase implements OnInit, OnDestroy {

  /** This element is for toggle search */
  @ViewChild('toggle') public toggle: ElementRef;
  /** This element is for focus of input box */
  @ViewChild('inputTypeFocus') public inputTypeFocus: ElementRef;

  /** This property is used to get all the user details from container component */
  @Input() public set allUsers(users: User[]) {
    if (users) {
      this.senderDetails = users.find((user: User) => user._id === this.userId);
      let senderIndex = users.indexOf(this.senderDetails);
      users.splice(senderIndex, 1);
      this._allUsers = this.userRole === 'intern' ? users.filter((user: User) => user.role !== 'intern') : users;
    }
  }

  public get allUsers(): User[] {
    return this._allUsers;
  }
  
  /** This property will get only one to one conversation users */
  @Input() public set conversationUsers(users: ConversationUsers[]) {
    if (users) {
      this.copyOfConversationUsers = [...users];
      this.allChatIds = users.map((user: ConversationUsers) => user.chatId);
      if (this.tabFlag) {
        this.tabFlag = false;
        this.onTabSwitch(true);
      }
    }
  }
  public get conversationUsers(): ConversationUsers[] {
    return this._conversationUsers;
  }

  /** This property is used to emit the current conversation user */
  @Output() public currectConversation: EventEmitter<ConversationUsers>

  /** This variable will store the search text */
  public searchText: any;
  /** This variable is formGroup for search users */
  public searchGroup: FormGroup;
  /** This variable will store the data of the current tab */
  public tabData: boolean;
  /** Flag for checking once */
  public tabFlag: boolean;
  /** This variable will store the full name of the sender */
  public senderFullName: string;
  /** This variable will store the current chat Id */
  public currentChatId: string;
  /** This variable will store the details of the sender */
  public senderDetails: User;
  /** This variable will store copy of all the conversation users */
  public copyOfConversationUsers: ConversationUsers[];
  /** This variable will store all the chat Ids of conversation users */
  public allChatIds: string[];
  /** This variable will store id of the user */
  public userId: string;
  /** This variable will store role of the user */
  public userRole: string;
  /** Flag for showing model */
  public showModel: boolean;

  /**This properties are used for getter setter */
  private _conversationUsers: ConversationUsers[];
  private _allUsers: User[];
  /** Stops the subscription on ngOnDestory */
  private destroy: Subject<void>;

  constructor(
    private _ChatListPresenterService: ChatListPresenterService,
    private _commonService: CommonService,
    private _cdr:ChangeDetectorRef
  ) {
    super();
    this.searchGroup = this._ChatListPresenterService.getGroup();
    this.showModel = false;
    this.tabData = true;
    this.tabFlag = true;
    this.currectConversation = new EventEmitter();
    this.userRole = this._commonService.getUserRole();
    this.userId = this._commonService.getUserId();
    this.senderDetails = {} as User;
    this.allChatIds = [];
    this.copyOfConversationUsers = [];
    this._conversationUsers = [];
    this.destroy = new Subject(); 
  }

  ngOnInit(): void {
    this.props();
  }

  /**
   * @name props
   * @description This method is called in ngOnInit
   */
  private props() {
    this._ChatListPresenterService.currentConversationUser$.pipe(takeUntil(this.destroy)).subscribe((user: ConversationUsers) => this.currectConversation.emit(user));
    this._ChatListPresenterService.messageRead$.pipe(takeUntil(this.destroy)).subscribe((messages: MessageRead) => this.readedMessages.emit(messages));
    this._ChatListPresenterService.newConversation$.pipe(takeUntil(this.destroy)).subscribe((user: ConversationUsers) => {
      this._conversationUsers.unshift(user);
      this.currentChatId = user.chatId;
    });
    this._commonService.notificationData$.subscribe(val => this.onUser(val))
    this._ChatListPresenterService.newGroupData$.pipe(takeUntil(this.destroy)).subscribe((groupDetails:GroupDetails) => this.newGroupDetails.emit(groupDetails))
  }

  /**
   * @name onNewChat
   * @param user 
   * @description This method is called to start a new dm conversation
   */
  public onNewChat(user: User) {
    const chatIdArr = this.conversationUsers.map((user: ConversationUsers) => user.chatId);
    const resultArr = user.chats.reduce((acc, sub) => {
      if (chatIdArr.includes(sub)) {
        acc.push(sub)
      }
      return acc
    }, []);
    if (resultArr.length === 0) {
      this._ChatListPresenterService.createNewConversation(user);
    } else {
      let findConversation: ConversationUsers = this.conversationUsers.find((user: ConversationUsers) => user.chatId === resultArr[0]);
      this.onUser(findConversation);
    }
    this.toggle.nativeElement.checked = false;
  }

  /**
   * @name onUser
   * @param user 
   * @description This method is used to display the chats of the selected user
   */
  public onUser(user: ConversationUsers): void {
    this.checkNonConversationUsers();
    this.currentChatId = user.chatId;
    this._ChatListPresenterService.getCurrentConversation(user, this.userId);
  }

  /**
   * @name checkNonConversationUsers
   * @description This method is called to check if there is a non conversation chat in the list 
   */
  public checkNonConversationUsers(): void {
    let nonConversationUser: number[] = [];
    this.copyOfConversationUsers.forEach((user: ConversationUsers) => {
      if (!this.allChatIds.includes(user.chatId))
        nonConversationUser.push(this.conversationUsers.indexOf(user));
    });

    setTimeout(() => {
      this.conversationUsers = this.copyOfConversationUsers.filter((user: ConversationUsers, index: number) => !nonConversationUser.includes(index));
    }, 500);
  }

  /**
   * @name onTabSwitch
   * @param data 
   * @description This method is used to show the chats which depend on the data
   */
  public onTabSwitch(data: boolean): void {
    this.tabData = data;
    this._conversationUsers = this.copyOfConversationUsers.filter((users: ConversationUsers) => data ? users.chat_type === 'dm' : users.chat_type === 'group');
    const sortbyTime = (a, b) => {
      const timestampA = a.time.getTime();
      const timestampB = b.time.getTime();
      return timestampB - timestampA;
    };
    this._conversationUsers.sort(sortbyTime);
  }

  /**
   * @name checkIfOnline
   * @param id 
   * @description This method is used to check if the user is online or not
   */
  public checkIfOnline(id: string): boolean {
    let allOnlineUsers: any = this.onlineUsers.map((user: OnlineUser) => user.userId);
    return allOnlineUsers.includes(id);
  }

  /**
   * @name onNewConversation
   * @description This method will open a model to start any new conversation
   */
  public onNewConversation(): void {
    this.showModel ? this.showModel = false : this.showModel = true;
  }

  /**
   * @name onSearchUser
   * @description This method is used to show modal
   */
  public onSearchUser(): void {
    this.toggle.nativeElement.checked ? this.toggle.nativeElement.checked = false : this.toggle.nativeElement.checked = true
    this.showModel = false;
    this.setFocusInputBox();
    setTimeout(() => {
      this.searchGroup.reset();
      this.searchText = ''
    }, 0);
  }

  /**
   * @name onNewGroup
   * @description This method is used to open overlay for create group form
   */
  public onNewGroup(): void {
    let userDetails: any[] = this.allUsers.map((user: User) => ({
      id: user._id,
      full_name: `${user.full_name} (${user.role})`,
    }))
    this._ChatListPresenterService.openCreateGroupForm(userDetails);
  }
  /**
  * @description This method set focus default
  */
  public setFocusInputBox(): void {
    this.inputTypeFocus.nativeElement.focus();
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
