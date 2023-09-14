import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EOD, EodSubmission } from 'src/app/chat/models/eod.model';

@Injectable()
export class EodListPresenterService implements OnInit {

  /** Observable for currentTime */
  public sendEod$: Observable<EodSubmission>;
  /** Subject for currentTime */
  public sendEod: Subject<EodSubmission>;
  /**  This variable store Current Date and time*/
  public nowTime: Date;
  /**  This variable store last eod ID*/
  public EodId: number | string;


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
    console.log(eodResponses);
    
    const spliceEodResponses = eodResponses.splice(-1);
    this.EodId = spliceEodResponses[0]?._id;
    const sendEodSubmissionTime: EodSubmission = {
      eodId: this.EodId,
      submissionTime: this.nowTime,
    }
    this.sendEod.next(sendEodSubmissionTime);
  }
/**
 * 
 * @param getStateActivityType 
 */
  public getStateActivityType(getStateActivityType: any) {
    console.log(getStateActivityType);

  }
}
