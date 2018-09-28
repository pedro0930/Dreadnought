import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FleetService } from '../fleet.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {
  played: boolean
  constructor(
    private _httpService: HttpService,    
    private _route: ActivatedRoute,
    private _router: Router,
    private fleetService: FleetService
    ) { }

  ngOnInit() {
    this.played = false;
    this.fleetService.getShipsAndSort()
    this.check()
  }

  check(){
    if (this.played == false){
      this.playAudio("menu.wav")
    }
  }
  playAudio(fileName){
    let audio = new Audio();
    audio.src = "../../../assets/audio/" +fileName;
    audio.load();
    audio.play();
    this.played = true
  }

}
