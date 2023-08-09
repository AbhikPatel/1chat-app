import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
//------------------------------------------------------------------------------- //
import { userAdaptor } from '../shared/adaptor/user.adaptor';
import { CustomToastrComponent } from './components/custom-toastr/custom-toastr.component';
import { LoginComponent } from './components/login/login.component';
import { MasterComponent } from './components/master/master.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { HttpService } from './services/http/http.service';
import { OverlayService } from './services/overlay/overlay.service';
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
    OverlayModule,
    BrowserAnimationsModule
  ],
  providers:[
    AuthService,
    AuthGuard,
    HttpService,
    userAdaptor,
    ToasterService,
    OverlayService
  ]
})
export class CoreModule { }
