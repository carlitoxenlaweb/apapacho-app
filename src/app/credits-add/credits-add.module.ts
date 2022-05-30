import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CreditsAddPageRoutingModule } from './credits-add-routing.module';
import { CreditsAddPage } from './credits-add.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditsAddPageRoutingModule,
    TranslateModule
  ],
  declarations: [CreditsAddPage]
})
export class CreditsAddPageModule {}
