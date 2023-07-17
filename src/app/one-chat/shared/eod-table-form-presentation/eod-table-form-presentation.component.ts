import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { EodTableFormPresenterService } from '../eod-table-form-presenter/eod-table-form-presenter.service';
import { Task } from '../../models/eod.model';

@Component({
  selector: '[eod-table-form-ui]',
  templateUrl: './eod-table-form-presentation.component.html',
  viewProviders: [EodTableFormPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EodTableFormPresentationComponent {

  @Input() public set getEditData(data: Task) {
    this._getEditData=data;
    this.eodFormGroup.patchValue(data)
  }
  public get getEditData(): any {
    return this._getEditData
  }

  /** variable to create form group */
  public eodFormGroup: FormGroup;

  /** To emit the eodDetails data */
  @Output() eodDetails: EventEmitter<Task>
  /** To emit the eodDetails data */
  @Output() openFormEmitter: EventEmitter<boolean>

  /** This variable for validation */
  public isSubmitted: boolean;
  private _getEditData: Task;
  constructor(
    private _EodTableFormPresenterService: EodTableFormPresenterService
  ) {
    this.eodFormGroup = _EodTableFormPresenterService.getEodGroup();
    this.isSubmitted = false;
    this.eodDetails = new EventEmitter()
    this.openFormEmitter = new EventEmitter()
  }
/**
 * @name addEodTasks
 * @description This method emit eod details  
 */
  public addEodTasks(): void {
    this.isSubmitted = true;
    if(this.eodFormGroup.valid){
      this.eodDetails.emit(this.eodFormGroup.value)
      this.isSubmitted = false;
      this.eodFormGroup.reset()
    }
  }
/**
 * @name cancelEdit
 * @param data 
 * @description This method emit false value
 */
  public cancelEdit(data:boolean){
    this.openFormEmitter.emit(data)
  }
  /**
  * @description  This is a getter method to short a validation
  */
  get validator(): { [key: string]: AbstractControl<any> } {
    return this.eodFormGroup.controls;
  }
}
