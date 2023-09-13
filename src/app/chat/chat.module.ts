import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatListHeaderComponent } from './chat-list-header/chat-list-header.component';
import { NoConversationComponent } from './no-conversation/no-conversation.component';
import { ChatListContainerComponent } from './chat-list-container/chat-list-container.component';
import { ChatListPresentationComponent } from './chat-list-container/chat-list-presentation/chat-list-presentation.component';
import { UserListContainerComponent } from './user-list-container/user-list-container.component';
import { UserListPresentationComponent } from './user-list-container/user-list-presentation/user-list-presentation.component';
import { CreateGroupFormContainerComponent } from './create-group-form-container/create-group-form-container.component';
import { CreateGroupFormPresentationComponent } from './create-group-form-container/create-group-form-presentation/create-group-form-presentation.component';
import { ChatService } from './chat.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { OnClickOutsideDirective } from './directive/on-click-outside.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchPipe } from './shared/pipe/search.pipe';
import { EODAdapter, MessageAdapter, conversationUserAdapter } from './chat-adaptor/chat.adaptor';
import { FormatTime } from '../core/utilities/formatTime';
import { ChatHeaderComponent } from './chat-header/chat-header.component';
import { CommunicationService } from './shared/communication/communication.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

@NgModule({
  declarations: [
    ChatComponent,
    ChatListHeaderComponent,
    NoConversationComponent,
    ChatListContainerComponent,
    ChatListPresentationComponent,
    UserListContainerComponent,
    UserListPresentationComponent,
    CreateGroupFormContainerComponent,
    CreateGroupFormPresentationComponent,
    OnClickOutsideDirective,
    ChatHeaderComponent,
    SearchPipe,
  ],
  imports: [
    CommonModule,
    ChatRoutingModule,
    NgbDropdownModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    NgxSkeletonLoaderModule
  ],
  providers: [
    // ChatService,
    // conversationUserAdapter,
    // FormatTime,
    // MessageAdapter,
    // EODAdapter,
    // CommunicationService
  ],
})
export class ChatModule { }
