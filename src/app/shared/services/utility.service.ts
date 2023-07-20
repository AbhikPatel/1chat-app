import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { SwPush } from "@angular/service-worker";
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

  /** Voluntary Application Server Identity to send push notification */
  private readonly VAPID_PUBLIC_KEY: string = "BKX5wA9WxBSYJZWvQtdgD-1rknSL5ejHQd25tUxl5bM9QkNrQVms__OnS1cbRxsJ96E09gKruA8pOcEv7XTfSc4";
  
  constructor(private swPush: SwPush,) { 
    this.notificationClick$ = new Observable();
    this.notificationClick = new Subject();
    this.notificationClick$ = this.notificationClick.asObservable();
    this.subscriber = null;
  }

  public notificationAccess():void {
    this.subscribeToPushNotification();
    this.subscribeToPushNotificationClick();
  }

    /**
   * @name subscribeToPushNotificationClick
   * @description This method is used to subscribe notificationclick event
   */
    private subscribeToPushNotificationClick(): void {
      this.swPush.notificationClicks.subscribe((val)=> this.notificationClick.next({message_type: val.notification.data.message_type, message: val.notification.data.message}));
    }
  
    /**
     * @name subscribeToPushNotification
     * @description This method is used to subscribe client to push notification
    */
    private subscribeToPushNotification(): void {
      this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      })
        .then(sub => {
          this.subscriber = sub;
        })
        .catch(err => console.error("Could not subscribe to notifications", err));
    }
}
