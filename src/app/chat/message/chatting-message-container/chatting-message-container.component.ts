import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../chat.service';
import { } from '../../models/chat.model';
import { Observable } from 'rxjs';
import { GroupMessageSeenBy, Message, MessageEdit, MessageRead, MessageReply, MessageResponse } from '../../models/message.model';

@Component({
  selector: 'app-chatting-message-container',
  templateUrl: './chatting-message-container.component.html'
})
export class ChattingMessageContainerComponent implements OnInit {
  public ParamId: string;
  /** Observable for the chat messages */
  public getMessages$: Observable<MessageResponse[]>;
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

  constructor(private router: ActivatedRoute,
    private _ChatService:ChatService) {

  }
  ngOnInit(): void {
    // Access route parameters using ActivatedRoute
    this.router.parent.params.subscribe(parentParams => {
      this.ParamId = parentParams['id'];
    });
    this.props();
  }

  private props() {
    this.getMessages$= this._ChatService.getChatMessages(this.ParamId);  

    this.listenDirectMessage$ = this._ChatService.listen('directMessage');
    this.listenDirectMessageResponse$ = this._ChatService.listen('directMessageResponse');
    this.listenDirectMessageReply$ = this._ChatService.listen('directMessageReply');
    this.listenDirectMessageReplyResponse$ = this._ChatService.listen('directMessageReplyResponse');
    this.listenDirectMessageEdit$ = this._ChatService.listen('directMessageEdit');
    this.listenDirectMessageEditResponse$ = this._ChatService.listen('directMessageEditResponse');
    this.listenDirectMessageAcknowledge$ = this._ChatService.listen('directMessageAcknowledge');
    this.listenDirectMessageAcknowledgeResponse$ = this._ChatService.listen('directMessageAcknowledgeResponse');
    this.listenDirectMessageError$ = this._ChatService.listen('directMessageError');

    this.listenGroupMessage$ = this._ChatService.listen('groupMessage');
    this.listenGroupMessageReply$ = this._ChatService.listen('groupMessageReply');
    this.listenGroupMessageAcknowledge$ = this._ChatService.listen('groupMessageAcknowledge');
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
  public emitGroupJoin(message: any) {
    this._ChatService.emit('groupJoin', message);
  }
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