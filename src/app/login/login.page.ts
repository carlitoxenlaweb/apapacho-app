import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { trigger, style, animate, transition, state } from '@angular/animations';

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

  constructor(
    private router: Router,
    private loadingController: LoadingController
  ) {
    this.isLoading = true;
    this.loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
  }

  ionViewDidEnter () {
    setTimeout(() => {
      this.isLoading = false;
    }, 300);
  }

  async login () {
    const loading = await this.loadingController.create({
      message: 'Validando...',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    this.goTo('home')
  }

  goTo (page) {
    this.router.navigate([page])
  }

}
