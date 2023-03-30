import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderService } from '../loader/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private _service:LoaderService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = localStorage.getItem('token')
    const modifiedReq = request.clone({ headers: request.headers.set('Authorization', `Bearer ${token}`), });
    this._service.loader.next(true)
    return next.handle(request).pipe(
      finalize(() => this._service.loader.next(false))
    )
  }
}
