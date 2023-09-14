import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../chat.service';

import { EOD, EODResponse, EditEodTasks, Task, TaskResponse } from '../../models/eod.model';
import { EODAdapter } from '../../chat-adaptor/chat.adaptor';
import { CommunicationService } from '../../shared/communication/communication.service';


@Component({
  selector: 'app-task-form-container',
  templateUrl: './task-form-container.component.html'
})
export class TaskFormContainerComponent implements OnInit {
  /** This Properties store state and activity Type */
  @Input() public set stateActivityType(stateActivityType: any) {
    if (stateActivityType) {
      this._stateActivityType = stateActivityType;
    }
  }
  public get stateActivityType(): any {
    return this._stateActivityType

  }
  /** This Properties store taskDetails */
  @Input() public set taskDetails(taskDetails: EOD[]) {
    if (taskDetails) {
      this._taskDetails = taskDetails;
    }
  }
  public get taskDetails(): EOD[] {
    return this._taskDetails

  }
  /** This Properties eodResponse Data Store */
  @Input() public set eodResponse(eodResponse: EOD[]) {
    if (eodResponse) {
      this._eodResponse = eodResponse;
    }
  }
  public get eodResponse():  EOD[] {
    return this._eodResponse

  }
  /** getter and setter  Private Variable */
  private _stateActivityType: any;
  private  _eodResponse: EOD[];
  private  _taskDetails: EOD[];
  constructor(private _chatService: ChatService,
    private _communicationService: CommunicationService) {
  }

  ngOnInit(): void {
    this.props();
  }

  /**
   * @name props
   * @description This method will be invoked on ngOnInit
   */
  private props(): void {
 

  }
  /**
   * @name getTask
   * @param eod 
   * @description This method post task details 
   */
  public getTask(task: Task): void {
    this._chatService.postTaskReports(task).subscribe((taskResponse:Task)=>{
      if(TaskResponse)
       this._communicationService.postTaskReportsResponses(taskResponse);
    });
  }
  /**
   * @name getTask
   * @param eod 
   * @description This method post task details 
   */
  public getEditTaskDetails(EditTaskObject: any): void {
    this._chatService.updateTask(EditTaskObject.task,EditTaskObject.editId).subscribe((data:any)=>{
      this._communicationService.editTaskResponses(data);
    })
  }
}
