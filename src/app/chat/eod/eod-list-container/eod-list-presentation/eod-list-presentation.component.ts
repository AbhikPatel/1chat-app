import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { TaskFormContainerComponent } from '../../task-form-container/task-form-container.component';
import { EodListPresenterService } from '../Eod-list-presenter/eod-list-presenter.service';
import { EOD, EodSubmission, Task } from 'src/app/chat/models/eod.model';
import { ConfirmationModelComponent } from 'src/app/shared/confirmation-model/confirmation-model.component';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
@Component({
  selector: 'app-eod-list-presentation',
  templateUrl: './eod-list-presentation.component.html',
  providers: [EodListPresenterService]
})
export class EodListPresentationComponent implements OnInit {
  @Input() public set getEodResponse(eodResponse: EOD[]) {
    if (eodResponse) {
      const eodResponses=[...eodResponse];
      this._getEodResponse = eodResponse;
      this._eodListPresenterService.getEodResponse(eodResponses);
    }
  }
  public get getEodResponse(): EOD[] {
    return this._getEodResponse

  }
  /** this variable data  */
  @Input() public set getStateActivityType(getStateActivityType: any) {
    
    if (getStateActivityType) {
      console.log(getStateActivityType);
      this._getStateActivityType = getStateActivityType;
     this._eodListPresenterService.getStateActivityType(this._getStateActivityType);
      
    }
  }
  public get getStateActivityType(): any {
    return this._getStateActivityType

  }
  // Initialize with -1 to have no items open by default
  public openIndex: number
  public EodSubmissionTimeObject:EodSubmission
  public copyResponse: EOD[]
  public nowTime: Date;
  /**  This variable store last eod ID*/
  public EodId: number |string;
  /**getter and setter  Private Variable */
  private _getEodResponse: EOD[]
  private _getStateActivityType: any;
  public isLoading:any
  constructor(private _overlayService: OverlayService, private _loaderService: LoaderService,
    private _eodListPresenterService: EodListPresenterService) {
    this.openIndex = -1;
    this.copyResponse = [];
    this.nowTime = new Date()
    // this.EodSubmissionTime=new EventEmitter();
  }
  ngOnInit(): void {
    this.isLoading = this._loaderService.getLoaderState2()
    this._eodListPresenterService.sendEod$.subscribe((EodSubmissionTime:EodSubmission)=>this.EodSubmissionTimeObject=EodSubmissionTime)
  }
 
  /**
   * @name openTaskForm
   * @description This method open task form
   */
  public openTaskForm() {
    this._overlayService.open(TaskFormContainerComponent, true, this._getStateActivityType, this._getEodResponse)
  }
  /**
  * @name toggleAccordion
  * @description This method toggleAccordion
  */
  public toggleAccordion(index: number) {
    this.openIndex = this.openIndex === index ? -1 : index; // Toggle the open index
  }
  /**
   * @name editTask
   * @param task 
   * @description This method open edit form
   */
  public editTask(task: Task) {
    const taskInstance = this._overlayService.open(TaskFormContainerComponent, true, this._getStateActivityType, this._getEodResponse);
    taskInstance.instance.taskDetails = task
  }
  /**
   * @name deleteTask
   * @description This method Delete task 
   */
  public deleteTask(taskId: number) {
    this._overlayService.open(ConfirmationModelComponent, true, taskId);
  }
/**
 * @name sendEod
 * @description This Method Send Eod Reports
 */
  public sendEod():void{
    this._overlayService.open(ConfirmationModelComponent,true,this.EodSubmissionTimeObject)

  }
 
}