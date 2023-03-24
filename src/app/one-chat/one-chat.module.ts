import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OneChatRoutingModule } from './one-chat-routing.module';
import { OneChatContainerComponent } from './one-chat-container/one-chat-container.component';
import { OneChatPresentationComponent } from './one-chat-container/one-chat-presentation/one-chat-presentation.component';
import { ChatListPresentationComponent } from './one-chat-container/one-chat-presentation/chat-list/chat-list-presentation/chat-list-presentation.component';
import { ChatMessagePresentationComponent } from './one-chat-container/one-chat-presentation/chat-message/chat-message-presentation/chat-message-presentation.component';
import { OneChatService } from './one-chat.service';
import { allUserAdaptor } from './one-chat-adaptor/one-chat.adaptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './pipe/search.pipe';


@NgModule({
  declarations: [
    OneChatContainerComponent,
    OneChatPresentationComponent,
    ChatListPresentationComponent,
    ChatMessagePresentationComponent,
    SearchPipe
  ],
  imports: [
    CommonModule,
    OneChatRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    OneChatService,
    allUserAdaptor
  ]
})
export class OneChatModule { }
