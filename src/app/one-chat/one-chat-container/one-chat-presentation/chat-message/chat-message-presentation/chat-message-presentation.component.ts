import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { NewMessage } from 'src/app/one-chat/models/chat.model';
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

  // This property is use to get the array of chats
  @Input() public set getChat(v: NewMessage[]) {
    if (v) {
      this._getChat = v;
    }
  }
  public get getChat(): NewMessage[] {
    return this._getChat;
  }

  // This property is use to get the details of the recevier
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

  constructor(
    private _service: ChatMessagePresenterService,
    private _route: Router,
    private _cdr: ChangeDetectorRef,
  ) {
    this.destroy = new Subject();
    this.emitChat = new EventEmitter();
    this.emitSenderId = new EventEmitter();
    this.chatGroup = this._service.getGroup();
    this._getChat = [];
    this.senderId = localStorage.getItem('userId');
    this._getReceiverData = {} as NewUser;
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
  public onSubmit() {
    if (this.chatGroup.valid) {
      this.emitChat.emit(this.chatGroup.value.message);
      this.chatGroup.reset();
    }
  }

  /**
   * @name convertPhoto
   * @param profileImg 
   * @returns image url
   * @description This method is use to convert the link into soucre link
   */
  public convertPhoto(profileImg?: string) {
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
   * @name ngOnDestroy
   * @description This method is called the component is destoryed
   */
  public ngOnDestroy() {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
