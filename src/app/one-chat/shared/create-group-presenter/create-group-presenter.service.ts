import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { CommonService } from 'src/app/shared/services/common.service';
import { GroupDetails } from '../../models/chat.model';

@Injectable()

export class CreateGroupPresenterService {

  /** This variable will store the id of the user */
  public userId:string;
  /** Observable for create group information */
  public GroupCreationData$:Observable<GroupDetails>;
  
  /** Subject for create group information */
  private GroupCreationData:Subject<GroupDetails>;

  constructor(
    private _fb:FormBuilder,
    private _commonService:CommonService
  ) { 
    this.userId = this._commonService.getUserId();
    this.GroupCreationData = new Subject();
    this.GroupCreationData$ = new Observable();
    this.GroupCreationData$ = this.GroupCreationData.asObservable();
  }

  /**
   * @name createGroup
   * @returns formgroup
   * @description This method will bulid the create group form
   */
  public createGroup():FormGroup{
    return this._fb.group({
      title: ['', [Validators.required]],
      members: ['', [Validators.required]],
      chat_type: ['group'],
      owner: [this.userId]
    })
  }

  /**
   * @name getGroupData
   * @param formData 
   * @description This method is used to get the create group information
   */
  public getGroupData(formData:any): void {
    formData.members = formData.members.map((data:any) => data.id);
    formData.members.push(this.userId);
    this.GroupCreationData.next(formData);
  }
}
