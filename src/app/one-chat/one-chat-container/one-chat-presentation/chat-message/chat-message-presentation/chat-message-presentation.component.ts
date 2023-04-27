import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Alive, GroupDetails, Member, NewMessage, Typing } from 'src/app/one-chat/models/chat.model';
import { NewUser } from 'src/app/shared/models/user.model';
import { ChatMessagePresenterService } from '../chat-message-presenter/chat-message-presenter.service';

@Component({
  selector: 'app-chat-message-presentation',
  templateUrl: './chat-message-presentation.component.html',
  viewProviders: [ChatMessagePresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessagePresentationComponent implements OnInit, AfterViewInit {

  @ViewChild('messageContainer') messageContainerRef: ElementRef;

  // This property is used to get online users
  @Input() public set getGroupDetails(v: GroupDetails) {
    if (v) {
      this._getGroupDetails = v;
      this.count = 2;
      this.getGroupMembers(v.members)
    }
  }
  public get getGroupDetails(): GroupDetails {
    return this._getGroupDetails;
  }

  @Input() public set getOnlineUsers(v: Alive[]) {
    if (v) {
      this._getOnlineUsers = v;
      this.checkOnline();
    }
  }
  public get getOnlineUsers(): Alive[] {
    return this._getOnlineUsers;
  }
  // This property is used to get sender Details
  @Input() public set getTypingData(v: Typing) {
    if (v) {
      this._getTypingData = v;
      this.receivingTyping(v.sender);
    }
  }
  public get getTypingData(): Typing {
    return this._getTypingData;
  }

  // This property is use to get the array of chats
  @Input() public set getChat(v: NewMessage[]) {
    if (v) {
      this._getChat = v;
      this.chatGroup.setValue({ message: '' });
      setTimeout(() => {
        this.scrollUp();
      }, 0);
    }
  }
  public get getChat(): NewMessage[] {
    return this._getChat;
  }

  // This property is use to get the details of the receiver
  @Input() public set getReceiverData(v: NewUser) {
    if (v) {
      this._getReceiverData = v;
      this.checkOnline();
      this.count = 1;
    }
  }
  public get getReceiverData(): NewUser {
    return this._getReceiverData;
  }

  // This property is use to emit the chat
  @Output() public emitChat: EventEmitter<string>;
  // This property is use to emit the sender Id
  @Output() public emitSenderId: EventEmitter<string>;
  // This property is use to emit the chat
  public destroy: Subject<void>;
  // This property is to create a FormGroup
  public chatGroup: FormGroup;
  // This property is to store the sender ID
  public senderId: string | null;
  // This property is to store array of chats
  private _getChat: NewMessage[] | null;
  // This property is to store the details of the receiver
  private _getReceiverData: NewUser;
  public _getTypingData: Typing;
  public showTyping: Subject<boolean>;
  private _getOnlineUsers: Alive[];
  public showStatus: Alive;
  public isScrolledToBottom: boolean;
  private _getGroupDetails: GroupDetails;
  public count: number;
  public groupMembers: string;
  public senderName:string;

  constructor(
    private _service: ChatMessagePresenterService,
    private _route: Router,
  ) {
    this.chatGroup = this._service.getGroup();
    this.emitChat = new EventEmitter();
    this.emitSenderId = new EventEmitter();
    this.destroy = new Subject();
    this._getReceiverData = {} as NewUser;
    this._getChat = [];
    this.showTyping = new Subject();
    this.senderId = localStorage.getItem('userId');
    this.isScrolledToBottom = true;
    this.count = 0;
    this.groupMembers = '';
  }

  ngAfterViewInit(): void {
    this.scrollUp();
  }
  /**
   * @name onMessageScroll
   * @param container
   * @description Down arrow icon show and hide as per scroll
   */
  public onMessageScroll(container: any): void {
    //  this.isScrolledToBottom = container.scrollTop < container.scrollHeight- container.clientHeight
    const messageContainer = this.messageContainerRef.nativeElement;
    const scrollHeight = messageContainer.scrollHeight;
    let scrollTop = messageContainer.scrollTop;
    const clientHeight = messageContainer.clientHeight;
    const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;
    this.isScrolledToBottom = isScrolledToBottom;
  }

  ngOnInit(): void {
    this.props();
  }

  /**
   * @name props
   * @description This method is called in ngOnInit
   */
  public props(): void {
    this.chatGroup.valueChanges.subscribe((data: string) =>
      this.emitSenderId.emit(this.senderId)
    );
  }

  /**
   * @name onSubmit
   * @description This method is use to submit the form
   */
  public onSubmit(): void {
    if (this.chatGroup.valid) {
      this.emitChat.emit(this.chatGroup.value.message);
      this.scrollUp();
      this.chatGroup.reset();
    }
  }

  /**
   * @name convertPhoto
   * @param profileImg
   * @returns image url
   * @description This method is use to convert the link into source link
   */
  public convertPhoto(profileImg?: string): string {
    let converter = 'http://172.16.3.107:2132/img/user/' + profileImg;
    // let converter = 'https://anonychat.onrender.com/img/users/' + profileImg;
    return profileImg ? converter : '../../../../../../assets/images/avatar.png';
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
   * @name receivingTyping
   * @param sender gets the sender Id
   * @description This method is used for the displaying the typing feature
   */
  public receivingTyping(sender: string): void {
    if (sender === this.getReceiverData._id) {
      this.showTyping.next(true);
      setTimeout(() => {
        this.showTyping.next(false);
      }, 3000);
    }
  }

  /**
   * @name scrollUp
   * @description Click arrow down icon got to up message
   */
  public scrollUp(): void {
    setTimeout(() => {
      this.messageContainerRef.nativeElement.scrollTo(
        0,
        this.messageContainerRef.nativeElement.scrollHeight
      );
    }, 0);
  }

  /**
   * @name checkOnline
   * @description THis method will show the status of the user
   */
  public checkOnline(): void {
    if (this.getOnlineUsers)
      this.showStatus = this.getOnlineUsers.find((data: Alive) => data.userId === this.getReceiverData._id)
  }

  public displayTime() {
  }

  public getGroupMembers(members:Member[]): void{
    this.groupMembers = members.map((data:Member) => data.full_name).join(', ')
  }

  public getSenderName(id:string):string{
    return this.getGroupDetails.members.find((data:Member) => data._id === id).full_name;
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
