import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { IntroPage } from './intro.page';
import { IntroPageRoutingModule } from './intro-routing.module';
import { SwiperModule } from 'swiper/angular';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IntroPageRoutingModule,
    SwiperModule,
    TranslateModule
  ],
  declarations: [IntroPage]
})
export class IntroPageModule {}
