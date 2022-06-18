import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-call-end',
  templateUrl: './call-end.page.html',
  styleUrls: ['./call-end.page.scss'],
})
export class CallEndPage {

  friendly: boolean[] = [false, false, false, false, false];
  quality: boolean[] = [false, false, false, false, false];
  comments: string = "";
  addFriend: boolean = false;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private translate: TranslateService
  ) { }

  ionViewWillEnter () {
    this.friendly = [false, false, false, false, false];
    this.quality = [false, false, false, false, false];
  }

  setFriendly (index: number) {
    this.friendly = this.friendly.map((v, i) => i <= index);
  }

  setQuality (index: number) {
    this.quality = this.quality.map((v, i) => i <= index);
  }

  async send () {
    const loading = await this.loadingController.create({
      message: this.translate.instant('general.sending'),
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.router.navigate(['/home']);
  }

}
