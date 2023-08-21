import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatRoutingModule } from './chat-routing.module';
import { Chat } from './chat';
import { ChattingMessageContainer } from './chatting-message-container/chatting-message-container';
import { ChattingMessagePresentation} from './chatting-message-container/chatting-message-presentation/chatting-message-presentation';


@NgModule({
  declarations: [
    Chat,
    ChattingMessageContainer,
    ChattingMessagePresentation
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
