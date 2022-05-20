import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {

  constructor(
    private router: Router
  ) { }

  ionViewDidEnter() {
    // Revisamos si el usuario ha iniciado sesion o
    // si es una instalacion fresca
    setTimeout(() => {
      this.router.navigate(['/intro'])
    }, 4000);
  }

}
