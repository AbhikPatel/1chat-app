import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ChattingMessagePresenterService } from '../Chatting-message-presenter/chatting-message-presenter.service';
import { ConversationUsers } from 'src/app/chat/models/chat.model';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { CommonService } from 'src/app/shared/services/common.service';
import { GroupMessageSeenBy, Message, MessageEdit, MessageRead, MessageReply, MessageResponse } from 'src/app/chat/models/message.model';

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
    console.log(messages)
    if (messages)
      this._chatArray = messages

    // this._chattingMessagePresenterService.getChatArray(this._chatArray, this.receiversConversation)
  }
  public get chatArray(): MessageResponse[] {
    return this._chatArray;
  }

  // Getter Setter for direct message
  @Input() public set listenDirectMessage(v: MessageResponse) {
    this._listenDirectMessage = v;
  }
  public get listenDirectMessage(): MessageResponse {
    return this._listenDirectMessage;
  }

  // Getter Setter for direct message response
  @Input() public set listenDirectMessageResponse(v: MessageResponse) {
    this._listenDirectMessageResponse = v;
  }
  public get listenDirectMessageResponse(): MessageResponse {
    return this._listenDirectMessageResponse;
  }

  // Getter Setter for direct message reply
  @Input() public set listenDirectMessageReply(v: MessageResponse) {
    this._listenDirectMessageReply = v;
  }
  public get listenDirectMessageReply(): MessageResponse {
    return this._listenDirectMessageReply;
  }

  // Getter Setter for direct message reply response
  @Input() public set listenDirectMessageReplyResponse(v: MessageResponse) {
    this._listenDirectMessageReplyResponse = v;
  }
  public get listenDirectMessageReplyResponse(): MessageResponse {
    return this._listenDirectMessageReplyResponse;
  }

  // Getter Setter for direct message edit
  @Input() public set listenDirectMessageEdit(v: MessageResponse) {
    this._listenDirectMessageEdit = v;
  }
  public get listenDirectMessageEdit(): MessageResponse {
    return this._listenDirectMessageEdit;
  }

  // Getter Setter for direct message edit response
  @Input() public set listenDirectMessageEditResponse(v: MessageResponse) {
    this._listenDirectMessageEditResponse = v;
  }
  public get listenDirectMessageEditResponse(): MessageResponse {
    return this._listenDirectMessageEditResponse;
  }

  // Getter Setter for direct message acknowledge
  @Input() public set listenDirectMessageAcknowledge(v: MessageResponse[]) {
    this._listenDirectMessageAcknowledge = v;
  }
  public get listenDirectMessageAcknowledge(): MessageResponse[] {
    return this._listenDirectMessageAcknowledge;
  }

  // Getter Setter for direct message acknowledge response
  @Input() public set listenDirectMessageAcknowledgeResponse(v: MessageResponse[]) {
    this._listenDirectMessageAcknowledgeResponse = v;
  }
  public get listenDirectMessageAcknowledgeResponse(): MessageResponse[] {
    return this._listenDirectMessageAcknowledgeResponse;
  }

  // Getter Setter for direct message Error
  @Input() public set listenDirectMessageError(v: any) {
    this._listenDirectMessageError = v;
  }
  public get listenDirectMessageError(): any {
    return this._listenDirectMessageError;
  }

  // Getter Setter for group message
  @Input() public set listenGroupMessage(v: MessageResponse) {
    this._listenGroupMessage = v;
  }
  public get listenGroupMessage(): MessageResponse {
    return this._listenGroupMessage;
  }

  // Getter Setter for group message reply
  @Input() public set listenGroupMessageReply(v: MessageResponse) {
    this._listenGroupMessageReply = v;
  }
  public get listenGroupMessageReply(): MessageResponse {
    return this._listenGroupMessageReply;
  }

  // Getter Setter for group message acknowledge
  @Input() public set listenGroupMessageAcknowledge(v: MessageResponse[]) {
    this._listenGroupMessageAcknowledge = v;
  }
  public get listenGroupMessageAcknowledge(): MessageResponse[] {
    return this._listenGroupMessageAcknowledge;
  }

  @Output() public emitDirectMessage: EventEmitter<Message>;
  @Output() public emitDirectMessageReply: EventEmitter<MessageReply>;
  @Output() public emitDirectMessageEdit: EventEmitter<MessageEdit>;
  @Output() public emitDirectMessageAcknowledge: EventEmitter<MessageRead>;
  @Output() public emitGroupMessage: EventEmitter<Message>;
  @Output() public emitGroupMessageReply: EventEmitter<MessageReply>;
  @Output() public emitGroupMessageAcknowledge: EventEmitter<GroupMessageSeenBy>;
  /** To emit the chat data */
  @Output() public chatData: EventEmitter<string>;


  private _chatArray: MessageResponse[];
  private _listenDirectMessage: MessageResponse;
  private _listenDirectMessageResponse: MessageResponse;
  private _listenGroupMessageReply: MessageResponse;
  private _listenDirectMessageReplyResponse: MessageResponse;
  private _listenDirectMessageEdit: MessageResponse;
  private _listenDirectMessageEditResponse: MessageResponse;
  private _listenGroupMessageAcknowledge: MessageResponse[];
  private _listenDirectMessageAcknowledgeResponse: MessageResponse[];
  private _listenDirectMessageError: any;
  private _listenGroupMessage: MessageResponse;
  private _listenDirectMessageReply: MessageResponse;
  private _listenDirectMessageAcknowledge: MessageResponse[];
  /** This Variable store chartArray[] */
  public NewChatArray: Message[];
  /** FormGroup for chat */
  public chatGroup: FormGroup;
  public isEditMode: boolean;
  public editedMessage: MessageEdit;
  public isReplyMode: boolean;
  public repliedMessage: MessageReply;
  /** Flag for message screen scroll */
  public isScrolledToBottom: boolean;
  /** Flag for showing modal for the messages */
  public messageModel: boolean;
  /** Flag for showing message Icon */
  public showMessageIcon: boolean;
  /** current message model */
  public currentMessageId: string;
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

    this.repliedMessage = {} as MessageReply;
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
    console.log(this.chatGroup.value.message);

    if (this.isEditMode) {
      this.editedMessage.editedBody = this.chatGroup.value.message;
      this.editedMessage.isEdited = true
      // this.editMessageObj.emit(this.editMessage);
    } else if (this.isReplyMode) {
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
    // this.chatGroup.get('message').patchValue(message.content.text);
    this.messageModel = false;
    this.isEditMode = true;
    // this.editMessage = message;
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
    // this.replyMessage = message;
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
