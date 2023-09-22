import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../chat.service';
import { Observable } from 'rxjs';
import { EOD, EditEodTasks, EodSubmission, Task } from '../../models/eod.model';
import { CommunicationService } from '../../shared/communication/communication.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-eod-list-container',
  templateUrl: './eod-list-container.component.html',
  // styles: [':Host{ height:100%;display:block}']
})
export class EodListContainerComponent {
  /** This Variable Store routing params id */
  public paramsId: string;
  /** This Variable Store  all eod response*/
  public eodResponse:EOD[];
  /** This Variable store state and activity Type */
  public eodIsTrue:string;
  public stateActivityType$: Observable<any>;
  public IsTrue: boolean;
  constructor(private _router: ActivatedRoute,
    private _chatService: ChatService,
    private _communicationService:CommunicationService,
    private _loaderService: LoaderService) {
    this.paramsId = '';
    this.eodResponse =[];
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
    * taskResponse
    */
    this._communicationService.editTaskResponse$.subscribe((editTaskResponse:EditEodTasks)=>{
       if(editTaskResponse)
        this.getEODReports();
    })
      /**
    * Delete Task
    */
    this._communicationService.deleteEodId.subscribe((taskId:number
      )=>{
      if(taskId){
        this._chatService.deleteTask(taskId).subscribe()
          this.getEODReports();
      }
 
    })
      /**
    * Send Eod
    */
    this._communicationService.senEodData$.subscribe((eodSubmissionTime:EodSubmission)=>{
      if(eodSubmissionTime){
          this.IsTrue=true
        // this._chatService.updateEod(eodSubmissionTime,eodSubmissionTime.eodId).subscribe();
      }
    })
    this._communicationService.tabDataApi.subscribe((data:boolean)=>{
      if(data){
        this.getEODReports();
      }
    })
  }
  /**
   * @name getEODReports
   * @description This method Get all getEODReports
   */
  public getEODReports(){
    this._loaderService.showLoader2();
    this._chatService.getEODReports(this.paramsId).subscribe((data:any)=>{
      this._loaderService.hideLoader2();
      this.eodResponse=data
    });
  }

 
 
}

