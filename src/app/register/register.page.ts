import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { slideInOut } from '../app.animations';

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
    private loadingController: LoadingController
  ) {
    this.mainForm = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      address: new FormControl(''),
      password: new FormControl(''),
      tos: new FormControl(''),
    });
  }

  async register () {
    const formVal = this.mainForm.value;
    if (!formVal.tos) {
      const alert = await this.alertController.create({
        message: 'Debes aceptar los términos y condiciones.',
        buttons: ['Entiendo']
      });
      await alert.present();
    } else {
      const loading = await this.loadingController.create({
        message: 'Registrando...',
        duration: 4000
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
      this.goTo('home')
    }
  }

  goTo (page) {
    this.router.navigate([page]);
  }

  openToS () {
    console.log("abre los tos");
  }

}
