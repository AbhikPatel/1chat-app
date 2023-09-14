import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import {  Observable, Subject,finalize,takeUntil } from 'rxjs';
import { ChatService } from '../chat.service';
import { User } from 'src/app/shared/models/user.model';
import { CommonService } from 'src/app/shared/services/common.service';
import { ConversationUsers } from 'src/app/one-chat/models/chat.model';
import { login } from '../models/login.model';
import { LoaderService } from 'src/app/core/services/loader/loader.service';

@Component({
  selector: 'app-user-list-container',
  templateUrl: './user-list-container.component.html',
  styles: [':Host{ height:100%}']
})
export class UserListContainerComponent implements OnInit, OnDestroy {

   /** This property is used to  api all user api call */
  @Input() public ClickAsideBarApiCall: boolean;
  /** This property is used to emit boolean value */
  @Output() public closeAsideBarEmitter: EventEmitter<boolean>;
  /** This property is used to emit User details */
  @Output() public newConversationEmitter: EventEmitter<any>;
  /** This Variable the details of all the users */
  public getAllUsers: User[];
    /** This variable will store  localStorage object */
    public getLoginDetails:login;
  /** stops the subscription on ngDestroy */
  private destroy: Subject<void>;
  /** stops the subscription on ngDestroy */
  private _getConversationUserLists: ConversationUsers[];


  constructor(private _chatService: ChatService,
    private _commonService: CommonService,
    private _loaderService: LoaderService
  ) {
    this.closeAsideBarEmitter = new EventEmitter();
    this.newConversationEmitter = new EventEmitter();

    this.destroy = new Subject();
    this.getAllUsers = [];
    this.getLoginDetails=this._commonService.getLoginDetails()
   
  }
  ngOnInit(): void {
    this.props()
  }
  /**
  * @name props
  * @description This method will be invoked on ngOnInit
  */
  private props(): void {
    this._commonService.userApiCall.subscribe((data:any)=>{
      if(data === true) {
        this._loaderService.showLoader1();
        this._chatService.getAllUserData().subscribe((users: User[]) => {
          if(users){
            this._loaderService.hideLoader1();
              this.getAllUsers = users;
              const senderDetails = users.find((user:User)=> user._id == this.getLoginDetails.userId);
              const senderIndex=users.indexOf(senderDetails);
              users.splice(senderIndex,1);
              this.getAllUsers=this.getLoginDetails.role === 'intern' ? users.filter((user:User)=> user.role !=='intern' ) :users;
            }
           })
      }
     ;
    }) 
    
}
public getAllUser(){
 
}
  /**
  * @name closeAsideBar
  * @description This method  Emit boolean value 
  */
  public closeAsideBar(boolean: boolean) {
    this.closeAsideBarEmitter.next(boolean)

  }
  /**
  * @name getConversation
  * @description This method  Emit User details
  */
  public newConversation(user: any) {
    this.newConversationEmitter.next(user)

  }
  /**
 * @name ngOnDestroy
 * @description This method is called the component is destroyed
 */
  public ngOnDestroy(): void {
    this._chatService.disconnectSocket();
    this.destroy.next();
    this.destroy.unsubscribe();
    
  }
}
