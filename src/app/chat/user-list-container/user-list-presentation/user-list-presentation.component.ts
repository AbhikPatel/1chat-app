
import { AfterViewInit, Component, EventEmitter, Host, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { UserListPresenterService } from '../User-list-presenter/user-list-presenter.service';
import { LoaderService } from 'src/app/core/services/loader/loader.service';
import { Router } from '@angular/router';
import { ConversationUserResponse } from '../../models/chat.model';

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
  @Output() public userConversation: EventEmitter<any>
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
    private _commonService: CommonService,
    private _UserListPresenterService: UserListPresenterService,
    private _loaderService: LoaderService,
    private _router: Router
  ) {
    this.userId = this._commonService.getUserId();
    this.userRole = this._commonService.getUserRole();
    this.searchGroup = this._UserListPresenterService.getGroup();
    this.closeAsideBar = new EventEmitter();
    this.userConversation = new EventEmitter();
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
      this.userConversation.next(user);
      this._router.navigate(['1Chat/message', user._id]);
    }
   
  }
  public ngAfterViewInit(): void {
    this._loaderService.loader.subscribe((data: Boolean) => {
      this.showLoader = data
    });
  }

}
