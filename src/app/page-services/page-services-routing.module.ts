import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageServicesPage } from './page-services.page';

const routes: Routes = [
  {
    path: '',
    component: PageServicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PageServicesPageRoutingModule {}
