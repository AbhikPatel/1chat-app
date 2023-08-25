import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ChatService } from '../chat.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chat-list-header-ui',
  templateUrl: './chat-list-header.component.html'
})
export class ChatListHeaderComponent implements OnInit {

  /** This element is for toggle search */
  @ViewChild('toggle') public toggle: ElementRef;
  /** This property is used to emit boolean value */
  @Output() public openAsideBar: EventEmitter<void>
  /** This property is used to emit boolean value */
  @Output() public closeAsideBar: EventEmitter<boolean>

    /** This variable will store  localStorage object */
    public getLoginDetails: any;

  public imageUrl:any;

  constructor(
    private _oneChatServices: ChatService,
    private _commonService: CommonService,
    private _authService: AuthService,
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
   console.log( this.getLoginDetails.photo);
   
    
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
}


