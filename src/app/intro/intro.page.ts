import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: 'intro.page.html',
  styleUrls: ['intro.page.scss'],
})
export class IntroPage {

  constructor(
    private router: Router
  ) {}

  goTo (page) {
    this.router.navigate([page]);
  }
}
