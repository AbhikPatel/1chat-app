import { Component, Input } from '@angular/core';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-confirmation-model',
  templateUrl: './confirmation-model.component.html'
})
export class ConfirmationModelComponent {

  @Input() submitConformationBox:boolean;

constructor(private _OverlayService:OverlayService,
  private _commonService:CommonService
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
public accept(boolean:boolean){
  this._commonService.statusDelete.next(boolean)
}

public submit(boolean:boolean){
  this._commonService.submitEod.next(boolean)
}
}
