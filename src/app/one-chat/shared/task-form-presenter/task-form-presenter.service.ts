import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class TaskFormPresenterService {
  // editorContent = '<p>Initial Content</p>';
  constructor(private _fb: FormBuilder) { }
  public eodFormGroup(): FormGroup {
    return this._fb.group({
      title: ['', Validators.required],
      stateType: ['', Validators.required],
      activityType: ['', Validators.required],
      description:['', Validators.required],
      blocker: [''],
      originalTime: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      remainingTime: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      competeTime: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    })

  }
}
