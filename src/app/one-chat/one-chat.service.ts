import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { HttpService } from '../core/services/http/http.service';
import { Chat, NewUser } from '../shared/models/user.model';
import { CreateChat, Message, NewMessage } from './models/chat.model';
import { allUserAdaptor, MessageAdaptor } from './one-chat-adaptor/one-chat.adaptor';

@Injectable()

export class OneChatService {

  socket = io('wss://anonychat.onrender.com');
  // socket = io('http://172.16.3.107:21321');
  public api:string;
  public userId:string | null;
  
  constructor(
    private _http:HttpService,
    private _allUserAdaptor:allUserAdaptor,
    private _messageAdaptor:MessageAdaptor
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
      map((res:any) => this._allUserAdaptor.toResponse(res.data.doc))
    )
  }

  /**
   * @name getAllUserData
   * @returns 
   * @description This api is called to get all the users data
   */
  public getOnlyLeads():Observable<NewUser[]>{
    const url:string = this.api + 'users/?role=lead';
    return this._http.httpGetRequest(url).pipe(
      map((res:any) => this._allUserAdaptor.toResponse(res.data.doc))
    )
  }

  /**
   * @name getConversationUser
   * @returns obsverable
   * @description This will return all the users who have started conversation with the sender
   */
  public getConversationUser():Observable<Chat[]>{
    const url:string = this.api + `users/` + this.userId;
    return this._http.httpGetRequest(url).pipe(
      map((res:any) => res.data.doc.chats)
    )
  }
  
  /**
   * @name getChatMessages
   * @param chatId 
   * @returns Observable
   * @description This will get the data of all the messages as per the chatId
   */
  public getChatMessages(chatId:string):Observable<NewMessage[]>{
    const url:string = this.api + `messages?chat=` + chatId;
    return this._http.httpGetRequest(url).pipe(
      map((res:any) => this._messageAdaptor.toResponse(res.data.doc))
    )
  }
  
  /**
   * @name postNewChat
   * @param newChat 
   * @returns This method will post the data when the user will start the conversation with another new user
   */
  public postNewChat(newChat:CreateChat):Observable<CreateChat>{
    const url:string = this.api + `chats`  
    return this._http.httpPostRequest(url,newChat).pipe(
      map((res:any) => res.data.doc)
    )  
  }

  /**
   * @name setMap
   * @description This method will setMapper for the socket
   */
  public setMap(){
    this.socket.on('connect', () => {
      this.socket.emit('setMapper', {userId: this.userId, socketId:this.socket.id})
    })
  }
}
