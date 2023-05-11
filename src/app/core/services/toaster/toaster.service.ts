import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class ToasterService {

  constructor(
    private _toastr: ToastrService
  ) { }

  /**
   * @name success
   * @param message 
   * @description This method will call for the success toastr
   */
  public success(message: string): void {
    this._toastr.success(message);
  }

  /**
   * @name error
   * @param message 
   * @description This method will call for the error toastr
   */
  public error(message: string): void {
    this._toastr.error(message);
  }
  /**
   * @name info
   * @param message 
   * @description This method will call for the info toastr
   */
  public info(message: string): void {
    this._toastr.info(message);
  }
  /**
   * @name warning
   * @param message 
   * @description This method will call for the warning toastr
   */
  public warning(message: string): void {
    this._toastr.warning(message);
  }
}
