import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class EodTableFormPresenterService {
  constructor(
    private _fb: FormBuilder
  ) { }
   /**
   * @name getEodGroup
   * @returns form group
   * @description This method will return a form group 
   */
   public getEodGroup(): FormGroup {
    return  this._fb.group({
      name: ['', [Validators.required]],
      hours: ['', [Validators.required]],
      description: ['', [Validators.required]],
      blocker: [''],
      type: ['', [Validators.required]],
      isEdit:false
    })
  }
}
