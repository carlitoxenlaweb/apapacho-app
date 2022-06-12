import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CallPageRoutingModule } from './call-routing.module';
import { CallPage } from './call.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallPageRoutingModule,
    TranslateModule
  ],
  declarations: [CallPage]
})
export class CallPageModule {}
