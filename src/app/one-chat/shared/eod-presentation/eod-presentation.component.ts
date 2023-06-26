import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { OneChatPresentationBase } from '../../one-chat-container/one-chat-presentation-base/one-chat-presentation.base';
import { EodPresenterService } from '../eod-presenter/eod-presenter.service';
import { EOD } from '../../models/eod.model';

@Component({
  selector: 'app-eod-presentation',
  templateUrl: './eod-presentation.component.html',
  viewProviders: [EodPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EodPresentationComponent extends OneChatPresentationBase implements OnInit, OnDestroy {

  /** TO get the EOD from offcanvas */
  @Input() public set getEodDetails(eod: EOD) {
    if(eod){
      this._getEodDetails = eod;
    }
  }

  public get getEodDetails(): EOD {
    return this._getEodDetails;
  }


  private _getEodDetails: EOD;
  /** stops the subcription on destroy */
  private destroy: Subject<void>;

  constructor(
    private _eodPresenterService: EodPresenterService,
  ) {
    super();
    this.destroy = new Subject();
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
