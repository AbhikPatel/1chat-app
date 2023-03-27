import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NewUser } from 'src/app/shared/models/user.model';
import { OneChatService } from '../one-chat.service';

@Component({
  selector: 'app-one-chat-container',
  templateUrl: './one-chat-container.component.html',
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class OneChatContainerComponent implements OnInit{

  public destroy:Subject<void>;
  public listen$:Observable<any>;
  public allUser$:Observable<NewUser[]>;
  constructor(
    private _service:OneChatService
  ){
    this.destroy = new Subject();
    this.listen$ = new Observable();
    this.allUser$ = new Observable();
  }

  ngOnInit(): void {
    this.allUser$ = this._service.getAllUserData();
  }

  ngOnDestroy(){
    this.destroy.next();
    this.destroy.complete();
  }

  public getEventName(event:string){
    this.listen$ = this._service.listen(event)
  }
}
