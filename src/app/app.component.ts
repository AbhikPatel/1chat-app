import { Component } from '@angular/core';
import { LoaderService } from './core/services/loader/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = '1chat-app';

  // This variable is use to show loader 
  public showLoader:Boolean;

  constructor(
    private _service:LoaderService
  ){
    this.showLoader = false;
    this._service.loader.subscribe((data:Boolean) => this.showLoader = data)
  }
  
}
