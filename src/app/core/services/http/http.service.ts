import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private _http: HttpClient
  ) { }

  /**
   * @name createHeader
   * @param data 
   * @returns Creates header if there is need of interception
   */
  public createHeader(data: any) {
    const header = new HttpHeaders({
      'api-verison': data
    })
    return header
  }

  /**
   * @name httpGetRequest
   * @param url 
   * @param version 
   * @returns API get request
   * @description generic get request to be used throughout the application.
   */
  public httpGetRequest<T>(url: string, version: string = '1.0'): Observable<any> {
    const interceptableHeader: HttpHeaders = this.createHeader(version)
    return this._http.get<T>(url, { headers: interceptableHeader })
  }

  /**
   * @name httpDeleteRequest
   * @param url 
   * @param version 
   * @returns API Delete request
   * @description generic get request to be used throughout the application.
   */
  public httpDeleteRequest<T>(url: string, version: string = '1.0'): Observable<any> {
    const interceptableHeader: HttpHeaders = this.createHeader(version)
    return this._http.delete<T>(url, { headers: interceptableHeader })
  }

  /**
   * @name httpPostRequest
   * @param url 
   * @param version 
   * @param requestBody 
   * @returns API Post request
   * @description generic post request to be used throughout the application.
   */
  public httpPostRequest<T>(url: string, requestBody: any, version: string = '1.0'): Observable<any> {
    const interceptableHeader: HttpHeaders = this.createHeader(version)
    return this._http.post<T>(url, requestBody, { headers: interceptableHeader })
  }

  /**
   * @name httpPutRequest
   * @param url 
   * @param version 
   * @param requestBody 
   * @returns API put request
   * @description generic post request to be used throughout the application.
   */
  public httpPutRequest<T>(url: string, requestBody: any, version: string = '1.0'): Observable<any> {
    const interceptableHeader: HttpHeaders = this.createHeader(version)
    return this._http.put<T>(url, requestBody, { headers: interceptableHeader })
  }
}
