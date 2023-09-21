import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EodRoutingModule } from './eod-routing.module';
import { EodComponent } from './eod.component';
import { EodListContainerComponent } from './eod-list-container/eod-list-container.component';
import { EodListPresentationComponent } from './eod-list-container/eod-list-presentation/eod-list-presentation.component';
import { TaskFormContainerComponent } from './task-form-container/task-form-container.component';
import { TaskFormPresentationComponent } from './task-form-container/task-form-presentation/task-form-presentation.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { CKEditorModule } from 'ckeditor4-angular';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    EodComponent,
    EodListContainerComponent,
    EodListPresentationComponent,
    TaskFormContainerComponent,
    TaskFormPresentationComponent
  ],
  imports: [
    CommonModule,
    EodRoutingModule,
    NgbDropdownModule,
    ReactiveFormsModule,
    NgSelectModule,
    CKEditorModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    SharedModule

  ]
})
export class EodModule { }
