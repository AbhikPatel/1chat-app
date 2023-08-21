import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Onechat } from './onechat';


const routes: Routes = [

      { path: '', component: Onechat },

      { path: 'eod', loadChildren: () => import('./eod/eod.module').then(m => m.EodModule) },
  
      { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) }



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnechatRoutingModule { }
