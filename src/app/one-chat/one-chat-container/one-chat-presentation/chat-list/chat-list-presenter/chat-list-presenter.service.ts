import { Injectable, OnDestroy } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/internal/Subject';
import { Observable } from 'rxjs/internal/Observable';

import { FormatTime } from 'src/app/core/utilities/formatTime';
import { ConversationUser, GroupDetails, MessageRead } from 'src/app/one-chat/models/chat.model';
import { NewUser } from 'src/app/shared/models/user.model';
import { ComponentPortal } from '@angular/cdk/portal';
import { CreateGroupPresentationComponent } from 'src/app/one-chat/shared/create-group-presentation/create-group-presentation.component';
import { takeUntil } from 'rxjs';

@Injectable()

export class ChatListPresenterService implements OnDestroy {

  public newConversationUser$: Observable<ConversationUser>;
  public isReadData$: Observable<MessageRead>;
  public newGroup$: Observable<GroupDetails>;

  private newConversationUser: Subject<ConversationUser>;
  private isReadData: Subject<MessageRead>;
  private destroy: Subject<void>;
  private newGroup: Subject<GroupDetails>;

  public userId: string = localStorage.getItem('userId');

  constructor(
    private _formatter: FormatTime,
    private _fb: FormBuilder,
    private _overlay: Overlay
  ) {
    this.newConversationUser = new Subject();
    this.isReadData = new Subject();
    this.destroy = new Subject();
    this.newGroup = new Subject();

    this.newConversationUser$ = new Observable();
    this.isReadData$ = new Observable();
    this.newGroup$ = new Observable();

    this.newConversationUser$ = this.newConversationUser.asObservable();
    this.isReadData$ = this.isReadData.asObservable();
    this.newGroup$ = this.newGroup.asObservable();
  }

  /**
   * @name getNewConversationUser
   * @param user 
   * @description This method is use to create new Conversation user
   */
  public getNewConversationUser(user: NewUser): void {
    let obj: ConversationUser = {
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      photo: user.photo,
      full_name: user.full_name,
      chatId: '',
      time: this._formatter.Formatter(new Date()),
      message: '-',
      notificationCount: 0,
      role: user.role,
      type: 'dm',
    }
    this.newConversationUser.next(obj)
  }

  /**
   * @name getIsReadData
   * @param data 
   * @description This method will create the message Read object
   */
  public getIsReadData(data: ConversationUser): void {
    let obj: MessageRead = {
      chatId: data.chatId,
      sender: data._id,
      receiver: this.userId,
      count: data.notificationCount
    }
    this.isReadData.next(obj)
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

  public openCreateGroupForm(users: any): void {
    const overlay = this._overlay.create({
      hasBackdrop: true,
      positionStrategy: this._overlay.position().global().centerHorizontally().centerVertically(),
    })

    const component = new ComponentPortal(CreateGroupPresentationComponent);
    const overlayRef = overlay.attach(component);

    overlay.backdropClick().pipe(takeUntil(this.destroy)).subscribe(() => overlay.detach());

    overlayRef.instance.getUsers = users;
    overlayRef.instance.emitOverlayData.pipe(takeUntil(this.destroy)).subscribe((data) => {
      if (data)
        this.newGroup.next(data)
      overlay.detach();
    })
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
