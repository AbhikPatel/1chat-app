import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NewUser } from 'src/app/shared/models/user.model';
import { ChatListPresenterService } from '../chat-list-presenter/chat-list-presenter.service';

@Component({
  selector: 'app-chat-list-presentation',
  templateUrl: './chat-list-presentation.component.html',
  viewProviders:[ChatListPresenterService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChatListPresentationComponent implements OnInit{

  @Input() public set getAllUser(v : NewUser[] | null) {
    this._getAllUser = v;
  }
  public get getAllUser() : NewUser[] | null {
    return this._getAllUser;
  }
  
  
  private _getAllUser : NewUser[] | null;
  public destroy:Subject<void>;
  public searchText:string;

  constructor(
    private _service: ChatListPresenterService
  ){
    this.destroy = new Subject();
    this._getAllUser = [];
    this.searchText = '';
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(){
    this.destroy.next()
    this.destroy.complete()
  }

  public onNewChat(){
    
  }
}
