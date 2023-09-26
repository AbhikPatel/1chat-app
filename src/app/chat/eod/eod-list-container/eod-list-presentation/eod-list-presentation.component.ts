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
      this.eodResponses = [...eodResponse];
      this._getEodResponse = eodResponse;
      this._eodListPresenterService.getEodResponse(this._getEodResponse);
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
  /** this variable data  */
  @Input() public set getEodIsTrue(getEodIsTrue: boolean) {
    if (getEodIsTrue) {
      this._getEodIsTrue = getEodIsTrue
    }
  }
  public get getEodIsTrue(): boolean {
    return this._getEodIsTrue

  }

  // Initialize with -1 to have no items open by default
  public openIndex: number;
  public EodSubmissionTimeObject: EodSubmission;
  public copyResponse: EOD[];
  public nowTime: Date;
  /**  This variable store last eod ID*/
  public EodId: number | string;
  public eodResponses: EOD[];
  /**  This variable store Current Date and time*/
  public formattedDate:string;
  /**getter and setter  Private Variable */
  private _getEodResponse: EOD[]
  private _getEodIsTrue: boolean;
  private _getStateActivityType: any;
  public isLoading: any
  constructor(private _overlayService: OverlayService, private _loaderService: LoaderService,
    private _eodListPresenterService: EodListPresenterService) {
    this.openIndex = -1;
    this.copyResponse = [];
    // this.EodSubmissionTime=new EventEmitter();
  }
  ngOnInit(): void {
    this.isLoading = this._loaderService.getLoaderState2()
    this._eodListPresenterService.sendEod$.subscribe((EodSubmissionTime: EodSubmission) => this.EodSubmissionTimeObject = EodSubmissionTime);
       const currentDate=new Date();
       const inputDate =new Date(currentDate);
       const day = inputDate.getDate();
       const month = inputDate.toLocaleString('default', { month: 'short' }); // Get the full month name
       const year = inputDate.getFullYear();
       this.formattedDate = `${day}/${month}/${year}`;
  }
  /**
   * @name getActivityName
   * @param id 
   * @returns 
   * @description This method find Show activity Name
   */
  public getActivityName(id: number) {
    return this._eodListPresenterService.getActivityName(id);

  }
  /**
 * @name getStateName
 * @param id 
 * @returns 
 * @description This method find Show State Name
 */
  public getStateName(id: number) {
    return this._eodListPresenterService.getStateName(id);

  }
  /**
   * @name openTaskForm
   * @description This method open task form
   */
  public openTaskForm() {
    this._overlayService.open(TaskFormContainerComponent, true, this._getStateActivityType, this.eodResponses)
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
    const taskInstance = this._overlayService.open(TaskFormContainerComponent, true, this._getStateActivityType);
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
  public sendEod(): void {
    this._overlayService.open(ConfirmationModelComponent, true, this.EodSubmissionTimeObject)

  }

}