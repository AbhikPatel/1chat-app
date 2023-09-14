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
  @Input() public set commonData(commonData: any) {
    if (commonData) {
      this._commonData = commonData;
    }
  }
  public get commonData(): any {
    return this._commonData

  }

  @Input() submitConformationBox: boolean;
  /** Private Variable */
  private _commonData: any
  constructor(private _OverlayService: OverlayService,
    private _communicationService: CommunicationService
  ) {
  }
  /**
   * @name  dismiss
   * @description This method Close confirmation model
   */
  public dismiss(): void {
    this._OverlayService.close()
  }
  /**
   * @name  decline
   * @description This method Close confirmation model
   */
  public decline(): void {
    this._OverlayService.close()
  }
  /**
   * @name deleteEod
   * @param boolean 
   */
  public accepted() {
    if (this._commonData.eodId) {
      this._communicationService.sendEodData(this._commonData);
      this._OverlayService.close()
    } else {
      this._communicationService.deleteEodId.next(this._commonData);
      this._OverlayService.close()
    }

  }
}
