import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { userAdaptor } from 'src/app/shared/adaptor/user.adaptor';
import { environment } from 'src/environments/environment';
import { HttpService } from '../http/http.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /** token for authentication */
  public userToken: any;
  /** base URL for http request */
  public baseUrl: string;

  constructor(
    private _http: HttpService,
    private _adapt: userAdaptor,
    private _route: Router
  ) {
    this.baseUrl = environment.baseURL;
  }

  /**
   * @name loginUser
   * @param credentials 
   * @returns http Post request 
   * @description This method will call the post API for login to get user info
   */
  public loginUser(credentials: any): Observable<any> {
    const url: string = this.baseUrl + 'user/log-in';
    return this._http.httpPostRequest(url, credentials).pipe(
      map((res) => {
        console.log(res);
        
        localStorage.setItem('token', res.accessToken)
        const userLocalStorageData = {
          role: res.doc.role,
          userId: res.doc._id,
          email: res.doc.email,
          profile: res.doc.photo,
          fullName: res.doc.first_name + ' ' + res.doc.last_name
        }
        localStorage.setItem('userLocalStorageData', JSON.stringify(userLocalStorageData))
        return this._adapt.toResponse(res.doc);
      })
    )
  }

  /**
   * @name getToken
   * @returns token
   */
  public getToken(): string {
    this.userToken = localStorage.getItem('token') ?? '';
    return this.userToken;
  }

  /**
   * @name getLogOutEmail
   * @param email 
   * @description This method will log out the user
   */
  public getLogOutEmail(mail: string): void {
    localStorage.clear();
    this._route.navigateByUrl('/login');
    this.logOutUser(mail).subscribe();
  }

  /**
   * @name logOutUser
   * @description This method is used to log out the user
   */
  public logOutUser(email: string): Observable<any> {
    const url: string = this.baseUrl + `user/log-out`;
    let requestBody = {
      email: email
    }
    return this._http.httpPostRequest(url, requestBody);
  }
}
