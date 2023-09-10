import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Login } from 'src/app/core/models/login.model';
import { LoginComponent } from 'src/app/core/components/login/login.component';
import { TaskFormPresenterService } from '../Task-form-presenter/task-form-presenter.service';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { login } from 'src/app/chat/models/login.model';
import { EOD, Task } from 'src/app/chat/models/eod.model';

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
  @Output() public eodDetails: EventEmitter<Task>
  // This properties get LoginUser
  public loginUserDetails: login;
  /** getter and setter  Private Variable */
  private _getStateActivityType: any;
  /** This variable create form Group  */
  public eodFormGroup: FormGroup;

  /** */
  public isSubmitted: boolean
  /** This element used for focus inputBox */
  public ckEditorConfig: any = {};

  constructor(public _commonService: CommonService,
    private _TaskFormPresenterService: TaskFormPresenterService,
    private _overlayService: OverlayService
  ) {
    this.eodFormGroup = this._TaskFormPresenterService.eodFormGroup();
    this.isSubmitted = false;
    this.loginUserDetails = this._commonService.getLoginDetails();
    this.eodDetails = new EventEmitter()
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
    this._TaskFormPresenterService.eodDetails$.subscribe((task: Task) => this.eodDetails.emit(task))
  }
  public saveTask() {
    this.isSubmitted = true
    if (this.eodFormGroup.valid) {
      this._TaskFormPresenterService.getEodTasks(this.eodFormGroup.value)
      this._overlayService.close()

    }

  }
  /**
     * Short variable 
     */
  get validator(): { [key: string]: AbstractControl<any> } {
    return this.eodFormGroup.controls
  }
  /**
   * @name closeEodForm
   * @description This method close Eod form Overlay
   */
  public closeEodForm() {
    this._overlayService.close()
  }

}