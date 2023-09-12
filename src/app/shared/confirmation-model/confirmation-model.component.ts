import { Component, Input } from '@angular/core';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { CommonService } from '../services/common.service';
import { CommunicationService } from 'src/app/chat/shared/communication/communication.service';

@Component({
  selector: 'app-confirmation-model',
  templateUrl: './confirmation-model.component.html'
})
export class ConfirmationModelComponent {
 /** this variable data  */
 @Input() public set taskId(taskId: string) {
  if (taskId) {
    this._taskId = taskId;
  }
}
public get taskId(): string {
  return this._taskId

}

  @Input() submitConformationBox:boolean;
   /** Private Variable */
   private _taskId:string
constructor(private _OverlayService:OverlayService,
  private  _communicationService:CommunicationService
  ){
 

}
/**
 * @name  dismiss
 * @description This method Close confirmation model
 */
  public dismiss():void{
    this._OverlayService.close()
}
/**
 * @name  decline
 * @description This method Close confirmation model
 */
public decline():void{
  this._OverlayService.close()
}
/**
 * 
 * @param boolean 
 */
public deleteEod(){
  this._communicationService.deleteEodId.next(this._taskId);
  this._OverlayService.close()
}
}
