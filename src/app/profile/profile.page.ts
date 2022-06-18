import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { iUser } from '../app.interfaces';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  mainForm: FormGroup;
  passwordForm: FormGroup;

  user: iUser;
  
  constructor(
    private api: ApiService,
    private storage: StorageService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private translate: TranslateService,
  ) {
    this.user = {
      alias: "",
      firstname: "",
      lastname: "",
      phone: "",
      email: "",
      address: "",
      birthday: new Date(),
      birthday_hour: new Date()
    };

    this.mainForm = new FormGroup({
      alias: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      birthday: new FormControl('', Validators.required),
      birthday_hour: new FormControl('', Validators.required)
    });
  }

  async ionViewWillEnter () {
    this.user = await this.storage.get('user');
    if (!!this.user) {
      this.mainForm.patchValue({
        alias: this.user.alias,
        firstname: this.user.firstname,
        lastname: this.user.lastname,
        phone: this.user.phone,
        email: this.user.email,
        address: this.user.address,
        birthday: this.user.birthday,
        birthday_hour: this.user.birthday_hour
      });
    }
  }

  async updateProfile () {
    const formVal = this.mainForm.value;

    const loading = await this.loadingController.create({
      message: this.translate.instant('general.updating'),
      duration: 2000
    });
    
    await loading.present();
    
    const user = {
      alias: formVal.alias,
      firstname: formVal.firstname,
      lastname: formVal.lastname,
      phone: formVal.phone,
      email: formVal.email,
      address: formVal.address,
      birthday: formVal.birthday,
      birthday_hour: formVal.birthday_hour
    };

    const response = await this.api.updateProfile(user);
    if (!!response && !response.error) {
      this.storage.set('user', user);
      this.user = user;
      const alert = await this.alertController.create({
        message: this.translate.instant('general.updated'),
        buttons: [this.translate.instant('general.accept')]
      });
      await loading.dismiss();
      await alert.present();
    } else {
      await loading.dismiss();
      const alert = await this.alertController.create({
        subHeader: this.translate.instant('general.error_title'),
        message: this.translate.instant('login.login_error'),
        buttons: [this.translate.instant('general.accept')]
      });
      await alert.present();
    }
  }

  async changePassword () {

    const alert = await this.alertController.create({
      header: this.translate.instant('profile.password_modal'),
      inputs: [{
        name: 'password',
        type: 'password',
        placeholder: this.translate.instant('profie.new_password')
      }],
      buttons: [{
        text: this.translate.instant('general.cancel'),
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {}
      }, {
        text: this.translate.instant('general.update'),
        handler: () => this.processPassword()
      }]
    });

    await alert.present();
  }

  private async processPassword () {
    const loading = await this.loadingController.create({
      message: this.translate.instant('general.updating'),
      duration: 2000
    });
    
    await loading.present();
    await loading.onDidDismiss();

    const alert = await this.alertController.create({
      message: this.translate.instant('profile.password_updated'),
      buttons: [this.translate.instant('general.accept')]
    });
    await alert.present();    
  }

}
