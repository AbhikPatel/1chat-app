import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Eod } from './eod';

const routes: Routes = [{ path: '', component: Eod }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EodRoutingModule { }
