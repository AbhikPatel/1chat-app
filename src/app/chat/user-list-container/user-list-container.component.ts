import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { ChatService } from '../chat.service';
import { User } from 'src/app/shared/models/user.model';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-user-list-container',
  templateUrl: './user-list-container.component.html',
  styles: [':Host{ height:100%}']
})
export class UserListContainerComponent implements OnInit, OnDestroy {

  @Input() public ClickAsideBarApiCall: boolean;
  /** This property is used to emit boolean value */
  @Output() public closeAsideBarEmitter: EventEmitter<boolean>;
  /** Observable for the details of all the users */
  public getAllUsers: User[];
    /** This variable will store  localStorage object */
    public getLoginDetails:any
  /** stops the subscription on ngDestroy */
  private destroy: Subject<void>;
  constructor(private _chatService: ChatService,
    private _commonService: CommonService
  ) {
    this.closeAsideBarEmitter = new EventEmitter();
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
      if(data == true)
      this._chatService.getAllUserData().pipe(takeUntil(this.destroy)).subscribe((users: User[]) => {
        if(users){
          this.getAllUsers = users;
          const senderDetails = users.find((user:User)=> user._id == this.getLoginDetails.userId);
          const senderIndex=users.indexOf(senderDetails);
          users.splice(senderIndex,1);
          this.getAllUsers=this.getLoginDetails.role === 'intern' ? users.filter((user:User)=> user.role !=='intern' ) :users;
        }
    })
      
    })
   
}


  /**
  * @name closeAsideBar
  * @description This method  Emit boolean value 
  */
  public closeAsideBar(boolean: boolean) {
    this.closeAsideBarEmitter.next(boolean)

  }
  /**
 * @name ngOnDestroy
 * @description This method is called the component is destroyed
 */
  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
    
  }
}
