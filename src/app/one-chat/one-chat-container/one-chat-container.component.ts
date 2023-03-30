import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Chat, NewUser } from 'src/app/shared/models/user.model';
import { Message } from '../models/chat.model';
import { OneChatService } from '../one-chat.service';

@Component({
  selector: 'app-one-chat-container',
  templateUrl: './one-chat-container.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class OneChatContainerComponent implements OnInit{

  public destroy:Subject<void>;
  public listen$:Observable<any>;
  public newMessage$:Observable<Message>;
  public allUser$:Observable<NewUser[]>;
  public conversationUser$:Observable<Chat[]>;
  public getMessages$:Observable<Message[]>;

  constructor(
    private _service:OneChatService
  ){
    this.destroy = new Subject();
    this.listen$ = new Observable();
    this.newMessage$ = new Observable();
    this.allUser$ = new Observable();
    this.conversationUser$ = new Observable();
    this.getMessages$= new Observable();
  }

  ngOnInit(): void {
    this.allUser$ = this._service.getAllUserData();
    this.conversationUser$ = this._service.getConversationUser();
    this.listen$ = this._service.listen('welcome');
    this.newMessage$ = this._service.listen('chat');
  }

  ngOnDestroy(){
    this.destroy.next();
    this.destroy.complete();
  }

  public getConversationId(chatId:string){
    this.getMessages$ = this._service.getChatMessages(chatId)
  }

  public getChatObject(chat:Message){
    this._service.emit('chat', chat)
  }
}
