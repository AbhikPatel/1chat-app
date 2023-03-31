import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Message, NewMessage } from 'src/app/one-chat/models/chat.model';
import { NewUser } from 'src/app/shared/models/user.model';
import { ChatMessagePresenterService } from '../chat-message-presenter/chat-message-presenter.service';

@Component({
  selector: 'app-chat-message-presentation',
  templateUrl: './chat-message-presentation.component.html',
  viewProviders: [ChatMessagePresenterService],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessagePresentationComponent implements OnInit {

  @Input() public set getChat(v: NewMessage[] | null) {
    this._getChat = v;
  }
  public get getChat(): NewMessage[] | null {
    return this._getChat;
  }

  @Input() public set getReceiverData(v: NewUser | null) {
    if (v){
      this._getReceiverData = v;
    }
  }
  public get getReceiverData(): NewUser | null {
    return this._getReceiverData;
  }

  @Output() public emitChat: EventEmitter<string>;
  public destroy: Subject<void>;
  public chatGroup: FormGroup;
  public senderId: string | null;
  private _getChat: NewMessage[] | null;
  private _getReceiverData: NewUser;

  constructor(
    private _service: ChatMessagePresenterService,
    private _route:Router
  ) {
    this.destroy = new Subject();
    this.emitChat = new EventEmitter();
    this.chatGroup = this._service.getGroup();
    this._getChat = [];
    this.senderId = localStorage.getItem('userId');
    this._getReceiverData = {} as NewUser;
  }

  ngOnInit(): void {

  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  public onSubmit() {
    this.emitChat.emit(this.chatGroup.value.message);
    this.chatGroup.reset();
  }

  public convertPhoto(profileImg?: string) {
    let converter = 'http://172.16.3.107:21321/img/users/' + profileImg
    return profileImg ? converter : '../../../../../../assets/images/avatar.png'
  }

  public onLogOut(){
    this._route.navigateByUrl('/login');
    localStorage.clear();
  }
}
