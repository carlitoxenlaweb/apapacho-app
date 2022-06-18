import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TalkPageRoutingModule } from './talk-routing.module';
import { TalkPage } from './talk.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TalkPageRoutingModule,
    TranslateModule
  ],
  declarations: [TalkPage]
})
export class TalkPageModule {}
