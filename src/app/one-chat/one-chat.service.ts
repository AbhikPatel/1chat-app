import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { HttpService } from '../core/services/http/http.service';
import { NewUser, User } from '../shared/models/user.model';
import { allUserAdaptor } from './one-chat-adaptor/one-chat.adaptor';

@Injectable()

export class OneChatService {

  socket = io('wss://anonychat.onrender.com');
  public api:string;

  constructor(
    private _http:HttpService,
    private _adaptor:allUserAdaptor
  ) { 
    this.api = environment.baseURL
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
    this.socket.emit(eventname, data);
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
}
