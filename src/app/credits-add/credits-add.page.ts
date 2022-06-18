import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { iPack } from '../app.interfaces';
import { ApiService } from '../services/api.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-credits-add',
  templateUrl: './credits-add.page.html',
  styleUrls: ['./credits-add.page.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ])
    ]),
    trigger('slideInOutL', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ]),
  ]
})
export class CreditsAddPage {

  selectedPack: iPack;
  packList: iPack[];

  constructor(
    private router: Router,
    private api: ApiService,
    private translate: TranslateService
  ) {
    this.selectedPack = null;
  }

  async ionViewWillEnter () {
    this.packList = await this.api.getPacks();
    this.packList = this.packList.map(p => {
      const pack = this.getLangPack(p.name.toLowerCase());
      p.name = this.translate.instant(`credits.pack_${pack}.name`);
      p.credits = this.translate.instant(`credits.pack_${pack}.credits`);
      p.description_a = this.translate.instant(`credits.pack_${pack}.description_a`);
      p.description_b = this.translate.instant(`credits.pack_${pack}.description_b`);
      return p;
    })
    this.selectedPack = null;
  }

  selectPack (pack: iPack) {
    this.selectedPack = pack;
  }

  goTo (page: string) {
    this.router.navigate([page])
  }

  private getLangPack (title: string) {
    switch (title) {
      case 'basico': return "basic";
      case 'standart': return "standar";
      case 'premium': return "premium";
    }
  }

}
