import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environments/environment';
import { login } from '../models/login.model';
import { OverlayService } from 'src/app/core/services/overlay/overlay.service';
import { CreateGroupFormContainerComponent } from '../create-group-form-container/create-group-form-container.component';
import { User } from 'src/app/shared/models/user.model';
import { ChatService } from '../chat.service';
@Component({
  selector: 'app-chat-list-header-ui',
  templateUrl: './chat-list-header.component.html'
})
export class ChatListHeaderComponent implements OnInit {
/** This property is used to get all the user details from container component */
@Input() public set allUsers(users: User[]) {
  if (users) {
    this._allUsers = users;
  }
}
public get getAllUsers(): User[] {
  return  this._allUsers
}
  /** This element is for toggle search */
  @ViewChild('toggle') public toggle: ElementRef;
  /** This property is used to emit boolean value */
  @Output() public openAsideBar: EventEmitter<void>
  /** This property is used to emit boolean value */
  @Output() public closeAsideBar: EventEmitter<boolean>
    /** This variable will store  localStorage object */
     public getLoginDetails: login;
    /** This variable will store  image Url  */
    private  _allUsers:User[]
  public imageUrl:string;
  constructor(
    private _commonService: CommonService,
    private _authService: AuthService,
    private _overlayService:OverlayService,
    private _chatService:ChatService
  ) {
    this.getLoginDetails=this._commonService.getLoginDetails()
    this.openAsideBar = new EventEmitter();
    this.closeAsideBar = new EventEmitter();
    this.imageUrl=environment.imageUrl;
  }
  ngOnInit(): void {
   this.props()
  }
  /**
  * @name props
  * @description This method will be invoked on ngOnInit
  */
  private props(): void {
  }
  /**
   * @name onLogOut
   * @description This method will be logged out user
   */
  public onLogOut(email: string): void {
    this._authService.getLogOutEmail(email);
  }

  /**
   * @name onSearchUser
   * @description This method is used to show modal
   */
  public onSearchUser(): void {
    this.openAsideBar.next()
  }
  /**
  * @description This method close model click on outside.
  */
  public clickOutside(): void {
    this.closeAsideBar.next(true)
  }
  public openCreateGroupModel():void{
    let userDetails: any[] = this._allUsers.map((user: User) => ({
      id: user._id,
      full_name: `${user.full_name} (${user.role})`,
    }))
    this._overlayService.open(CreateGroupFormContainerComponent,true,userDetails);
  }
}


