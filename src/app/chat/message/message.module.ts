import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './message.component';
import { ChattingMessageContainerComponent } from './chatting-message-container/chatting-message-container.component';
import { ChattingMessagePresentationComponent } from './chatting-message-container/chatting-message-presentation/chatting-message-presentation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChattingMessagePresenterService } from './chatting-message-container/Chatting-message-presenter/chatting-message-presenter.service';
import { PickerModule } from '@ctrl/ngx-emoji-mart';


@NgModule({
  declarations: [
    MessageComponent,
    ChattingMessageContainerComponent,
    ChattingMessagePresentationComponent,
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    ReactiveFormsModule,
    PickerModule,
    FormsModule,

  ]
})
export class MessageModule { }
