import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { EOD, Task } from 'src/app/one-chat/models/eod.model';

@Injectable()

export class ChatMessagePresenterService implements OnDestroy {

  /** Observble for EOD Report details */
  public eodDetails$: Observable<EOD>;
     /** Observable for  getActivityType */
     public getActivityTypes$: Observable<any>
  /** variable to store the ID of the receiver */
  public receiversId: string;

  /** Subject for EOD report details */
  private eodDetails: Subject<EOD>;
  /** Stops the subcription on destroy */
  private destroy: Subject<void>;
  /** Subject for get all activity type*/
  private  getActivityTypes: Subject<any>;
  constructor(
    private _fb: FormBuilder
  ) {
    this.eodDetails$ = new Observable();
    this.getActivityTypes$ = new Observable();
    this.eodDetails = new Subject();
    this.getActivityTypes = new Subject();
    this.destroy = new Subject();
    this.eodDetails$ = this.eodDetails.asObservable();
    this.getActivityTypes$  = this.getActivityTypes.asObservable();
    this.receiversId = '';
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
  /**
   * 
   * @param data 
   */
  public getActivityType(data:any){
      this.getActivityTypes.next(data)
  }



  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
