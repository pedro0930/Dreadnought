import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-ship-builder',
  templateUrl: './ship-builder.component.html',
  styleUrls: ['./ship-builder.component.css']
})
export class ShipBuilderComponent implements OnInit {
  newGun: {GunName: String, GunType: String, Penetration: Number, Damage: Number, Range: Number}
  newShip: {ClassName: String, Type: String, Description: String, Guns: any, Tropedo: number, Speed: Number, DeckArmor: Number, BeltArmor: Number, Cost: Number, Displacement: number}
  allGuns: any;
  allShips: any;
  GunWeight: number;
  freeWeight: Number;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.GunWeight = 0;
    this.freeWeight = 0;
    this.newGun = {GunName: "", GunType: "", Penetration: 0, Damage: 0, Range: 0}
    this.newShip = {ClassName: "", Type: "", Description: "", Guns: {}, Tropedo: 0, Speed: 0, DeckArmor: 0, BeltArmor: 0, Cost: 0, Displacement: 0}
    this.getGuns()
    this.getShips()
  }

  saveGun(){
    let observable = this._httpService.saveGun(this.newGun)
    observable.subscribe(data=>console.log("Gun created, ", data))
    this.newGun = {GunName: "", GunType: "", Penetration: 0, Damage: 0, Range: 0}
    this.getGuns()
  }
  getGuns(){
    let observable = this._httpService.getGuns()
    observable.subscribe(data=>{
        console.log("All guns data: ",data);
        this.allGuns = data
    })
  }

  saveShip(){
    let observable = this._httpService.saveShip(this.newShip)
    observable.subscribe(data=>console.log("Ship Created, ", data))
    this.newShip = {ClassName: "", Type: "", Description: "", Guns: "", Tropedo: 0, Speed: 0, DeckArmor: 0, BeltArmor: 0, Cost: 0, Displacement: 0}
    this.getShips()
  }

  getShips(){
    let observable = this._httpService.getShips()
    observable.subscribe(data=>
      {
        console.log(data)
        this.allShips = data
      })
  }
  
  deleteShip(id){
    let observable = this._httpService.deleteShip(id)
    observable.subscribe(data=>console.log("Ship deleted: ", data))
    this.getShips()
  }

  reset(){
    this.newShip = {ClassName: "", Type: "", Description: "", Guns: {}, Tropedo:0, Speed: 0, DeckArmor: 0, BeltArmor: 0, Cost: 0, Displacement: 0}
  }


}
