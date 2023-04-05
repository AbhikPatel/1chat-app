import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()

export class ChatMessagePresenterService {

  constructor(
    private _fb:FormBuilder
  ) { }

  /**
   * @name getGroup
   * @returns formGroup
   * @description This method is use to create form Group
   */
  public getGroup(): FormGroup{
    return this._fb.group({
      message:['',[Validators.required]]
    })
  }
}
