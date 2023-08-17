import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EodRoutingModule } from './eod-routing.module';
import { EodComponent } from './eod.component';
import { EodContainerComponent } from './eod-container/eod-container.component';
import { TaskFormContainerComponent } from './task-form-container/task-form-container.component';
import { EodPresentationComponent } from './eod-container/eod-presentation/eod-presentation.component';
import { TaskFormPresentationComponent } from './task-form-container/task-form-presentation/task-form-presentation.component';


@NgModule({
  declarations: [
    EodComponent,
    EodContainerComponent,
    TaskFormContainerComponent,
    EodPresentationComponent,
    TaskFormPresentationComponent
  ],
  imports: [
    CommonModule,
    EodRoutingModule
  ],
  exports:[EodComponent]
})
export class EodModule { }
