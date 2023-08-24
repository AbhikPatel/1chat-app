import { Component } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html'
})
export class MasterComponent {
  constructor(private _commonService:CommonService){
    
  }
}
