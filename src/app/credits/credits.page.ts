import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.page.html',
  styleUrls: ['./credits.page.scss'],
})
export class CreditsPage {

  isLoading: boolean;

  constructor(
    private router: Router
  ) {
    this.isLoading = true;
  }

  ionViewWillEnter () {
    this.isLoading = true;
  }

  ionViewDidEnter () {
    setTimeout(() => {
      this.isLoading = false;
    }, 800);
  }

  goTo (page: string) {
    this.router.navigate([page])
  }

}
