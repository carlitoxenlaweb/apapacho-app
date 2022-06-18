import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { fadeIn } from '../app.animations';

@Component({
  selector: 'app-call',
  templateUrl: './call.page.html',
  styleUrls: ['./call.page.scss'],
  animations: [fadeIn]
})
export class CallPage {

  finished: boolean = false;
  connected: boolean = false;
  formattedTimer: string = "";
  currentTimer: number = 0;
  mainInterval: any;

  constructor(
    private router: Router
  ) { }

  ionViewDidEnter () {
    this.connected = false;
    this.finished = false;
    setTimeout(() => {
      this.connected = true;
      this.mainInterval = setInterval(() => this.upTimer(), 1000)
    }, 2000);
  }

  ionViewWillLeave() {
    clearInterval(this.mainInterval);
  }

  private upTimer () {
    this.currentTimer += 1;
    const hours = Math.floor(this.currentTimer / 60).toString();
    const minutes = (this.currentTimer % 60) + "";
    this.formattedTimer = `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
  }

  endCall () {
    this.finished = true;
  }

  qualify () {
    this.router.navigate(['/call-end']);
  }

  goHome () {
    this.router.navigate(['/home']);
  }
  
}
