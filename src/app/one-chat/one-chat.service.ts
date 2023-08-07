import { Injectable } from '@angular/core';
import { SwPush } from "@angular/service-worker";
import { Observable } from 'rxjs/internal/Observable';
import { io } from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { HttpService } from '../core/services/http/http.service';
import { userAdaptor } from '../shared/adaptor/user.adaptor';
import { User, UserResponse } from '../shared/models/user.model';
import { ConversationUserResponse, ConversationUsers, CreateChat, GroupDetails, Message, MessageResponse } from './models/chat.model';
import { EOD, EODResponse } from './models/eod.model';
import { EODAdapter, MessageAdapter, conversationUserAdapter } from './one-chat-adaptor/one-chat.adaptor';
import { Subject } from 'rxjs/internal/Subject';
import { map } from 'rxjs/internal/operators/map';
import { UtilityService } from '../shared/services/utility.service';

@Injectable()

export class OneChatService {

  /** variable for base url */
  public baseUrl: string;
  /** variable for user Id */
  public userId: string;
  /** variable for socket */
  public socket: any;
  /** Subject for recent chat Id */
  public chatId: Subject<string>;


  constructor(
    private _http: HttpService,
    private _conversationAdapter: conversationUserAdapter,
    private _userAdaptor: userAdaptor,
    private _messageAdaptor: MessageAdapter,
    private _eodAdapter: EODAdapter,
    private _utilityService: UtilityService
  ) {
    this.socket = io(environment.socketUrl);
    this.baseUrl = environment.baseURL;
    this.chatId = new Subject();
  }

  /**
 * @name sendPushNotification
 * @param sub, data 
 * @returns observable
 * @description This method is used to send push notification to client
 */
  private sendPushNotification(sub: any, data: any): Observable<any> {
    const url: string = this.baseUrl + `push-notification`;
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
          if(this._utilityService.subscriber !== null)
          this.sendPushNotification(this._utilityService.subscriber, data).subscribe();
        }
        if (eventname === 'group:message') {
          fn('group message')
          if(this._utilityService.subscriber !== null)
          this.sendPushNotification(this._utilityService.subscriber, data).subscribe();
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
        if (eventname === 'eod:status') {
          fn('eod')
          if(this._utilityService.subscriber !== null)
          this.sendPushNotification(this._utilityService.subscriber, data).subscribe();
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
        console.log(response)
        this.getRecentChatId(response)
      })
    } else if (eventname === 'group:message') {
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
    } else if (eventname === 'eod:status') {
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
     * @description This method is called to get all the users data
    */
  public getAllUserData(): Observable<User[]> {
    const url: string = this.baseUrl + 'user/';
    return this._http.httpGetRequest(url).pipe(
      map((res: any) => {
        res.data.data = res.data.docs.map((users: UserResponse) => this._userAdaptor.toResponse(users));
        return res.data.data
      })
    )
  }

  /**
     * @name getConversationUser
     * @returns observable
     * @description This will return all the users who have started conversation with the sender
    */
  public getConversationUser(): Observable<ConversationUsers[]> {
    this.userId = localStorage.getItem('userId')
    const url: string = this.baseUrl + `user/` + this.userId;
    return this._http.httpGetRequest(url).pipe(
      map((res: any) => {
        res.data.doc = res.data.doc.map((user: ConversationUserResponse) => this._conversationAdapter.toResponse(user))
        return res.data.doc
      })
    )
  }

  /**
     * @name getChatMessages
     * @param chatId 
     * @returns Observable
     * @description This will get the data of all the messages as per the chatId
     */
  public getChatMessages(chatId: string): Observable<Message[]> {
    const url: string = this.baseUrl + `message?chat=` + chatId;
    return this._http.httpGetRequest(url).pipe(
      map((res: any) => {
        res.data.data = res.data.docs.map((messages: MessageResponse) => this._messageAdaptor.toResponse(messages));
        return res.data.data;
  
      })
    )
  }

  /**
   * @name postNewChat
   * @param newChat 
   * @returns This method will post the data when the user will start the conversation with another new user
   */
  public postNewChat(newChat: CreateChat): Observable<CreateChat> {
    const url: string = this.baseUrl + `chat`
    return this._http.httpPostRequest(url, newChat).pipe(
      map((res: any) => res.data.doc)
    )
  }

  /**
   * @name postNewChat
   * @param newChat 
   * @returns This method will post the data of new
   */
  public postNewGroup(newGroup: GroupDetails): Observable<GroupDetails> {
    const url: string = this.baseUrl + `chat`
    return this._http.httpPostRequest(url, newGroup)
  }

  /**
   * @name getEODReports
   * @param id 
   * @returns This method is used to get EOD Reports
   */
  public getEODReports(id: string): Observable<EOD[]> {
    const url: string = this.baseUrl + `eod/?chatId=` + id;
    return this._http.httpGetRequest(url).pipe(
      map((res) => {
        res.data.data = res.data.docs.map((eod: EODResponse) => this._eodAdapter.toResponse(eod));
        return res.data.data;
    
      }))
  }

  /**
   * @name logOutUser
   * @description This method is used to log out the user
   */
  public logOutUser(email: string): Observable<any> {
    const url: string = this.baseUrl + `user/log-out`;
    let res = {
      email:email
    }
    return this._http.httpPostRequest(url, res);
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

  /**
   * @name getRecentChatId
   * @param response 
   * @description This method is used to get the recent chat Id through socket
   */
  public getRecentChatId(response: string): void {
    let splitData: string[] = response.split(' ');
    if (splitData.length === 3)
      this.chatId.next(splitData[2])
  }

  /**
   * @name disconnectSocket
   * @description This method will disconnect the socket
   */
  public disconnectSocket(): void {
    this.socket.disconnect();
  }
}
