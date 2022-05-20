import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { slideInOut, fadeIn } from '../app.animations';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  animations: [slideInOut, fadeIn]
})
export class ResetPasswordPage {

  resetForm: FormGroup;
  tokenForm: FormGroup;
  confirmForm: FormGroup;

  isLoading: boolean;
  currentForm: string;

  constructor(
    private router: Router
  ) {
    this.resetForm = new FormGroup({
      email: new FormControl('')
    });
    this.tokenForm = new FormGroup({
      token: new FormControl('')
    });
    this.confirmForm = new FormGroup({
      password: new FormControl('')
    });
  }

  ionViewWillEnter () {
    this.isLoading = false;
    this.currentForm = 'email';
  }

  resetPassword () {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.currentForm = 'token';
    }, 2000);
  }

  validateToken () {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.currentForm = 'confirm';
    }, 2000);
  }

  confirmReset () {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.currentForm = 'none';
    }, 2000);
  }

  goTo (page) {
    this.router.navigate([page]);
  }

}
