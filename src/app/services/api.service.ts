import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { iPack, iPlan, iUser } from '../app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "http://localhost:3000/";

  constructor(
    private httpClient: HttpClient
  ) { }

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
      { id: 1, name: 'Depresión', subr: [
        { id: 5, name: 'Soledad' }
      ]},
      { id: 2, name: 'Angustia', subr: [] },
      { id: 3, name: 'Conflicto Familiar', subr: [
        {id: 6, name: 'Pareja' },
        {id: 7, name: 'Hijos' },
        {id: 8, name: 'Infidelidad' },
        {id: 9, name: 'Familia' }
      ]},
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

  async signIn (email: string, password: string) {
    try {
      return await this.httpClient.post<iUser>(`${this.apiUrl}auth/signin`, {
        email, password
      }).toPromise();
    } catch (e) {
      return null;
    }
  }
}

