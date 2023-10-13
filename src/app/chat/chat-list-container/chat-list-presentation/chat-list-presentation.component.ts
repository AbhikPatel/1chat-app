import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { ConversationUsers, OnlineUser, Typing } from '../../models/chat.model';
import { ChatListPresenterService } from '../Chat-list-presenter/chat-list-presenter.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { login } from '../../models/login.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/shared/models/user.model';
import { CommunicationService } from '../../shared/communication/communication.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Login } from 'src/app/core/models/login.model';
import { MessageResponse } from '../../models/message.model';


@Component({
  selector: 'app-chat-list-presentation-ui',
  templateUrl: './chat-list-presentation.component.html',
  viewProviders: [ChatListPresenterService],
})
export class ChatListPresentationComponent implements OnInit {

  /** This element is for toggle search */
  @ViewChild('toggle') public toggle: ElementRef;
  /** This property will get only one to one conversation users */
  @Input() public set conversationUsers(users: ConversationUsers[]) {
    if (users) {
      console.log(users);
      
      this._chatListPresenterService.getConversationUsers(users)
      this.copyOfConversationUsers = [...users];
      let selectedConversation = users
      let findConversation: ConversationUsers = selectedConversation.find((user: ConversationUsers) => user.chatId === this.currentChatId);
      this.onUser(findConversation);
      this.allChatIds = users.map((user: ConversationUsers) => user.chatId);
      this.onTabSwitch(true);
    }
  }
  public get conversationUsers(): ConversationUsers[] {
    return this._conversationUsers;
  }
  /** This property is used to get all the online users details from container component */
  @Input() public set onlineUsers(users: OnlineUser[]) {
    if (users) {
      this._onlineUsers = users;
    }
  }
  public get onlineUsers(): OnlineUser[] {
    return this._onlineUsers;
  }

    // Getter Setter for direct message
    @Input() public set listenMessage(message: any) {
      if (message) {
        this._listenDirectMessage = message;
        console.log(message);
        const index= this._conversationUsers.findIndex((data:ConversationUsers)=> data.chatId === this._listenDirectMessage.chatId)
        this._conversationUsers[index].lastMessage=this._listenDirectMessage.body
      }
    }
    public get listenEditMessage(): MessageResponse {
      return this._listenDirectMessage;
    }
    // Getter Setter for direct message
    @Input() public set listenEditMessage(message: any) {
      if (message) {
        this.listenEditMessage = message;
        console.log(message);
        const index= this._conversationUsers.findIndex((data:ConversationUsers)=> data.chatId === this._listenDirectMessage.chatId)
        this._conversationUsers[index].lastMessage=this._listenDirectMessage.body
      }
    }
    public get listenDirectMessage(): MessageResponse {
      return this._listenDirectMessage;
    }
  /** This property is used to get typing info from container component */
  @Input() public set typingInfo(typing: Typing) {
    if (typing) {
      this._typingInfo = typing;
      this.showTyping(typing);
    }
  }
  public get typingInfo(): Typing {
    return this._typingInfo;
  }
  /** This property is used to get all the user details from container component */
  @Input() public set getAllUsers(users: User[]) {
    if (users) {
      this._chatListPresenterService.getAllUsers(users)
      this._getAllUsers = users;
    }
  }
  public get getAllUsers(): User[] {
    return this._getAllUsers
  }
  // Getter Setter for direct message
  // @Input() public set listenDirectMessage(message: MessageResponse) {
  //   if (message) {
  //     this._listenDirectMessage = message;
  //     this.allMessagesObject = { ...this.allMessagesObject, [message._id]: message }
  //     this.allMessagesKeys = Object.keys(this.allMessagesObject);
  //   }
  // }
  // public get listenDirectMessage(): MessageResponse {
  //   return this._listenDirectMessage;
  // }
  /** This variable will store the data of the current tab */
  public tabData: boolean;
  /** This variable will store all the chat Ids of conversation users */
  public allChatIds: string[];
  /** This variable will store copy of all the conversation users */
  public copyOfConversationUsers: ConversationUsers[];
  /** This variable will store copy of all the conversation users */
  public newConversationUsers: ConversationUsers;
  /** variable for name of the types in group chat */
  public groupTyperNames: string[];
  /** variable for all typing Ids */
  public typingIds: string[];
  /** This variable will store the current chat Id */
  public currentChatId: string | null;
  public loginUserObject: login;
  public selectedConversation: any;
  //  This variable is use to show loader  
  public isLoading: any;
  public allUsersApiCall: boolean
  // subject
  /** Flag for showing typing text */
  public showTypingText: BehaviorSubject<boolean>;
  /** This property is used for getter setter */
  private _conversationUsers: ConversationUsers[];
  private _onlineUsers: OnlineUser[];
  private _typingInfo: Typing;
  private _getAllUsers: User[];
  private _listenDirectMessage: MessageResponse;
  // private _getAllUsers: User[];
  constructor(
    private _commonService: CommonService,
    private _chatListPresenterService: ChatListPresenterService,
    private _router: Router,
    private _communicationService: CommunicationService,
    private _loaderService: LoaderService
  ) {
    this.tabData = true;
    this.groupTyperNames = [];
    this.typingIds = [];
    this.copyOfConversationUsers = [];
    // subject   
    this.showTypingText = new BehaviorSubject(false);
    this.loginUserObject = this._commonService.getLoginDetails();

  }
  ngOnInit(): void {
    this.props();
  }
  
  /**
   * @name props
   * @description This method will be invoked on ngOnInit
  */
 private props(): void {
   this.isLoading = this._loaderService.getLoaderState();
    this.onTabSwitch(true);

    this._chatListPresenterService.newConversation$.subscribe((user: ConversationUsers) => {
         this.newConversationUsers = user
         this._conversationUsers.unshift(user);
         this.currentChatId = user.chatId;
    });
    const storedConversation = localStorage.getItem('ConversationUsers');
    if (storedConversation) {
      this.currentChatId = JSON.parse(storedConversation);
    }
    this._communicationService.setLastMessageInConversation$.subscribe((lastMessageObj: any) => {
    const index= this._conversationUsers.findIndex((data:ConversationUsers)=> data.chatId ===lastMessageObj.chatId)
       this._conversationUsers[index].lastMessage=lastMessageObj.lastMessage
    })
  }
  /**
* @name onSearchUser
* @description This method is used to show Aside bar
*/
  public openNewConversationModel() {
    this.toggle.nativeElement.checked ? this.toggle.nativeElement.checked = false : this.toggle.nativeElement.checked = true;
    this.allUsersApiCall = this.toggle.nativeElement.checked;
    this._commonService.userApiCall.next(this.allUsersApiCall)
  }

  /**
   * @name closeAsideBar
   * @name boolean
   * @description This method close aside bar click on single user in list of user
   */
  public closeAsideBar(boolean: boolean) {
    this.toggle.nativeElement.checked = boolean
    this.allUsersApiCall = this.toggle.nativeElement.checked=false
  }

  /**
     * @name isEmptyString
     * @param str 
     * @description method is used for checking whether string empty or not
     * @returns method return boolean value
     */
  private isEmptyString(str: String) {
    return str.trim().length === 0;
  }

  /**
   * @name onTabSwitch
   * @param boolean 
   * @description This method is used to show the chats which depend on the data
   */
  public onTabSwitch(data: boolean): void {
    this.tabData = data;
    this._conversationUsers = this.copyOfConversationUsers.filter((users: ConversationUsers) => data ? users.chat_type === 'dm' && !this.isEmptyString(users.standardTime) : users.chat_type === 'group' && !this.isEmptyString(users.standardTime));
    const clearedConversationUsers = this.copyOfConversationUsers.filter((users: ConversationUsers) => data ? users.chat_type === 'dm' && this.isEmptyString(users.standardTime) : users.chat_type === 'group' && this.isEmptyString(users.standardTime));
    const sortbyTime = (a, b) => {
      const timestampA = a.time.getTime();
      const timestampB = b.time.getTime();
      return timestampB - timestampA;
    };
    this._conversationUsers.sort(sortbyTime);
    this._conversationUsers = this.conversationUsers.concat(clearedConversationUsers)
  }
  /**
   * @name newConversation
   * @param conversation 
   * @description  this method Create new conversation
   */
  public newConversation(newConversation: User) {
    const chatIdArr = this.conversationUsers.map((user: ConversationUsers) => user.chatId);
    const resultArr = newConversation.chats.reduce((acc, sub) => {
      if (chatIdArr.includes(sub)) {
        acc.push(sub)
      }
      return acc
    }, []);
    if (resultArr.length === 0) {
      this._router.navigate(['chat/', 'draft']);
      this._chatListPresenterService.createNewConversation(newConversation);
      this._communicationService.setHeaderDetails(this.newConversationUsers);
    }
    else {
      var findConversation: ConversationUsers = this.conversationUsers.find((user: ConversationUsers) => user.chatId === resultArr[0]);
      this.onUser(findConversation);
    }
  }
  /**
 * @name onUser
 * @param user 
 * @description This method is used to display the chats of the selected user
 */
  public onUser(user: any) {
    this._commonService.notificationCount.next(user?.notificationCount);
    if (user && user.chatId) {
      localStorage.setItem('receiverId', user.receiver)
      this._commonService.receiverId.next(user.sender);
      const TabData = localStorage.getItem('TabData');
      if (TabData) {
        this._router.navigate(['chat', user.chatId, 'eod']);
        this._communicationService.tabData.next(false);
      } else {
        this._router.navigate(['chat', user.chatId]);
      }
      this._communicationService.tabDataApi.next(true);
      this._communicationService.setHeaderDetails(user);
      this.currentChatId = user.chatId;
      localStorage.setItem('ConversationUsers', JSON.stringify(user.chatId));
    }

  }
  // this.checkNonConversationUsers();
  // this._ChatListPresenterService.getCurrentConversation(user, this.userId);
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
    * @name showTyping
    * @param sender 
    * @description This method will show the typing effect.
    */
  public showTyping(typingData: Typing): void {
    if (typingData.isGroup) {
      if (!this.groupTyperNames.includes(typingData.typerName))
        this.groupTyperNames.push(typingData.typerName);
      setTimeout(() => {
        let id = this.groupTyperNames.indexOf(typingData.typerName);
        this.groupTyperNames.splice(id, 1);
      }, 2000);
    } else {
      if (!this.typingIds.includes(typingData.sender))
        this.typingIds.push(typingData.sender)
      this.showTypingText.next(true);
      setTimeout(() => {
        this.typingIds = [];
        this.showTypingText.next(false);
      }, 2000);
    }
  }
  public ngAfterViewInit(): void {

  }
}
