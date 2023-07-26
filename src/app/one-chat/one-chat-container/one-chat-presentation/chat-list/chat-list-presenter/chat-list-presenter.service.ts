import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

import { ConversationUsers, GroupDetails, MessageRead } from 'src/app/one-chat/models/chat.model';
import { User } from 'src/app/shared/models/user.model';
import { ComponentPortal } from '@angular/cdk/portal';
import { CreateGroupPresentationComponent } from 'src/app/one-chat/shared/create-group-presentation/create-group-presentation.component';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CommonService } from 'src/app/shared/services/common.service';

@Injectable()

export class ChatListPresenterService implements OnDestroy {

  /** Observable for current conversation user */
  public currentConversationUser$: Observable<ConversationUsers>;
  /** Observable for new conversation user */
  public newConversation$: Observable<ConversationUsers>;
  /** Observable for message read data */
  public messageRead$: Observable<MessageRead>;
  /** Observable for new group details */
  public newGroupData$: Observable<GroupDetails>;

  /** Subject for current conversation user */
  private currentConversationUser: Subject<ConversationUsers>;
  /** Subject for messaage read data*/
  private messageRead: Subject<MessageRead>;
  /** Subject for new conversation users*/
  private newConversation: Subject<ConversationUsers>;
  /** Observable for new group details */
  public newGroupData: Subject<GroupDetails>;
  /** stops the subcription on destroy*/
  private destroy: Subject<void>;

  constructor(
    private _fb: FormBuilder,
    private _overlay: Overlay,
    private _commonService: CommonService
  ) {
    this.currentConversationUser$ = new Observable();
    this.messageRead$ = new Observable();
    this.newConversation$ = new Observable();
    this.newGroupData$ = new Observable();

    this.currentConversationUser = new Subject();
    this.messageRead = new Subject();
    this.newConversation = new Subject();
    this.newGroupData = new Subject();
    this.destroy = new Subject();

    this.currentConversationUser$ = this.currentConversationUser.asObservable();
    this.messageRead$ = this.messageRead.asObservable();
    this.newConversation$ = this.newConversation.asObservable();
    this.newGroupData$ = this.newGroupData.asObservable();
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

  /**
   * @name getCurrentConversation
   * @param user 
   * @description This methosd will get the current  conversation
   */
  public getCurrentConversation(user: ConversationUsers, senderId: string): void {
    let readMessages: MessageRead = {
      chatId: user.chatId,
      sender: senderId,
      receiver: user.members[0]._id,
      count: user.notificationCount
    };
    user.notificationCount = 0;
    user.eodNotification = false;
    this.currentConversationUser.next(user);
    this.messageRead.next(readMessages);
  }

  /**
   * @name createNewConversation
   * @param user 
   * @description This method will create a new Conversation user
   */
  public createNewConversation(user: User): void {
    let newConversationUser: ConversationUsers = {
      chatId: user._id,
      owner: user._id,
      chat_type: 'dm',
      members: [{
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        photo: user.photo,
        role: user.role,
        full_name: user.full_name,
      }],
      sender: '',
      receiver: '',
      time: '',
      lastMessage: '-',
      lastMessageId: '',
      isRead: false,
      isEdit: false,
      standardTime: '',
      profile: user.photo,
      displayName: user.full_name,
      notificationCount: 0,
      showIsOnline: false,
      eodNotification: false
    };
    this.newConversation.next(newConversationUser);
    this.currentConversationUser.next(newConversationUser);
  }

  public openCreateGroupForm(users: any): void {
    const overlay = this._overlay.create({
      hasBackdrop: true,
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
    })
    const component = new ComponentPortal(CreateGroupPresentationComponent);
    const overlayRef = overlay.attach(component);
    overlay.backdropClick().pipe(takeUntil(this.destroy)).subscribe(() => overlay.detach());
    this._commonService.closeOverlayS$.pipe(takeUntil(this.destroy)).subscribe(() => overlay.detach());
    overlayRef.instance.getUsers = users;
    overlayRef.instance.newGroupInformation.pipe(takeUntil(this.destroy)).subscribe((groupDetails: GroupDetails) => this.newGroupData.next(groupDetails));
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
