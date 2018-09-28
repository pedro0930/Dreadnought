import { Injectable, EventEmitter, Output, OnInit } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class FleetService implements OnInit {
  allShips: any;
  DD
  CL
  CA
  BB
  fleet
  enemyFleet
  constructor(
    private _httpService: HttpService
    ){}

  ngOnInit(){
    this.enemyFleet = []
    this.getShipsAndSort()
  }

  getShipsAndSort(){
    this.DD = []
    this.CL = []
    this.CA = []
    this.BB = []
    let observable = this._httpService.getShips()
    observable.subscribe(data=>{
      this.allShips = data
      for(var i = 0; this.allShips.length > i; i++){
        if(this.allShips[i].Type == "Destroyer"){
          this.DD.push(this.allShips[i])
        }
        else if (this.allShips[i].Type == "Light Cruiser"){
          this.CL.push(this.allShips[i])
        }
        else if (this.allShips[i].Type == "Armored Cruiser"){
          this.CA.push(this.allShips[i])
        }
        else if (this.allShips[i].Type == "Battleship"){
          this.BB.push(this.allShips[i])
        }
      }
    })
  }


  getFleet(fleet){
    this.fleet = fleet
    for(var i = 0; i < this.fleet.length; i++){
      this.fleet[i]["movementPoint"] = this.fleet[i]["ship"].Speed/10;
      this.fleet[i]["Fired"] = false;
      this.fleet[i]["baseHP"] = this.fleet[i]["ship"].HitPoint;
    }
  }
  giveFleet(){
    return this.fleet
  }
  giveEnemyFleet(){
    this.populateNames()
    return this.enemyFleet
  }
  
  ShipNamePicker(){

    var namelist = [
      "Law-giver",
      "Ravenous",
      "Redeemer",
      "Retribution",
      "Zealous",
      "Hammer",
      "Fang",
      "Inquisitor",
      "Shatterbone",
      "Imperator",
      "Bangkoap",
      "Machaskar",
      "Khoeng",
      "Korop",
      "Maiestatis",
      "Ligator",
      "Veritatis",
      "Virtutis",
      "Mandatum",
      "Invictus",
      "Incorruptus",
      "Iudex",
      "Tyrannus",
      "Merus",
    ]
    var randomizer = Math.floor(Math.random() * namelist.length)
    return (namelist[randomizer])
  }
  // In the future can be used to populate other attributes
  populateNames(){
    for(var i = 0; this.enemyFleet.length > i; i++){
      this.enemyFleet[i]["name"] = this.ShipNamePicker()
      this.enemyFleet[i]["baseHP"] = this.enemyFleet[i].HitPoint

    }
  }


  BuildEnemyFleet(engagementType){
    // initialize everything here because ????
    this.enemyFleet=[]
    console.log("Building enemy fleet...fleet type,",engagementType)
    // base on game type give enemy fleet a number of random ships from ship list
    if(engagementType == "Destroyer Action"){
      var NumberOfDD = Math.floor(Math.random() * 4)+2
      for(var i = 0; i < NumberOfDD; i++){
        this.enemyFleet.push(this.DD[Math.floor(Math.random() * this.DD.length)])
      }
    // give enemy a bonus CL if they roll only 2 DD
      if(NumberOfDD == 2){
        this.enemyFleet.push(this.CL[Math.floor(Math.random() * this.CL.length)])
      }
    }
    
    else if(engagementType == "Cruiser Clash"){
      var NumberOfCA = Math.floor(Math.random() * 2)+1
      for(var i = 0; i <NumberOfCA; i++){
        this.enemyFleet.push(this.CA[Math.floor(Math.random() * this.CA.length)])
      }
      if(NumberOfCA == 1){
        var NumberOfCL = Math.floor(Math.random() * 4)+2
      }
      else if(NumberOfCA ==2){
        var NumberOfCL = Math.floor(Math.random() * 2)
      }
      for(var i = 0; i < NumberOfCL; i++){
        this.enemyFleet.push(this.CL[Math.floor(Math.random() * this.CL.length)])
      }
      var NumberOfDD = Math.floor(Math.random() * 4)
      for(var i = 0; i < NumberOfDD; i++){
        this.enemyFleet.push(this.DD[Math.floor(Math.random() * this.DD.length)])
      }
    }

    else if(engagementType == "Fleet Battle"){
      var NumberOfBB = Math.floor(Math.random() * 3)+1
      for(var i = 0; i <NumberOfCA; i++){
        this.enemyFleet.push(this.BB[Math.floor(Math.random() * this.BB.length)])
      }
      // No more ship if the AI is given 3 BB
      if(NumberOfBB == 3){
        return this.enemyFleet
      }
      var NumberOfCA = Math.floor(Math.random() * 2)
      for(var i = 0; i <NumberOfCA; i++){
        this.enemyFleet.push(this.CA[Math.floor(Math.random() * this.CA.length)])
      }


      var NumberOfCL = Math.floor(Math.random() * 4)
      for(var i = 0; i < NumberOfCL; i++){
        this.enemyFleet.push(this.CL[Math.floor(Math.random() * this.CL.length)])
      }

      if(NumberOfCL == 0){
        var NumberOfDD = Math.floor(Math.random() * 10)
      }else{
        
      var NumberOfDD = Math.floor(Math.random() * 3)
      }
      for(var i = 0; i < NumberOfDD; i++){
        this.enemyFleet.push(this.DD[Math.floor(Math.random() * this.DD.length)])
      }
    }
  }
}
