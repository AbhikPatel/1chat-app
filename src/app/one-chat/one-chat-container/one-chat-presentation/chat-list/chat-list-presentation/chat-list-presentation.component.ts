import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
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
    if(v){
      this._getConversationUser = v;
      this.onUser(v[0])
    }
  }
  public get getConversationUser(): Member[] | null {
    return this._getConversationUser;
  }

  @Input() public set getAllUser(v: NewUser[] | null) {
    this._getAllUser = v;
  }
  public get getAllUser(): NewUser[] | null {
    return this._getAllUser;
  }

  @Output() public emitChatId: EventEmitter<string>;
  @Output() public emitReceiverId: EventEmitter<string>;
  private _getConversationUser: Member[] | null;
  private _getAllUser: NewUser[] | null;
  public destroy: Subject<void>;
  public searchText: string;
  public chatId: string;

  constructor(
    private _service: ChatListPresenterService
  ) {
    this.destroy = new Subject();
    this._getAllUser = [];
    this.searchText = '';
    this._getConversationUser = [];
    this.chatId = '';
    this.emitChatId = new EventEmitter();
    this.emitReceiverId = new EventEmitter();
  }

  ngOnInit(): void {
    this.props();
  }

  public props() {
  }

  ngOnDestroy() {
    this.destroy.next()
    this.destroy.complete()
  }

  public onNewChat() {

  }

  public onUser(data: Member) {
    this.chatId = data.chatId;
    this.emitChatId.emit(data.chatId)
    this.emitReceiverId.emit(data._id)
  }

  public convertPhoto(profileImg:string){
    let converter = 'http://172.16.3.107:21321/img/users/' + profileImg
    return profileImg ? converter : '../../../../../../assets/images/avatar.png'
  }
}
