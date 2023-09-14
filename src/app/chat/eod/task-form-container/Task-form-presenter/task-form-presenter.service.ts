import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { EOD, EditEodTasks, Task, TaskResponse, } from 'src/app/chat/models/eod.model';

@Injectable()
export class TaskFormPresenterService {
  /** Observable for Task Report details */
  public taskDetails$: Observable<Task>;
  /** Subject for Task report details */
  private taskDetails: Subject<Task>;
  /** Observable for Task Report details */
  public editTaskDetails$: Observable<EditEodTasks>;
  /** Subject for Task report details */
  private editTaskDetails: Subject<EditEodTasks>;
  /** variable to store the last Eod ID  */
  public eodId: string;
  constructor(private _fb: FormBuilder) {
    this.taskDetails$ = new Observable();
    this.taskDetails = new Subject();
    this. editTaskDetails$= new Observable();
    this.editTaskDetails = new Subject();
    this.taskDetails$ = this.taskDetails.asObservable();
    this.editTaskDetails$ = this.editTaskDetails.asObservable();

  }
/**
 * Eod Form Group Create and return
 * @returns 
 */
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
/**
 * @name getEodResponse
 * @param eodResponses 
 * @description This Method find last eod id in given EodResponse Array
 */
  public getEodResponse(eodResponses:any){
    const spliceEodResponses= eodResponses.splice(-1);
     this.eodId= spliceEodResponses[0]._id;          
  }
  /**
   * @name getEodTasks
   * @param tasks 
   * @description This method next task Details  with eod Id
   */
  public addEodTasks(tasks: Task): void {
    tasks.eodId=this.eodId;
    this.taskDetails.next(tasks);
  }
  /**
   * @name getEodTasks
   * @param tasks 
   * @description This method next Edit task Details  with eod Id
   */
  public editEodTasks(editTask:TaskResponse,id:number): void {
             editTask.eodId=this.eodId;
            const editData:EditEodTasks={
                 task:editTask,
                 editId:id
            }
          this.editTaskDetails.next(editData);
  }
  
}