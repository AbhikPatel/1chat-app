import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { OneChatPresentationBase } from '../../one-chat-container/one-chat-presentation-base/one-chat-presentation.base';
import { EodPresenterService } from '../eod-presenter/eod-presenter.service';
import { EOD } from '../../models/eod.model';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { TaskFormPresentationComponent } from '../task-form-presentation/task-form-presentation.component';

@Component({
  selector: 'app-eod-presentation',
  templateUrl: './eod-presentation.component.html',
  viewProviders: [EodPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EodPresentationComponent extends OneChatPresentationBase implements OnInit, OnDestroy, AfterViewInit {
  /** Element DOM for message screen */
  @ViewChild('eodScreen', { static: true }) eodScreen: ElementRef;
  /** TO get the EOD from offcanvas */
  @Input() public set getEodDetails(data: EOD) {
    if (data) {
      this._getEodDetails = data;
      this.scrollUp();
      setTimeout(() => {
      }, 100);
    }
  }
  public get getEodDetails(): EOD {
    return this._getEodDetails;
  }
  /** TO get the getActivityTypes*/
  @Input() public set getActivityTypes(data: any) {
    if (data) {
      this._getStateActivityTypeData = data;
      console.log(this._getStateActivityTypeData);



    }
  }
  public get getActivityTypes(): any {
    return this._getStateActivityTypeData;
  }
  @Output() public type: EventEmitter<string>
  @Output() public getStateActivity: EventEmitter<boolean>

  /** Flag for message screen scroll */
  public isScrolledToBottom: boolean;
  /** getActivityTypes  data Variable */
  private _getEodDetails: EOD;
  /** getActivityTypes  data Variable */
  public _getStateActivityTypeData: any;
  /** stops the subcription on destroy */
  private destroy: Subject<void>;
  public openIndex: number = -1; // Initialize with -1 to have no items open by default

  constructor(
    private _eodPresenterService: EodPresenterService,
    private _overlayService: OverlayService,
  ) {
    super();
    this.destroy = new Subject();
    this.isScrolledToBottom = false;
    this.type = new EventEmitter()
    this.getStateActivity = new EventEmitter()

  }
  ngAfterViewInit(): void {
    this.scrollUp();
  }

  ngOnInit(): void {
    this.scrollUp();
  }
  // New eod Create 
  /**
   * @name openTaskForm
   * @description This method open task form
   */
  public openTaskForm() {
    this._overlayService.open(TaskFormPresentationComponent, true, this._getStateActivityTypeData)

  }

  toggleAccordion(index: number) {
    this.openIndex = this.openIndex === index ? -1 : index; // Toggle the open index
  }

  /**
     * @name scrollUp
     * @description Click arrow down icon got to up message
     */
  public scrollUp(): void {
    const scrollHeight = this.eodScreen?.nativeElement.scrollHeight;
    this.eodScreen.nativeElement.scrollTop = scrollHeight;
  }
  /**
    * @name onMessageScroll
    * @description Down arrow icon show and hide as per scroll
    */
  public onMessageScroll(): void {
    const messageContainer = this.eodScreen.nativeElement;
    const scrollHeight = messageContainer.scrollHeight;
    let scrollTop = messageContainer.scrollTop;
    const clientHeight = messageContainer.clientHeight;
    const isScrolledToBottom = scrollHeight - (scrollTop + clientHeight);
    this.isScrolledToBottom = isScrolledToBottom > 50;
  }
  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
