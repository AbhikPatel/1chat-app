import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { userAdaptor } from 'src/app/shared/adaptor/user.adaptor';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public userToken: any;
  public api: string;

  constructor(
    private _http: HttpService,
    private _adapt: userAdaptor
  ) {
    this.api = environment.baseURL
  }

  /**
   * @name loginUser
   * @param credentials 
   * @returns http Post request 
   * @description This method will call the post API for login to get user info
   */
  public loginUser(credentials: any): Observable<any> {
    const url: string = this.api + 'users/log-in';
    return this._http.httpPostRequest(url, credentials).pipe(
      map((res) => {
        localStorage.setItem('token', res.token)
        localStorage.setItem('role', res.data.doc.role)
        localStorage.setItem('userId', res.data.doc._id)

        return this._adapt.toResponse(res.data.doc)
      })
    )
  }

  /**
   * @name getToken
   * @returns token
   */
  public getToken(): string {
    this.userToken = localStorage.getItem('token') ?? '';
    return this.userToken
  }
}
