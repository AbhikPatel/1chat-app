import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { HttpService } from '../core/services/http/http.service';
import { Chat, NewUser } from '../shared/models/user.model';
import { Message } from './models/chat.model';
import { allUserAdaptor } from './one-chat-adaptor/one-chat.adaptor';

@Injectable()

export class OneChatService {

  // socket = io('wss://anonychat.onrender.com');
  socket = io('http://172.16.3.107:21321');
  public api:string;
  public userId:string | null;

  constructor(
    private _http:HttpService,
    private _adaptor:allUserAdaptor
  ) { 
    this.api = environment.baseURL;
    this.userId = localStorage.getItem('userId');
    this.setMap();
  }

  /**
   * @name listen
   * @param eventname 
   * @returns observable
   * @description This method is used to listen the socket
   */
  public listen(eventname: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventname, (data: any) => {
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
  public emit(eventname: string, data: any) {
    this.socket.emit(eventname, data, (res:any) => {
      console.log(res);
    });
  }

  /**
   * @name getAllUserData
   * @returns 
   * @description This api is called to get all the users data
   */
  public getAllUserData():Observable<NewUser[]>{
    const url:string = this.api + 'users/';
    return this._http.httpGetRequest(url).pipe(
      map((res:any) => this._adaptor.toResponse(res.data.doc))
    )
  }

  public getConversationUser():Observable<Chat[]>{
    const url:string = this.api + `users/` + this.userId
    return this._http.httpGetRequest(url).pipe(
      map((res:any) => res.data.doc.chats)
    )
  }
  
  public getChatMessages(chatId:string):Observable<Message[]>{
    const url:string = this.api + `messages?chat=` + chatId
    return this._http.httpGetRequest(url).pipe(
      map((res:any) => res.data.doc)
    )
  }

  public setMap(){
    this.socket.on('connect', () => {
      this.socket.emit('setMapper', {userId: this.userId, socketId:this.socket.id})
    })
  }
}
