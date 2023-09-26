import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { environment } from 'src/environments/environment';
import { TokenInterceptor } from './core/services/interceptor/token.interceptor';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { ChatService } from './chat/chat.service';
import { EODAdapter, conversationUserAdapter } from './chat/chat-adaptor/chat.adaptor';
import { FormatTime } from './core/utilities/formatTime';
import { CommunicationService } from './chat/shared/communication/communication.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MessageAdapter } from './chat/chat-adaptor/message.adaptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    NgSelectModule,
    NgMultiSelectDropDownModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NgbModule,
  ],
  providers: [
    {
      multi: true,
      useClass: TokenInterceptor,
      provide: HTTP_INTERCEPTORS
    },
    ChatService,
    conversationUserAdapter,
    FormatTime,
    MessageAdapter,
    EODAdapter,
    CommunicationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
