import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
// ================================================================================================================== //
import { login } from 'src/app/chat/models/login.model';
import { Message, MessageEdit, MessageRead, MessageReply, MessageResponse } from 'src/app/chat/models/message.model';
import { FormatTime } from 'src/app/core/utilities/formatTime';
import { CommonService } from 'src/app/shared/services/common.service';
import { ConversationUsers, CreateChat } from 'src/app/chat/models/chat.model';
import { CommunicationService } from 'src/app/chat/shared/communication/communication.service';


@Injectable()
export class ChattingMessagePresenterService implements OnInit {
  public unReadMessageIds$: Observable<MessageRead>;
  /** Observable for all chatArray  */
  public chatArray$: Observable<Object>;
   /** Observable for create new conversation chat */
   public createChat$: Observable<CreateChat>;
  /** Observable for new directMessage send container  */
  public directMessage$: Observable<{ arg1: Message, arg2: MessageResponse }>;
  /** Observable for  directMessageEdit send container  */
  public directMessageEdit$: Observable<MessageEdit>;
  /**  Observable for new directMessageReply array send container */
  public directMessageReply$: Observable<{ arg1: Message, arg2: MessageResponse }>;
  /** Subject for directMessage */
  private directMessage: Subject<{ arg1: Message, arg2: MessageResponse }>;
  /** variable for all the chat Ids */
  public allChatIds: string[];
  public currentConversationUser: ConversationUsers;
  /** Subject for directMessageEdit */
  private directMessageEdit: Subject<MessageEdit>;
  /** Subject for messageReply */
  private directMessageReply: Subject<{ arg1: Message, arg2: MessageResponse }>;
  /** Subject for  for all chatArray */
  private chatArray: Subject<Object>;
  /** Subject for new conversation chat */
  private createChat: Subject<CreateChat>;
  private unReadMessageIds: Subject<MessageRead>
  /** variable for chat array */
  public chats: MessageResponse[];
  public loginObject: login;
  public receiverId: string;
  public chatId: string;
  public senderId: number;
  public messageObj: MessageResponse;
  private messagesObject: Object;
  private generatedUUID: string;
  constructor(
    private _fb: FormBuilder,
    private _commonService: CommonService,
    private _formatter: FormatTime,
    private _communicationService: CommunicationService,
  ) {
    this.chatArray$ = new Observable();
    this.directMessage$ = new Observable();
    this.directMessageEdit$ = new Observable();
    this.directMessageReply$ = new Observable();
    this.createChat$ = new Observable();
    this.directMessage = new Subject();
    this.directMessageEdit = new Subject();
    this.directMessageReply = new Subject();
    this.chatArray = new Subject();
    this.unReadMessageIds = new Subject();
    this.createChat = new Subject();
    this.chats = [];
    this.chatArray$ = this.chatArray.asObservable();
    this.directMessage$ = this.directMessage.asObservable();
    this.directMessageEdit$ = this.directMessageEdit.asObservable();
    this.directMessageReply$ = this.directMessageReply.asObservable();
    this.unReadMessageIds$ = this.unReadMessageIds.asObservable();
    this.loginObject = this._commonService.getLoginDetails();
    this.createChat$ = this.createChat.asObservable();
    this.messagesObject = {};
    this.allChatIds = [];
  }
  ngOnInit(): void {
    this._commonService.receiverId$.subscribe((receiverId: string) => {
      console.log(receiverId);
    });
    this._communicationService.currentConversationUser.subscribe((currentConversationUser:ConversationUsers)=>{
      this.currentConversationUser=currentConversationUser
    })
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
    if (chat) {
      let unReadMessageIds
      if (Object.keys(this.messagesObject).length === 0) {
        unReadMessageIds = chat.filter((obj) => !obj.isRead).map(obj => obj._id)
      }
      let objectData = chat.reduce((accumulator, current) => {
        accumulator[current._id] = current;
        return accumulator
      }, {})
      const reversedObject = Object.fromEntries(
        Object.entries(objectData).reverse()
      );
      this.messagesObject = { ...reversedObject, ...this.messagesObject }
      this.chatArray.next(this.messagesObject);
      this.unReadMessageIds.next({
        senderId: this.loginObject.userId,
        receiverId: this.receiverId,
        messageIds: unReadMessageIds
      })
    }
  }
    /**
   * @name getConversationUser
   * @param users 
   * @description This method will separate the one to one and group chat data
   */
    public getConversationUsers(users: ConversationUsers[]): void {
      this.allChatIds = users.map((user: ConversationUsers) => user.chatId);
      console.log(this.allChatIds);
      
    }
  
  /**
   * @name getChatData
   * @param chatData 
   * @description This method will get the data and push an next
   */
  public getChatData(chatData: string): void {
    const currentTime = new Date();
    this.generatedUUID = uuidv4();
   if(!this.allChatIds.includes(this.currentConversationUser.chatId)){
    let newChat: CreateChat = {
      owner: this.loginObject.userId,
      chat_type: 'dm',
      title: 'dm',
      members: [
         this.loginObject.userId,
         this.receiverId
      ],
    };
    this.createChat.next(newChat);

   }else {
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
      displayTime: this._formatter.Formatter(currentTime),
      threadType: 'text',
      _id: '',
      temporaryId: this.generatedUUID
    };
    const sendMessage: Message = {
      chatId: this.chatId,
      senderId: this.loginObject.userId,
      receiverId: this.receiverId,
      timestamp: currentTime,
      threadType: 'text',
      body: chatData,
      temporaryId: this.generatedUUID
    }
    this.directMessage.next({ arg1: sendMessage, arg2: this.messageObj });
    this._communicationService.setLastMessageInConversationData({chatId:this.chatId,lastMessage:chatData})
  

   }
     
    
     
   
  }
  /**
   * @name editMessage
   * @param editMessageData 
   * @description This method Create object and next edit message
   */
  public editMessage(editMessageData: MessageResponse): void {
    const editMessage: MessageEdit = new MessageEdit(
      this.loginObject.userId,
      this.receiverId,
      editMessageData._id,
      true,
      editMessageData.body
    )
    this.directMessageEdit.next(editMessage)
    this._communicationService.setLastMessageInConversationData({chatId:this.chatId,lastMessage:editMessageData.body})
  }
  /**
   * @name replyMessages
   * @param replyMessage 
   * @param repliedMessage 
   * @description This method create replay message object and next  reply message  
   */
  public replyMessage(replyMessage: string, repliedMessage: MessageResponse) {
    const currentTime = new Date();
    this.generatedUUID = uuidv4();
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
      displayTime: this._formatter.Formatter(currentTime),
      threadType: 'text',
      _id: '',
      temporaryId: this.generatedUUID
    };
    const replyMessages: MessageReply = {
      isReplied: true,
      chatId: this.chatId,
      senderId: this.loginObject.userId,
      receiverId: this.receiverId,
      repliedMessageId: repliedMessage._id,
      timestamp: currentTime,
      threadType: 'text',
      body: replyMessage,
      temporaryId: this.generatedUUID
    }
    this.directMessageReply.next({ arg1: replyMessages, arg2: messageObj });
    this._communicationService.setLastMessageInConversationData({chatId:this.chatId,lastMessage:replyMessage})
  }

  /**
   * @param data 
   * @param pre 
   * @returns 
   * @description This method formate message data 
   */
  public formatDate(data: string, pre: string): string {
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
}
