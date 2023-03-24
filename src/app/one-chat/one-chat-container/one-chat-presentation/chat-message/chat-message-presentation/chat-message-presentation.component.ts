import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ChatMessagePresenterService } from '../chat-message-presenter/chat-message-presenter.service';

@Component({
  selector: 'app-chat-message-presentation',
  templateUrl: './chat-message-presentation.component.html',
  viewProviders:[ChatMessagePresenterService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ChatMessagePresentationComponent implements OnInit{

  public destroy:Subject<void>
  constructor(
    private _service:ChatMessagePresenterService
  ){
    this.destroy = new Subject();  
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(){
    this.destroy.next()
    this.destroy.complete()
  }

}
