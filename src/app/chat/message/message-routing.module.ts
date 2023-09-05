import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message.component';
import { ChattingMessageContainerComponent } from './chatting-message-container/chatting-message-container.component';

const routes: Routes = [
  {
    path: '', component: MessageComponent,
    children: [
      {
        path: '',
        redirectTo: 'conversation',
        pathMatch: 'full'
      },
      { path: 'conversation', component: ChattingMessageContainerComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
