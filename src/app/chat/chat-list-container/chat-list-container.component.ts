import { Component, OnInit } from '@angular/core';
import { ChatService } from '../chat.service';

@Component({
  selector: 'app-chat-list-container',
  templateUrl: './chat-list-container.component.html'
})
export class ChatListContainerComponent  implements OnInit {
  constructor(private _chatService:ChatService) {
  }
  ngOnInit(): void {
   this.props()
  }

  /**
  * @name props
  * @description This method will be invoked on ngOnInit
  */
  private props(): void {
    this._chatService.getConversationUser().subscribe((conversation:any)=>{
    console.log(conversation);
    })
  }
}
