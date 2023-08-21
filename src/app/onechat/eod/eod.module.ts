import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EodRoutingModule } from './eod-routing.module';
import { Eod } from './eod';
import { EodListContainer } from './eod-list-container/eod-list-container';
import { EodListPresentation } from './eod-list-container/eod-list-presentation/eod-list-presentation';
import { TaskFormContainer } from './task-form-container/task-form-container';
import { TaskFormPresentation } from './task-form-container/task-form-presentation/task-form-presentation';


@NgModule({
  declarations: [
    Eod,
    EodListContainer,
    EodListPresentation,
    TaskFormContainer,
    TaskFormPresentation
  ],
  imports: [
    CommonModule,
    EodRoutingModule
  ]
})
export class EodModule { }
