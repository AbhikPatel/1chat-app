import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { LoaderService } from '../loader/loader.service';
import { ToasterService } from '../toaster/toaster.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _service: LoaderService,
    private _toaster: ToasterService,
    private _authService: AuthService
  ) { }

  /**
   * @name intercept
   * @param request 
   * @param next 
   * @returns 
   */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token')
    const modifiedReq = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`), });
    this._service.allUsers.next(true)
    this._service.conversation.next(true)
    this._service.eod.next(true)
    return next.handle(modifiedReq).pipe(
      finalize(() => {
        // Stop loading indicators when the request is complete
        this._service.allUsers.next(false);
        this._service.conversation.next(false);
        this._service.eod.next(false);
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        switch (errorResponse.status) {
          case 404: this._toaster.error(errorResponse.message);
            break;
          case 401: this._toaster.error(errorResponse.error.message);
            break;
          case 500: this._toaster.error(errorResponse.error.message);
                    this.logOut();
            break;
        }
        return throwError(null)
      })
    )
  }

  /**
   * @name logOut
   * @description This method will log out the user
   */
  public logOut(): void {
    let email: string = localStorage.getItem('email') ?? '';
    if (email)
      this._authService.getLogOutEmail(email);
  }
}
