import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  public loader:Subject<boolean>
  constructor() { 
    this.loader = new Subject();
  }
}
