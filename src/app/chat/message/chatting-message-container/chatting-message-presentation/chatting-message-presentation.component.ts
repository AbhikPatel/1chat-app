import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ChattingMessagePresenterService } from '../Chatting-message-presenter/chatting-message-presenter.service';
import { FormGroup } from '@angular/forms';
import { EmojiEvent } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { CommonService } from 'src/app/shared/services/common.service';
import { GroupMessageSeenBy, Message, MessageEdit, MessageRead, MessageReply, MessageResponse } from 'src/app/chat/models/message.model';
import { login } from 'src/app/chat/models/login.model';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-chatting-message-presentation',
  templateUrl: './chatting-message-presentation.component.html',
  providers: [ChattingMessagePresenterService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChattingMessagePresentationComponent implements OnInit {
  /** Element DOM for message screen */
  @ViewChild('scrollMe') public messageContainer: ElementRef;
  /** This element used for focus inputBox */
  @ViewChild('inputTypeFocus') public inputTypeFocus: ElementRef;
  /** This property is used to get chat array */
  @Input() public set chatArray(messages: MessageResponse[]) {
    if (messages) {
      this._loaderService.hideLoaderMessage();
      this._chatArray = messages;
      this._chattingMessagePresenterService.getChatMessagesArray(this._chatArray);
    } 
  }
  public get chatArray(): MessageResponse[] {
    return this._chatArray;
  }

  // Getter Setter for _getParamId
  @Input() public set getParamId(v: string) {
    this._getParamId = v;
    this.receiverId = localStorage.getItem('receiverId');
    this._chattingMessagePresenterService.getId(this._getParamId, this.receiverId);

  }
  public get getParamId(): string {
    return this._getParamId;
  }
  // Getter Setter for direct message
  @Input() public set listenDirectMessage(message: MessageResponse) {
    if (message) {
      this._listenDirectMessage = message;
      this.allMessagesObject = { ...this.allMessagesObject, [message._id]: message  }
      this.allMessagesKeys = Object.keys(this.allMessagesObject);
    }
  }
  public get listenDirectMessage(): MessageResponse {
    return this._listenDirectMessage;
  }

  // Getter Setter for direct message response
  @Input() public set listenDirectMessageResponse(message: MessageResponse) {
    if (message) {
      this._listenDirectMessageResponse = message;
      this.allMessagesObject[message.temporaryId] = message;
      this.allMessagesObject[message._id] = this.allMessagesObject[message.temporaryId]
      delete this.allMessagesObject[message.temporaryId]
      const tempIdIndex = this.allMessagesKeys.findIndex((key) => {
        return key === message.temporaryId
      })
      this.allMessagesKeys[tempIdIndex] = message._id;
    }
  }
  public get listenDirectMessageResponse(): MessageResponse {
    return this._listenDirectMessageResponse;
  }

  // Getter Setter for direct message reply
  @Input() public set listenDirectMessageReply(message: MessageResponse) {
    if (message) {
      this._listenDirectMessageReply = message;
      this.allMessagesObject = { ...this.allMessagesObject, [message._id]: message};
      this.allMessagesKeys = Object.keys(this.allMessagesObject);
    }
  }
  public get listenDirectMessageReply(): MessageResponse {
    return this._listenDirectMessageReply;
  }

  // Getter Setter for direct message reply response
  @Input() public set listenDirectMessageReplyResponse(message: MessageResponse) {
    if (message) {
      this._listenDirectMessageReplyResponse = message;
      this.allMessagesObject[message.temporaryId] = message;
      this.allMessagesObject[message._id] = this.allMessagesObject[message.temporaryId]
      delete this.allMessagesObject[message.temporaryId]
      const tempIdIndex = this.allMessagesKeys.findIndex((key) => {
        return key === message.temporaryId
      })
      this.allMessagesKeys[tempIdIndex] = message._id;
    }
  }
  public get listenDirectMessageReplyResponse(): MessageResponse {
    return this._listenDirectMessageReplyResponse;
  }

  // Getter Setter for direct message edit
  @Input() public set listenDirectMessageEdit(message: MessageResponse) {
    if (message) {
      this._listenDirectMessageEdit = message;
      this.allMessagesObject[message._id] = message;
    }
  }
  public get listenDirectMessageEdit(): MessageResponse {
    return this._listenDirectMessageEdit;
  }

  // Getter Setter for direct message edit response
  @Input() public set listenDirectMessageEditResponse(message: MessageResponse) {
    if (message) {
      this._listenDirectMessageEditResponse = message;
      this.allMessagesObject[message._id] = message;
    }
  }
  public get listenDirectMessageEditResponse(): MessageResponse {
    return this._listenDirectMessageEditResponse;
  }

  // Getter Setter for direct message acknowledge
  @Input() public set listenDirectMessageAcknowledge(messages: MessageResponse[]) {
    if (messages) {
      console.log("ackg ", messages)
      this._listenDirectMessageAcknowledgeResponse = messages;
      messages.forEach((message) => {
        this.allMessagesObject[message._id] = message;
      })
    }
  }
  public get listenDirectMessageAcknowledge(): MessageResponse[] {
    return this._listenDirectMessageAcknowledge;
  }

  // Getter Setter for direct message acknowledge response
  @Input() public set listenDirectMessageAcknowledgeResponse(messages: MessageResponse[]) {
    if (messages) {
      console.log("ackg res", messages)
      this._listenDirectMessageAcknowledgeResponse = messages;
      messages.forEach((message) => {
        this.allMessagesObject[message._id] = message;
      })
    }
  }
  public get listenDirectMessageAcknowledgeResponse(): MessageResponse[] {
    return this._listenDirectMessageAcknowledgeResponse;
  }

  // Getter Setter for direct message Error
  @Input() public set listenDirectMessageError(v: any) {
    if (v) {
      this._listenDirectMessageError = v;
    }
  }
  public get listenDirectMessageError(): any {
    return this._listenDirectMessageError;
  }

  // Getter Setter for group message
  @Input() public set listenGroupMessage(message: MessageResponse) {
    if (message) {
      this._listenGroupMessage = message;
      // implementation on progress
    }
  }
  public get listenGroupMessage(): MessageResponse {
    return this._listenGroupMessage;
  }

  // Getter Setter for group message reply
  @Input() public set listenGroupMessageReply(message: MessageResponse) {
    if (message) {
      this._listenGroupMessage = message;
      // implementation on progress
    }
  }
  public get listenGroupMessageReply(): MessageResponse {
    return this._listenGroupMessageReply;
  }

  // Getter Setter for group message acknowledge
  @Input() public set listenGroupMessageAcknowledge(messages: MessageResponse[]) {
    if (messages) {
      this._listenDirectMessageAcknowledgeResponse = messages;
      // implementation on progress
    }
  }
  public get listenGroupMessageAcknowledge(): MessageResponse[] {
    return this._listenGroupMessageAcknowledge;
  }

  @Output() public emitDirectMessage: EventEmitter<Message>;
  @Output() public pagination: EventEmitter<any>;
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
  private _getParamId: string;
  /** This Variable store chartArray[] */
  public newChatArray: MessageResponse[];
  public allMessagesObject: Object;
  public allMessagesKeys: Array<string>;
  /** FormGroup for chat */
  public chatGroup: FormGroup;
  public isEditMode: boolean;
  public editedMessage: MessageResponse;
  public isReplyMode: boolean;
  public repliedMessage: MessageResponse;

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
  public pageSize: number;
  public limit: number;
  public UserObject: login;
  public receiverId: string;
 public  isLoading :any;
  constructor(
    private _chattingMessagePresenterService: ChattingMessagePresenterService,
    private _commonService: CommonService,
    private _loaderService:LoaderService,
    private _changeDetector: ChangeDetectorRef
  ) {
    this.emitDirectMessage = new EventEmitter();
    this.pagination = new EventEmitter();
    this.emitDirectMessageReply = new EventEmitter();
    this.emitDirectMessageEdit = new EventEmitter();
    this.emitDirectMessageAcknowledge = new EventEmitter();
    this.emitGroupMessage = new EventEmitter();
    this.emitGroupMessageReply = new EventEmitter();
    this.emitGroupMessageAcknowledge = new EventEmitter();
    this.chatData = new EventEmitter();
    this.chatGroup = this._chattingMessagePresenterService.getGroup();
    this.isScrolledToBottom = false;
    this.showMessageIcon = false;
    this.isEditMode = false;
    this.isReplyMode = false;
    this.showEmojiPicker = false;
    this.closeIcon = ' ';
    this.message = '';
    this.pageSize = 1;
    this.isLoading;
    this._chatArray = [];
    this.allMessagesObject = {};
    this.allMessagesKeys = Object.keys(this.allMessagesObject);
  }
  ngOnInit(): void {
    this.isLoading=this._loaderService.geLoaderMessage()
    this._chattingMessagePresenterService.chatArray$.subscribe((messagesObject: Object) => {
      if(messagesObject){
        this.allMessagesObject = messagesObject;
        this.allMessagesKeys = Object.keys(this.allMessagesObject);
        this._changeDetector.detectChanges();
      }
    })
    this._chattingMessagePresenterService.directMessage$.subscribe((val: {arg1: Message, arg2: MessageResponse}) => {
      this.emitDirectMessage.emit(val.arg1);
      this.allMessagesObject = { ...this.allMessagesObject, [val.arg2.temporaryId]: val.arg2};
      this.allMessagesKeys = Object.keys(this.allMessagesObject);
    });
    this._chattingMessagePresenterService.directMessageEdit$.subscribe((editMessage: MessageEdit) => {
      this.emitDirectMessageEdit.next(editMessage);
    });
    this._chattingMessagePresenterService.directMessageReply$.subscribe((val: {arg1: MessageReply, arg2: MessageResponse}) => {
      this.emitDirectMessageReply.emit(val.arg1);
      this.allMessagesObject = { ...this.allMessagesObject, [val.arg2.temporaryId]: val.arg2};
      this.allMessagesKeys = Object.keys(this.allMessagesObject);
    });

    /**
     * Get login Details
     */
    this.UserObject = this._commonService.getLoginDetails()
    this._chattingMessagePresenterService.unReadMessageIds$.subscribe((val) => {
      if(val.messageIds.length) this.emitDirectMessageAcknowledge.emit(val)
    })
  }
 
  /**
   * @name onSubmit
   * @description This method will be called when the form is submitted
   */
  public onSubmit(): void {
    if (this.isEditMode === true) {
      this.editedMessage.editedBody.push(this.chatGroup.value.message);
      this.editedMessage.body = this.chatGroup.value.message;
      this.editedMessage.isEdited = true;
      this._chattingMessagePresenterService.editMessage(this.editedMessage);
      this.resetInputBox()
    } else if (this.isReplyMode === true) {
      this._chattingMessagePresenterService.replyMessage(this.chatGroup.value.message, this.repliedMessage)
      this.resetInputBox()
    } else {
      this._chattingMessagePresenterService.getChatData(this.chatGroup.value.message);
      this.resetInputBox()
    }
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
   * @name resetInputBox
   * @description This method reset input box
   */
  public resetInputBox() {
    this.upMessageScroll()
    this._changeDetector.detectChanges();
    this.chatGroup.get('message').reset();
  }
  /**
   * @name onMessageScroll
   * @param container
   * @description Down arrow icon show and hide as per scroll
   */
  public onMessageScroll(): void {
     this.pageSize++
    let pagination:any={
      page:this.pageSize,
    }
    this._loaderService.loaderMessage();
   this.pagination.emit(pagination)
   
  }
  /**
   * @name upMessageScroll
   * @description This method click on down arrow to message all get up
   */
public upMessageScroll(){
  const messageContainer = this.messageContainer.nativeElement;
  const isScrolledToBottom = this.messageContainer.nativeElement.scrollHeight - (messageContainer.scrollTop + messageContainer.clientHeight);
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

  }

  /**
   * @name onEditMessage
   * @param message 
   * @description This method is used to edit the chat message
   */
  public onEditMessage(message: MessageResponse): void {
    console.log(message);
    
    this.setFocusInputBox()
    this.chatGroup.get('message').patchValue(message.body);
    this.isReplyMode = false;
    this.isEditMode = true;
    this.editedMessage = message;

  }

  /**
    * @name onReplyMessage
    * @param message 
    * @description This method is used when the reply mode is activated
    */
  public onReplyMessage(message: MessageResponse): void {
    this.isReplyMode = true;
    this.setFocusInputBox();
    this.chatGroup.reset();
    this.isEditMode = false;
    this.repliedMessage = message;
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
   * @name formatDate
   * @description This method print Today,Yesterday and full weeks then print full dates
   * @param data 
   * @param pre 
   * @returns 
  */
  public formatDate(data: any, pre: any) {
    return this._chattingMessagePresenterService.formatDate(data, pre);
  }
  /** 
   * @name setFocusInputBox
   * @description This method used for focus input box
   * */
  public setFocusInputBox(): void {
    this.inputTypeFocus?.nativeElement.focus();
  }



}
