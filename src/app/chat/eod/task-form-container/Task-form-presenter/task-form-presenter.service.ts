import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { EOD, Task } from 'src/app/chat/models/eod.model';

@Injectable()
export class TaskFormPresenterService {
  /** Observble for EOD Report details */
  public eodDetails$: Observable<Task>;

  /** Subject for EOD report details */
  private eodDetails: Subject<Task>;
  /** variable to store the ID of the receiver */
  public receiversId: string;
  constructor(private _fb: FormBuilder) {
    this.eodDetails$ = new Observable();
    this.eodDetails = new Subject();
    this.eodDetails$ = this.eodDetails.asObservable();
    this.receiversId = '';
  }
  public eodFormGroup(): FormGroup {
    return this._fb.group({
      title: ['', Validators.required],
      stateType: ['', Validators.required],
      activityType: ['', Validators.required],
      description: ['', Validators.required],
      blocker: [''],
      originalTime: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      remainingTime: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      competeTime: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    })

  }

  public getEodTasks(tasks: Task): void {
    this.eodDetails.next(tasks)

  }
}