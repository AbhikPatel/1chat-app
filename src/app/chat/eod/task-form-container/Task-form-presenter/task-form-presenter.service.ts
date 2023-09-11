import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { EOD, Task } from 'src/app/chat/models/eod.model';

@Injectable()
export class TaskFormPresenterService {
  /** Observable for Task Report details */
  public eodDetails$: Observable<Task>;
  /** Subject for Task report details */
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
      taskTitle: ['', Validators.required],
      taskState: ['', Validators.required],
      taskActivity: ['', Validators.required],
      taskDescription: ['', Validators.required],
      taskBlocker: [''],
      taskOriginalEstimate: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      taskEffortsRemaining: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      taskEffortsCompleted: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    
    })

  }
  public getEodTasks(tasks: Task): void {
    tasks.eodId='64feafc82d1e7a34fe57e040';
    console.log(tasks);
    this.eodDetails.next(tasks)

  }
}