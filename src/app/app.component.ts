import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { StorageService } from './services/storage.service';
import { TranslateService } from '@ngx-translate/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { fadeIn } from './app.animations';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  animations: [fadeIn]
})
export class AppComponent {

  expandServiceLevel = false;

  constructor(
    private router: Router,
    private storage: StorageService,
    private menu: MenuController,
    private translate: TranslateService
  ) {
    this.storage.init();
    this.translate.setDefaultLang('es');
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
    this.storage.clear();
    this.menu.close();
  }

  toggleSubMenu (service: string) {
    this.expandServiceLevel = !this.expandServiceLevel;
  }

}
