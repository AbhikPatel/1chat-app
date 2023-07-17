import { AfterViewInit, Component } from '@angular/core';
import { LoaderService } from './core/services/loader/loader.service';
import { delay, filter, map } from 'rxjs';
import { SwUpdate, VersionReadyEvent } from "@angular/service-worker";

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
    public serviceWorkerUpdates: SwUpdate
  ) {
    this.checkForUpdates()
  }

  public ngAfterViewInit(): void {
    this._service.loader.pipe(delay(100)).subscribe((data: Boolean) => this.showLoader = data);
  }

  private checkForUpdates(): void {
    this.serviceWorkerUpdates.versionUpdates.
    pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
      map(evt => ({
        type: 'UPDATE_AVAILABLE',
        current: evt.currentVersion,
        available: evt.latestVersion,
      }))).subscribe(evt => {
        this.promptUser();
      });
  }

  private promptUser(): void {
    console.log('updating to new version');

    this.serviceWorkerUpdates.activateUpdate().then((res) => { 
      alert('here!');
      document.location.reload()
    });
  }
}
