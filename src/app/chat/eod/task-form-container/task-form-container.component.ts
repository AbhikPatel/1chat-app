import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from '../../chat.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { Observable } from 'rxjs';
import { EOD, EODResponse, Task } from '../../models/eod.model';
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
  /** getter and setter  Private Variable */
  private _stateActivityType: any;
  constructor(private _chatService: ChatService,
    private _commonService: CommonService,
    private _communicationService: CommunicationService,
    private _eodAdapter: EODAdapter,) {

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
    this._chatService.postEODReports(task).subscribe((data: Task) => {
      this._communicationService.taskResponses(data)
      9
    })
  }
}
