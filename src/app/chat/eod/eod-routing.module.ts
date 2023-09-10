import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EodComponent } from './eod.component';
import { EodListContainerComponent } from './eod-list-container/eod-list-container.component';

const routes: Routes = [{
  path: '', component: EodComponent,
  children: [

    {
      path: '',
      pathMatch: 'full',
      redirectTo: 'eod-list'
    },
    {
      path: 'eod-list', component: EodListContainerComponent
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EodRoutingModule { }
