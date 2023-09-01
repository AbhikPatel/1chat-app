import { Injectable } from '@angular/core';
import { HttpService } from '../core/services/http/http.service';
import { userAdaptor } from '../shared/adaptor/user.adaptor';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { User, UserResponse } from '../shared/models/user.model';
import { ConversationUsers,ConversationUserResponse } from './models/chat.model';
import { conversationUserAdapter } from './chat-adaptor/chat.adaptor';
import { CommonService } from '../shared/services/common.service';
import { login } from './models/login.model';

@Injectable()
export class ChatService {
  /** variable for base url */
  public baseUrl: string;
    /** This variable will store id of the user */
    public loginUserObject: login;
  constructor(private _Http: HttpService,
    private _userAdaptor: userAdaptor,
    private _conversationAdapter: conversationUserAdapter,
    private _commonService:CommonService
  ) {
    this.baseUrl = environment.baseURL;
    this.loginUserObject = this._commonService.getLoginDetails();
    console.log( this.loginUserObject);
    
  }

  /**
   * @name getAllUserData
   * @returns 
   * @description This method is called to get all the users data
  */
  public getAllUserData(): Observable<User[]> {
    return this._Http.httpGetRequest(`${this.baseUrl}user/`).pipe(
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
  return this._Http.httpGetRequest(url).pipe(
    map((res: any) => {
      res.data.doc = res.data.doc.map((user: ConversationUserResponse) => this._conversationAdapter.toResponse(user))
      return res.data.doc
    })
  )
}

}
