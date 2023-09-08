import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { GroupDetails } from '../../models/chat.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { login } from '../../models/login.model';

@Injectable()
export class CreateGroupPresenterService {

  /** This variable will store the id of the user */
  public loginUserObject:login;
  /** Observable for create group information */
  public GroupCreationData$:Observable<GroupDetails>;
  
  /** Subject for create group information */
  private GroupCreationData:Subject<GroupDetails>;
  constructor(  private _fb:FormBuilder,
    private _commonService:CommonService) { 
      this.loginUserObject = this._commonService.getLoginDetails();
      this.GroupCreationData = new Subject();
      this.GroupCreationData$ = new Observable();
      this.GroupCreationData$ = this.GroupCreationData.asObservable();
    }
     /**
   * @name createGroup
   * @returns formGroup
   * @description This method will build the create group form
   */
  public createGroup():FormGroup{
    return this._fb.group({
      title: ['', [Validators.required]],
      members: ['', [Validators.required]],
      chat_type: ['group'],
      owner: [this.loginUserObject.userId]
    })
  }
  /**
   * @name getGroupData
   * @param formData 
   * @description This method is used to get the create group information
   */
  public getGroupData(formData:any): void {
    formData.members = formData.members.map((data:any) => data.id);
    formData.members.push(this.loginUserObject.userId);
    this.GroupCreationData.next(formData);
  }
}
