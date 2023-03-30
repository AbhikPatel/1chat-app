import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable()

export class ChatMessagePresenterService {

  constructor(
    private _fb:FormBuilder
  ) { }

  public getGroup(){
    return this._fb.group({
      message:['',[Validators.required]]
    })
  }
}
