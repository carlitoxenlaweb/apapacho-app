import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  animations: [
    trigger('slideFromTop', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ])
    ])
  ]
})
export class LoginPage {

  loginForm: FormGroup;
  isLoading: boolean;
  current_lang: string;

  constructor(
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private translate: TranslateService,
    private api: ApiService,
    private storage: StorageService
  ) {
    this.isLoading = true;
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ionViewWillEnter () {
    this.isLoading = true;
    this.current_lang = this.translate.currentLang;
  }

  ionViewDidEnter () {
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  async login () {
    const loading = await this.loadingController.create({
      message: this.translate.instant('general.validating')
    });
    await loading.present();
    
    const formVal = this.loginForm.value;
    const response = await this.api.signIn(formVal.username, formVal.password);

    if (!!response) {
      await this.storage.set('token', response.token);
      this.storage.set('user', response);
      this.goTo('/home');
      await loading.dismiss();
    } else {
      await loading.dismiss();
      const alert = await this.alertController.create({
        subHeader: this.translate.instant('general.error_title'),
        message: this.translate.instant('login.login_error'),
        buttons: [`${this.translate.instant('general.accept')}`]
      });
      await alert.present();
    }

    //const { role, data } = await loading.onDidDismiss();
    //this.goTo('home')
  }

  goTo (page) {
    this.router.navigate([page])
  }

  setLang (lang: string) {
    this.current_lang = lang;
    this.translate.use(lang);
    this.storage.set('lang', lang);
  }

}
