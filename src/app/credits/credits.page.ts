import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-credits',
  templateUrl: './credits.page.html',
  styleUrls: ['./credits.page.scss'],
})
export class CreditsPage {

  isLoading: boolean;
  currentCredits: number;

  constructor(
    private router: Router,
    private api: ApiService
  ) {
    this.isLoading = true;
    this.currentCredits = 0;
  }

  ionViewWillEnter () {
    this.isLoading = true;
    this.currentCredits = 0;
  }

  async ionViewDidEnter () {
    const resp = await this.api.getRemainingCredits();
    if (!!resp) {
      this.currentCredits = resp.remaining_credits
    }
    this.isLoading = false;
  }

  goTo (page: string) {
    this.router.navigate([page])
  }

}
