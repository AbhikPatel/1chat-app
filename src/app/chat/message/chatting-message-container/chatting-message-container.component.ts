import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../chat.service';
import { ConversationUsers, CreateChat } from '../../models/chat.model';
import { Observable, map, of } from 'rxjs';
import { GroupMessageSeenBy, Message, MessageEdit, MessageRead, MessageReply, MessageResponse } from '../../models/message.model';
import { MessageAdapter } from '../../chat-adaptor/message.adaptor';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { CommunicationService } from '../../shared/communication/communication.service';

@Component({
  selector: 'app-chatting-message-container',
  templateUrl: './chatting-message-container.component.html'
})
export class ChattingMessageContainerComponent implements OnInit {
  public paramId: string;
  /** Observable for the chat messages */
  public getMessages: MessageResponse[];

  public chatMessages$: Observable<MessageResponse[]>;
  public newChatId$: Observable<any>;
 /** Observable for the details of all the conversation users */
 public getConversationUsers$: Observable<ConversationUsers[]>;
  // Observable for direct message and direst message response
  public listenDirectMessage$: Observable<MessageResponse>;
  public listenDirectMessageResponse$: Observable<MessageResponse>;
  // Observable for direct message reply and direct message reply response
  public listenDirectMessageReply$: Observable<MessageResponse>;
  public listenDirectMessageReplyResponse$: Observable<MessageResponse>;
  // Observable for direct message edit and direct message edit response
  public listenDirectMessageEdit$: Observable<MessageResponse>;
  public listenDirectMessageEditResponse$: Observable<MessageResponse>;
  // Observable for direct message acknowledge and direct message acknowledge response
  public listenDirectMessageAcknowledge$: Observable<MessageResponse[]>;
  public listenDirectMessageAcknowledgeResponse$: Observable<MessageResponse[]>;
  // Observable for direct message error
  public listenDirectMessageError$: Observable<any>;
  // Observable for group message, group message reply and group message acknowledge
  public listenGroupMessage$: Observable<MessageResponse>;
  public listenGroupMessageReply$: Observable<MessageResponse>;
  public listenGroupMessageAcknowledge$: Observable<MessageResponse[]>;
  public pageSize: number;
  public pageLimit: number;
  public sortBy: string;
  private initLimit: number;
  constructor(
    private _commonService: CommonService,
    private router: ActivatedRoute,
    private _chatService: ChatService, private _messageAdaptor: MessageAdapter,
    private _loaderService: LoaderService  ,private _communicationService: CommunicationService) {
    this.pageSize = 1;
    this.pageLimit = 10;
    this.sortBy = '-timestamp'
    this.getMessages = [];
    this.getConversationUsers$ = new Observable();
  }
  
  ngOnInit(): void {
    // Access route parameters using ActivatedRoute
    this.router.parent.params.subscribe(parentParams => {
      this.paramId = parentParams['id'];
    if(this.paramId ==='draft'){

    }
    else{

      this.getAllMessage()
    }
      console.log(this.paramId );
      
    });
    this.props();
  }

  private props() {
    this._commonService.notificationCount.subscribe((count) => {
      if(!count) this.initLimit = 10
      else this.initLimit = count
        this.getAllMessage();
    });
    this.listenDirectMessage$ = this._chatService.listen('directMessage').pipe(
      map(message => this._messageAdaptor.toResponse(message))
    );
    this.listenDirectMessageResponse$ = this._chatService.listen('directMessageResponse').pipe(
      map(message => this._messageAdaptor.toResponse(message))
    );
    this.listenDirectMessageReply$ = this._chatService.listen('directMessageReply').pipe(
      map(message => this._messageAdaptor.toResponse(message))
    );
    this.listenDirectMessageReplyResponse$ = this._chatService.listen('directMessageReplyResponse').pipe(
      map(message => this._messageAdaptor.toResponse(message))
    );
    this.listenDirectMessageEdit$ = this._chatService.listen('directMessageEdit').pipe(
      map(message => this._messageAdaptor.toResponse(message))
    );
    this.listenDirectMessageEditResponse$ = this._chatService.listen('directMessageEditResponse').pipe(
      map(message => this._messageAdaptor.toResponse(message))
    );
    this.listenDirectMessageAcknowledge$ = this._chatService.listen('directMessageAcknowledge').pipe(
      map((messages) => {
        messages = messages.map((msg: MessageResponse) => this._messageAdaptor.toResponse(msg))
        return messages
      })
    );
    this.listenDirectMessageAcknowledgeResponse$ = this._chatService.listen('directMessageAcknowledgeResponse').pipe(
      map((messages) => {
        messages = messages.map((msg: MessageResponse) => this._messageAdaptor.toResponse(msg))
        return messages
      })
    );
    this.listenDirectMessageError$ = this._chatService.listen('directMessageError');
    this.listenGroupMessage$ = this._chatService.listen('groupMessage');
    this.listenGroupMessageReply$ = this._chatService.listen('groupMessageReply');
    this.listenGroupMessageAcknowledge$ = this._chatService.listen('groupMessageAcknowledge');
    
 this.getAllConversationUser()
  }
   /**
   * @name getAllConversationUser
   * @description This Method Get getAllConversationUser
   */
   public getAllConversationUser() {
       this._chatService.getConversationUser().subscribe((users: ConversationUsers[]) => {
       this.getConversationUsers$ = of(users);
    });

    }
  /**
   * @name getAllMessage
   * @description 
   */
  public getAllMessage() {
    if(this.pageSize > 1 ) 
      this.chatMessages$ = this._chatService.getChatMessages(this.paramId, this.pageSize, this.pageLimit, this.sortBy);
    else
      this.chatMessages$ = this._chatService.getChatMessages(this.paramId, this.pageSize, this.initLimit, this.sortBy);

  }
  /**
   * @name  paginationScroll
   * @param paginationData 
   * @description This method get data give pagination page 
   */
  public paginationScroll(paginationData: any) {
    this.pageSize = paginationData.page;
    this.getAllMessage();
  }
   /**
   * @name getNewConversation
   * @param chat 
   * @description This methods will send a request for creation of new conversation
  */
   public getNewConversation(chat: CreateChat): void {
    this._chatService.postNewChat(chat).subscribe((res: CreateChat) => this.newChatId$ = of(res._id));
  }
  /**
   * @name emitDirectMessage
   * @param message message data
   * @description method emits direct messages
   */
  public emitDirectMessage(message: Message) {
    this._chatService.emit('directMessage', message);
  }
  /**
   * @name emitDirectMessageReply
   * @param message message data
   * @description method emits direct message replies
   */
  public emitDirectMessageReply(message: MessageReply) {
    this._chatService.emit('directMessageReply', message);
  }
  /**
   * @name emitDirectMessageEdit
   * @param message message data
   * @description method emits direct message edits
   */
  public emitDirectMessageEdit(message: MessageEdit) {
    this._chatService.emit('directMessageEdit', message);
  }
  /**
   * @name emitDirectMessageAcknowledge
   * @param message message data
   * @description method emits direct messages acknowledgements
   */
  public emitDirectMessageAcknowledge(message: MessageRead) {
    this._chatService.emit('directMessageAcknowledge', message);
  }
  /**
   * @name emitGroupJoin
   * @param message message data
   * @description method emits group message chat ids
   */
  // public emitGroupJoin(message: any) {
  //   this._chatService.emit('groupJoin', message);
  // }
  /**
   * @name emitGroupMessage
   * @param message message data
   * @description method emits group messages
   */
  public emitGroupMessage(message: Message) {
    this._chatService.emit('groupMessage', message);
  }
  /**
   * @name emitGroupMessageReply
   * @param message message data
   * @description method emits group message replies
   */
  public emitGroupMessageReply(message: MessageReply) {
    this._chatService.emit('groupMessageReply', message);
  }
  /**
   * @name emitGroupMessageAcknowledge
   * @param message message data
   * @description method emits group message acknowledgements
   */
  public emitGroupMessageAcknowledge(message: GroupMessageSeenBy) {
    this._chatService.emit('groupMessageAcknowledge', message)
  }
}