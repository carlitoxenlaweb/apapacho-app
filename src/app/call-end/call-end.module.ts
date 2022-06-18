import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CallEndPageRoutingModule } from './call-end-routing.module';
import { CallEndPage } from './call-end.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CallEndPageRoutingModule,
    TranslateModule
  ],
  declarations: [CallEndPage]
})
export class CallEndPageModule {}
