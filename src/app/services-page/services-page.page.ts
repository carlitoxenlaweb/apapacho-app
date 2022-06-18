import { Component } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';
import { iPlan, iReason, iSubReason } from '../app.interfaces';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

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
  selectedPerson: string;
  selectedReason: iReason;
  selectedSubReason: iSubReason;
  planList: iPlan[];
  reasonList: iReason[];
  personCallList: string[];
  personScheduleList: string[];
  actionType: string;
  isReady: boolean;
  steps: boolean[];

  constructor(
    private router: Router,
    private api: ApiService,
    private alertController: AlertController,
    private translate: TranslateService
  ) {}

  async ionViewWillEnter () {
    this.isReady = false;
    this.selectedPlan = null;
    this.selectedReason = null;
    this.selectedPerson = "";
    this.actionType = "";
    
    this.planList = await this.api.getPlans();
    this.reasonList = await this.api.getReasons();
    
    this.personCallList = [
      this.translate.instant('services.persons.man'),
      this.translate.instant('services.persons.woman'),
      this.translate.instant('services.persons.dont_care')
    ];

    this.personScheduleList = [
      this.translate.instant('services.persons.man'),
      this.translate.instant('services.persons.woman'),
      this.translate.instant('services.persons.friend'),
      this.translate.instant('services.persons.dont_care')
    ];
  }

  selectPlan (plan: iPlan) {
    this.selectedPlan = plan;
  }

  setAction (action: string, ready?: boolean) {
    this.actionType = action;
    if (action == 'call' || action == 'schedule') {
      this.selectedPerson = "";
    }
    this.isReady = !!ready;
  }

  setReason (reason: iReason) {
    this.isReady = false;
    this.selectedReason = reason;
    if (this.selectedReason.subr.length == 0) {
      this.isReady = true;
    }
  }

  setPerson (person: string) {
    this.selectedPerson = person;
  }

  setSubReason (subReason: iSubReason) {
    this.selectedSubReason = subReason;
    this.isReady = true;
  }

  goTo (page: string) {
    this.router.navigate([page])
  }

  async goAhead () {
    const resp = await this.api.getRemainingCredits();
    if (!!resp) {
      if (resp.remaining_credits > 5) {
        this.router.navigate(['/call'])
      } else {
        const alert = await this.alertController.create({
          message: this.translate.instant('credits.no_credits'),
          buttons: [this.translate.instant('general.accept')]
        });
        await alert.present();
        alert.onDidDismiss().then(() => this.goTo('/credits-add'));
      }
    } else {
      const alert = await this.alertController.create({
        message: this.translate.instant('credits.load_error'),
        buttons: [this.translate.instant('general.accept')]
      });
      await alert.present();
    }

  }

}
