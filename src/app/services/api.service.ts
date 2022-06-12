import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iPack, iPlan, iResponse, iUser } from '../app.interfaces';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "http://localhost:3000/";

  constructor(
    private httpClient: HttpClient,
    private storage: StorageService
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
        id: 1, name: 'Depresión', subr: [
          { id: 5, name: 'Soledad' }
        ]
      },
      { id: 2, name: 'Angustia', subr: [] },
      {
        id: 3, name: 'Conflicto Familiar', subr: [
          { id: 6, name: 'Pareja' },
          { id: 7, name: 'Hijos' },
          { id: 8, name: 'Infidelidad' },
          { id: 9, name: 'Familia' }
        ]
      },
      { id: 4, name: 'Autoestima', subr: [] }
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

