import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { slideInOut } from '../app.animations';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  animations: [slideInOut]
})
export class RegisterPage {

  public mainForm: FormGroup;

  constructor(
    private router: Router,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private translate: TranslateService,
    private storage: StorageService,
    private api: ApiService
  ) {
    this.mainForm = new FormGroup({
      alias: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      birthday_hour: new FormControl('', Validators.required),
      tos: new FormControl(false, Validators.required),
    });
  }

  async register () {
    const formVal = this.mainForm.value;
    if (!formVal.tos) {
      const alert = await this.alertController.create({
        message: this.translate.instant('register.must_accept_tos'),
        buttons: [`${this.translate.instant('general.got_it')}`]
      });
      await alert.present();
    } else {
      const loading = await this.loadingController.create({
        message: this.translate.instant('general.registering'),
        duration: 3000
      });
      await loading.present();

      let response = await this.api.signUp({
        alias: formVal.alias,
        firstname: formVal.firstname,
        lastname: formVal.lastname,
        phone: formVal.phone,
        email: formVal.email,
        address: formVal.address,
        birthday: formVal.birthday,
        birthday_hour: formVal.birthday_hour,
        password: formVal.password
      });

      if (!!response) {
        const user = await this.api.signIn(formVal.email, formVal.password);
        if (!!user) {
          await this.storage.set('token', user.token);
          this.storage.set('user', user);
          this.goTo('/home');
          await loading.dismiss();
        } else {
          await loading.dismiss();
          const alert = await this.alertController.create({
            subHeader: this.translate.instant('general.error_title'),
            message: this.translate.instant('general.request_error'),
            buttons: [`${this.translate.instant('general.accept')}`]
          });
          await alert.present();
        }
      } else {
        const alert = await this.alertController.create({
          subHeader: this.translate.instant('general.error_title'),
          message: this.translate.instant('login.login_error'),
          buttons: [`${this.translate.instant('general.accept')}`]
        });
        await alert.present();
      }
    }
  }

  goTo (page) {
    this.router.navigate([page]);
  }

  openToS () {
    console.log("abre los tos");
  }

}
