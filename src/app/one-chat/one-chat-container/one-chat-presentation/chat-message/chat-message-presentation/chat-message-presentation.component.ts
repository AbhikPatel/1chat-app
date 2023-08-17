import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, findIndex, flatMap } from 'rxjs';
import { ConversationUsers, Message } from 'src/app/one-chat/models/chat.model';
import { EOD, Task } from 'src/app/one-chat/models/eod.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { OneChatPresentationBase } from '../../../one-chat-presentation-base/one-chat-presentation.base';
import { ChatMessagePresenterService } from '../chat-message-presenter/chat-message-presenter.service';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { ConfirmationModelComponent } from 'src/app/shared/confirmation-model/confirmation-model.component';
import { EodModule } from 'src/app/eod/eod.module';
@Component({
  selector: 'app-chat-message-presentation',
  templateUrl: './chat-message-presentation.component.html',
  viewProviders: [ChatMessagePresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessagePresentationComponent extends OneChatPresentationBase implements OnInit {
@ViewChild('targetDiv',{read:ViewContainerRef})targetDiv!:ViewContainerRef
  selectedTab: number;
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
  /** This property is used to get chat array */
  @Input() public set chatArray(messages: Message[]) {
    if (messages)
      this._chatArray = messages;
  }

  public get chatArray(): Message[] {
    return this._chatArray;
  }
  /** This property getActivityTypes*/
  @Input() public set getActivityTypes(data: any) {
    if (data)
      this._getActivityTypes = data;
    this._chatMessagePresenterService.getActivityType(data)
    
  }

  public get getActivityTypes(): Message[] {
    return this._getActivityTypes;
  }
  private _chatArray: Message[];
  /** This variable getActivityTypes*/
  private _getActivityTypes:any;
  /** To emit the chat data */
  @Output() public chatData: EventEmitter<string>;

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
    /** This Variable getStateActivityTypeData */
    public getStateActivityTypeData:any;
    @Output()  public getStateActivityData :EventEmitter<boolean>

  constructor(
    private _chatMessagePresenterService: ChatMessagePresenterService,
    private _commonService: CommonService,
    private _overlayService: OverlayService,
    private _changeDetector: ChangeDetectorRef,
  ) {
    super();
    this.chatData = new EventEmitter();
    this.getStateActivityData = new EventEmitter();
    this.destroy = new Subject();
    this.senderName = this._commonService.getUserFullName();
    this.userRole = this._commonService.getUserRole();
    this.currentWindow = true;
    this.showMembersModal = false;
    this.showEODSummary = false;
    this.toEditData = {};
    this.allTasks = [];
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
    this._chatMessagePresenterService.getActivityTypes$.subscribe((res:any)=>{
               this.getStateActivityTypeData=res;
          })
    
    this._commonService.eodChatOpen.subscribe((data: ConversationUsers) => {
      this.receiversConversation = data
      this.onWindow(false)
    })
    this._chatMessagePresenterService.eodDetails$.subscribe((eodData: EOD) => {
      this.eodReportDetails = eodData;

      this.onWindow(false);
      this.eodReport.emit(eodData);
    })
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
    // this._commonService.submitEod.subscribe((res: any) => {
    //   if (res) {
    //     this._chatMessagePresenterService.getEodTasks(this.allTasks, this.senderName, this.senderId)
    //     this._overlayService.close()
    //     this.openForm = false
    //     this._changeDetector.detectChanges()
    //   }
    // })

  }
  /**
   * 
   * @param data 
   * @description This method show current window
   */
  public onWindow(data: any): void {
    this.getStateActivityData.next(data);
    if(data==false){
    }
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
   * @name onEodSubmit
   * @description This method is called when the user wants to submit the EOD report
   */
  public onEodSubmit(data: boolean): void {
    // const component = this._overlayService.open(ConfirmationModelComponent);
    // component.instance.submitConformationBox = data
    this._chatMessagePresenterService.getEodTasks(this.allTasks, this.senderName, this.senderId)
    this.openForm = true

  }
  /**
   * @name onCancel
   * @description This method is used to close the EOD report and resets the EOD form
   */
  public onCancel(): void {
    this.allTasks = [];
    this.openForm = true;
  }
  /**
   * @name resetEodForm
   * @description This Method reset eod form
   */
  public resetEodForm(): void {
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
   * @description This method get eod form Details to push allTasks 
   */
  public getEodDetails(data: Task) {
    this.submitBtnDisabled = true
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
   * @description This method get index and pass particular  index data value in toEditData variable 
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
    // this._overlayService.open(ConfirmationModelComponent,true)
  }

  //  /**
  //    * @name onNewConversation
  //      * @description This method will open a model to start  edit and delete 
  //   *  @param index 
  //   */
  //   public openEditDeleteModel(index: any): void {
  //     if (this.activeEditDeleteTab !== index && this.activeEditDeleteTab
  //       || this.activeEditDeleteTab !== index && this.activeEditDeleteTab === 0) {
  //       this.activeEditDeleteTab = index;
  //       this.showModel = true;
  //     }
  //     else {
  //       this.activeEditDeleteTab = index;
  //       this.showModel = !this.showModel
  //     }
  //   }

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
  public closeForm(data: boolean) {
    this.allTasks[this.currentEditIndex].isEdit = data;
    this.submitBtnDisabled = true;
  }
  /**
   * 
   * @param data 
   */
  public getStateActivity(data:boolean){
   this.getStateActivityData.next(data)
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
