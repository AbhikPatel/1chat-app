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

public getStateActivityTypes:any
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
    // const eodResponse=[...eodResponses]
    // console.log(eodResponse);
    
    // const data = eodResponse[26]?.tasks.map((Eod:any) => ({
    //   taskState :this.getStateName(Eod.taskState),
    //   taskActivity: this.getActivityName(Eod.taskActivity),
      
    // }));
    // console.log(data);
    
    const spliceEodResponses = eodResponses.splice(-1);
    this.EodId = spliceEodResponses[0]?._id;
    const sendEodSubmissionTime: EodSubmission = {
      eodId: this.EodId,
      submissionTime: this.nowTime,
    }
    this.sendEod.next(sendEodSubmissionTime);
  }
  private getStateName(ActivityID: any) {
    console.log(ActivityID);
    
    const Activity = this.getStateActivityTypes.data.docs[0].data.find((data:any) => data.activityId === ActivityID);
    console.log(Activity);
    
    return Activity ? Activity.activity : 'Unknown Country';
  }

  private getActivityName(stateID: any) {
    console.log(stateID);
    
    const state = this.getStateActivityTypes.data.docs[1].data.find((data:any) => data.stateId === stateID);
    console.log(state);
    
    return state ? state.state : 'Unknown State';
  }
/**
 * 
 * @param getStateActivityType 
 */
  public getStateActivityType(getStateActivityType: any) {
   this.getStateActivityTypes=getStateActivityType

  }
}
