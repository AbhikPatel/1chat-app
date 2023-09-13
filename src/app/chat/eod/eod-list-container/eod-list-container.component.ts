import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../chat.service';
import { Observable } from 'rxjs';
import { EOD, Task, eodSubmission } from '../../models/eod.model';
import { CommunicationService } from '../../shared/communication/communication.service';

@Component({
  selector: 'app-eod-list-container',
  templateUrl: './eod-list-container.component.html',
  // styles: [':Host{ height:100%;display:block}']
})
export class EodListContainerComponent {
  /** This Variable Store routing params id */
  public paramsId: string;
  /** This Variable Store routing params id */
  public eodResponse$: Observable<EOD[]>;
  /** This Variable store state and activity Type */
  public stateActivityType$: Observable<any>;
  constructor(private _router: ActivatedRoute,
    private _chatService: ChatService,
    private _communicationService:CommunicationService) {
    this.paramsId = '';
    this.eodResponse$ = new Observable();
    this.stateActivityType$ = new Observable();
  }
  ngOnInit() {
    this.props();

  }

  /**
   * @name props
   * @description This method will be invoked on ngOnInit
   */
  private props(): void {
    // Access route parameters using ActivatedRoute
    this._router.parent.params.subscribe(parentParams => {
      this.paramsId = parentParams['id'];
    });
    this.stateActivityType$ = this._chatService.getStateActivityType();
    /**
     * get All eod Response
     */
   this.getEODReports()
   /**
    * taskResponse
    */
    this._communicationService.taskResponse$.subscribe((taskResponse:Task)=>{
      if(taskResponse)
      this.getEODReports();
    })
      /**
    * Delete Task
    */
    this._communicationService.deleteEodId.subscribe((taskId:string)=>{
      if(taskId){
        this._chatService.deleteTask(taskId).subscribe();
        this.getEODReports();
      }
 
    })
  }
  
  /**
   * @name getEODReports
   * @description This method Get all getEODReports
   */
  public getEODReports(){
    this.eodResponse$ = this._chatService.getEODReports(this.paramsId);
  }
  /**
   * @name getEodReport
   * @param eod 
   * @description This method used to emit the eod report into socket
   */
  public getSendEodTime(eodSubmissionTime:eodSubmission): void {  
    this._chatService.updateEod(eodSubmissionTime,eodSubmissionTime.eodId).subscribe((data:eodSubmission)=>{
      this.getEODReports();
    })
  }
 
}

