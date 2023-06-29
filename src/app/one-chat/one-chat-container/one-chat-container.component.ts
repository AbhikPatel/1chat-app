import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { ConversationUsers, CreateChat, Message, MessageRead, MessageResponse, OnlineUser, Typing } from '../models/chat.model';
import { EODAdapter, MessageAdapter } from '../one-chat-adaptor/one-chat.adaptor';
import { OneChatService } from '../one-chat.service';
import { EOD, EODResponse } from '../models/eod.model';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-one-chat-container',
  templateUrl: './one-chat-container.component.html',
})

export class OneChatContainerComponent implements OnInit, OnDestroy {

  /** Observable for the details of online users */
  public getOnlineUsersData$: Observable<OnlineUser[]>;
  /** Observable for the details of all the conversation users */
  public getConversationUsers$: Observable<ConversationUsers[]>;
  /** Observable for the details of all the users */
  public getAllUsers$: Observable<User[]>;
  /** Observable for the chat messages */
  public getMessages$: Observable<Message[]>;
  /** Observable for the sender details */
  public senderDetails$: Observable<User>;
  /** Observable for the sender details */
  public newSocketMessage$: Observable<Message>;
  /** Observable for new Chat Id */
  public newChatId$: Observable<string>;
  /** Observable for new Chat Id */
  public typingInfo$: Observable<Typing>;
  /** Observable for chat read Id */
  public chatReadData$: Observable<MessageRead>;
  /** Observable for EOD Reports */
  public eodReports$: Observable<EOD[]>;
  /** Observable for EOD Reports */
  public eodReportSocket$: Observable<EOD>;
  /** Observable for edit message */
  public editMessageSocket$: Observable<Message>;
  /** Observable for reply message */
  public replyMessageSocket$: Observable<Message>;
  /** Observable for recent Chat Id */
  public recentChatId$: Observable<string>;
  /** This varilable stores the Id of sender */
  public senderId: string;
  /** This varilable stores the Id of current chat */
  public currectChatId: string;

  /** stops the subscription on ngDestroy */
  private destroy: Subject<void>;

  constructor(
    private _oneChatService: OneChatService,
    private _commonService: CommonService,
    private _messageAdapter: MessageAdapter,
    private _eodAdapter: EODAdapter,
    private _auth: AuthService
  ) {
    this.destroy = new Subject();
    this.getOnlineUsersData$ = new Observable();
    this.newChatId$ = new Observable();
    this.getAllUsers$ = new Observable();
    this.getConversationUsers$ = new Observable();
    this.getMessages$ = new Observable();
    this.typingInfo$ = new Observable();
    this.chatReadData$ = new Observable();
    this.eodReports$ = new Observable();
    this.eodReportSocket$ = new Observable();
    this.replyMessageSocket$ = new Observable();
    this.recentChatId$ = new Observable();
  }

  ngOnInit(): void {
    this.props();
  }

  /**
   * @name props
   * @description This method will be invoked on ngOnInit
   */
  private props(): void {
    this.senderId = this._commonService.getUserId();
    this._oneChatService.setMap();
    this.recentChatId$ = this._oneChatService.chatId;
    this.getOnlineUsersData$ = this._oneChatService.listen('alive');
    this._oneChatService.getAllUserData().pipe(takeUntil(this.destroy)).subscribe((users: User[]) => {
      this.getAllUsers$ = of(users);
      this.joinGroupChatById();
    })
    this._oneChatService.listen('dm:message').pipe(takeUntil(this.destroy)).subscribe((message: MessageResponse) => {
      const convertedMessage: Message = this._messageAdapter.toResponse(message);
      this.newSocketMessage$ = of(convertedMessage);
    });
    this._oneChatService.listen('eod:status').pipe(takeUntil(this.destroy)).subscribe((eod: EODResponse) => {
      const eodResult: EOD = this._eodAdapter.toResponse(eod);
      this.eodReportSocket$ = of(eodResult);
    });
    this._oneChatService.listen('dm:messageEdit').subscribe((message: MessageResponse) => {
      const convertedMessage: Message = this._messageAdapter.toResponse(message);
      this.editMessageSocket$ = of(convertedMessage);
    })
    this._oneChatService.listen('dm:messageReply').subscribe((message: MessageResponse) => {
      const convertedMessage: Message = this._messageAdapter.toResponse(message);
      this.newSocketMessage$ = of(convertedMessage);
    })
    this.chatReadData$ = this._oneChatService.listen('dm:messageRead');
    this.typingInfo$ = this._oneChatService.listen('typing');
  }

  /**
   * @name getLogOutUser
   * @description This method will disconnect the user with the socket
   */
  public getLogOutUser(email: string): void {
    this._auth.getLogOutEmail(email);
    this._oneChatService.disconnectSocket();
  }

  /**
   * @name getChatId
   * @param id 
   * @description This method will call a http get request for chatId 
   */
  public getChatId(id: string): void {
    this.currectChatId = id;
    this.getMessages$ = this._oneChatService.getChatMessages(id);
  }

  /**
   * @name getNewMessage
   * @param message 
   * @description This method is used to send new message into socket
   */
  public getNewMessage(message: Message): void {
    const convertMessage: MessageResponse = this._messageAdapter.toRequest(message);
    if (message.replied_to) {
      convertMessage.replied_to = message.replied_to._id;
      this._oneChatService.emit('dm:messageReply', convertMessage);
    } else {
      this._oneChatService.emit('dm:message', convertMessage);
    }
  }

  /**
   * @name getReadedMessages
   * @param messages 
   * @description This method is used to send the readed messages to socket
   */
  public getReadedMessages(messages: MessageRead): void {
    this._oneChatService.emit('dm:messageRead', messages);
  }

  /**
   * @name getNewCoversation
   * @param chat 
   * @description This methos will send a request for creation of new conversation
  */
  public getNewCoversation(chat: CreateChat): void {
    this._oneChatService.postNewChat(chat).pipe(takeUntil(this.destroy)).subscribe((res: CreateChat) => this.newChatId$ = of(res._id));
  }

  /**
   * @name getEditMessageObj
   * @param message 
   * @description This method is used to emit the edit message into socket
   */
  public getEditMessageObj(message): void {
    let convertedMessage: MessageResponse = this._messageAdapter.toRequest(message);
    convertedMessage._id = message._id;
    this._oneChatService.emit('dm:messageEdit', convertedMessage);
  }

  /**
   * @name getSocketTypingInfo
   * @param typingInfo 
   * @description This method is used to emit the typing info into socket
  */
  public getSocketTypingInfo(typingInfo: Typing): void {
    this._oneChatService.emit('typing', typingInfo);
  }

  /**
   * @name getNewGroupDetails
   * @param data 
   * @description This method will request a post api for creating a new group chat
   */
  public getNewGroupDetails(groupDetails): void {
    this._oneChatService.postNewGroup(groupDetails).pipe(takeUntil(this.destroy)).subscribe();
    this.joinGroupChatById();
  }

  /**
   * @name joinGroupChatById
   * @description This method will emit the id in the socket of all the users to join the room 
   */
  private joinGroupChatById(): void {
    this._oneChatService.getConversationUser().pipe(takeUntil(this.destroy)).subscribe((users: ConversationUsers[]) => {
      this.getConversationUsers$ = of(users);
      var groupIds: string[] = [];
      users.map((data: ConversationUsers) => {
        if (data.chat_type === 'group')
          groupIds.push(data._id)
      })
      this._oneChatService.emit('group:join', groupIds);
    })
  }

  /**
   * @name getEodReport
   * @param eod 
   * @description This method used to emit the eod report into socket
   */
  public getEodReport(eod: EOD): void {
    eod.chatId = this.currectChatId;
    const eodResult: EODResponse = this._eodAdapter.toRequest(eod);
    this._oneChatService.emit('eod:status', eodResult);
  }

  /**
   * @name getEodTab
   * @param id 
   * @description This method is used to get all the EOD reports
   */
  public getEodTab(id: string): void {
    this.eodReports$ = this._oneChatService.getEODReports(id);
  }

  /**
   * @name ngOnDestroy
   * @description This method is called the component is destroyed
   */
  public ngOnDestroy(): void {
    this._oneChatService.disconnectSocket();
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
