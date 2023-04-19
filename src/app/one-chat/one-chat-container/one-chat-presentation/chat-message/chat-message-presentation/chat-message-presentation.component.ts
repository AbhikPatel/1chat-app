import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NewMessage, Typing } from 'src/app/one-chat/models/chat.model';
import { NewUser } from 'src/app/shared/models/user.model';
import { ChatMessagePresenterService } from '../chat-message-presenter/chat-message-presenter.service';

@Component({
  selector: 'app-chat-message-presentation',
  templateUrl: './chat-message-presentation.component.html',
  viewProviders: [ChatMessagePresenterService],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessagePresentationComponent implements OnInit {

  @ViewChild('scroll') public scrollDown: ElementRef;

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
      this.chatGroup.setValue({message:''})
    }
  }
  public get getChat(): NewMessage[] {
    return this._getChat;
  }

  // This property is use to get the details of the receiver
  @Input() public set getReceiverData(v: NewUser) {
    if (v) {
      this._getReceiverData = v;
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
  }

  ngOnInit(): void {
    if (this.scrollDown)
      this.scrollToBottom()

    this.chatGroup.valueChanges.subscribe((data: string) => this.emitSenderId.emit(this.senderId))
  }

  public scrollToBottom(): void {
    try {
      this.scrollDown.nativeElement.scrollTop = this.scrollDown.nativeElement.scrollHeight;
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * @name onSubmit
   * @description This method is use to submit the form
   */
  public onSubmit(): void {
    if (this.chatGroup.valid) {
      this.emitChat.emit(this.chatGroup.value.message);
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
    let converter = 'http://172.16.3.107:21321/img/users/' + profileImg;
    // let converter = 'https://anonychat.onrender.com/img/users/' + profileImg;
    return profileImg ? converter : '../../../../../../assets/images/avatar.png'
  }

  /**
   * @name onLogOut
   * @description This method is use to logout the user
   */
  public onLogOut() {
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
      this.showTyping.next(true)
      setTimeout(() => {
        this.showTyping.next(false)
      }, 3000);
    }
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
