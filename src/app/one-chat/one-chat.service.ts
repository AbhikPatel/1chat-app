import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { HttpService } from '../core/services/http/http.service';
import { NewUser } from '../shared/models/user.model';
import { ConversationUser, CreateChat, NewMessage } from './models/chat.model';
import { ConversationUserAdaptor, MessageAdaptor, allUserAdaptor } from './one-chat-adaptor/one-chat.adaptor';

@Injectable()

export class OneChatService {

  // socket = io('wss://anonychat.onrender.com');
  socket = io('http://172.16.3.107:2132');
  public api: string;
  public userId: string;

  constructor(
    private _http: HttpService,
    private _allUserAdaptor: allUserAdaptor,
    private _messageAdaptor: MessageAdaptor,
    private _conversationUser: ConversationUserAdaptor,
  ) {
    this.api = environment.baseURL;
  }

  /**
   * @name listen
   * @param eventname 
   * @returns observable
   * @description This method is used to listen the socket
   */
  public listen(eventname: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventname, (data: any, fn: any) => {
        if (eventname === 'dm:message')
          fn('received')
        if (eventname === 'dm:messageRead')
          fn('read')
        subscriber.next(data);
      })
    })
  }

  /**
   * @name emit
   * @param eventname 
   * @param data 
   * @description This method will emit the data as per the eventname
   */
  public emit(eventname: string, data: any): void {
    if (eventname === 'dm:message') {
      this.socket.emit(eventname, data, (response: any) => {
        console.log(response);
      })
    } else if (eventname === 'dm:messageRead') {
      this.socket.emit(eventname, data, (response: any) => {
        console.log(response);
      })
    } else {
      this.socket.emit(eventname, data);
    }
  }

  /**
   * @name getAllUserData
   * @returns 
   * @description This api is called to get all the users data
  */
  public getAllUserData(): Observable<NewUser[]> {
    const url: string = this.api + 'user/';
    return this._http.httpGetRequest(url).pipe(
      map((res: any) => this._allUserAdaptor.toResponse(res.data.data))
    )
  }


  /**
   * @name getConversationUser
   * @returns observable
   * @description This will return all the users who have started conversation with the sender
  */
  public getConversationUser(): Observable<ConversationUser[]> {
    this.userId = localStorage.getItem('userId')
    const url: string = this.api + `user/` + this.userId;
    return this._http.httpGetRequest(url).pipe(
      map((res: any) => this._conversationUser.toResponse(res.data.doc))
    )
  }

  /**
   * @name getChatMessages
   * @param chatId 
   * @returns Observable
   * @description This will get the data of all the messages as per the chatId
   */
  public getChatMessages(chatId: string): Observable<NewMessage[]> {
    const url: string = this.api + `message?chat=` + chatId;
    return this._http.httpGetRequest(url).pipe(
      map((res: any) => this._messageAdaptor.toResponse(res.data.data))
    )
  }

  /**
   * @name postNewChat
   * @param newChat 
   * @returns This method will post the data when the user will start the conversation with another new user
   */
  public postNewChat(newChat: CreateChat): Observable<CreateChat> {
    const url: string = this.api + `chat`
    return this._http.httpPostRequest(url, newChat).pipe(
      map((res: any) => res.data.data)
    )
  }

  /**
   * @name setMap
   * @description This method will setMapper for the socket
   */
  public setMap(): void {
    this.userId = localStorage.getItem('userId')
    this.socket.on('connect', () => {
      this.socket.emit('dm:mapper', { userId: this.userId, socketId: this.socket.id })
    })
  }
}
