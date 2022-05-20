import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {

  constructor(
    private router: Router,
    private storage: StorageService
  ) { }

  async ionViewDidEnter() {
    //const user = await this.storage.get('user');
    // Revisamos si el usuario ha iniciado sesion o
    // si es una instalacion fresca
    setTimeout(() => {
      this.router.navigate(['/intro'])
    }, 4000);
  }

}
