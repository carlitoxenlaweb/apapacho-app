import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from '../services/api.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage {

  //private loaded: boolean = false;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private storage: StorageService,
    private api: ApiService
  ) { }

  async ionViewDidEnter() {
    const lang = await this.storage.get('lang');
    if (!!lang) this.translate.use(lang);

    const token = await this.storage.get('token');
    if (!!token) {
      const user = await this.api.getProfile();
      if (!!user) {
        this.storage.set('user', JSON.stringify(user));
        this.router.navigate(['/home'])
      }
    } else {
      const lang = await this.storage.get('lang');
      this.router.navigate([!!lang ? '/login' : '/intro']);
    }
    // Revisamos si el usuario ha iniciado sesion o
    // si es una instalacion fresca
    
    /* setTimeout(() => {
      if (this.loaded) {
        this.router.navigate(['/intro'])
      }
    }, 4000); */
  }

}
