import { ChangeDetectorRef, Component, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { EOD, Task } from '../../models/eod.model';
import { ConversationUsers } from '../../models/chat.model';
import { Subject } from 'rxjs';
import { ChatMessagePresenterService } from '../../one-chat-container/one-chat-presentation/chat-message/chat-message-presenter/chat-message-presenter.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { ConfirmationModelComponent } from 'src/app/shared/confirmation-model/confirmation-model.component';

@Component({
  selector: 'app-eod-model',
  templateUrl: './eod-model.component.html'
})
export class EodModelComponent {
  /** variable to create form group */
  public eodFormGroup: FormGroup;
  /** variable to create form group */
  public arrayEodForm: FormArray;
  /** variable to display the current window on messages */
  public currentWindow: boolean;
  /** variable for receiver's full name */
  public receiverFullName: string;
  /** variable for accordion configd */
  public accordionConfig: any[];
  /** Flag for showing members modal */
  public showMembersModal: boolean;
  /** Flag for showing showEODSummary Summary */
  public showEODSummary: boolean;
  /** Flag for showing showModel edit and delete model Summary */
  public showModel: boolean;
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
  /** This variable is used for getter setter */
  private _receiversConversation: ConversationUsers;
  /** Stops the subscription on ngOnDestroy */
  private destroy: Subject<void>;
  /** This variable count task with key va */
  public activeEditDeleteTab: number;
  /** Flag for showing form */
  public openForm: boolean;
  /** input variable toEditData */
  public toEditData: any;
  /**  variable for DISABLED*/
  public submitBtnDisabled: boolean;
  /** Variable for current edit index */
  public currentEditIndex: number;
  /** Variable for delete Index */
  public currentDeleteIndex: number;
  /** variable for all the EOD Tasks */
  public allTasks: Task[];

  constructor(
    private _chatMessagePresenterService: ChatMessagePresenterService,
    private _commonService: CommonService,
    private _overlayService: OverlayService,
    private _changeDetector: ChangeDetectorRef
  ) {

    // this.chatData = new EventEmitter();
    this.destroy = new Subject();
    this.senderName = this._commonService.getUserFullName();
    this.userRole = this._commonService.getUserRole();
    this.currentWindow = true;
    this.showMembersModal = false;
    this.showEODSummary = false;
    this.toEditData = {};
    this.allTasks = []
    this.submitBtnDisabled = false;
    this.openForm = true
    this.currentEditIndex = 0;
  }
  ngOnInit(): void {
    this.props();
   
  }
  /**
   * @name props
   * @description This method is called in ngOnInit
   */
  private props(): void {
    this.eodDate = new Date().getDate() + '/' + new Date().getMonth() + '/' + new Date().getFullYear();
    // Delete eod using confirm box 
    this._commonService.statusDelete.subscribe((res: any) => {
      if (res) {
        this.allTasks.splice(this.currentDeleteIndex, 1);
        this._overlayService.close()
        this.showModel = false;
        this._changeDetector.detectChanges()
      }
    })
    // submit eod using confirm box 
    this._commonService.submitEod.subscribe((res: any) => {
      if (res) {
        // this._chatMessagePresenterService.getEodTasks(this.allTasks, this.senderName, this.senderId)
        this._overlayService.close()
        this.openForm=false
        this._changeDetector.detectChanges()
      }
    })

  }
  /**
   * 
   * @param data 
   */
  public onWindow(data: boolean): void {
    this.currentWindow = data;
  //   if (!data)
  //     this.onEodTab.emit(this.receiversConversation.chatId);
  // }
  }
  /**
   * @name getChatData
   * @param chat 
   * @description This method is used to emit the chat data
   */
  public getChatData(chat: string): void {
    // this.chatData.emit(chat)
  }

  /**
   * @name viewMembers
   * @description This method is show the group members modal 
   */
  public viewMembers(): void {
    this.showMembersModal ? this.showMembersModal = false : this.showMembersModal = true;

  }

  /**
   * @name onEodSubmit
   * @description This method is called when the user wants to submit the EOD report
   */
  public onEodSubmit(data:boolean): void {
   const component= this._overlayService.open(ConfirmationModelComponent);
     component.instance.submitConformationBox=data

  }
  /**
   * @name onCancel
   * @description This method is used to close the EOD report and resets the EOD form
   */
  public onCancel(): void {
    this.allTasks = [];
    this.eodFormGroup.reset()
    this.openForm = true;
  }
  /**
   * @description This Method reset eod form
   */
  public openEodModel(): void {
    this._overlayService.open(EodModelComponent)
    this.allTasks = [];
    this.submitBtnDisabled = false;

  }

  /**
 * @name onAdd
 * @description This method is used to add data into the user array
 */
  public onAddEodFrom(): void {
    this.allEodTaskFalse();
    this.openForm = true;
    this.submitBtnDisabled = false;

  }

  /**
   * @name onCancel
   * @description This method is used to close the form
   */
  public onCancelEodFrom(): void {
    this.openForm = false;
    this.submitBtnDisabled = true;
  }

  /**  @description This method set default isEdit false */
  public allEodTaskFalse(): void {
    this.allTasks.map((res: any) => res.isEdit = false)
  }

  /**
   * @Name getEodDetails
   * @param data 
   * @description
   */
  public getEodDetails(data: Task) {
    this.submitBtnDisabled = true
    console.log('task  start', this.allTasks);
    if (data.isEdit) {
      data.isEdit = false
      this.allTasks[this.currentEditIndex] = data
    }
    else {
      this.allTasks.unshift(data)
    }
    this.openForm = false
  }

  /**
   * @name onEditEod
   * @param index 
   * @description This method 
   */
  public onEditEod(index: number): void {
    this.allEodTaskFalse();
    this.submitBtnDisabled = false
    this.currentEditIndex = index;
    this.toEditData = this.allTasks[index];
    this.allTasks[index].isEdit = true;
    this.openForm = false;
    this.showModel = false;
  }

  /**
   * @name onDeleteEod
   * @param index index of the current selected user
   * @description This method is used to delete the data from the table
   */

  public onDeleteEod(index: number): void {
    this.currentDeleteIndex = index
    this._overlayService.open(ConfirmationModelComponent)
  }

  /**
     * @name onNewConversation
     * @description This method will open a model to start  edit and delete 
     */
  public openEditDeleteModel(index: any): void {
    if (this.activeEditDeleteTab !== index && this.activeEditDeleteTab
      || this.activeEditDeleteTab !== index && this.activeEditDeleteTab === 0) {
      this.activeEditDeleteTab = index;
      this.showModel = true;
    }
    else {
      this.activeEditDeleteTab = index;
      this.showModel = !this.showModel
    }
  }

  /**
   * @name clickOutside
   * @description This method close model click on outside.
   */
  public clickOutside(): void {
    this.showModel = false;
  }
  /**
   * 
   * @param status 
   * @returns 
   * @description This method change status color
   */
  getColorClass(status: any) {
    switch (status) {
      case 'InProgress':
        return 'bg-progress';
      case 'completed':
        return 'bg-completed ';
      case 'newLearning':
        return 'bg-learning';
      default:
        return '';
    }
  }
  /**
   * @name openFormEmitter
   * @param data 
   * @description This method close edit form
   */
  public openFormEmitter(data: boolean) {
    this.allTasks[this.currentEditIndex].isEdit = data;
    this.submitBtnDisabled = true;
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
