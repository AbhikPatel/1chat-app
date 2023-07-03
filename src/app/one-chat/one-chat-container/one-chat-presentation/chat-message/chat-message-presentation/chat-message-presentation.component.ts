import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { ConversationUsers } from 'src/app/one-chat/models/chat.model';
import { EOD, Task } from 'src/app/one-chat/models/eod.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { OneChatPresentationBase } from '../../../one-chat-presentation-base/one-chat-presentation.base';
import { ChatMessagePresenterService } from '../chat-message-presenter/chat-message-presenter.service';
import { taskBgColor, taskTypeFormat } from 'src/app/core/utilities/constants';

@Component({
  selector: 'app-chat-message-presentation',
  templateUrl: './chat-message-presentation.component.html',
  viewProviders: [ChatMessagePresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessagePresentationComponent extends OneChatPresentationBase implements OnInit {

  /** Input to get the receiver's data */
  @Input() public set receiversConversation(receiver: ConversationUsers) {

    if (receiver) {
      this._receiversConversation = receiver;
      this._chatMessagePresenterService.receiversId = receiver.members[0]._id;
      this.onWindow(true);
    }

  }
  public get receiversConversation(): ConversationUsers {
    return this._receiversConversation;
  }

  /** To emit the chat data */
  @Output() public chatData: EventEmitter<string>;

  /** variable to create form group */
  public eodFormGroup: FormGroup;
  /** variable to display the current window on messages */
  public currentWindow: boolean;
  /** variable for receiver's full name */
  public receiverFullName: string;
  /** variable for accordion configd */
  public accordionConfig: any[];
  /** Flag for showing members modal */
  public showMembersModal: boolean;
  /** Flag for showing EOD Summary */
  public showEODSummary: boolean;
  /** variable for all the EOD Tasks */
  public allTasks: Task[];
  /** variable for the name of the sender */
  public senderName: string;
  /** variable for date of the EOD report */
  public eodDate: string;
  /** variable for role of the user */
  public userRole: string;
  /** variable for role of the user */
  public eodReportDetails: EOD;
  /** variable for tasks color code */
  public taskColorCode: string;
  /** variable for tasks display name */
  public taskDisplayName: string;

  /** This variable is used for getter setter */
  private _receiversConversation: ConversationUsers;
  /** Stops the subscription on ngOnDestroy */
  private destroy: Subject<void>;

  constructor(
    private _chatMessagePresenterService: ChatMessagePresenterService,
    private _fb: FormBuilder,
    private _commonService: CommonService
  ) {
    super();
    this.chatData = new EventEmitter();
    this.destroy = new Subject();
    this.senderName = this._commonService.getUserFullName();
    this.userRole = this._commonService.getUserRole();
    this.currentWindow = true;
    this.showMembersModal = false;
    this.showEODSummary = false;
    this.eodFormGroup = this._chatMessagePresenterService.getEodGroup();
  }

  ngOnInit(): void {
    this.props();
  }

  /**
   * @name props
   * @description This method is called in ngOnInit
   */
  private props(): void {
    this._chatMessagePresenterService.eodDetails$.subscribe((eodData: EOD) => {
      this.eodReportDetails = eodData;
      this.onWindow(false);
      this.eodReport.emit(eodData);
    })
  }

  public onWindow(data: boolean): void {
    this.currentWindow = data;
    if (!data)
      this.onEodTab.emit(this.receiversConversation.chatId);
  }

  /**
   * @name getChatData
   * @param chat 
   * @description This method is used to emit the chat data
   */
  public getChatData(chat: string): void {
    this.chatData.emit(chat)
  }

  /**
   * @name viewMembers
   * @description This method is show the group members modal 
   */
  public viewMembers(): void {
    this.showMembersModal ? this.showMembersModal = false : this.showMembersModal = true;

  }

  /**
   * @name formTaskArray
   * @param arrName 
   * @returns formarray for eod report
   */
  public formTaskArray(arrName: string): FormArray {
    return this.eodFormGroup.controls[arrName] as FormArray
  }

  /**
   * @name onAddTask
   * @param taskType type of the task
   * @description This method will add the task 
   */
  public onAddTask(taskType: string): void {

    if (this.formTaskArray(taskType).length < 6) {

      this.formTaskArray(taskType).push(
        this._fb.group({
          name: ['', [Validators.required]],
          hours: ['', [Validators.required]],
          description: ['', [Validators.required]],
          blocker: [''],
          type: {
            displayName: taskTypeFormat[taskType],
            className: taskBgColor[taskType]
          }
        })
      );
    }
  }

  /**
   * @name onDeleteTask
   * @param index index of the task
   * @param taskType type of the task
   * @description This method will delete the task as per the params
   */
  public onDeleteTask(index: number, taskType: string): void {
    this.formTaskArray(taskType).removeAt(index);
  }

  /**
   * @name onEodSubmit
   * @description This method will submit the data for eod report
   */
  public onEodSummary(): void {
    this.allTasks = [...this.eodFormGroup.value.completed, ...this.eodFormGroup.value.InProgress, ...this.eodFormGroup.value.newLearning];
    this.eodDate = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
    this.showEODSummary = true;
  }

  /**
   * @name backToEod
   * @description This method is called when the user wants to edit to EOD report
   */
  public backToEod(): void {
    this.allTasks = [];
    this.showEODSummary = false;
  }

  /**
   * @name onEodSubmit
   * @description This method is called when the user wants to submit the EOD report
   */
  public onEodSubmit(): void {
    this._chatMessagePresenterService.getEodTasks(this.allTasks, this.senderName, this.senderId)
  }

  /**
   * @name onCancel
   * @description This method is used to close the EOD report and resets the EOD form
   */
  public onCancel(): void {
    this.eodFormGroup.reset();
  }

  /**
   * @name ngOnDestroy
   * @description This method is called the component is destroyed
   */
  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
