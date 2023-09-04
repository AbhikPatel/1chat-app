import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';


@Injectable()
export class UserListPresenterService {
  constructor(private _fb:FormBuilder) { 
  }
   /**
   * @name getGroup
   * @returns formGroup
   * @description This method is use to reset search box
   */
   public getGroup(): FormGroup {
    return this._fb.group({
      search: ['']
    })
  }
 
}
