import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationModelComponent } from './confirmation-model/confirmation-model.component';
import { TruncatePipe } from './truncate.pipe';


@NgModule({
  declarations: [
    ConfirmationModelComponent,
    TruncatePipe
  ],
  imports: [
    CommonModule,
 
  ],
  
  
})
export class SharedModule { }
