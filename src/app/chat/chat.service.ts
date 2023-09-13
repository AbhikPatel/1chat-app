import { Injectable } from '@angular/core';
import { HttpService } from '../core/services/http/http.service';
import { userAdaptor } from '../shared/adaptor/user.adaptor';
import { environment } from 'src/environments/environment';
import { Observable, Subject, map } from 'rxjs';
import { User, UserResponse } from '../shared/models/user.model';
import { ConversationUsers, ConversationUserResponse, GroupDetails } from './models/chat.model';
import { EODAdapter, conversationUserAdapter } from './chat-adaptor/chat.adaptor';
import { CommonService } from '../shared/services/common.service';
import { login } from './models/login.model';
import { io } from 'socket.io-client';
import { UtilityService } from '../shared/services/utility.service';
import { EOD, EODResponse, Task } from './models/eod.model';

@Injectable()

export class ChatService {
  /** variable for base url */
  public baseUrl: string;
  /** This variable will store id of the user */
  /** variable for socket */
  public socket: any;
  /** variable for user Id */
  /** Subject for recent chat Id */
  public chatId: Subject<string>;
  public userId: string;
  public loginUserObject: login;
  constructor(private _http: HttpService,
    private _userAdaptor: userAdaptor,
    private _conversationAdapter: conversationUserAdapter,
    private _commonService: CommonService,
    private _utilityService: UtilityService,
    private _eodAdapter: EODAdapter
  ) {
    this.baseUrl = environment.baseURL;
    this.loginUserObject = this._commonService.getLoginDetails();
    this.socket = io(environment.socketUrl);
    this.chatId = new Subject();
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
          if (this._utilityService.subscriber !== null)
            this.sendPushNotification(this._utilityService.subscriber, data).subscribe();
        }
        if (eventname === 'group:message') {
          fn('group message')
          if (this._utilityService.subscriber !== null)
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
          if (this._utilityService.subscriber !== null)
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
   * @name getAllUserData
   * @returns 
   * @description This method is called to get all the users data
  */
  public getAllUserData(): Observable<User[]> {
    return this._http.httpGetRequest(`${this.baseUrl}user/`).pipe(
      map((res: any) => {
        res.data.docs = res.data.docs.map((users: UserResponse) => this._userAdaptor.toResponse(users));
        return res.data.docs
      })
    )
  }

  /**
       * @name getConversationUser
       * @returns observable
       * @description This will return all the users who have started conversation with the sender
      */
  public getConversationUser(): Observable<ConversationUsers[]> {
    const url: string = this.baseUrl + `user/` + this.loginUserObject.userId;
    return this._http.httpGetRequest(url).pipe(
      map((res: any) => {
        res.data.doc = res.data.doc.map((user: ConversationUserResponse) => this._conversationAdapter.toResponse(user))
        return res.data.doc
      })
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
    * @name getEODReports
    * @param id 
    * @returns This method is used to get EOD Reports
    */
  public postTaskReports(taskData: Task): Observable<Task> {
    const url: string = this.baseUrl + `task`;
    return this._http.httpPostRequest(url, taskData)
  }

   /**
    * @name deleteTask
    * @param id 
    * @returns This method is used to Delete task
    */
   public deleteTask(id: string): Observable<string> {
    return this._http.httpDeleteRequest(`${this.baseUrl}task/${id}`)
  }
   /**
    * @name updateTask
    * @param id 
    * @param task 
    * @returns This method is used to edit eod task
    */
   public updateTask(task:any,id: any): Observable<any> {
    return this._http.httpPatchRequest(`${this.baseUrl}task/${id}`,task)
  }
    /**
    * @name updateTask
    * @param id 
    * @param task 
    * @returns This method is used to edit eod task
    */
    public updateEod(Eod:any,id: any): Observable<any> {
      return this._http.httpPatchRequest(`${this.baseUrl}eod/${id}`,Eod)
    }
  /**
  * @name setMap
  * @description This method will setMapper for the socket
  */
  public setMap(): void {
    this.userId = this.loginUserObject.userId
    if (!this.socket.connected) this.socket.connect();
    this.socket.on('connect', () => {
      this.socket.emit('dm:mapper', { userId: this.userId, socketId: this.socket.id })
    })
  }/**
   * @name getStateActivityType
   * @returns This method is used to getStateActivityType
   */
  public getStateActivityType(): Observable<any> {
    const url: string = this.baseUrl + `primeData`;
    return this._http.httpGetRequest(url)
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
