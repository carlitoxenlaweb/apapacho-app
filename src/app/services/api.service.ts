import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "";

  constructor(
    private httpClient: HttpClient
  ) { }

  async getPlans () {
    return [
      { id: 1, name: 'Plan 1 x Acompañamiento', credits: 100, description: 'Una descripción del crédito. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { id: 2, name: 'Plan 3 x 3 Acompañamientos', credits: 200, description: 'Una descripción del crédito. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
      { id: 3, name: 'Acompañamiento', credits: 300, description: 'Una descripción del crédito. Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
    ]
  }

  async getPacks () {
    return [
      { id: 1, name: 'Paquete A', credits: 100, description: 'Una descripción del crédito. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: '/assets/icon/favicon.png' },
      { id: 2, name: 'Paquete B', credits: 200, description: 'Una descripción del crédito. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: '/assets/icon/favicon.png' },
      { id: 3, name: 'Paquete C', credits: 300, description: 'Una descripción del crédito. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: '/assets/icon/favicon.png' },
      { id: 4, name: 'Paquete D', credits: 400, description: 'Una descripción del crédito. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', icon: '/assets/icon/favicon.png' },
    ]
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
}
