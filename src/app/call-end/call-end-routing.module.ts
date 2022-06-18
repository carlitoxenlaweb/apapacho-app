import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CallEndPage } from './call-end.page';

const routes: Routes = [
  {
    path: '',
    component: CallEndPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CallEndPageRoutingModule {}
