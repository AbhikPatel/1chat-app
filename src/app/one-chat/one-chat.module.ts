import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
//------------------------------------------------------------------------------- //
import { FormatTime } from '../core/utilities/formatTime';
import { userAdaptor } from '../shared/adaptor/user.adaptor';
import { SharedModule } from '../shared/shared.module';
import { EODAdapter, MessageAdapter, conversationUserAdapter } from './one-chat-adaptor/one-chat.adaptor';
import { OneChatContainerComponent } from './one-chat-container/one-chat-container.component';
import { ChatListPresentationComponent } from './one-chat-container/one-chat-presentation/chat-list/chat-list-presentation/chat-list-presentation.component';
import { ChatMessagePresentationComponent } from './one-chat-container/one-chat-presentation/chat-message/chat-message-presentation/chat-message-presentation.component';
import { OneChatPresentationComponent } from './one-chat-container/one-chat-presentation/one-chat-presentation.component';
import { OneChatRoutingModule } from './one-chat-routing.module';
import { OneChatService } from './one-chat.service';
import { ScrollDistanceDirective } from './pipe/scroll-distance.directive';
import { SearchPipe } from '../chat/shared/pipe/search.pipe';
import { ChattingPresentationComponent } from './shared/chatting-presentation/chatting-presentation.component';
import { CreateGroupPresentationComponent } from './shared/create-group-presentation/create-group-presentation.component';
import { EodModelComponent } from './shared/eod-model/eod-model.component';
import { EodPresentationComponent } from './shared/eod-presentation/eod-presentation.component';
import { EodTableFormPresentationComponent } from './shared/eod-table-form-presentation/eod-table-form-presentation.component';



@NgModule({
  declarations: [
    OneChatContainerComponent,
    OneChatPresentationComponent,
    ChatListPresentationComponent,
    ChatMessagePresentationComponent,
    SearchPipe,
    ScrollDistanceDirective,
    CreateGroupPresentationComponent,
    ChattingPresentationComponent,
    EodPresentationComponent,
    EodTableFormPresentationComponent,
    EodModelComponent,
  ],
  imports: [
    CommonModule,
    OneChatRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    PickerModule,
    FormsModule,
    OverlayModule,
    NgMultiSelectDropDownModule,
    BsDropdownModule.forRoot(),
    NgbDropdownModule ,
    InfiniteScrollModule
  ],
  providers:[
    OneChatService,
    userAdaptor,
    FormatTime,
    ReactiveFormsModule,
    conversationUserAdapter,
    MessageAdapter,
    EODAdapter,
  ],

})
export class OneChatModule { }
