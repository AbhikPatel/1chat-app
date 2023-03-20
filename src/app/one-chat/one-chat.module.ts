import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OneChatRoutingModule } from './one-chat-routing.module';
import { OneChatContainerComponent } from './one-chat-container/one-chat-container.component';
import { OneChatPresentationComponent } from './one-chat-container/one-chat-presentation/one-chat-presentation.component';
import { ChatListPresentationComponent } from './one-chat-container/one-chat-presentation/chat-list/chat-list-presentation/chat-list-presentation.component';
import { ChatMessagePresentationComponent } from './one-chat-container/one-chat-presentation/chat-message/chat-message-presentation/chat-message-presentation.component';


@NgModule({
  declarations: [
    OneChatContainerComponent,
    OneChatPresentationComponent,
    ChatListPresentationComponent,
    ChatMessagePresentationComponent
  ],
  imports: [
    CommonModule,
    OneChatRoutingModule
  ]
})
export class OneChatModule { }
