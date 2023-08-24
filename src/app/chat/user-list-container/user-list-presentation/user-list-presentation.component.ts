import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Host, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { User } from 'src/app/shared/models/user.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserListPresenterService } from '../User-list-presenter/user-list-presenter.service';

@Component({
  selector: 'app-user-list-presentation-ui',
  templateUrl: './user-list-presentation.component.html',
  styles: [':Host{ height:100%;display:block;}'],
  viewProviders: [UserListPresenterService]

})
export class UserListPresentationComponent implements OnInit {

  /** This property is used to get all the user details from container component */
  @Input() public set allUsers(users: User[]) {
    if (users) {
      this._allUsers = users
      const senderDetails = users.find((user: User) => user._id === this.userId);
      let senderIndex = users.indexOf(senderDetails);
      users.splice(senderIndex, 1);
      this._allUsers = this.userRole === 'intern' ? users.filter((user: User) => user.role !== 'intern') : users;
    }
  }

  public get allUsers(): User[] {
    return this._allUsers
  }

  /** This property is used to emit boolean value */
  @Output() public closeAsideBar: EventEmitter<boolean>
  /** This variable will store the details of the sender */
  public userRole: string;
  /** This variable will store id of the user */
  public userId: string;
  /** This variable is formGroup for search users */
  public searchGroup: FormGroup;
  /** This variable will store the search text */
  public searchText: string;

  /** This property is used for getter setter */
  private _allUsers: User[];

  constructor(
    private _overlayServices: OverlayService,
    private _commonService: CommonService,
    private _UserListPresenterService: UserListPresenterService
  ) {
    this.userId = this._commonService.getUserId();
    this.userRole = this._commonService.getUserRole();
    this.searchGroup = this._UserListPresenterService.getGroup();
    this.closeAsideBar = new EventEmitter()
  }
  ngOnInit(): void {
  }

  /**
   * @name onNewChat
   * @param user 
   * @description This method is called to start a new dm conversation
   */
  public onNewChat(user: User) {
    this.closeAsideBar.next(false)
    console.log(user);
  }
}
