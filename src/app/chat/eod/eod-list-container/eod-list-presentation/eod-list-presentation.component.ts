import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { TaskFormContainerComponent } from '../../task-form-container/task-form-container.component';
import { EodListPresenterService } from '../Eod-list-presenter/eod-list-presenter.service';
import { EOD, Task, eodSubmission } from 'src/app/chat/models/eod.model';
import { ConfirmationModelComponent } from 'src/app/shared/confirmation-model/confirmation-model.component';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Data } from 'ngx-bootstrap/positioning/models';

@Component({
  selector: 'app-eod-list-presentation',
  templateUrl: './eod-list-presentation.component.html',
  providers: [EodListPresenterService]
})
export class EodListPresentationComponent implements OnInit, AfterViewInit {
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
      this._getStateActivityType = getStateActivityType;
     this._eodListPresenterService.getStateActivityType(this._getStateActivityType);
      
    }
  }
  public get getStateActivityType(): any {
    return this._getStateActivityType

  }
  @Output() public EodSubmissionTime:EventEmitter<eodSubmission>
  // Initialize with -1 to have no items open by default
  public openIndex: number
  public copyResponse: EOD[]
  //This variable is use to show loader  
  public showLoader: Boolean;
  /**getter and setter  Private Variable */
  private _getEodResponse: EOD[]
  private _getStateActivityType: any;
  constructor(private _overlayService: OverlayService, private _loaderService: LoaderService,
    private _eodListPresenterService: EodListPresenterService) {
    this.openIndex = -1;
    this.copyResponse = [];
    this.showLoader = true;
    this.EodSubmissionTime=new EventEmitter();
  }
  ngOnInit(): void {
    this._eodListPresenterService.sendEod$.subscribe((EodSubmissionTime:any)=>this.EodSubmissionTime.next(EodSubmissionTime))
 
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
  public deleteTask(taskId: any) {
    this._overlayService.open(ConfirmationModelComponent, true, taskId);
  }

  public sendEod():void{
    this._eodListPresenterService.sendEodSubmissionTime()

  }
  public ngAfterViewInit(): void {
    this._loaderService.eod.subscribe((data: Boolean) => {
      this.showLoader = data
    });
  }
}