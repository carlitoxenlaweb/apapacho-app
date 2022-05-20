import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';
import { iUser } from '../app.interfaces';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private _storage: Storage | null = null;

  constructor (private storage: Storage) {}

  async init () {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  async set (key: string, value: any) {
    return await this._storage?.set(key, value);
  }

  async get (key: string) {
    return await this._storage?.get(key);
  }

  async remove (key: string) {
    return await this._storage?.remove(key);
  }

  async clear () {
    return await this._storage?.clear();
  }
}