import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './message.component';
import { ChattingMessageContainerComponent } from './chatting-message-container/chatting-message-container.component';
import { ChattingMessagePresentationComponent } from './chatting-message-container/chatting-message-presentation/chatting-message-presentation.component';
import { ChatHeaderComponent } from './chat-header/chat-header.component';


@NgModule({
  declarations: [
    MessageComponent,
    ChattingMessageContainerComponent,
    ChattingMessagePresentationComponent,
    ChatHeaderComponent
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
  ]
})
export class MessageModule { }
