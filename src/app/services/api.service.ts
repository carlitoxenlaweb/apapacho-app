import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iPack, iPlan, iResponse, iUser } from '../app.interfaces';
import { StorageService } from './storage.service';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //private apiUrl = "http://localhost:3000/";
  private apiUrl = "https://apapacho-api.herokuapp.com/";

  constructor(
    private httpClient: HttpClient,
    private storage: StorageService,
    private translate: TranslateService
  ) { }

  async signIn (email: string, password: string) {
    try {
      return await this.httpClient.post<iUser>(`${this.apiUrl}auth/signin`, {
        email, password
      }).toPromise();
    } catch (e) {
      return null;
    }
  }

  async signUp (user: iUser) {
    try {
      return await this.httpClient.post<iUser>(`${this.apiUrl}auth/signup`, user).toPromise();
    } catch (e) {
      return null;
    }
  }

  async signOut () {
    await this.storage.clear();
  }

  async refreshToken () {
    try {
      const token = await this.storage.get('token');
      return this.httpClient.get<iResponse>(`${this.apiUrl}auth/token/refresh`, {
        params: { token }
      }).toPromise();
    } catch (e) {
      return { error: true, message: 'need re-login' };
    }
  }

  async getPlans () {
    try {
      return await this.httpClient.get<iPlan[]>(`${this.apiUrl}plans`).toPromise();
    } catch (e) {
      return [];
    }
  }

  async getPacks () {
    try {
      return await this.httpClient.get<iPack[]>(`${this.apiUrl}packs`).toPromise();
    } catch (e) {
      return [];
    }
  }
  
  async getReasons () {
    return [
      {
        id: 1, name: this.translate.instant('reason.depretion'), subr: [
          { id: 5, name: this.translate.instant('reason.loneliness') }
        ]
      },
      { id: 2, name: this.translate.instant('reason.distress'), subr: [] },
      {
        id: 3, name: this.translate.instant('reason.family_conflict'), subr: [
          { id: 6, name: this.translate.instant('reason.couple') },
          { id: 7, name: this.translate.instant('reason.childrens') },
          { id: 8, name: this.translate.instant('reason.infidelity') },
          { id: 9, name: this.translate.instant('reason.family') }
        ]
      },
      { id: 4, name: this.translate.instant('reason.self_steem'), subr: [] }
    ]
  }

  async getProfile () {
    try {
      return await this.httpClient.get<iUser>(`${this.apiUrl}profile`).toPromise();
    } catch (e) {
      return null;
    }
  }

  async updateProfile (user: iUser) {
    try {
      return await this.httpClient.patch<iResponse>(`${this.apiUrl}profile`, user).toPromise();
    } catch (e) {
      return null;
    }
  }

  async updateState (state: string) {
    try {
      return await this.httpClient.post<iResponse>(`${this.apiUrl}profile/state`, { state }).toPromise();
    } catch (e) {
      return null;
    }
  }

  async getRemainingCredits () {
    try {
      return await this.httpClient.get<{ remaining_credits: number }>(`${this.apiUrl}profile/credits`).toPromise();
    } catch (e) {
      return null;
    }
  }



  /* public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
}

isLoggedOut() {
    return !this.isLoggedIn();
}

getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
} */
}

