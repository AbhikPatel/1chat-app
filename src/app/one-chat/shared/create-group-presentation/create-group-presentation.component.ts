import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { CreateGroupPresenterService } from '../create-group-presenter/create-group-presenter.service';
import { Subject } from 'rxjs/internal/Subject';
import { FormGroup } from '@angular/forms';
import { GroupDetails } from '../../models/chat.model';
import { takeUntil } from 'rxjs';
import { OneChatPresentationBase } from '../../one-chat-container/one-chat-presentation-base/one-chat-presentation.base';

@Component({
  selector: 'app-create-group-presentation',
  templateUrl: './create-group-presentation.component.html',
  viewProviders: [CreateGroupPresenterService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateGroupPresentationComponent implements OnInit, OnDestroy {

  @ViewChild('multiSelect') public multiSelect: ElementRef;

  @Input() public set getUsers(v: any[]) {
    if (v)
      this._getUsers = v;

  }

  public get getUsers(): any[] {
    return this._getUsers;
  }

  /** This variable will emit the new group information */
  @Output() public newGroupInformation: EventEmitter<GroupDetails>;

  /** Formgroup for the create group form */
  public groupChatFormGroup: FormGroup;
  /** configs for the multiselect */
  public multiSelectConfig: any;

  /** stops the subscription on destroy */
  private destroy: Subject<void>;
  /** getter setter */
  private _getUsers: any[];

  constructor(
    private _createGroupPresenterService: CreateGroupPresenterService
  ) {
    this.destroy = new Subject();
    this.newGroupInformation = new EventEmitter();
    this.groupChatFormGroup = _createGroupPresenterService.createGroup();
  }

  ngOnInit(): void {
    this.props();
  }

  /**
   * @name props
   * @description This method is called in ngonit
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

    this._createGroupPresenterService.GroupCreationData$.subscribe((groupData: GroupDetails) => this.newGroupInformation.emit(groupData));
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
      this._createGroupPresenterService.getGroupData(this.groupChatFormGroup.value)
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
