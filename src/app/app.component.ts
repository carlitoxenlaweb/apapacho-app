import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { StorageService } from './services/storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private router: Router,
    private storage: StorageService,
    private menu: MenuController,
    private translate: TranslateService
  ) {
    this.storage.init();
    this.translate.setDefaultLang('es');
    this.translate.use('es');
  }

  openLink (link: string) {
    window.open(link);
    this.menu.close();
  }

  goTo (page: string) {
    this.router.navigate([page]);
    this.menu.close();
  }

  logout () {
    this.goTo('/login');
    this.menu.close();
  }

}
