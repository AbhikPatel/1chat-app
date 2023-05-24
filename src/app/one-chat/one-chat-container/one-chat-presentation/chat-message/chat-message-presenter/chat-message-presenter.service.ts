import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()

export class ChatMessagePresenterService {

  constructor(
    private _fb: FormBuilder,
  ) { }

  /**
   * @name getGroup
   * @returns formGroup
   * @description This method is use to create form Group
   */
  public getGroup(): FormGroup {
    return this._fb.group({
      message: ['', [Validators.required]]
    })
  }

  /**
   * @name getEodGroup
   * @returns form group
   * @desciption This method will return a form group 
   */
  public getEodGroup(): FormGroup {
    return this._fb.group({
      completed: new FormArray([]),
      onGoing: new FormArray([]),
      newLearning: new FormArray([]),
    })
  }
}
