import { Component } from '@angular/core';
import { ChattingMessagePresenterService } from '../Chatting-message-presenter/chatting-message-presenter.service';

@Component({
  selector: 'app-chatting-message-presentation',
  templateUrl: './chatting-message-presentation.component.html',
   providers:[ChattingMessagePresenterService]
})
export class ChattingMessagePresentationComponent {

}
