import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HoroscopePageRoutingModule } from './horoscope-routing.module';
import { HoroscopePage } from './horoscope.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HoroscopePageRoutingModule,
    TranslateModule
  ],
  declarations: [HoroscopePage]
})
export class HoroscopePageModule {}
