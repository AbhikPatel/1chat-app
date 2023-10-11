import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../chat.service';
import { } from '../../models/chat.model';
import { Observable, map } from 'rxjs';
import { GroupMessageSeenBy, Message, MessageEdit, MessageRead, MessageReply, MessageResponse } from '../../models/message.model';
import { MessageAdapter } from '../../chat-adaptor/message.adaptor';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-chatting-message-container',
  templateUrl: './chatting-message-container.component.html'
})
export class ChattingMessageContainerComponent implements OnInit {
  public paramId: string;
  /** Observable for the chat messages */
  public getMessages: MessageResponse[];

  public chatMessages$: Observable<MessageResponse[]>;

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
    private _ChatService: ChatService, private _messageAdaptor: MessageAdapter,
    private _loaderService: LoaderService) {
    this.pageSize = 1;
    this.pageLimit = 15;
    this.sortBy = '-timestamp'
    this.getMessages = []
  }
  
  ngOnInit(): void {
    // Access route parameters using ActivatedRoute
    this.router.parent.params.subscribe(parentParams => {
      this.paramId = parentParams['id'];
    });
    this.props();
  }

  private props() {
    this._commonService.notificationCount.subscribe((count) => {
      if(count <= 15) this.initLimit = 15
      else this.initLimit = count
      this.getAllMessage();
    });
    this.listenDirectMessage$ = this._ChatService.listen('directMessage').pipe(
      map(message => this._messageAdaptor.toResponse(message))
    );
    this.listenDirectMessageResponse$ = this._ChatService.listen('directMessageResponse').pipe(
      map(message => this._messageAdaptor.toResponse(message))
    );
    this.listenDirectMessageReply$ = this._ChatService.listen('directMessageReply').pipe(
      map(message => this._messageAdaptor.toResponse(message))
    );
    this.listenDirectMessageReplyResponse$ = this._ChatService.listen('directMessageReplyResponse').pipe(
      map(message => this._messageAdaptor.toResponse(message))
    );
    this.listenDirectMessageEdit$ = this._ChatService.listen('directMessageEdit').pipe(
      map(message => this._messageAdaptor.toResponse(message))
    );
    this.listenDirectMessageEditResponse$ = this._ChatService.listen('directMessageEditResponse').pipe(
      map(message => this._messageAdaptor.toResponse(message))
    );
    this.listenDirectMessageAcknowledge$ = this._ChatService.listen('directMessageAcknowledge').pipe(
      map((messages) => {
        messages = messages.map((msg: MessageResponse) => this._messageAdaptor.toResponse(msg))
        return messages
      })
    );
    this.listenDirectMessageAcknowledgeResponse$ = this._ChatService.listen('directMessageAcknowledgeResponse').pipe(
      map((messages) => {
        messages = messages.map((msg: MessageResponse) => this._messageAdaptor.toResponse(msg))
        return messages
      })
    );
    this.listenDirectMessageError$ = this._ChatService.listen('directMessageError');
    this.listenGroupMessage$ = this._ChatService.listen('groupMessage');
    this.listenGroupMessageReply$ = this._ChatService.listen('groupMessageReply');
    this.listenGroupMessageAcknowledge$ = this._ChatService.listen('groupMessageAcknowledge');

    // this._ChatService.listen('alive').subscribe((val) => {
    //   console.log(val)
    // })
  }
  /**
   * @name getAllMessage
   * @description 
   */
  public getAllMessage() {
    this._loaderService.loaderMessage();
    if(this.pageSize > 1 ) 
      this.chatMessages$ = this._ChatService.getChatMessages(this.paramId, this.pageSize, this.pageLimit, this.sortBy);
    else
      this.chatMessages$ = this._ChatService.getChatMessages(this.paramId, this.pageSize, this.initLimit, this.sortBy);

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
   * @name emitDirectMessage
   * @param message message data
   * @description method emits direct messages
   */
  public emitDirectMessage(message: Message) {
    this._ChatService.emit('directMessage', message);
  }
  /**
   * @name emitDirectMessageReply
   * @param message message data
   * @description method emits direct message replies
   */
  public emitDirectMessageReply(message: MessageReply) {
    this._ChatService.emit('directMessageReply', message);
  }
  /**
   * @name emitDirectMessageEdit
   * @param message message data
   * @description method emits direct message edits
   */
  public emitDirectMessageEdit(message: MessageEdit) {
    this._ChatService.emit('directMessageEdit', message);
  }
  /**
   * @name emitDirectMessageAcknowledge
   * @param message message data
   * @description method emits direct messages acknowledgements
   */
  public emitDirectMessageAcknowledge(message: MessageRead) {
    this._ChatService.emit('directMessageAcknowledge', message);
  }
  /**
   * @name emitGroupJoin
   * @param message message data
   * @description method emits group message chat ids
   */
  // public emitGroupJoin(message: any) {
  //   this._ChatService.emit('groupJoin', message);
  // }
  /**
   * @name emitGroupMessage
   * @param message message data
   * @description method emits group messages
   */
  public emitGroupMessage(message: Message) {
    this._ChatService.emit('groupMessage', message);
  }
  /**
   * @name emitGroupMessageReply
   * @param message message data
   * @description method emits group message replies
   */
  public emitGroupMessageReply(message: MessageReply) {
    this._ChatService.emit('groupMessageReply', message);
  }
  /**
   * @name emitGroupMessageAcknowledge
   * @param message message data
   * @description method emits group message acknowledgements
   */
  public emitGroupMessageAcknowledge(message: GroupMessageSeenBy) {
    this._ChatService.emit('groupMessageAcknowledge', message)
  }
}