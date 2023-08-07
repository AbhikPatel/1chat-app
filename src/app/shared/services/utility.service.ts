import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { SwPush, SwUpdate, VersionEvent } from "@angular/service-worker";
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  /** Observable for notification click */
  public notificationClick$: Observable<any>;    
  /** Subject for notification click */
  private notificationClick: Subject<any>;
  /** variable for subscriber of service worker */
  public subscriber: PushSubscription;

  /** subject for service worker update */
  public serviceWorkerUpdateFlag$: Observable<boolean>;
  /** observalble for service worker update */
  private serviceWorkerUpdateFlag: Subject<boolean>;

  /** Voluntary Application Server Identity to send push notification */
  private readonly VAPID_PUBLIC_KEY: string = "BKX5wA9WxBSYJZWvQtdgD-1rknSL5ejHQd25tUxl5bM9QkNrQVms__OnS1cbRxsJ96E09gKruA8pOcEv7XTfSc4";
  
  constructor(
      private swPush: SwPush,
      private serviceWorkerUpdates: SwUpdate,
    ) { 
    this.notificationClick$ = new Observable();
    this.notificationClick = new Subject();
    this.notificationClick$ = this.notificationClick.asObservable();
    this.serviceWorkerUpdateFlag$ = new Observable();
    this.serviceWorkerUpdateFlag = new Subject();
    this.serviceWorkerUpdateFlag$ = this.serviceWorkerUpdateFlag.asObservable();
    this.subscriber = null;
  }

    /**
   * @name subscribeToPushNotificationClick
   * @description This method is used to subscribe notificationclick event
   */
    public subscribeToPushNotificationClick(): void {
      this.swPush.notificationClicks.subscribe((val)=> {
        this.notificationClick.next({message_type: val.notification.data.message_type, message: val.notification.data.message});
      });
    }
  
    /**
     * @name subscribeToPushNotification
     * @description This method is used to subscribe client to push notification
    */
    public subscribeToPushNotification(): void {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
        .then(sub => {
          this.subscriber = sub;
        })
        .catch(err => console.error("Could not subscribe to notifications", err));
    }

    public checkForServiceWorkerUpdates(): Observable<VersionEvent> {
      return this.serviceWorkerUpdates.versionUpdates
    }

    /**
     * @name promptUser
     * @description This method prompts update screen to user as update is activating
     */
    public async activateUpdate(): Promise<void> {
      this.serviceWorkerUpdateFlag.next(true);
      await this.serviceWorkerUpdates.activateUpdate();
      setTimeout(async () => {
        this.serviceWorkerUpdateFlag.next(false);
        document.location.reload();
      }, 3000)
    }
}
