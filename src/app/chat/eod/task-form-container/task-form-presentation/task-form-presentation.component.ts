import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Login } from 'src/app/core/models/login.model';
import { LoginComponent } from 'src/app/core/components/login/login.component';
import { TaskFormPresenterService } from '../Task-form-presenter/task-form-presenter.service';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { login } from 'src/app/chat/models/login.model';
import { EOD, EditEodTasks, Task } from 'src/app/chat/models/eod.model';
import { ConfirmationModelComponent } from 'src/app/shared/confirmation-model/confirmation-model.component';
import { CKEditorComponent } from 'ckeditor4-angular';

@Component({
  selector: 'app-task-form-presentation',
  templateUrl: './task-form-presentation.component.html',
  viewProviders: [TaskFormPresenterService],
})
export class TaskFormPresentationComponent implements OnInit {
  /**
   * This Properties get getStateActivityType for container
   */
  @Input() public set getStateActivityType(getStateActivityType: any) {
    if (getStateActivityType) {
      this._getStateActivityType = getStateActivityType;
    }
  }
  public get getStateActivityType(): any {
    return this._getStateActivityType

  }
  /**
   * This Properties get getTaskDetails for container
   */
  @Input() public set getTaskDetails(getTaskDetails: any) {
    if (getTaskDetails) {
      this._getTaskDetails = getTaskDetails;
       this.eodFormGroup.patchValue(this._getTaskDetails);
    }
  }
  public get getTaskDetails(): any {
    return this._getTaskDetails

  }
  /**
   * This Properties get EodResponse for container
   */
  @Input() public set getEodResponse(eodResponse: EOD[]) {
    if (eodResponse) {
      const eodResponses=[...eodResponse]
      this._getEodResponse = eodResponse;
    this._TaskFormPresenterService.getEodResponse(eodResponses)
      
    }
  }
  public get getEodResponse(): EOD[] {
    return  this._getEodResponse

  }
  @ViewChild('editor') editor: CKEditorComponent;
  /** This variable emit  Task Details*/
  @Output() public taskDetails: EventEmitter<Task>;
  /** This variable emit  Task Details*/
  @Output() public editTaskDetails: EventEmitter<EditEodTasks>;
  // This properties get LoginUser
  public loginUserDetails: login;
  /** getter and setter  Private Variable */
  private _getStateActivityType: any;
  /** This variable create form Group  */
  public eodFormGroup: FormGroup;
  public isSubmitted: boolean;
  /** This element used for focus inputBox */
  public ckEditorConfig: any = {};
  public isExpanded:boolean;
/** Private Variable */
public _getEodResponse:EOD[];
private _getTaskDetails:Task;

  constructor(public _commonService: CommonService,
    private _TaskFormPresenterService: TaskFormPresenterService,
    private _overlayService: OverlayService
  ) {
    this.eodFormGroup = this._TaskFormPresenterService.eodFormGroup();
    this.isSubmitted = false;
    this.loginUserDetails = this._commonService.getLoginDetails();
    this.taskDetails = new EventEmitter();
    this.editTaskDetails = new EventEmitter();
    this.isExpanded=false
    this.ckEditorConfig = {
      toolbar: [
        [
          'Source',
          'Templates',
          'Bold',
          'Italic',
          'Underline',
          'Strike',
          'Subscript',
          'Superscript',
          '-',
          'CopyFormatting',
          'RemoveFormat',
        ],
        [
          'Cut',
          'Copy',
          'Paste',
          'PasteText',
          'PasteFromWord',
          '-',
          'Undo',
          'Redo',
        ],
        ['Find', 'Replace', '-', 'SelectAll', '-', 'Scayt'],
        [
          'NumberedList',
          'BulletedList',
          '-',
          'Outdent',
          'Indent',
          '-',
          'Blockquote',
          'CreateDiv',
          '-',
          'JustifyLeft',
          'JustifyCenter',
          'JustifyRight',
          'JustifyBlock',
          '-',
          'BidiLtr',
          'BidiRtl',
        ],
        ['Link', 'Unlink', 'Anchor'],
        [
          'Image',
          'Table',
          'HorizontalRule',
          'Smiley',
          'SpecialChar',
          'PageBreak',
          'Iframe',
        ],
        ['Styles', 'Format', 'Font', 'FontSize'],
        ['TextColor', 'BGColor'],
        ['Maximize', 'ShowBlocks'],
      ],
    }
  }
  ngOnInit(): void {
   this.props();
  }
   /**
   * @name props
   * @description This method will be invoked on ngOnInit
   */
   private props(): void {
    this._TaskFormPresenterService.taskDetails$.subscribe((task: Task) => this.taskDetails.emit(task));
    this._TaskFormPresenterService.editTaskDetails$.subscribe((EditTask: any) => this.editTaskDetails.emit(EditTask));
     this.setSelectedStateName();
     this.setSelectedActivityName();
   }
/**
 * @name saveTask
 * @description This method
 */
  public saveTask() {
    this.isSubmitted = true
    if (this.eodFormGroup.valid) {
      if(this._getTaskDetails?._id){
        this._TaskFormPresenterService.editEodTasks(this.eodFormGroup.value,this._getTaskDetails._id);
        this._overlayService.close();
      }else{
        this._TaskFormPresenterService.addEodTasks(this.eodFormGroup.value);
        this._overlayService.close();
      }
    
    }
  }
/**
 * @name setSelectedStateName
 * @description This method Select state Name    
 */
  public setSelectedStateName() {
    const selectedStateId = this.eodFormGroup.get('taskState').value;
    const selectedState = this._getStateActivityType.data.docs[0].data.find(state => state.stateId === selectedStateId);
    this.eodFormGroup.patchValue({ stateId: selectedState ? selectedState.stateId : '' });
  }
  
  public setSelectedActivityName() {
    const selectedActivityId = this.eodFormGroup.get('taskActivity').value;
    const selectedState = this._getStateActivityType.data.docs[1].data.find(activity => activity.activityId === selectedActivityId);
    this.eodFormGroup.patchValue({ activityId: selectedState ? selectedState.activityId : '' });
  }
  /**
     * Short variable 
     */
  get validator(): { [key: string]: AbstractControl<any> } {
    return this.eodFormGroup.controls
  }
  /**
   * @name closeEodForm
   * @description This method close task form Overlay
   */
  public closeEodForm() {
    this._overlayService.close();
  }

}