import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { environment } from 'src/environments/environment.prod';
import { FormatTime } from '../core/utilities/formatTime';
import { SharedModule } from '../shared/shared.module';
import { MessageAdaptor, NewChatAdaptor, NewEditAdaptor, NewReplyAdaptor, allUserAdaptor } from './one-chat-adaptor/one-chat.adaptor';
import { OneChatContainerComponent } from './one-chat-container/one-chat-container.component';
import { ChatListPresentationComponent } from './one-chat-container/one-chat-presentation/chat-list/chat-list-presentation/chat-list-presentation.component';
import { ChatMessagePresentationComponent } from './one-chat-container/one-chat-presentation/chat-message/chat-message-presentation/chat-message-presentation.component';
import { OneChatPresentationComponent } from './one-chat-container/one-chat-presentation/one-chat-presentation.component';
import { OneChatRoutingModule } from './one-chat-routing.module';
import { OneChatService } from './one-chat.service';
import { ScrollDistanceDirective } from './pipe/scroll-distance.directive';
import { SearchPipe } from './pipe/search.pipe';




@NgModule({
  declarations: [
    OneChatContainerComponent,
    OneChatPresentationComponent,
    ChatListPresentationComponent,
    ChatMessagePresentationComponent,
    SearchPipe,
    ScrollDistanceDirective,
  ],
  imports: [
    CommonModule,
    OneChatRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PickerModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    OverlayModule
  ],
  providers:[
    OneChatService,
    allUserAdaptor,
    MessageAdaptor,
    NewChatAdaptor,
    FormatTime,
    ReactiveFormsModule,
    NewEditAdaptor,
    NewReplyAdaptor
  ]
})
export class OneChatModule { }
