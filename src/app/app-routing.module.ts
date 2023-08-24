import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/components/login/login.component';
import { MasterComponent } from './core/components/master/master.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'1Chat',
    component:MasterComponent,
    canActivate:[AuthGuard],
    children:[
      // {
      //   path:'',
      //   loadChildren: () => import('./one-chat/one-chat.module').then(m => m.OneChatModule),
      // },
          { path: '', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
    ]
  },
  {
    path:'',
    redirectTo:'1Chat',
    pathMatch:'full'
  },
 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})  
export class AppRoutingModule { }
