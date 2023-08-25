import { AfterViewInit, Component } from '@angular/core';
import { LoaderService } from './core/services/loader/loader.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  /** This variable holds the application name */
  public title = '1-chat';



  constructor(
   
  ) {
  }



}
