import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { ConversationUsers, OnlineUser, Typing } from '../../models/chat.model';
import { ChatListPresenterService } from '../Chat-list-presenter/chat-list-presenter.service';
import { BehaviorSubject } from 'rxjs';
import { login } from '../../models/login.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-chat-list-presentation-ui',
  templateUrl: './chat-list-presentation.component.html',
  viewProviders: [ChatListPresenterService],
})
export class ChatListPresentationComponent implements OnInit {

  /** This element is for toggle search */
  @ViewChild('toggle') public toggle: ElementRef;


  /** This property will get the conversation users from the container */
  @Input() public set getConversationUsers(users: ConversationUsers[]) {
    if (users) {
      this._getConversationUsers = users;
      this._chatListPresenterService.getConversationUsers(users);
    }
  }
  public get getConversationUsers(): ConversationUsers[] {
    return this._getConversationUsers;
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
  /** This variable will store the data of the current tab */
  public tabData: boolean;
  /**This properties are used for store conversationUsers */
  public conversationUsers: ConversationUsers[];
  /** This variable will store all the chat Ids of conversation users */
  public allChatIds: string[];
  /** This variable will store copy of all the conversation users */
  public copyOfConversationUsers: ConversationUsers[];
  /** variable for name of the types in group chat */
  public groupTyperNames: string[];
  /** variable for all typing Ids */
  public typingIds: string[];
  public loginUserObject: login;
// subject

    /** Flag for showing typing text */
    public showTypingText: BehaviorSubject<boolean>;


  /** This property is used for getter setter */
  private _getConversationUsers: ConversationUsers[];
  private _onlineUsers: OnlineUser[];
  private _typingInfo: Typing;
  constructor(private _commonService: CommonService,
    private _chatListPresenterService: ChatListPresenterService,
    private _router: Router
  ) {
    this.tabData = true;
    this.groupTyperNames = [];
    this.typingIds = [];
    // subject   
    this.showTypingText = new BehaviorSubject(false);
    this.loginUserObject = this._commonService.getLoginDetails();


  }
  ngOnInit(): void {
    this.props()
  }

  /**
  * @name props
  * @description This method will be invoked on ngOnInit
  */
  private props(): void {
    this._chatListPresenterService.conversationUser$.subscribe((users: ConversationUsers[]) => {
      if (users) {
        this.conversationUsers = users
        this.copyOfConversationUsers = [...users];
        this.allChatIds = users.map((user: ConversationUsers) => user.chatId);
        if (this.tabData) this.onTabSwitch(true);
        else this.onTabSwitch(false);
      }
    })

  }

  /**
* @name onSearchUser
* @description This method is used to show Aside bar
*/
  public openAsideBar() {
    this.toggle.nativeElement.checked ? this.toggle.nativeElement.checked = false : this.toggle.nativeElement.checked = true;
    const data = this.toggle.nativeElement.checked;
    this._commonService.userApiCall.next(data)
  }

  /**
   * @name closeAsideBar
   * @name boolean
   * @description This method close aside bar click on single user in list of user
   */
  public closeAsideBar(boolean: boolean) {
    this.toggle.nativeElement.checked = boolean
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
    this.conversationUsers = this.copyOfConversationUsers.filter((users: ConversationUsers) => data ? users.chat_type === 'dm' && !this.isEmptyString(users.standardTime) : users.chat_type === 'group' && !this.isEmptyString(users.standardTime));
    const clearedConversationUsers = this.copyOfConversationUsers.filter((users: ConversationUsers) => data ? users.chat_type === 'dm' && this.isEmptyString(users.standardTime) : users.chat_type === 'group' && this.isEmptyString(users.standardTime));
    const sortbyTime = (a, b) => {
      const timestampA = a.time.getTime();
      const timestampB = b.time.getTime();
      return timestampB - timestampA;
    };
    this.conversationUsers.sort(sortbyTime);
    this.conversationUsers = this.conversationUsers.concat(clearedConversationUsers)
  }



  /**
   * @name getConversation
   * @param conversation 
   * @description  this method Create new conversation
   */
  public getConversation(conversation: any) {
    // this.conversationUser = conversation
    console.log(conversation);

  }
  /**
 * @name onUser
 * @param user 
 * @description This method is used to display the chats of the selected user
 */
  public onUser(user: ConversationUsers) {
    console.log(user);
    this._router.navigate(['1Chat/', user.chatId]);
    // this.checkNonConversationUsers();
    // this.currentChatId = user.chatId;
    // this._ChatListPresenterService.getCurrentConversation(user, this.userId);
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
}
