import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnechatRoutingModule } from './onechat-routing.module';
import { Onechat } from './onechat';
import { ChatListHeader } from './chat-list-header/chat-list-header';
import { NoConversation } from './no-conversation/no-conversation';
import { ChatListContainer } from './chat-list-container/chat-list-container';
import { ChatListPresentation} from './chat-list-container/chat-list-presentation/chat-list-presentation';
import { UserListContainer } from './user-list-container/user-list-container';
import { UserListPresentation } from './user-list-container/user-list-presentation/user-list-presentation';
import { CreateGroupFormContainer } from './create-group-form-container/create-group-form-container';
import { CreateGroupFormPresentation } from './create-group-form-container/create-group-form-presentation/create-group-form-presentation';


@NgModule({
  declarations: [
    Onechat,
    ChatListHeader,
    NoConversation,
    ChatListContainer,
    ChatListPresentation,
    UserListContainer,
    UserListPresentation,
    CreateGroupFormContainer,
    CreateGroupFormPresentation
  ],
  imports: [
    CommonModule,
    OnechatRoutingModule
  ]
})
export class OnechatModule { }
