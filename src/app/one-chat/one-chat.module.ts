import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { SearchPipe } from './pipe/search.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from 'src/environments/environment.prod';
import { CreateGroupPresentationComponent } from './shared/create-group-presentation/create-group-presentation.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';




@NgModule({
  declarations: [
    OneChatContainerComponent,
    OneChatPresentationComponent,
    ChatListPresentationComponent,
    ChatMessagePresentationComponent,
    SearchPipe,
    ScrollDistanceDirective,
    CreateGroupPresentationComponent
  ],
  imports: [
    CommonModule,
    OneChatRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PickerModule,
    FormsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production }),
    OverlayModule,
    NgMultiSelectDropDownModule
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
