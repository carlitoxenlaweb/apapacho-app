import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
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
    private loadingController: LoadingController
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
      alias: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      birthday: new FormControl(''),
      birthday_hour: new FormControl('')
    });
  }

  async ionViewWillEnter () {
    this.user = await this.storage.get('user');
    if (!!this.user) {
      this.mainForm.patchValue({
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
      message: 'Actualizando...',
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

    this.storage.set('user', user);
    this.user = user;

    await loading.onDidDismiss();

    const alert = await this.alertController.create({
      message: 'Datos actualizados',
      buttons: ['Aceptar']
    });
    await alert.present();
  }

  async changePassword () {

    const alert = await this.alertController.create({
      header: 'Cambiar Contraseña',
      inputs: [{
        name: 'password',
        type: 'password',
        placeholder: 'Nueva Contraseña'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {}
      }, {
        text: 'Actualizar',
        handler: () => this.processPassword()
      }]
    });

    await alert.present();
  }

  private async processPassword () {
    const loading = await this.loadingController.create({
      message: 'Avtualizando...',
      duration: 2000
    });
    
    await loading.present();
    await loading.onDidDismiss();

    const alert = await this.alertController.create({
      message: 'Contraseña Actualizada',
      buttons: ['Aceptar']
    });
    await alert.present();    
  }

}
