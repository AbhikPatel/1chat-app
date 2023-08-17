import { Component, ElementRef, ViewChild, ChangeDetectionStrategy, OnInit, Input } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { TaskFormPresenterService } from '../task-form-presenter/task-form-presenter.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Login } from 'src/app/core/models/login.model';
import { LoginComponent } from 'src/app/core/components/login/login.component';
import { OneChatPresentationBase } from '../../one-chat-container/one-chat-presentation-base/one-chat-presentation.base';
@Component({
  selector: 'app-task-form-presentation',
  templateUrl: './task-form-presentation.component.html',
  viewProviders: [TaskFormPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TaskFormPresentationComponent implements OnInit {
  /** This variable create form Group  */
  public eodFormGroup: FormGroup;
  /** this variable data  */
  @Input() data: any;
  /** */
  public isSubmitted: boolean
  /** This element used for focus inputBox */
  public ckEditorConfig: any = {};
  constructor(public _commonService: CommonService, private _TaskFormPresenterService: TaskFormPresenterService
  ) {
    this.eodFormGroup = this._TaskFormPresenterService.eodFormGroup();
    this.isSubmitted = false;
    this.ckEditorConfig={
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
  }

  public saveTask() {
    this.isSubmitted = true
console.log(    this.eodFormGroup.value);

  }
  /**
     * Short variable 
     */
  get validator(): { [key: string]: AbstractControl<any> } {
    return this.eodFormGroup.controls
  }
}
