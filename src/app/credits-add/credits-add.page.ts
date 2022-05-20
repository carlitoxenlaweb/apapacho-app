import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { iPack } from '../app.interfaces';
import { ApiService } from '../services/api.service';

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
    private api: ApiService
  ) {
    this.selectedPack = null;
  }

  async ionViewWillEnter () {
    this.packList = await this.api.getPacks();
    this.selectedPack = null;
  }

  selectPack (pack: iPack) {
    this.selectedPack = pack;
  }

  goTo (page: string) {
    this.router.navigate([page])
  }

}
