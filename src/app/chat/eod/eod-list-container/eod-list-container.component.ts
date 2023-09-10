import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../chat.service';
import { Observable } from 'rxjs';
import { EOD } from '../../models/eod.model';

@Component({
  selector: 'app-eod-list-container',
  templateUrl: './eod-list-container.component.html',
  styles: [':Host{ height:100%}']
})
export class EodListContainerComponent {
  /** This Varivale Store routing params id */
  public parameId: string;
  /** This Varivale Store routing params id */
  public eodResponse$: Observable<EOD[]>;
  /** This Variable store state and activity Type */
  public stateActivityType$: Observable<any>
  constructor(private _router: ActivatedRoute,
    private _chatService: ChatService) {
    this.parameId = '';
    this.eodResponse$ = new Observable();
    this.stateActivityType$ = new Observable();
  }
  ngOnInit() {
    this.props();

  }

  /**
   * @name props
   * @description This method will be invoked on ngOnInit
   */
  private props(): void {
    // Access route parameters using ActivatedRoute
    this._router.parent.params.subscribe(parentParams => {
      this.parameId = parentParams['id'];
    });
    this.eodResponse$ = this._chatService.getEODReports(this.parameId);
    this.stateActivityType$ = this._chatService.getStateActivityType()
  }

}

