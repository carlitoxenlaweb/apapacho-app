import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PageServicesPageRoutingModule } from './page-services-routing.module';

import { PageServicesPage } from './page-services.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PageServicesPageRoutingModule
  ],
  declarations: [PageServicesPage]
})
export class PageServicesPageModule {}
