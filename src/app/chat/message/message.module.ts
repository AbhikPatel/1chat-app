import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './message.component';
import { ChattingMessageContainerComponent } from './chatting-message-container/chatting-message-container.component';
import { ChattingMessagePresentationComponent } from './chatting-message-container/chatting-message-presentation/chatting-message-presentation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { ScrollPaginationDirective } from './directive/scroll-pagination.directive';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';


@NgModule({
  declarations: [
    MessageComponent,
    ChattingMessageContainerComponent,
    ChattingMessagePresentationComponent,
    ScrollPaginationDirective
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    ReactiveFormsModule,
    PickerModule,
    FormsModule,
    NgbDropdownModule,
    NgxSkeletonLoaderModule
  ]
})
export class MessageModule { }
