import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: 'intro.page.html',
  styleUrls: ['intro.page.scss'],
})
export class IntroPage {

  langList = [
    { text: 'Español', value: 'es' },
    { text: 'Português', value: 'br' }
  ];

  constructor(
    private router: Router,
    private translate: TranslateService,
    private storage: StorageService
  ) {}

  /* goTo (page) {
    this.router.navigate([page]);
  } */

  selectLanguage (lang: string) {
    this.translate.use(lang);
    this.storage.set('lang', lang);
    this.router.navigate(['login']);
  }
}
