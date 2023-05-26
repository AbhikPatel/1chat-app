import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { OneChatPresentationBase } from '../../one-chat-container/one-chat-presentation-base/one-chat-presentation.base';
import { Subject } from 'rxjs/internal/Subject';
import { CreateGroupPresenterService } from '../create-group-presenter/create-group-presenter.service';
import { FormControl, FormGroup } from '@angular/forms';
import { GroupDetails } from '../../models/chat.model';
import { takeUntil } from 'rxjs';

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

  @Output() public emitOverlayData:EventEmitter<GroupDetails> 

  public groupChatFormGroup: FormGroup;
  public multiSelectConfig: any;
  /** Stops the subscription on destroy */
  private destroy: Subject<void>;
  private _getUsers: any[];

  constructor(
    private _createGroupPresenterService: CreateGroupPresenterService
  ) {
    this.groupChatFormGroup = this._createGroupPresenterService.createGroup();
    this.emitOverlayData = new EventEmitter();
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

    this._createGroupPresenterService.GroupCreationData$.subscribe((data: GroupDetails) => this.emitOverlayData.emit(data))
  }

  public get getControls() {
    return this.groupChatFormGroup['controls'];
  }

  public onSubmit(): void {
    this._createGroupPresenterService.getGroupData(this.groupChatFormGroup.value)
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
