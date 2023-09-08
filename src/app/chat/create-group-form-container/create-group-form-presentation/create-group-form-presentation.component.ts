import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CreateGroupPresenterService } from '../Create-group-presenter/create-group-presenter.service';
import { GroupDetails } from '../../models/chat.model';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-create-group-form-presentation',
  templateUrl: './create-group-form-presentation.component.html',
  providers: [CreateGroupPresenterService]
})
export class CreateGroupFormPresentationComponent implements OnInit {
  /** This property is used to get all the user details from container  */
  @Input() public set allUsers(v: any[]) {
    if (v)
      this._allUsers = v;
  }
  public get allUsers(): any[] {
    return this._allUsers;
  }
  /** This variable will emit the new group information */
  @Output() public newGroupInformation: EventEmitter<GroupDetails>;

  /** FormGroup for the create group form */
  public groupChatFormGroup: FormGroup;
  /** configs for the multiselect */
  public multiSelectConfig: any;
  /**This properties are used for getter setter */
  private _allUsers: User[];
  /** stops the subscription on destroy */
  private destroy: Subject<void>;
  constructor(private _createGroupPresenterService: CreateGroupPresenterService,
    private _overlayService: OverlayService) {
    this.destroy = new Subject();
    this.newGroupInformation = new EventEmitter();
    this.groupChatFormGroup = _createGroupPresenterService.createGroup();
    this._allUsers = [];
  }
  ngOnInit(): void {
    this.props();
  }
  /**
  * @name props
  * @description This method is called in OnInit
  */
  private props(): void {
    this.multiSelectConfig = {
      singleSelection: false,
      idField: 'id',
      textField: 'full_name',
      enableCheckAll: true,
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: true,
      limitSelection: -1,
      clearSearchFilter: true,
      searchPlaceholderText: 'Search User',
      noDataAvailablePlaceholderText: 'No user available',
      closeDropDownOnSelection: false,
      showSelectedItemsAtTop: false,
      defaultOpen: false,
    };
    this._createGroupPresenterService.GroupCreationData$.subscribe((groupData: GroupDetails) => {
      this.newGroupInformation.emit(groupData)
    });
  }

  public get getControls() {
    return this.groupChatFormGroup['controls'];
  }
  /**
   * @name onSubmit
   * @description This method is called when the form is submitted
   */
  public onSubmit(): void {
    if (this.groupChatFormGroup.valid)
      this._createGroupPresenterService.getGroupData(this.groupChatFormGroup.value);
       this._overlayService.close()
  }
  /**
   * @name closeModel
   * @description This method close model click on close button
   */
  public closeModel() {
    this._overlayService.close()
  }
}
