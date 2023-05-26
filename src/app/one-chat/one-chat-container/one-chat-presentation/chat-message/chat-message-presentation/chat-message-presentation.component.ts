import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Alive, GroupDetails, Member, NewMessage, Typing } from 'src/app/one-chat/models/chat.model';
import { NewUser } from 'src/app/shared/models/user.model';
import { OneChatPresentationBase } from '../../../one-chat-presentation-base/one-chat-presentation.base';
import { ChatMessagePresenterService } from '../chat-message-presenter/chat-message-presenter.service';

@Component({
  selector: 'app-chat-message-presentation',
  templateUrl: './chat-message-presentation.component.html',
  viewProviders: [ChatMessagePresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessagePresentationComponent extends OneChatPresentationBase implements OnInit, AfterViewInit {

  @HostListener('document:click', ['$event'])
  onClickEvent(event: MouseEvent) {
    if (event.target['id'] !== 'downArrow') {
      this.ToggleModel = false
    }
  }
  @ViewChild('myInput') myInput: ElementRef;
  @ViewChild('messageContainer') messageContainerRef: ElementRef;
  @ViewChild('popupElement') popupElement: ElementRef;
  @ViewChild('span') span: ElementRef;
  @ViewChild('ReplyWrapper') replyWrapper: ElementRef;

  /** This property is used to get online users */
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

  /** This property is used to get online users */
  @Input() public set getOnlineUsers(v: Alive[]) {
    if (v) {
      this._getOnlineUsers = v;
      this.checkOnline();
    }
  }
  public get getOnlineUsers(): Alive[] {
    return this._getOnlineUsers;
  }

  /** This property is used to get sender Details */
  @Input() public set getTypingData(v: Typing) {
    if (v) {
      this._getTypingData = v;
      v.isGroup ? this.getGroupTyping(v) : this.receivingTyping(v.sender);
    }
  }
  public get getTypingData(): Typing {
    return this._getTypingData;
  }

  /** This property is use to get the array of chats */
  @Input() public set getChat(v: NewMessage[]) {
    if (v) {
      this._getChat = v;
      this.chatGroup.setValue({ message: '' });
      this.setFocus();
      setTimeout(() => {
        this.scrollUp();
      }, 0);
    }
  }
  public get getChat(): NewMessage[] {
    return this._getChat;
  }

  /** This property is use to get the details of the receiver */
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
  /** This property is use to emit the chat */
  @Output() public emitChat: EventEmitter<string>;
  /** This property is use to emit Edit Message */
  @Output() public emitChatMessage: EventEmitter<string>;
  /** This property is use to emit the sender Id */
  @Output() public emitSenderId: EventEmitter<string>;
  // This property is use to emit the emitMessageId
  @Output() public emitEditMessageData: EventEmitter<NewMessage>;
  @Output() public emitReplyMessageData: EventEmitter<NewMessage>;
  @Output() public emitReplyMessageDataPush: EventEmitter<NewMessage>;
  /** This property is use to emit the chat */
  public destroy: Subject<void>;
  /** This property is to create a FormGroup */
  public chatGroup: FormGroup;
  /** This property is to create a FormGroup */
  public eodGroup: FormGroup;
  /** This property is to store the sender ID */
  public senderId: string | null;
  /** This property is to store array of chats */
  private _getChat: NewMessage[] | null;
  /** This property is to store the details of the receiver */
  public showTyping: Subject<boolean>;
  /** This property is to store status */
  public showStatus: Alive;
  /** This property is to scroll to bottom */
  public isScrolledToBottom: boolean;
  public showEmojiPicker: boolean;
  public message: string;
  public closeIcon: string;
  public cancelEdit: string;
  public openBox: string;
  public isIdApplied: boolean;
  public id: number;
  public ToggleModel: boolean;
  /** This property is to store the count */
  public count: number;
  /** This property is to store the members of the group */
  public groupMembers: string;
  /** This property is to store the sender name */
  public senderName: string;
  /** This property is to store the typer name */
  public typerNames: string[];
  public _getTypingData: Typing;
  private _getOnlineUsers: Alive[];
  private _getGroupDetails: GroupDetails;
  private _getReceiverData: NewUser;
  public chatMessageId: string;
  public editDataObject: NewMessage;
  public replyMessageData: NewMessage;
  public replyObjectId: any;
  public replyObjectIds: any;
  public allTasks: any[];
  public showTasks: boolean;
  public formValue: any;

  constructor(
    private _service: ChatMessagePresenterService,
    private _route: Router,
    private _fb: FormBuilder
  ) {
    super()
    this.senderId = localStorage.getItem('userId');
    this.chatGroup = this._service.getGroup();
    this.eodGroup = this._service.getEodGroup();
    this.emitChat = new EventEmitter();
    this.emitSenderId = new EventEmitter();
    this.emitEditMessageData = new EventEmitter();
    this.emitChatMessage = new EventEmitter();
    this.emitReplyMessageData = new EventEmitter();
    this.emitReplyMessageDataPush = new EventEmitter();
    this.destroy = new Subject();
    this.showTyping = new Subject();
    this._getReceiverData = {} as NewUser;
    this._getChat = [];
    this.showTyping = new Subject();
    this.senderId = localStorage.getItem('userId');
    this.showEmojiPicker = false;
    this.closeIcon = '';
    this.cancelEdit = ''
    this.openBox = 'openBox';
    this.ToggleModel = false;
    this.typerNames = [];
    this.isScrolledToBottom = true;
    this.count = 0;
    this.groupMembers = '';
    this.chatMessageId = '';
    this.editDataObject = {} as NewMessage
    this.showTasks = false;
  }

  ngAfterViewInit(): void {
    this.scrollUp();
  }

  ngOnInit(): void {
    this.props();
  }

  /**
   * @name props
   * @description This method is called in ngOnInit
   */
  public props(): void {
    this.chatGroup.valueChanges.subscribe(() => this.emitSenderId.emit(this.senderId));
    // this.onAddTask('onGoing');
    // this.onAddTask('completed');
    // this.onAddTask('newLearning');
  }

  /**
   * @name onSubmit
   * @description This method is use to submit the form
   */
  // public onSubmit(): void {
  //   if (this.chatGroup.valid) {
  //     this.emitChat.emit(this.chatGroup.value.message);
  //     this.scrollUp();
  //     this.chatGroup.reset();
  //   }
  // }

  /**
   * @name onSubmit
   * @description This method is use to submit the form add and edit Both
  */
  public onSubmit(): void {
    if (this.chatGroup.valid) {
      if (this.chatMessageId) {
        this.editSingleMessage()
      } else if (this.replyObjectId) {
        this.replyMessages()
      }
      else {
        this.addNewMessage()
      }
    }
  }

  /**
   * @description his Method add new Message call submit method 
  */
  public addNewMessage(): void {
    this.emitChat.emit(this.chatGroup.value.message);
    this.chatGroup.reset();
    this.scrollUp();
  }
  /**
   * @description This Method Edit Message call submit method
  */
  public editSingleMessage(): void {
    this.editDataObject.content.text = this.message;
    this.editDataObject.is_edit = true;
    this.emitEditMessageData.emit(this.editDataObject);
    this.emitChatMessage.emit(this.message);
    this.chatMessageId = '';
    this.chatGroup.reset();
    this.cancelEdit = '';
    this.scrollUp();
  }
  /**
   * @description This Method reply Message call submit Method
  */
  public replyMessages() {
    this.replyMessageData.replied_to = { replied_to: this.replyObjectId, content: { text: this.replyMessageData.content.text } };
    this.replyMessageData.content.text = this.message;
    this.emitReplyMessageData.emit(this.replyMessageData);
    this.scrollUp();
    this.chatGroup.reset();
    this.replyWrapper.nativeElement.style.display = 'none';
  }

  /**
   * @name onMessageScroll
   * @param container
   * @description Down arrow icon show and hide as per scroll
   */
  public onMessageScroll(): void {
    const messageContainer = this.messageContainerRef.nativeElement;
    const scrollHeight = messageContainer.scrollHeight;
    let scrollTop = messageContainer.scrollTop;
    const clientHeight = messageContainer.clientHeight;
    const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;
    this.isScrolledToBottom = isScrolledToBottom;
  }


  /**
   * @name convertPhoto
   * @param profileImg
   * @returns image url
   * @description This method is use to convert the link into source link
  */
  public convertPhoto(profileImg?: string): string {
    let converter = 'http://172.16.3.107:2132/img/user/' + profileImg;
    // let converter = 'https://onechat-jj9m.onrender.com/img/user/' + profileImg;
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
   * @name getGroupTyping
   * @param data 
   * @description This method will show the typing UI in the screen for group chat
  */
  public getGroupTyping(data: Typing): void {
    if (!this.typerNames.includes(data.typer))
      this.typerNames.push(data.typer)
    setTimeout(() => {
      let id = this.typerNames.indexOf(data.typer)
      this.typerNames.splice(id, 1)
    }, 2000);
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
      this.showStatus = this.getOnlineUsers.find(
        (data: Alive) => data.userId === this.getReceiverData._id
      );
  }

  /**
   * @description This method set focus default
  */
  public setFocus(): void {
    this.myInput.nativeElement.focus();
  }
  /**
   * @name getGroupMembers
   * @param members 
   * @description This method will store the members of the current group chat
   */
  public getGroupMembers(members: Member[]): void {
    this.groupMembers = members.map((data: Member) => data.full_name).join(', ')
  }
  /**
   * @name getSenderName
   * @param id 
   * @returns sender's Name
   * @description This method will get the sender name
   */
  public getSenderName(id: string): string {
    return this.getGroupDetails.members.find((data: Member) => data._id === id).full_name;
  }

  /**
   * @name onEodSubmit
   * @description This method will submit the data for eod report
   */
  public onEodSubmit(): void {
    this.formValue = this.eodGroup.value;
    this.allTasks = [...this.eodGroup.value.completed, ...this.eodGroup.value.onGoing, ...this.eodGroup.value.newLearning]
    this.showTasks = true;
  }

  public get getControls(): any {
    return this.eodGroup['controls']
  }

  /**
   * @name formTaskArray
   * @param arrName 
   * @returns formarray for eod report
   */
  public formTaskArray(arrName: string): FormArray {
    return this.eodGroup.get(arrName) as FormArray
  }

  /**
   * @name onAddTask
   * @param taskType type of the task
   * @description This method will add the task 
   */
  public onAddTask(taskType: string): void {
    let group: FormGroup = this._fb.group({
      name: ['', [Validators.required]],
      hours: ['', [Validators.required]],
      description: ['', [Validators.required]],
      blocker: [''],
      type: [taskType]
    })

    if (this.formTaskArray(taskType).length < 6)
      this.formTaskArray(taskType).push(group);
  }

  /**
   * @name onDeleteTask
   * @param index index of the task
   * @param taskType type of the task
   * @description This method will delete the task as per the params
   */
  public onDeleteTask(index: number, taskType: string): void {
    this.formTaskArray(taskType).removeAt(index);
  }

  /**
   * @description This method Open emojis model and show  close icon
  */
  public openEmojiPicker(): void {
    this.closeIcon = 'x-lg';
    this.showEmojiPicker = true;
  }
  /**
   * @description This method close emojis model and also hide close icon
  */
  public closeEmojiPicker(): void {
    this.closeIcon = '';
    this.showEmojiPicker = false;
  }
  /**
   * @description this method add a emojis
   * @param event
   */
  public addEmoji(event: any): void {
    const { message } = this;
    const text = `${message}${event.emoji.native}`;
    this.message = text;
  }

  /**
   * @description this method toggle model
   * @param message 
   * @param i 
  */
  public toggleModel(i: number): void {
    this.id = i;
    this.ToggleModel = !this.ToggleModel;
  }

  /**
   * @description this method print Today Yesterday and full week then print full date
   * @param data 
   * @param pre 
   * @returns 
  */
  formatDate(data: Date, pre: Date): string {
    // convert string to date object
    const newData = new Date(data);
    const getday = newData.getDate();
    // convert string to date object
    const preData = new Date(pre);
    const preDay = preData.getDate();
    // check first date and Previous date then Return
    if (getday === preDay) {
      return '';
    }
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    // Check if the date is today
    if (newData.toDateString() === today.toDateString()) {
      return 'Today';
    }
    // Check if the date is yesterday
    if (newData.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    // Check if the date is within the last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    if (newData >= oneWeekAgo) {
      return newData.toLocaleString('en-US', { weekday: 'short' });
    }
    // Return the full date
    return newData.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }


  /**
   * @description this method patch message value 
   * @param message 
  */
  public editMessage(messageObj: NewMessage): void {
    this.chatMessageId = messageObj._id;
    this.setFocus()
    this.cancelEdit = 'x-lg';
    const text = `${messageObj.content.text}`;
    this.message = text;
    this.ToggleModel = true;
    this.editDataObject = messageObj;
  }

  /**
   * @description This method Clear input Text
   */
  public editCancel(): void {
    this.cancelEdit = ''
    this.chatGroup.reset()
  }
  /**
   *  
   * @param item 
   * @description This Method get object
  */
  public replyMessage(messageObject: NewMessage) {
    this.replyObjectId = messageObject._id;
    this.replyMessageData = messageObject;
    this.replyWrapper.nativeElement.style.display = 'block';
    this.setFocus();
  }
  /**
   * @description This Method close Reply Model 
   */
  public closeReplyModel() {
    this.replyWrapper.nativeElement.style.display = 'none';
  }

  public backToEod() {
    this.showTasks = false;
    this.eodGroup.patchValue(this.formValue)
  }

  public eodSubmit() {

    this.emitEodTasks.emit({
      name_of_emp: 'Abhishek',
      position: 'Assosiate L1',
      department: 'Frontend',
      date: new Date(),
      sender: '64007dcd89acbc81fb9a9978',
      receiver: this.getReceiverData._id,
      status: this.allTasks
    });
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
