import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { NewUser } from 'src/app/shared/models/user.model';
import { OneChatPresenterService } from '../one-chat-presenter/one-chat-presenter.service';

@Component({
  selector: 'app-one-chat-presentation',
  templateUrl: './one-chat-presentation.component.html',
  viewProviders:[OneChatPresenterService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class OneChatPresentationComponent implements OnInit{

  @Input() public getAllUser$:Observable<NewUser[]>;
  
  @Input() public set getListenData(v : any) {
    this._getListenData = v;
  }

  public get getListenData() : any {
    return this._getListenData;
  }
  
  @Output() public emitEventName:EventEmitter<string>;

  private _getListenData : any;
  public destroy:Subject<void>;

  constructor(
    private _service:OneChatPresenterService
  ){
    this.destroy = new Subject();
    this.getAllUser$ = new Observable();
    this.emitEventName = new EventEmitter();
  }

  ngOnInit(): void {
    this.props();
  }

  /**
   * @name props
   * @description This method is called in ngOnInit
   */
  public props(){
    this._service.eventName$.pipe(takeUntil(this.destroy)).subscribe((event:string) => this.emitEventName.emit(event))
    this._service.getEvent('welcome')
  }

  ngOnDestroy(){
    this.destroy.next();
    this.destroy.complete();
  }
}
