import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { iPlan, iReason, iSubReason } from '../app.interfaces';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-services-page',
  templateUrl: './services-page.page.html',
  styleUrls: ['./services-page.page.scss'],
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
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class ServicesPagePage {

  selectedPlan: iPlan;
  selectedReason: iReason;
  selectedSubReason: iSubReason;
  planList: iPlan[];
  reasonList: iReason[];
  actionType: string;
  isReady: boolean;

  constructor(
    private router: Router,
    private api: ApiService,
    private alertController: AlertController
  ) {}

  async ionViewWillEnter () {
    this.isReady = false;
    this.selectedPlan = null;
    this.selectedReason = null;
    this.planList = await this.api.getPlans();
    this.reasonList = await this.api.getReasons();
  }

  selectPlan (plan: iPlan) {
    this.actionType = "";
    this.selectedPlan = plan;
  }

  setAction (action: string) {
    this.actionType = action;
    this.isReady = action == 'schedule';
  }

  setReason (reason: iReason) {
    this.isReady = false;
    this.selectedReason = reason;
    if (this.selectedReason.subr.length == 0) {
      this.isReady = true;
    }
  }

  setSubReason (subReason: iSubReason) {
    this.selectedSubReason = subReason;
    this.isReady = true;
  }

  goTo (page: string) {
    this.router.navigate([page])
  }

  async goAhead () {
    // IF NOT CREDITS
    const alert = await this.alertController.create({
      message: 'No cuentas con los créditos suficientes, por favor recarga...',
      buttons: ['Aceptar']
    });
    await alert.present();
    await alert.dismiss();
    this.goTo('/credits-add');
  }

}
