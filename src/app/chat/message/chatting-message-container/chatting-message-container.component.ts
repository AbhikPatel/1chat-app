import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../chat.service';
import { Message } from '../../models/chat.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chatting-message-container',
  templateUrl: './chatting-message-container.component.html'
})
export class ChattingMessageContainerComponent implements OnInit {
  public ParamId: string;
  /** Observable for the chat messages */
  public getMessages$: Observable<Message[]>;
  constructor(private router: ActivatedRoute,
    private _ChatService:ChatService) {

  }
  ngOnInit(): void {
    // Access route parameters using ActivatedRoute
    this.router.parent.params.subscribe(parentParams => {
      this.ParamId = parentParams['id'];
    });
     this.getMessage()
  }
 /**
   * @name getMessage
   * @param id 
   * @description This method will call a http get request for chatId 
   */
 public getMessage(): void {
  this.getMessages$= this._ChatService.getChatMessages(this.ParamId);  
}
}
