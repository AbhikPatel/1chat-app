import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { login } from 'src/app/chat/models/login.model';
import { Message, MessageEdit, MessageReply, MessageResponse } from 'src/app/chat/models/message.model';
import { FormatTime } from 'src/app/core/utilities/formatTime';
import { CommonService } from 'src/app/shared/services/common.service';
import { ConversationUsers } from 'src/app/chat/models/chat.model';


@Injectable()
export class ChattingMessagePresenterService implements OnInit {
  /** Observable for all chatArray  */
  public chatArray$: Observable<MessageResponse[]>;
  /** Observable for new directMessage send container  */
  public directMessage$: Observable<Message>;
  /** Observable for  directMessageEdit send container  */
  public directMessageEdit$: Observable<MessageEdit>;
  /**  Observable for new directMessageReply array send container */
  public directMessageReply$: Observable<MessageReply>;
  /** Subject for directMessage */
  private directMessage: Subject<Message>;
  /** Subject for directMessageEdit */
  private directMessageEdit: Subject<MessageEdit>;
  /** Subject for messageReply */
  private directMessageReply: Subject<MessageReply>;
  /** Subject for  for all chatArray */
  private chatArray: Subject<MessageResponse[]>;
  /** variable for chat array */
  public chats: MessageResponse[];
  public loginObject: login;
  public receiverId: string;
  public chatId: string;
  public senderId: number;
  public messageObj: MessageResponse
  constructor(
    private _fb: FormBuilder,
    private _commonService: CommonService,
  ) {
    this.chatArray$ = new Observable();
    this.directMessage$ = new Observable();
    this.directMessageEdit$ = new Observable();
    this.directMessageReply$ = new Observable();
    this.directMessage = new Subject();
    this.directMessageEdit = new Subject();
    this.directMessageReply = new Subject();
    this.chatArray = new Subject();
    this.chats = [];
    this.chatArray$ = this.chatArray.asObservable();
    this.directMessage$ = this.directMessage.asObservable();
    this.directMessageEdit$ = this.directMessageEdit.asObservable();
    this.directMessageReply$ = this.directMessageReply.asObservable();
    this.loginObject = this._commonService.getLoginDetails();
  }
  ngOnInit(): void {
    this._commonService.receiverId$.subscribe((receiverId: string) => {
      console.log(receiverId);
    });
  }
  /**
   * @name findIndexOfMessage
   * @param message 
   * @returns methods returns index of existed message
   */
  public findIndexOfMessageBasedOnId(chatArray: MessageResponse[], message: MessageResponse): number {
    return chatArray.findIndex((val) => {
      return val._id === message._id
    });
  }
  /**
   * @name findIndexOfMessage
   * @param message 
   * @returns methods returns index of existed message
   */
  public findIndexOfMultipleMessageBasedOnId(chatArray: MessageResponse[], message: MessageResponse[]): Array<number> {
    const indexArray = [];
    message.forEach((val) => {
      const index = this.findIndexOfMessageBasedOnId(chatArray, val);
      indexArray.push(index);
    })
    return indexArray;
  }
  /**
   * @name findIndexOfMessage
   * @param message 
   * @returns methods returns index of existed message
   */
  public findIndexOfMessageBasedOnTime(chatArray: MessageResponse[], message: MessageResponse): number {
    return chatArray.findIndex((val) => {
      return val.body === message.body && new Date(val.timestamp).toString() === new Date(message.timestamp).toString()
    });
  }


  /**
   * @name getGroup
   * @returns formGroup
   * @description This method is use to create form Group
   */
  public getGroup(): FormGroup {
    return this._fb.group({
      message: ['', [Validators.required]]
    })
  }
  /**
   * 
   * @param chatId 
   */
  public getId(chatId: string, receiverId: string) {
    this.chatId = chatId;
    this.receiverId = receiverId
  }
  /**
   * 
   * @param chat 
   */
  public getChatMessagesArray(chat: MessageResponse[]) {
    this.chats = [...chat];
    this.chatArray.next(this.chats);

  }
  /**
   * @name getChatData
   * @param chatData 
   * @description This method will get the data and push an next
   */
  public getChatData(chatData: string): void {
    const currentTime = new Date();
    this.messageObj = {
      body: chatData,
      editedBody: [''],
      chatId: this.chatId,
      isRead: false,
      isEdited: false,
      isReplied: false,
      senderId: {
        first_name: '',
        photo: '',
        last_name: '',
        full_name: '',
        _id: this.loginObject.userId
      },
      repliedMessageId: '',
      receiverId: {
        first_name: '',
        photo: '',
        last_name: '',
        full_name: '',
        _id: this.receiverId
      },
      timestamp: currentTime,
      threadType: 'text',
      _id: '',
    };
    const sendMessage: Message = {
      chatId: this.chatId,
      senderId: this.loginObject.userId,
      receiverId: this.receiverId,
      timestamp: currentTime,
      threadType: 'text',
      body: chatData
    }
    this.directMessage.next(sendMessage);
    this.chats.push(this.messageObj);
  }
  /**
   * @name editMessage
   * @param editMessageData 
   * @description This method  next edit message
   */
  public editMessage(editMessageData: MessageResponse): void {
    const editMessage: MessageEdit = new MessageEdit(
      this.loginObject.userId,
      this.receiverId,
      editMessageData._id,
      true,
      editMessageData.editedBody
    )
    this.directMessageEdit.next(editMessage)
  }
  /**
   * @name replyMessages
   * @param replyMessage 
   * @param repliedMessage 
   * @description This method reply message send 
   */
  public replyMessage(replyMessage: string, repliedMessage: MessageResponse) {
    const currentTime = new Date()
    let messageObj: MessageResponse = {
      body: replyMessage,
      editedBody: [''],
      chatId: this.chatId,
      isRead: false,
      isEdited: false,
      isReplied: true,
      senderId: {
        first_name: '',
        photo: '',
        last_name: '',
        full_name: '',
        _id: this.loginObject.userId
      },
      repliedMessageId: repliedMessage,
      receiverId: {
        first_name: '',
        photo: '',
        last_name: '',
        full_name: '',
        _id: this.receiverId
      },
      timestamp: currentTime,
      threadType: 'text',
      _id: '',
    };
    const replyMessages: MessageReply = {
      isReplied: true,
      chatId: this.chatId,
      senderId: this.loginObject.userId,
      receiverId: this.receiverId,
      repliedMessageId: repliedMessage._id,
      timestamp: currentTime,
      threadType: 'text',
      body: replyMessage
    }
    this.directMessageReply.next(replyMessages);
    this.chats.push(messageObj);
  }

  /**
   * @description This method  formate date 
   * @param data 
   * @param pre 
   * @returns 
   */
  public formatDate(data: string, pre: string): string {
    // convert string to date object
    const newData = new Date(data);
    // console.log('current date',newData);
    const getday = newData.getDate();
    // convert string to date object
    const preData = new Date(pre);
    // console.log('previces',preData);
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
}
