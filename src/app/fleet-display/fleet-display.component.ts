import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FleetService } from '../fleet.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fleet-display',
  templateUrl: './fleet-display.component.html',
  styleUrls: ['./fleet-display.component.css'],
})



export class FleetDisplayComponent implements OnInit {
  turnCounter: number;
  playerFleet:any; 
  enemyFleet;
  board;
  enemyBoard;
  controlPanel: boolean;
  selectedShip: Object;
  battleLog: Array<String>;
  victory: boolean;
  defeat: boolean;
  art: number;

  constructor(    
    private _httpService: HttpService,    
    private _route: ActivatedRoute,
    private _router: Router,
    private fleetService: FleetService) { }

  ngOnInit() {

    this.victory = false;
    this.defeat = false;
    this.turnCounter = 1;
    this.battleLog = ["Enemy ship identified, prepare to engage!"]
    this.controlPanel = false;
    this.playerFleet = this.fleetService.giveFleet()
    this.enemyFleet = this.fleetService.giveEnemyFleet()
    this.setUp()


  }
  setUp(){
    console.log("playerFleet Recieved", this.playerFleet)
    this.board = this.playerFleet.slice()
    while(this.board.length < 14){
      this.board.push(0)
    }

    console.log("Attempting to retrieve enemy fleet, ", this.enemyFleet)
    this.enemyBoard = this.enemyFleet.slice()
    while(this.enemyBoard.length < 14){
      this.enemyBoard.unshift(0)
    }
    this.enemyFleet.reverse();
    for(var i = 0; this.enemyFleet.length > i; i++){
      this.enemyFleet[i]["position"] = 13-i
    }

    console.log("Report game state:")
    console.log("EnemyBoard: ", this.enemyBoard)
    console.log("EnemyFleet: ", this.enemyFleet)
    console.log("PlayerBoard: ", this.board)
    console.log("PlayerFleet: ", this.playerFleet)
  }


  selectShip(index){
    var aknowNo = Math.floor(Math.random() * 4)+1
    this.playAudio("aknow" + aknowNo  + ".wav")
    this.art = Math.floor(Math.random() * 4)+3;
    this.selectedShip = this.board[index]
    this.selectedShip["position"] = index
    this.controlPanel = true;
  }


  closeIn(){
    if(this.selectedShip["movementPoint"] == 0){
      alert(this.selectedShip["name"] + " has no more movement point")
    }
    else if(this.selectedShip["movementPoint"] < 1 && this.selectedShip["movementPoint"] <= Math.random() * 1){
      this.selectedShip["movementPoint"] = 0
      this.battleLog.push(this.selectedShip["name"] + " failed to close in.")
      alert(this.selectedShip["name"] + " failed to close in.")
    }
    else{
      this.playAudio("move.wav")
      this.board[this.selectedShip["position"]+1] = this.board[this.selectedShip["position"]]
      this.board[this.selectedShip["position"]] = 0;
      this.selectedShip["position"] = this.selectedShip["position"+1]
      this.selectedShip["movementPoint"] -= 1
      this.battleLog.push(this.selectedShip["name"] + " moved towards the enemy")
      if(this.selectedShip["movementPoint"] < 0){
        this.selectedShip["movementPoint"] = 0
      }
    }
  }

  evasiveStance(){
    if(this.selectedShip["movementPoint"] < 1){
      alert("Insufficent movement point to go into evasive maneuvers!")
    }else{
      this.selectedShip["movementPoint"] = 0
      this.battleLog.push(this.selectedShip["name"] + " is performaing evasive maneuvers. It is much harder to hit for a round but in turn cannot fire accurately.")
    }
  }
  // Check hits, check penetration, check crits, calculate damage
  attack(target){
    if(this.selectedShip["Fired"] == true){
      alert(this.selectedShip["name"]+ " already fired this turn!")
    }else{
      this.playAudio("Fire.wav")
      // Roll hits
      var rolls = this.selectedShip["ship"].Guns[0].NoGun
      var hits = 0;
      // CTH table for small guns
      if(this.selectedShip["ship"].Guns[0].GunType == "Small"){
        if(this.enemyFleet[target].Type == "Destroyer"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 50){
              hits++
            }           
          }
        }
        if(this.enemyFleet[target].Type == "Light Cruiser"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 30){
              hits++
            }           
          }
        }
        if(this.enemyFleet[target].Type == "Armored Cruiser"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 20){
              hits++
            }           
          }
        }
        if(this.enemyFleet[target].Type == "Battleship"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 10){
              hits++
            }           
          }
        }
      }
      
      // CTH table for medium guns
      if(this.selectedShip["ship"].Guns[0].GunType = "Medium"){
        if(this.enemyFleet[target].Type == "Destroyer"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 70){
              hits++
            }           
          }
        }
        if(this.enemyFleet[target].Type == "Light Cruiser"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 50){
              hits++
            }           
          }
        }
        if(this.enemyFleet[target].Type == "Armored Cruiser"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 30){
              hits++
            }           
          }
        }
        if(this.enemyFleet[target].Type == "Battleship"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 10){
              hits++
            }           
          }
        }
      }

      // CTH table for large guns 
      if(this.selectedShip["ship"].Guns[0].GunType = "Large"){
        if(this.enemyFleet[target].Type == "Destroyer"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 10){
              hits++
            }           
          }
        }
        if(this.enemyFleet[target].Type == "Light Cruiser"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 80){
              hits++
            }           
          }
        }
        if(this.enemyFleet[target].Type == "Armored Cruiser"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 70){
              hits++
            }           
          }
        }
        if(this.enemyFleet[target].Type == "Battleship"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 50){
              hits++
            }           
          }
        }
      }
      var penHit = 0
      var NoPen = 0
      // Get number of armor penetration
      for(var i = 0; hits > i; i++){
        if(this.selectedShip["ship"].Guns[0].Penetration > Math.floor(Math.random() * this.enemyFleet[target].BeltArmor)+ this.enemyFleet[target].BeltArmor*.5){
          penHit++;
        }else{
          NoPen++;
        }
      }
      
      // get actual damage and deal crits
      var DamagePerHit = this.selectedShip["ship"].Guns[0].Damage/rolls
      var DamageDealt = penHit * DamagePerHit + NoPen * DamagePerHit / 10
      
      this.enemyFleet[target].HitPoint -=  DamageDealt
      this.selectedShip["Fired"] = true;
      this.battleLog.push("_____________________")
      this.battleLog.push(this.selectedShip["name"] + " fired on "+ this.enemyFleet[target].name + "with " + this.selectedShip["ship"].Guns[0].GunName)
      this.battleLog.push("It scored " + hits + " hits. "+ penHit+ " penetrated and " +NoPen +" hits failed to penetrate")
      this.battleLog.push("The volley did " + DamageDealt)
      
      // If enemy ship is sunk 
      if(this.enemyFleet[target].HitPoint < 0){
        this.battleLog.push(this.selectedShip["name"] + " has sunk " + this.enemyFleet[target]['name'] +"!")
        this.enemyBoard[this.enemyFleet[target].position] = 1
        this.enemyFleet.splice(target, 1)
      }
    }
  }

  torpedo(target){
    if(this.selectedShip["Fired"] == true){
      alert(this.selectedShip["name"]+ " already fired this turn!")
    }else if(this.selectedShip["position"] < 16){
      alert(this.selectedShip["name"]+ " is out of range! Must get within 3000 yards (3 tiles) to lanuch torpedo.")
    }
    else{
      this.enemyFleet[target].HitPoint -= this.selectedShip["ship"].Torpedo
      this.battleLog.push(this.selectedShip["name"] + "lanuched torpedo attack on" + this.enemyFleet[target].name + " dealing "+ this.selectedShip["ship"].Torpedo +" damage!")
      if(this.enemyFleet[target].HitPoint < 0){
        this.battleLog.push(this.selectedShip["name"] + " has sunk " + this.enemyFleet[target]['name'] +"!")
        this.enemyBoard[this.enemyFleet[target].position] = 1
        this.enemyFleet.splice(target, 1)
      }
    }
  }

  attackPlayer(target){
      // Roll hits
      var rolls = this.selectedShip["Guns"][0].NoGun
      var hits = 0;
      // CTH table for small guns
      if(this.selectedShip["Guns"][0].GunType == "Small"){
        if(this.playerFleet[target]['ship'].Type == "Destroyer"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 50){
              hits++
            }           
          }
        }
        else if(this.playerFleet[target]['ship'].Type == "Light Cruiser"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 30){
              hits++
            }           
          }
        }
        else if(this.playerFleet[target]['ship'].Type == "Armored Cruiser"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 20){
              hits++
            }           
          }
        }
        else if(this.playerFleet[target]['ship'].Type == "Battleship"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 10){
              hits++
            }           
          }
        }
      }
      
      // CTH table for medium guns
      if(this.selectedShip["Guns"][0].GunType = "Medium"){
        if(this.playerFleet[target]['ship'].Type == "Destroyer"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 70){
              hits++
            }           
          }
        }
        if(this.playerFleet[target]['ship'].Type == "Light Cruiser"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 50){
              hits++
            }           
          }
        }
        if(this.playerFleet[target]['ship'].Type == "Armored Cruiser"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 30){
              hits++
            }           
          }
        }
        if(this.playerFleet[target]['ship'].Type == "Battleship"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 10){
              hits++
            }           
          }
        }
      }

      // CTH table for large guns 
      if(this.selectedShip["Guns"][0].GunType = "Large"){
        if(this.playerFleet[target]['ship'].Type == "Destroyer"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 10){
              hits++
            }           
          }
        }
        if(this.playerFleet[target]['ship'].Type == "Light Cruiser"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 80){
              hits++
            }           
          }
        }
        if(this.playerFleet[target]['ship'].Type == "Armored Cruiser"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 70){
              hits++
            }           
          }
        }
        if(this.playerFleet[target]['ship'].Type == "Battleship"){
          for(var i = 0; rolls > i; i++){
            if(Math.floor(Math.random() * 101 )> 50){
              hits++
            }           
          }
        }
      }
      var penHit = 0
      var NoPen = 0
      // Get number of armor penetration
      for(var i = 0; hits > i; i++){
        if(this.selectedShip["Guns"][0].Penetration > Math.floor(Math.random() * this.playerFleet[target]["ship"].BeltArmor)+ this.playerFleet[target]["ship"].BeltArmor*.5){
          penHit++;
        }else{
          NoPen++;
        }
      }
      var DamagePerHit = this.selectedShip["Guns"][0].Damage/rolls
      var DamageDealt = penHit * DamagePerHit + NoPen * DamagePerHit / 10
      
      this.playerFleet[target]['ship'].HitPoint -=  DamageDealt
      this.selectedShip["Fired"] = true;
      this.battleLog.push("______Enemy Firing_______")
      this.battleLog.push(this.selectedShip["name"] + " fired on "+ this.playerFleet[target].name + " with " + this.selectedShip['Guns'][0].GunName)
      this.battleLog.push("It scored " + hits + " hits. "+ penHit+ " penetrated and " +NoPen +" hits failed to penetrate")
      this.battleLog.push("The volley did " + DamageDealt + " damage")

      
      // If enemy ship is sunk 
      if(this.enemyFleet[target].HitPoint < 0){
        this.battleLog.push(this.selectedShip["name"] + " has sunk " + this.enemyFleet[target]['name'] +"!")
        this.enemyBoard[this.enemyFleet[target].position] = 1
        this.enemyFleet.splice(target, 1)
      }
  }
  

  playAudio(fileName){
    let audio = new Audio();
    audio.src = "../../../assets/audio/" +fileName;
    audio.load();
    audio.play();
  }


  endTurn(){
    // Check Victory condition
    if(this.enemyFleet.length === 0){
      this.victory = true;
      alert("Victory!")
      
    }

    // Enemy Turn Resolution
    // Each enemy ship fire on a random player ship
    this.playAudio("TakingFire.wav")
    for(var i = 0; this.enemyFleet.length > i; i++){
      let RNG = Math.floor(Math.random() * this.playerFleet.length-1)+1
      this.selectedShip = this.enemyFleet[i]
      this.attackPlayer(RNG)
      // If player ship sunk, remove token from display
      if(this.playerFleet[RNG]['ship'].HitPoint < 0){
        this.battleLog.push(this.enemyFleet[i].name +" has sunk" +this.playerFleet[RNG].name +"!")
        this.board[this.playerFleet[RNG].position] = 1;
        this.playerFleet.splice(RNG, 1)
      }
    }


    if(this.playerFleet.length === 0){
      this.defeat = true;
      this.playAudio("lost.wav")
      alert("Defeat!")
    }

    // Reset player resources and update board
    for(var i = 0; this.playerFleet.length > i; i++){
      if(this.playerFleet[i] != 0){
        this.playerFleet[i]["movementPoint"] = this.playerFleet[i]["ship"].Speed/10;
        this.playerFleet[i]["Fired"] = false;
        this.board[this.playerFleet[i]["posiition"]] = this.playerFleet[i]
      }
    }
  this.turnCounter +=1
  this.battleLog.push("Turn " + this.turnCounter + " has begun")
  }
}
