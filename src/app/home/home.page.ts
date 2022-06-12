import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { StorageService } from '../services/storage.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateY(0%)' }))
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(600, style({ opacity: 1 }))
      ])
    ])
  ]
})
export class HomePage implements OnInit {

  currentState: string;
  currentImage: string;

  isLoading: boolean;

  constructor(
    private storage: StorageService,
    private api: ApiService
  ) {
    this.isLoading = true;
    this.currentState = "unset";
    this.currentImage = "/assets/state_unset.png"
  }

  async ngOnInit () {
    setTimeout(() => this.isLoading = false, 800);
    const storedValue = await this.storage.get('currentState');
    if (!!storedValue) {
      this.currentState = storedValue;
      this.setCurrentImage();
    }
  }

  resetState () {
    this.currentState = "unset";
    this.currentImage = "/assets/state_unset.png"
  }

  async changeState (state: string) {
    this.isLoading = true;
    this.currentState = state;
    await this.storage.set('currentState', state);
    await this.api.updateState(state);
    this.setCurrentImage();
    this.isLoading = false;
  }

  private setCurrentImage () {
    switch (this.currentState) {
      case 'happy':
        this.currentImage = '/assets/state_happy.png';
        break;
      case 'neutral':
        this.currentImage = '/assets/state_neutral.png';
        break;
      case 'sad':
        this.currentImage = '/assets/state_sad.png';
        break;
      case 'love':
        this.currentImage = '/assets/state_love.png';
        break;
      case 'anxious':
        this.currentImage = '/assets/state_anxious.png';
        break;
      case 'optimistic':
        this.currentImage = '/assets/state_optimistic.png';
        break;
      case 'pessimistic':
        this.currentImage = '/assets/state_pessimistic.png';
        break;
      case 'frustrated':
        this.currentImage = '/assets/state_frustrated.png';
        break;
    }
  }
}
