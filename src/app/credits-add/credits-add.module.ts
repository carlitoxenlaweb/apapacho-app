import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreditsAddPageRoutingModule } from './credits-add-routing.module';

import { CreditsAddPage } from './credits-add.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreditsAddPageRoutingModule
  ],
  declarations: [CreditsAddPage]
})
export class CreditsAddPageModule {}
