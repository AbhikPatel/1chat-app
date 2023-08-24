import { Injectable } from '@angular/core';
import { HttpService } from '../core/services/http/http.service';
import { userAdaptor } from '../shared/adaptor/user.adaptor';
import { environment } from 'src/environments/environment';
import { Observable, map } from 'rxjs';
import { User, UserResponse } from '../shared/models/user.model';

@Injectable()
export class ChatService {
  /** variable for base url */
  public baseUrl: string;
  constructor(private _Http: HttpService,
    private _userAdaptor: userAdaptor
  ) {
    this.baseUrl = environment.baseURL;
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

}
