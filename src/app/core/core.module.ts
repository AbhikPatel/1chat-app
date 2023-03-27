import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MasterComponent } from './components/master/master.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HttpService } from './services/http/http.service';
import { userAdaptor } from '../shared/adaptor/user.adaptor';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    MasterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers:[
    AuthService,
    AuthGuard,
    HttpService,
    userAdaptor
  ]
})
export class CoreModule { }
