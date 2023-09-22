import { Injectable, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { EOD, EodSubmission, Task, activity } from 'src/app/chat/models/eod.model';

@Injectable()
export class EodListPresenterService implements OnInit {

  /** Observable for currentTime */
  public sendEod$: Observable<EodSubmission>;
  /** Subject for currentTime */
  public sendEod: Subject<EodSubmission>;
  /**  This variable store Current Date and time*/
  public currentTime: Date;
  /**  This variable store last eod ID*/
  public EodId: number | string;

  public getStateActivityTypes: any
  public getActivity: any
  constructor() {
    this.sendEod$ = new Observable();
    this.sendEod = new Subject();
    this.sendEod$ = this.sendEod.asObservable();
    this.currentTime = new Date()
  }
  ngOnInit(): void {

  }

  /**
   * @name getEodResponse
   * @param eodResponses 
   * @description This Method find last eod id in given EodResponse Array
   */
  public getEodResponse(eodResponses: any) {
    const eodResponse = [...eodResponses];
    eodResponse.forEach((eod: EOD) => {
      eod.tasks = eod.tasks.map((task: Task) => ({
        ...task,
        taskActivity: this.getActivityName(task.taskActivity),
        taskState: this.getStateName(task.taskState),
      }));
    });
    console.log(eodResponse);
    
    const spliceEodResponses = eodResponses.splice(-1);
    this.EodId = spliceEodResponses[0]?._id;
    const sendEodSubmissionTime: EodSubmission = {
      eodId: this.EodId,
      submissionTime: this.currentTime,
    }
    this.sendEod.next(sendEodSubmissionTime);
  }
  /**
   * @name getActivityName
   * @param activityID 
   * @returns 
   * @description This method find activityName base on id and return 
   */
  private getActivityName(activityID: number) {
    const activity = this.getStateActivityTypes.data.docs[1].data.find((data: any) => data.activityId === activityID);
    return activity ? activity.activity : 'Unknown';
  }
  /**
   * @name getStateName
   * @param stateID 
   * @returns 
   * @description  This method find getStateName base on id and return 
   */
  private getStateName(stateID: number) {
    const state = this.getStateActivityTypes.data.docs[0].data.find((data:any) => data.stateId === stateID);
    return state ? state.state : 'Unknown';
  }
  /**
   * @name getStateActivityType
   * @param getStateActivityType 
   * @description This method get all state and activity type
   */
  public getStateActivityType(getStateActivityType: any) {
    this.getStateActivityTypes = getStateActivityType

  }
}
