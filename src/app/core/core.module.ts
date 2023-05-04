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
import { CustomToastrComponent } from './components/custom-toastr/custom-toastr.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterService } from './services/toaster/toaster.service';



@NgModule({
  declarations: [
    MasterComponent,
    LoginComponent,
    CustomToastrComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    ToastrModule.forRoot({
      toastComponent: CustomToastrComponent,
      preventDuplicates: true,
      enableHtml: true,
      easing:'ease-in',
      timeOut: 5000,
      extendedTimeOut:2000
    }),
    BrowserAnimationsModule
  ],
  providers:[
    AuthService,
    AuthGuard,
    HttpService,
    userAdaptor,
    ToasterService
  ]
})
export class CoreModule { }
