import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { User } from 'src/app/shared/models/user.model';
import { ConversationUsers, CreateChat, Message, MessageRead, Typing } from '../../models/chat.model';
import { OneChatPresentationBase } from '../one-chat-presentation-base/one-chat-presentation.base';
import { OneChatPresenterService } from '../one-chat-presenter/one-chat-presenter.service';
import { EOD } from '../../models/eod.model';

@Component({
  selector: 'app-one-chat-presentation',
  templateUrl: './one-chat-presentation.component.html',
  viewProviders: [OneChatPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneChatPresentationComponent extends OneChatPresentationBase implements OnInit, OnDestroy {

  /** This property is used to get the message read chat Id */
  @Input() public set getMessageReadData(message: MessageRead) {
    if (message) {
      this._getMessageReadData = message;
      this._oneChatPresenterService.getReadChatId(message.chatId);
    }
  }

  public get getMessageReadData(): MessageRead {
    return this._getMessageReadData;
  }

  /** This property is used to get all the user details from container component */
  @Input() public set allUsers(users: User[]) {
    if (users) {
      this._allUsers = users;
      this._oneChatPresenterService.getAllUsers(users);
    }
  }

  public get allUsers(): User[] {
    return this._allUsers;
  }

  /** This property will get the new generated chatId */
  @Input() public set getNewGeneratedChatId(chatId: string) {
    if (chatId) {
      this._getNewGeneratedChatId = chatId;
      this._oneChatPresenterService.newGeneratedChatId(chatId);
    }
  }
  public get getNewGeneratedChatId(): string {
    return this._getNewGeneratedChatId;
  }

  /** This property will get the conversation users from the container */
  @Input() public set getMessages(messages: Message[]) {
    if (messages) {
      this._getMessages = messages;
      this._oneChatPresenterService.getChatMessagesArray(messages);
    }
  }
  public get getMessages(): Message[] {
    return this._getMessages;
  }

  /** This property will get the conversation users from the container */
  @Input() public set getNewSocketMessage(message: Message) {
    if (message) {
      this._getNewSocketMessage = message;
      this._oneChatPresenterService.newMessageFromSocket(message)
    }
  }
  public get getNewSocketMessage(): Message {
    return this._getNewSocketMessage;
  }

  /** This property will get the conversation users from the container */
  @Input() public set getConversationUsers(users: ConversationUsers[]) {
    if (users) {
      this._getConversationUsers = users;
      this._oneChatPresenterService.getConversationUsers(users);
    }
  }
  public get getConversationUsers(): ConversationUsers[] {
    return this._getConversationUsers;
  }

  /** This property will get the EOD Report from the container */
  @Input() public set getEODfromSocket(eod: EOD) {
    if (eod) {
      this._getEODfromSocket = eod;
      this._oneChatPresenterService.eodFromSocket(eod);
    }
  }
  public get getEODfromSocket(): EOD {
    return this._getEODfromSocket;
  }

  /** This property will get the edited message from the container */
  @Input() public set getEditedMessage(message: Message) {
    if (message) {
      this._getEditedMessage = message;
      this._oneChatPresenterService.getEditedMessage(message);
    }
  }
  public get getEditedMessage(): Message {
    return this._getEditedMessage;
  }

  /** This property will get the recent chat Id from the container */
  @Input() public set getRecentChatId(id: string) {
    if (id) {
      this._getRecentChatId = id;
      this._oneChatPresenterService.getRecentId(id);
    }
  }
  public get getRecentChatId(): string {
    return this._getRecentChatId;
  }

  /** This property is used to emit the current chat Id */
  @Output() public chatId: EventEmitter<string>;
  /** This property is used to emit the new message */
  @Output() public newMessage: EventEmitter<Message>;
  /** This property is used to emit the new conversation */
  @Output() public newConversationChat: EventEmitter<CreateChat>;
  /** This property is used to emit the typing data into socket*/
  @Output() public socketTyping: EventEmitter<Typing>;

  /** Observable for conversation users */
  public conversationUser$: Observable<ConversationUsers[]>;
  /** Observable for chat messages array */
  public chatArray$: Observable<Message[]>;
  /** Observable for receiver conversation data */
  public receiverConversationData$: Observable<ConversationUsers>;
  /** Observable for details of all the users */
  public allUsers$: Observable<User[]>;

  /** Stops the subcription on ngDestroy */
  private destroy: Subject<void>;
  /** This property is used for getter setter */
  private _getMessages: Message[];
  private _getConversationUsers: ConversationUsers[];
  private _getNewSocketMessage: Message;
  private _allUsers: User[];
  private _getNewGeneratedChatId: string;
  private _getMessageReadData: MessageRead;
  private _getEODfromSocket: EOD;
  private _getEditedMessage: Message;
  private _getRecentChatId:string;

  constructor(
    private _oneChatPresenterService: OneChatPresenterService,
  ) {
    super();

    this.receiverConversationData$ = new Observable();
    this.conversationUser$ = new Observable();
    this.chatArray$ = new Observable();
    this.allUsers$ = new Observable();

    this.chatId = new EventEmitter();
    this.newMessage = new EventEmitter();
    this.newConversationChat = new EventEmitter();
    this.socketTyping = new EventEmitter();

    this.destroy = new Subject();
  }

  ngOnInit(): void {
    this.props();
  }

  /**
   * @name props
   * @description This method is called in ngOnInit
   */
  private props(): void {
    this.chatArray$ = this._oneChatPresenterService.chatArray$;
    this.receiverConversationData$ = this._oneChatPresenterService.receiverConversation$;
    this.conversationUser$ = this._oneChatPresenterService.conversationUser$;
    this._oneChatPresenterService.newMessage$.subscribe((message: Message) => this.newMessage.emit(message));
    this._oneChatPresenterService.createChat$.subscribe((chat: CreateChat) => this.newConversationChat.emit(chat));
    this._oneChatPresenterService.currentChatId$.subscribe((id: string) => this.chatId.emit(id));
    this.allUsers$ = this._oneChatPresenterService.allUsers$;
    this._oneChatPresenterService.typingInfo$.subscribe((typing: Typing) => this.socketTyping.emit(typing));
  }

  /**
   * @name getCurrentConversation
   * @params conversation
   * @description This method is used to emit the chat Id
   */
  public getCurrentConversation(conversation: ConversationUsers): void {
    this._oneChatPresenterService.getReceiversConversation(conversation);
  }

  /**
   * @name getChatData
   * @param chat 
   * @description This method is used to get the chat data
   */
  public getChatData(chat: string): void {
    this._oneChatPresenterService.getChatData(chat, this.repliedToMessage);
    this.repliedToMessage = undefined;
  }

  /**
   * @name getMessageTyping
   * @description This method is used to 
   */
  public getMessageTyping(): void {
    this._oneChatPresenterService.getMessageTyping();
  }

  /**
   * @name ngOnDestroy
   * @description This method is called the component is destroyed
   */
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
