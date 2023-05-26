import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupDetails } from '../../models/chat.model';
import { Observable, Subject } from 'rxjs';

@Injectable()

export class CreateGroupPresenterService {

  public userId: string;
  public GroupCreationData$:Observable<GroupDetails>;
  
  private GroupCreationData:Subject<GroupDetails>;

  constructor(
    private _fb: FormBuilder
  ) {
    this.userId = localStorage.getItem('userId')
    this.GroupCreationData = new Subject();
    this.GroupCreationData$ = new Observable();
    this.GroupCreationData$ = this.GroupCreationData.asObservable();
  }

  /**
   * @name createGroup
   * @returns formgroup
   * @description This method will bulid the create group form
   */
  public createGroup(): FormGroup {
    return this._fb.group({
      title: ['', [Validators.required]],
      members: ['', [Validators.required]],
      chat_type: ['group'],
      owner: [this.userId]
    })
  }

  public getGroupData(formData:any): void {
    formData.members = formData.members.map((data:any) => data.id);
    formData.members.push(this.userId);
    this.GroupCreationData.next(formData);
  }
}
