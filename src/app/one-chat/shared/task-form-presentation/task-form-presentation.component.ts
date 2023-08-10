import { Component, ElementRef, ViewChild,ChangeDetectionStrategy, OnInit} from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { TaskFormPresenterService } from '../task-form-presenter/task-form-presenter.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Login } from 'src/app/core/models/login.model';
import { LoginComponent } from 'src/app/core/components/login/login.component';
@Component({
  selector: 'app-task-form-presentation',
  templateUrl: './task-form-presentation.component.html',
  viewProviders:[TaskFormPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
  
})
export class TaskFormPresentationComponent implements OnInit {
  /** This variable create form Group  */
  public eodFormGroup:FormGroup;

  /** */
  public isSubmitted:boolean
    /** This element used for focus inputBox */
constructor(public _commonService:CommonService,private _TaskFormPresenterService:TaskFormPresenterService

  ){
    this.eodFormGroup=this._TaskFormPresenterService.eodFormGroup();
    this.isSubmitted=false
  }
  ngOnInit(): void {
  }
  
  public saveTask(){
    this.isSubmitted=true
    console.log(this.eodFormGroup.value);
  }
/**
   * short variable 
   */
get validator():{[key:string]:AbstractControl<any>}{
  return this.eodFormGroup.controls
}
}
