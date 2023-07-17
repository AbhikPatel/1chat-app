import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { TokenInterceptor } from './core/services/interceptor/token.interceptor';
import { environment } from 'src/environments/environment.prod';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      // enabled: environment.production,
      /** Register the ServiceWorker as soon as the application is stable */
      /** or after 30 seconds (whichever comes first). */
      registrationStrategy: 'registerWhenStable:60000'
    }),
  ],
  providers: [
    {
      multi:true,
      useClass:TokenInterceptor,
      provide:HTTP_INTERCEPTORS
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
