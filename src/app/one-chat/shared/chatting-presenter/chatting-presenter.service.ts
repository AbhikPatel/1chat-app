import { Injectable, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';

@Injectable()

export class ChattingPresenterService implements OnDestroy{

  /** Observable for chat */
  public chat$: Observable<string>;

  /** Subject for chat */
  private chat: Subject<string>;
  /** Stops the subcription */
  private destroy:Subject<void>;

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
  public getChatData(chatData:string): void {
    this.chat.next(chatData)
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.unsubscribe();
  }
}
