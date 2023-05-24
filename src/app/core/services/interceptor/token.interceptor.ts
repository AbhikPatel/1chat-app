import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, finalize, of, tap } from 'rxjs';
import { LoaderService } from '../loader/loader.service';
import { ToasterService } from '../toaster/toaster.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _service: LoaderService,
    private _toastr: ToasterService
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
    this._service.loader.next(true)
    return next.handle(modifiedReq).pipe(
      finalize(() => this._service.loader.next(false)),
      tap((event: HttpEvent<any>) => {
        
      }),
      catchError((errorResponse: HttpErrorResponse) => {
        if (errorResponse.status === 404)
          this._toastr.error(errorResponse.message)
        if (errorResponse.status === 401)
          this._toastr.error(errorResponse.error.message)
        return of()
      })
    )
  }
}
