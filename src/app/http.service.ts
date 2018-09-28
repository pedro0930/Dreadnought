import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  fleet: any;
  constructor(private _http: HttpClient){}

  saveGun(newGun){
    console.log("Data at service: ", newGun)
    return this._http.post('/gun', newGun);
  }
  getGuns(){
    return this._http.get('/gun');
  }

  getGun(id){
    return this._http.get('/gun/' +id);
  }

  saveShip(newShip){
    return this._http.post('/ship', newShip)
  }

  getShips(){
    return this._http.get('/ship')
  }

  deleteShip(id){
    return this._http.delete('/ship/' + id)
  }
}

