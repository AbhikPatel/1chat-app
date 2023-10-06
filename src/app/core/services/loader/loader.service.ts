import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public  loaderSubject: BehaviorSubject<boolean>;
  public  loaderSubject1: BehaviorSubject<boolean>;
  public  loaderSubject2: BehaviorSubject<boolean>;
  public  loaderMessageData: BehaviorSubject<boolean>;
  constructor() { 
    this.loaderSubject = new BehaviorSubject(false);
    this.loaderSubject1 = new BehaviorSubject(false);
    this.loaderSubject2 = new BehaviorSubject(false);
    this.loaderMessageData = new BehaviorSubject(false);

  }
  showLoader() {
    this.loaderSubject.next(true);
  }
  showLoader1() {
    this.loaderSubject1.next(true);
  }
  showLoader2() {
    this.loaderSubject2.next(true);
  }
  loaderMessage() {
    this.loaderMessageData.next(true);
  }
 

  hideLoader() {
    this.loaderSubject.next(false);
  }
  hideLoader1() {
    this.loaderSubject1.next(false);
  }
  hideLoader2() {
    this.loaderSubject2.next(false);
  }
  hideLoaderMessage() {
    this.loaderMessageData.next(false);
  }

  getLoaderState() {
    return this.loaderSubject.asObservable();
  }

  getLoaderState1() {
    return this.loaderSubject1.asObservable();
  }
  getLoaderState2() {
    return this.loaderSubject2.asObservable();
  }
  geLoaderMessage() {
    return this.loaderMessageData.asObservable();
  }
}
