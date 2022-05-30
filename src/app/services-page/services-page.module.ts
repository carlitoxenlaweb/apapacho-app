import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ServicesPagePageRoutingModule } from './services-page-routing.module';
import { ServicesPagePage } from './services-page.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesPagePageRoutingModule,
    TranslateModule
  ],
  declarations: [ServicesPagePage]
})
export class ServicesPagePageModule {}
