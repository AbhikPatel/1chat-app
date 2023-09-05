
import { AfterViewInit, Component, EventEmitter, Host, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserListPresenterService } from '../User-list-presenter/user-list-presenter.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Router } from '@angular/router';
import { ConversationUsers } from '../../models/chat.model';

@Component({
  selector: 'app-user-list-presentation-ui',
  templateUrl: './user-list-presentation.component.html',
  styles: [':Host{ height:100%;display:block;}'],
  viewProviders: [UserListPresenterService]

})
export class UserListPresentationComponent implements OnInit, AfterViewInit {
  /** This property is used to get all the user details from container component */
  @Input() public set allUsers(users: User[]) {
    if (users) {
      this._allUsers = users;
    }
  }
  public get allUsers(): User[] {
    return this._allUsers
  }
  /** This property is used to emit boolean value */
  @Output() public closeAsideBar: EventEmitter<boolean>
  /** This property is used to emit boolean value */
  @Output() public newConversation: EventEmitter<any>
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
  //  This variable is use to show loader  
  public showLoader: Boolean;
  constructor(
    private _userListPresenterService: UserListPresenterService,
    private _loaderService: LoaderService,
  ) {
    this.searchGroup = this._userListPresenterService.getGroup();
    this.closeAsideBar = new EventEmitter();
    this.newConversation = new EventEmitter();
    this.showLoader = true
  }
  ngOnInit(): void {
  }
  /**
   * @name onNewChat
   * @param user 
   * @description This method is called to start a new dm conversation
   */
  public onNewChat(user: User) {
    if(user){
      this.closeAsideBar.next(false);
      this.newConversation.next(user);
    }
  }

  public ngAfterViewInit(): void {
    this._loaderService.loader.subscribe((data: Boolean) => {
      this.showLoader = data
    });
  }

}
