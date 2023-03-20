import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './components/master/master.component';
import { LoginComponent } from './components/login/login.component';



@NgModule({
  declarations: [
    MasterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule { }
