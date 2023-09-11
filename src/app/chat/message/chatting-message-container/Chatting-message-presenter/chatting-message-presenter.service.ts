import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { ConversationUsers, Message } from 'src/app/chat/models/chat.model';

@Injectable()
export class ChattingMessagePresenterService implements OnDestroy {

  /** Observable for chat */
  public chat$: Observable<string>;

  /** Subject for chat */
  private chat: Subject<string>;
  /** Stops the subcription */
  private destroy: Subject<void>;
  public senderId: number;
  private chatArray: Subject<Message[]>;
  public chatArray$: Observable<any>;
  constructor(
    private _fb: FormBuilder
  ) {
    this.chat$ = new Observable();
    this.chatArray$ = new Observable();

    this.chat = new Subject();
    this.chatArray = new Subject();
    this.destroy = new Subject();

    this.chat$ = this.chat.asObservable();
    this.chatArray$ = this.chatArray.asObservable();
  }

  /**
   * @name getGroup
   * @returns formGroup
   * @description This method is use to create form Group
   */
  public getGroup(): FormGroup {
    return this._fb.group({
      message: ['', [Validators.required]]
    })
  }

  /**
   * @name getChatData
   * @param chatData 
   * @description This method will get the data of chat
   */
  public getChatData(chatData: string): void {
    this.chat.next(chatData)
  }
  /**
   * @name getChatArray
   * @param chatArray 
   * @param conversationUser 
   * @description  This Method add ownName field in ChatArray find in conversationUser 
   */
  public getChatArray(chatArray: Message[], conversationUser: ConversationUsers) {
    chatArray = chatArray.map((message: any) => {
      if (message.sender) {
        const groupMember = conversationUser.members.find((item: any, index: number) => item._id == message.sender);
        return {
          ...message,
          ownerName: groupMember ? groupMember.full_name : ''
        }
      }
      else {
        return chatArray
      }
    })

    this.chatArray.next(chatArray)
  }
  /**
   * @description
   * @param data 
   * @param pre 
   * @returns 
   */
  public formatDate(data: Date, pre: Date): string {
    // convert string to date object
    const newData = new Date(data);
    const getday = newData.getDate();
    // convert string to date object
    const preData = new Date(pre);
    const preDay = preData.getDate();
    // check first date and Previous date then Return
    if (getday === preDay) {
      return '';
    }
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    // Check if the date is today
    if (newData.toDateString() === today.toDateString()) {
      return 'Today';
    }
    // Check if the date is yesterday
    if (newData.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }
    // Check if the date is within the last week
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    if (newData >= oneWeekAgo) {
      return newData.toLocaleString('en-US', { weekday: 'short' });
    }
    // Return the full date
    return newData.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
