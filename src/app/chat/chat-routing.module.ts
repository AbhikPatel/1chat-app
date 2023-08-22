import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './chat.component';

const routes: Routes = [{ path: '', component: ChatComponent }, { path: 'message', loadChildren: () => import('./message/message.module').then(m => m.MessageModule) }, { path: 'eod', loadChildren: () => import('./eod/eod.module').then(m => m.EodModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }
