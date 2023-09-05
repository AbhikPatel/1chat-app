import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConversationUsers } from '../../models/chat.model';
import { User } from 'src/app/shared/models/user.model';
import { Observable, Subject } from 'rxjs';


@Injectable()
export class UserListPresenterService {
    /** Observable for current conversation user */
    public currentConversationUser$: Observable<ConversationUsers>;
    /** Observable for new conversation user */
    public newConversation$: Observable<ConversationUsers>;

    
  /** Subject for current conversation user */
  private currentConversationUser: Subject<ConversationUsers>;
   /** Subject for new conversation users*/
   private newConversation: Subject<ConversationUsers>;
  constructor(private _fb:FormBuilder) { 
    this.currentConversationUser$ = new Observable();
    this.newConversation$ = new Observable();

    this.currentConversationUser = new Subject();

    // this.currentConversationUser$ = this.currentConversationUser.asObservable();
    // this.newConversation$ = this.newConversation.asObservable();
  }
   /**
   * @name getGroup
   * @returns formGroup
   * @description This method is use to reset search box
   */
   public getGroup(): FormGroup {
    return this._fb.group({
      search: ['']
    })
  }
 
}
