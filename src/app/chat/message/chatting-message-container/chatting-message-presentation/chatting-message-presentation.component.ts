import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChattingMessagePresenterService } from '../Chatting-message-presenter/chatting-message-presenter.service';
import { ConversationUsers, Message } from 'src/app/chat/models/chat.model';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { CommonService } from 'src/app/shared/services/common.service';
import { MessageResponse } from 'src/app/chat/models/message.model';

@Component({
  selector: 'app-chatting-message-presentation',
  templateUrl: './chatting-message-presentation.component.html',
  providers: [ChattingMessagePresenterService]
})
export class ChattingMessagePresentationComponent {

  /** Element DOM for message screen */
  @ViewChild('messageContainer') public messageContainer: ElementRef;
  /** This element used for focus inputBox */
  @ViewChild('inputTypeFocus') public inputTypeFocus: ElementRef;

  /** Input to get the receiver's data */
  @Input() public set receiversConversation(receiver: ConversationUsers) {
    if (receiver) {
      this._receiversConversation = receiver;
      this.closeEmojiPicker();
      setTimeout(() => {
        this.scrollUp();
      }, 100);
    }
    this.setFocusInputBox()
  }
  public get receiversConversation(): ConversationUsers {
    return this._receiversConversation;
  }
  /** This property is used to get chat array */
  @Input() public set chatArray(messages: MessageResponse[]) {
    if (messages)
      this._chatArray = messages
 
    // this._chattingMessagePresenterService.getChatArray(this._chatArray, this.receiversConversation)
  }
  public get chatArray(): MessageResponse[] {
    return this._chatArray;
  }
  /** To emit the chat data */
  @Output() public chatData: EventEmitter<string>;
  private _chatArray: MessageResponse[];
  /** This Variable store chartArray[] */
  public NewChatArray: Message[];
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
  /** show and hide emojis model */
  public showEmojiPicker: boolean;
  /** This variable  show emojis in inputBox  */
  public message: string;
  ///** Show and hide close icon */
  public closeIcon: string;
  /** This variable is used for getter setter */
  private _receiversConversation: ConversationUsers;
  /** stops the subscription on destroy */
  private destroy: Subject<void>;
  public distance: number;
  public limit: number;
  public pageSize: number;
  public userId: string;
  constructor(
    private _chattingMessagePresenterService: ChattingMessagePresenterService,
    private _commonService: CommonService,

  ) {
    this.destroy = new Subject();
    this.chatData = new EventEmitter();

    this.replyMessage = {} as Message;
    this.chatGroup = this._chattingMessagePresenterService.getGroup();
    this.isScrolledToBottom = false;
    this.messageModel = false;
    this.showMessageIcon = false;
    this.isEditMode = false;
    this.isReplyMode = false;
    this.showEmojiPicker = false;
    this.closeIcon = ' ';
    this.message = '';
    this.distance = 1;
    this.limit = 5;
    this.pageSize = 1;
    this._chatArray = []
  }
  ngAfterViewInit(): void {
    this.scrollUp();
  }
  ngOnInit(): void {
    this._chattingMessagePresenterService.chat$.pipe(takeUntil(this.destroy)).subscribe((chat: string) => this.chatData.emit(chat));
    // this.chatGroup.valueChanges.pipe(takeUntil(this.destroy)).subscribe(() => this.InputTyping.emit());
    this._chattingMessagePresenterService.chatArray$.pipe(takeUntil(this.destroy)).subscribe((res: Message[]) => this.NewChatArray = res
    )
    /**
     * Get UserId
     */
    this.userId = this._commonService.getUserId()
    this._commonService.isReplyModeFalse.subscribe((data: boolean) => {
      this.isReplyMode = data;
    });
  }

  /**
   * @name onSubmit
   * @description This method will be called when the form is submitted
   */
  public onSubmit(): void {
    if (this.isEditMode) {
      this.editMessage.content.text = this.chatGroup.value.message;
      this.editMessage.is_edit = true;
      // this.editMessageObj.emit(this.editMessage);
    } else {
      if (this.isReplyMode)
        // this.repliedMessage.emit(this.replyMessage)
        this._chattingMessagePresenterService.getChatData(this.chatGroup.value.message);
      setTimeout(() => {
        this.scrollUp();
      }, 0);
    }
    this.chatGroup.get('message').reset();
    this.isEditMode = false;
    this.isReplyMode = false;
    this.closeEmojiPicker();
  }

  /**
   * @name scrollUp
   * @description Scroll to the bottom of the message container
   */
  public scrollUp(): void {
    const scrollHeight = this.messageContainer?.nativeElement.scrollHeight;
    this.messageContainer.nativeElement.scrollTop = scrollHeight;


  }

  /**
   * @name onMessageScroll
   * @param container
   * @description Down arrow icon show and hide as per scroll
   */
  public onMessageScroll(): void {
    const messageContainer = this.messageContainer.nativeElement;
    const scrollHeight = messageContainer.scrollHeight;
    let scrollTop = messageContainer.scrollTop;
    const clientHeight = messageContainer.clientHeight;
    const isScrolledToBottom = scrollHeight - (scrollTop + clientHeight);
    this.isScrolledToBottom = isScrolledToBottom > 50;
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
    this.setFocusInputBox()

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
    this.setFocusInputBox();
    this.isEditMode = false;
    this.chatGroup.reset();
    this.isReplyMode = true;
    this.replyMessage = message;
  }

  /**
   * @name addEmoji
   * @description this method add a emojis
   * @param event
   */
  public addEmoji(event: EmojiEvent): void {
    const { message } = this;
    const text = `${message}${event.emoji.native}`;
    this.message = text;
  }
  /**
  * @description This method Open emojis model and show close icon
 */
  public openEmojiPicker(): void {
    this.closeIcon = 'x-lg';
    this.showEmojiPicker = true;
  }
  /**
   * @name closeEmojiPicker
   * @description This method close emojis model and also hide close icon
  */
  public closeEmojiPicker(): void {
    this.closeIcon = '';
    this.showEmojiPicker = false;
  }
  /**
   * @description This method print Today,Yesterday and full weeks then print full dates
   * @param data 
   * @param pre 
   * @returns 
  */
  formatDate(data: Date, pre: Date) {
    return this._chattingMessagePresenterService.formatDate(data, pre);
  }
  /** 
   * @description This method used for focus input box
   * */
  public setFocusInputBox(): void {
    this.inputTypeFocus?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }

}
