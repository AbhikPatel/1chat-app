import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { HttpService } from '../core/services/http/http.service';
import { NewUser } from '../shared/models/user.model';
import { Conversation, CreateChat, NewMessage } from './models/chat.model';
import { MessageAdaptor, allUserAdaptor } from './one-chat-adaptor/one-chat.adaptor';
import { SwPush } from "@angular/service-worker";

@Injectable()

export class OneChatService {
  
  public api: string;
  public userId: string;
  public subscriber: any;
  public socket:any;

  // Voluntary Application Server Identity to send push notification
  private readonly VAPID_PUBLIC_KEY: string = "BKX5wA9WxBSYJZWvQtdgD-1rknSL5ejHQd25tUxl5bM9QkNrQVms__OnS1cbRxsJ96E09gKruA8pOcEv7XTfSc4";

  constructor(
    private _http: HttpService,
    private _allUserAdaptor: allUserAdaptor,
    private _messageAdaptor: MessageAdaptor,
    private swPush: SwPush,
  ) {
    this.socket = io(environment.socketUrl);
    this.api = environment.baseURL;
    window.addEventListener('load', () => {
      console.log('trying to subscribe')
      this.subscribeToPushNotification();
    })
  }


  /**
   * @name subscribeToPushNotification
   * @description This method is used to subscribe client to push notification
  */
  private subscribeToPushNotification(): void {
    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    })
      .then(sub => {
        console.log(sub);
        this.subscriber = sub
      })
      .catch(err => console.error("Could not subscribe to notifications", err));
  }

  /**
 * @name sendPushNotification
 * @param sub, data 
 * @returns observable
 * @description This method is used to send push notification to client
 */
  private sendPushNotification(sub: any, data: any): Observable<any> {
    const url: string = this.api + `push-notification`;
    return this._http.httpPostRequest(url, { sub, data })
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
        if (eventname === 'dm:message') {
          fn('received')
          this.sendPushNotification(this.subscriber, data).subscribe();
        }
        if (eventname === 'dm:messageRead') {
          fn('read')
        }
        if (eventname === 'dm:messageEdit') {
          fn('Edit')
        }
        if (eventname === 'dm:messageReply') {
          fn('reply')
        }
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
    } else if (eventname === 'dm:messageEdit') {
      this.socket.emit(eventname, data, (response: any) => {
        console.log(response);
      })
    } else if (eventname === 'dm:messageReply') {
      this.socket.emit(eventname, data, (response: any) => {
        console.log(response);
      })
    }else {
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
  public getConversationUser(): Observable<Conversation[]> {
    this.userId = localStorage.getItem('userId')
    const url: string = this.api + `user/` + this.userId;
    return this._http.httpGetRequest(url).pipe(
      map((res: any) => res.data.doc)
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
