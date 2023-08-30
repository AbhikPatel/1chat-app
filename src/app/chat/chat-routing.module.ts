import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';
import { NoConversationComponent } from './no-conversation/no-conversation.component';

const routes: Routes = [
  {
    path: '', component: ChatComponent,

    children: [
      { path: 'message/:id', loadChildren: () => import('./message/message.module').then(m => m.MessageModule) },
      { path: 'eod', loadChildren: () => import('./eod/eod.module').then(m => m.EodModule) },
      { path: 'no-conversation', component: NoConversationComponent },
      {
        path: '',
        redirectTo: 'no-conversation',
        pathMatch: 'full'
      },

    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
