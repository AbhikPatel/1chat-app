import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormatTime } from '../core/utilities/formatTime';
import { SharedModule } from '../shared/shared.module';
import { ConversationUserAdaptor, MessageAdaptor, NewChatAdaptor, allUserAdaptor } from './one-chat-adaptor/one-chat.adaptor';
import { OneChatContainerComponent } from './one-chat-container/one-chat-container.component';
import { ChatListPresentationComponent } from './one-chat-container/one-chat-presentation/chat-list/chat-list-presentation/chat-list-presentation.component';
import { ChatMessagePresentationComponent } from './one-chat-container/one-chat-presentation/chat-message/chat-message-presentation/chat-message-presentation.component';
import { OneChatPresentationComponent } from './one-chat-container/one-chat-presentation/one-chat-presentation.component';
import { OneChatRoutingModule } from './one-chat-routing.module';
import { OneChatService } from './one-chat.service';
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
    ReactiveFormsModule,
    SharedModule
  ],
  providers:[
    OneChatService,
    allUserAdaptor,
    MessageAdaptor,
    NewChatAdaptor,
    FormatTime,
    ConversationUserAdaptor
  ]
})
export class OneChatModule { }
