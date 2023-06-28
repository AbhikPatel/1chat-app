import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { EOD, Task } from 'src/app/one-chat/models/eod.model';

@Injectable()

export class ChatMessagePresenterService implements OnDestroy {

  /** Observble for EOD Report details */
  public eodDetails$: Observable<EOD>;
  /** variable to store the ID of the receiver */
  public receiversId: string;

  /** Subject for EOD report details */
  private eodDetails: Subject<EOD>;
  /** Stops the subcription on destroy */
  private destroy: Subject<void>;

  constructor(
    private _fb: FormBuilder
  ) {
    this.eodDetails$ = new Observable();
    this.eodDetails = new Subject();
    this.destroy = new Subject();
    this.eodDetails$ = this.eodDetails.asObservable();
    this.receiversId = '';
  }

  /**
   * @name getEodGroup
   * @returns form group
   * @desciption This method will return a form group 
   */
  public getEodGroup(): FormGroup {
    return this._fb.group({
      completed: this._fb.array([]),
      InProgress: this._fb.array([]),
      newLearning: this._fb.array([]),
    })
  }

  public getEodTasks(tasks: Task[], name: string, id: string): void {
    let eodObj: EOD = {
      employeeName: name,
      position: 'intern',
      department: 'Frontend',
      date: new Date(),
      sender: id,
      receiver: this.receiversId,
      status: tasks,
      chatId:''
    }
    this.eodDetails.next(eodObj)
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
