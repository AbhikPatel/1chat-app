import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()

export class ChattingPresenterService implements OnDestroy {

  /** Observable for chat */
  public chat$: Observable<string>;

  /** Subject for chat */
  private chat: Subject<string>;
  /** Stops the subcription */
  private destroy: Subject<void>;

  constructor(
    private _fb: FormBuilder
  ) {
    this.chat$ = new Observable();

    this.chat = new Subject();
    this.destroy = new Subject();

    this.chat$ = this.chat.asObservable();
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
