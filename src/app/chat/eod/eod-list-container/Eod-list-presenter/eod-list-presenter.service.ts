import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EOD, eodSubmission } from 'src/app/chat/models/eod.model';

@Injectable()
export class EodListPresenterService implements OnInit {

  /** Observable for currentTime */
  public sendEod$: Observable<eodSubmission>;
  /** Subject for currentTime */
  public sendEod: Subject<eodSubmission>;
  /**  This variable store Current Date and time*/
  public nowTime: Date;
  /**  This variable store last eod ID*/
  public EodId: string;


  constructor() {
    this.sendEod$ = new Observable();
    this.sendEod = new Subject();
    this.sendEod$ = this.sendEod.asObservable();
    this.nowTime = new Date()
  }
  ngOnInit(): void {

  }

  /**
   * @name getEodResponse
   * @param eodResponses 
   * @description This Method find last eod id in given EodResponse Array
   */
  public getEodResponse(eodResponses: any) {
    const spliceEodResponses = eodResponses.splice(-1);
    this.EodId = spliceEodResponses[0]._id;
  }

  public getStateActivityType(getStateActivityType: any) {
    console.log(getStateActivityType);

  }
  /**
   * @name sendEod
   * @description This method Send eod
   */
  public sendEodSubmissionTime() {
      const sendEodSubmissionTime:eodSubmission={
           eodId:this.EodId,
        submissionTime:this.nowTime,
      }

    this.sendEod.next(sendEodSubmissionTime)

  }

}
