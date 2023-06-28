import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { OneChatPresentationBase } from '../../one-chat-container/one-chat-presentation-base/one-chat-presentation.base';
import { ChattingPresenterService } from '../chatting-presenter/chatting-presenter.service';
import { ConversationUsers, Message } from '../../models/chat.model';

@Component({
  selector: 'app-chatting-presentation',
  templateUrl: './chatting-presentation.component.html',
  viewProviders: [ChattingPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChattingPresentationComponent extends OneChatPresentationBase implements OnInit, OnDestroy {

  /** Element DOM for message screen */
  @ViewChild('messageContainer') public messageScreen: ElementRef;

  /** Input to get the receiver's data */
  @Input() public set receiversConversation(receiver: ConversationUsers) {
    if (receiver) {
      this._receiversConversation = receiver;
    }
  }
  public get receiversConversation(): ConversationUsers {
    return this._receiversConversation;
  }

  /** To emit the chat data */
  @Output() public chatData: EventEmitter<string>;

  /** FormGroup for chat */
  public chatGroup: FormGroup;
  /** Flag for message screen scroll */
  public isScrolledToBottom: boolean;
  /** Flag for showing modal for the messages */
  public messageModel: boolean;
  /** Flag for showing message Icon */
  public showMessageIcon: boolean;
  /** Flag for edit mode */
  public isEditMode: boolean;
  /** Flag for reply mode */
  public isReplyMode: boolean;
  /** variable to store the reply message */
  public replyMessage: Message;
  /** current message model */
  public currentMessageId: string;
  /** Edit Message object */
  public editMessage: Message;

  /** This variable is used for getter setter */
  private _receiversConversation: ConversationUsers;

  /** stops the subscription on destroy */
  private destroy: Subject<void>;

  constructor(
    private _chattingPresenterService: ChattingPresenterService,
  ) {
    super();
    this.destroy = new Subject();
    this.chatData = new EventEmitter();
    this.replyMessage = {} as Message;
    this.chatGroup = this._chattingPresenterService.getGroup();
    this.isScrolledToBottom = false;
    this.messageModel = false;
    this.showMessageIcon = false;
    this.isEditMode = false;
    this.isReplyMode = false;
  }

  ngOnInit(): void {
    this._chattingPresenterService.chat$.pipe(takeUntil(this.destroy)).subscribe((chat: string) => this.chatData.emit(chat));
    this.chatGroup.valueChanges.pipe(takeUntil(this.destroy)).subscribe(() => this.InputTyping.emit());
  }

  /**
   * @name onSubmit
   * @description This method will be called when the form is submitted
   */
  public onSubmit(): void {
    if (this.isEditMode) {
      this.editMessage.content.text = this.chatGroup.value.message;
      this.editMessage.is_edit = true;
      this.editMessageObj.emit(this.editMessage);
    } else {
      if(this.isReplyMode)
        this.repliedMessage.emit(this.replyMessage);
      this._chattingPresenterService.getChatData(this.chatGroup.value.message);
    }
    this.chatGroup.get('message').reset();
    this.isEditMode = false;
    this.isReplyMode = false;
  }

  /**
   * @name scrollUp
   * @description Click arrow down icon got to up message
   */
  public scrollUp(): void {
    setTimeout(() => {
      this.messageScreen.nativeElement.scrollTo(
        0,
        this.messageScreen.nativeElement.scrollHeight
      );
    }, 0);
  }

  /**
   * @name onMessageScroll
   * @param container
   * @description Down arrow icon show and hide as per scroll
   */
  public onMessageScroll(): void {
    const messageContainer = this.messageScreen.nativeElement;
    const scrollHeight = messageContainer.scrollHeight;
    let scrollTop = messageContainer.scrollTop;
    const clientHeight = messageContainer.clientHeight;
    const isScrolledToBottom = scrollHeight - scrollTop === clientHeight;
    this.isScrolledToBottom = isScrolledToBottom;
  }

  /**
   * @name onMessageModel
   * @param id 
   * @description This method is used to show the message modal
   */
  public onMessageModel(id: string): void {
    this.currentMessageId = id;
    this.showMessageIcon ? this.showMessageIcon = false : this.showMessageIcon = true;
    this.messageModel = false;
  }

  /**
   * @name onEditMessage
   * @param message 
   * @description This method is used to edit the chat message
   */
  public onEditMessage(message: Message): void {
    this.isReplyMode = false;
    this.chatGroup.get('message').patchValue(message.content.text);
    this.messageModel = false;
    this.isEditMode = true;
    this.editMessage = message;
  }

  /**
   * @name openModel
   * @description This method is used to open the modal
   */
  public openModel(): void {
    this.messageModel ? this.messageModel = false : this.messageModel = true;
  }

  /**
   * @name onCancelEdit
   * @description This method is used to cancel the edit mode
   */
  public onCancelMode(): void {
    this.isEditMode = false;
    this.isReplyMode = false;
    this.chatGroup.reset();
  }

  /**
   * @name onReplyMessage
   * @param message 
   * @description This method is used when the reply mode is activated
   */
  public onReplyMessage(message: Message): void {
    this.isEditMode = false;
    this.chatGroup.reset();
    this.isReplyMode = true;
    this.replyMessage = message;
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
