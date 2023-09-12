import { Component, Input, OnInit } from '@angular/core';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { TaskFormContainerComponent } from '../../task-form-container/task-form-container.component';
import { EodListPresenterService } from '../Eod-list-presenter/eod-list-presenter.service';
import { EOD, Task } from 'src/app/chat/models/eod.model';
import { ReturnStatement } from '@angular/compiler';
import { CommonService } from 'src/app/shared/services/common.service';
import { ConfirmationModelComponent } from 'src/app/shared/confirmation-model/confirmation-model.component';
import { CommunicationService } from 'src/app/chat/shared/communication/communication.service';

@Component({
  selector: 'app-eod-list-presentation',
  templateUrl: './eod-list-presentation.component.html',
  // styles: [':Host{ height:100%;display:block;}'],
  providers: [EodListPresenterService]
})
export class EodListPresentationComponent implements OnInit {
  @Input() public set getEodResponse(eodResponse: EOD[]) {
    if (eodResponse) {
      this._getEodResponse = eodResponse;
      console.log('eodResponse', eodResponse);

    }
  }
  public get getEodResponse(): EOD[] {
    return this._getEodResponse

  }
  /** this variable data  */
  @Input() public set getStateActivityType(getStateActivityType: any) {
    if (getStateActivityType) {
      this._getStateActivityType = getStateActivityType;
    }
  }
  public get getStateActivityType(): any {
    return this._getStateActivityType

  }
  // Initialize with -1 to have no items open by default
  public openIndex: number
  public copyResponse: EOD[]
  /** getter and setter  Private Variable */
  private _getEodResponse: EOD[]
  private _getStateActivityType: any;
  constructor(private _overlayService: OverlayService) {
    this.openIndex = -1;
    this.copyResponse = [];
  }
  ngOnInit(): void {
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
    const taskInstance = this._overlayService.open(TaskFormContainerComponent, true, this._getStateActivityType,this._getEodResponse);
    taskInstance.instance.taskDetails= task
    
  }
  /**
   * @name deleteTask
   * @description This method Delete task 
   */
  public deleteTask(taskId:any) {
    this._overlayService.open(ConfirmationModelComponent,false,taskId);
  }
}