import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OneChatContainerComponent } from './one-chat-container/one-chat-container.component';

const routes: Routes = [
  {
    path:'',
    component:OneChatContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OneChatRoutingModule { }
