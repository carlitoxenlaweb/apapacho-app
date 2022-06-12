import { Component } from '@angular/core';

@Component({
  selector: 'app-call',
  templateUrl: './call.page.html',
  styleUrls: ['./call.page.scss'],
})
export class CallPage {

  connected: boolean = false;
  formattedTimer: string = "";
  currentTimer: number = 0;
  mainInterval: any;

  constructor() { }

  ionViewDidEnter () {
    this.connected = false;
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
  
}
