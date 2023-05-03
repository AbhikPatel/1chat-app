import { AfterViewInit, Component } from '@angular/core';
import { LoaderService } from './core/services/loader/loader.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements AfterViewInit {

  /** This variable holds the application name */
  public title = '1-chat';

  /** This variable is use to show loader  */
  public showLoader: Boolean = false;

  constructor(
    private _service: LoaderService,
  ) {
  }

  public ngAfterViewInit(): void {
    this._service.loader.pipe(delay(100)).subscribe((data: Boolean) => this.showLoader = data);
  }
}
