import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Member, NewUser } from 'src/app/shared/models/user.model';
import { ChatListPresenterService } from '../chat-list-presenter/chat-list-presenter.service';

@Component({
  selector: 'app-chat-list-presentation',
  templateUrl: './chat-list-presentation.component.html',
  viewProviders: [ChatListPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatListPresentationComponent implements OnInit {

  @Input() public set getConversationUser(v: Member[] | null) {
    if (v) {
      this._getConversationUser = v;
      this.onUser(v[0])
    }
  }
  public get getConversationUser(): Member[] | null {
    return this._getConversationUser;
  }

  @Input() public set newConversationUser(v: Member | null) {
    if(v){
      this._newConversationUser = v;
      this._getConversationUser?.push(v)
    }
  }
  public get newConversationUser(): Member | null {
    return this._newConversationUser;
  }

  @Input() public set getAllUser(v: NewUser[] | null) {
    this._getAllUser = v;
  }
  public get getAllUser(): NewUser[] | null {
    return this._getAllUser;
  }

  @Output() public emitChatId: EventEmitter<string>;
  @Output() public emitReceiverId: EventEmitter<string>;
  @Output() public emitNewChatState: EventEmitter<void>;
  @ViewChild('toggle') public toggle: any;
  private _newConversationUser: Member | null;
  private _getConversationUser: Member[] | null;
  private _getAllUser: NewUser[] | null;
  public destroy: Subject<void>;
  public searchText: string;
  public chatId: string;
  public userId: string;

  constructor(
    private _service: ChatListPresenterService
  ) {
    this.destroy = new Subject();
    this._getAllUser = [];
    this.searchText = '';
    this._getConversationUser = [];
    this.chatId = '';
    this.userId = '';
    this._newConversationUser = {} as Member;
    this.emitChatId = new EventEmitter();
    this.emitReceiverId = new EventEmitter();
    this.emitNewChatState = new EventEmitter();
  }

  ngOnInit(): void {
    this.props();
  }

  public props() {
    this._service.newConversationUser$.pipe(takeUntil(this.destroy)).subscribe((user: Member) => this._getConversationUser?.push(user))
  }

  ngOnDestroy() {
    this.destroy.next()
    this.destroy.complete()
  }

  public onNewChat(user: NewUser) {
    let isUser = this.getConversationUser?.find((item: Member) => user._id === item._id)
    if (isUser) {
      this.toggle.nativeElement.checked = false;
      this.onUser(isUser);
    } else {
      this.emitNewChatState.emit();
      this._service.getNewConversationUser(user);
      this.toggle.nativeElement.checked = false;
      this.emitReceiverId.emit(user._id);
      this.userId = user._id;
    }
  }

  public onUser(data: Member) {
    this.chatId = data.chatId;
    this.emitChatId.emit(data.chatId)
    this.emitReceiverId.emit(data._id)
    this.userId = data._id
  }

  public convertPhoto(profileImg: string) {
    // let converter = 'http://172.16.3.107:21321/img/users/' + profileImg;
    let converter = 'https://anonychat.onrender.com/img/users/' + profileImg;
    return profileImg ? converter : '../../../../../../assets/images/avatar.png';
  }
}
