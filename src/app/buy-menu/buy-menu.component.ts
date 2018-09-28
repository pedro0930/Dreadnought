import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FleetService } from '../fleet.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
@Component({
  selector: 'app-buy-menu',
  templateUrl: './buy-menu.component.html',
  styleUrls: ['./buy-menu.component.css']
})
export class BuyMenuComponent implements OnInit {
  budget: number;
  allShips: any;
  fleet: any[]
  engagementType: String;
  constructor(
    private _httpService: HttpService,    
    private _route: ActivatedRoute,
    private _router: Router,
    private fleetService: FleetService
    ) { }

  ngOnInit() {
    this.engagementType = "Destroyer Action"
    this.changeGameMode()
    this.getShips()
    this.fleet = []
  }

  getShips(){
    let observable = this._httpService.getShips()
    observable.subscribe(data=>{
      console.log(data)  
      this.allShips = data
    })
  }
  addShip(ship){
    if(this.budget - ship.Cost < 0){
      alert("Insufficient fund!")
    }else{
      var DDNameList = ['Bainbridge', "Barry", "Dale", "Hopkins", "Perry", "Smith", "Acasta", "Acheron", "Active"];  
      var CLNameList = ["Irene", "Wihelm", "Augusta", "Freya", "Hansa"];
      var ShipName: String
      if(ship.Type == "Destroyer"){
        ShipName = DDNameList[Math.floor(Math.random() * DDNameList.length)];
      }
      else if(ship.Type =="Light Cruiser"){
        ShipName = CLNameList[Math.floor(Math.random() * CLNameList.length)];
      }
        this.fleet.push({name: ShipName, ship:ship})
        this.budget -= ship.Cost;
      }
  }

  showDetail(ship){
    alert(ship.Description);
  }

  removeShip(index){
    this.budget += this.fleet[index].ship.Cost;
    this.fleet.splice(index, 1)
  }

  changeGameMode(){
    if(this.engagementType == "Destroyer Action"){
      this.budget = 2500;
      this.fleet = []
    }
    else if(this.engagementType == "Cruiser Clash"){
      this.budget = 5000;
      this.fleet = []
    }
    else if(this.engagementType =="Fleet Battle"){
      this.budget = 10000;
      this.fleet = []
    }
  }
  startGame(){
    this.fleetService.getFleet(this.fleet)
    this.fleetService.BuildEnemyFleet(this.engagementType)
    this._router.navigate(['/Game']);
  }

}
