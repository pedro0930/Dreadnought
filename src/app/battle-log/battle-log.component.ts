import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FleetService } from '../fleet.service';

@Component({
  selector: 'app-battle-log',
  templateUrl: './battle-log.component.html',
  styleUrls: ['./battle-log.component.css']
})
export class BattleLogComponent implements OnInit {
  @Input() fromShipDisplay: any;
  battleLog: Array<String>
  constructor(
    private _httpService: HttpService,    
    private _route: ActivatedRoute,
    private _router: Router,
    private fleetService: FleetService) { }

  ngOnInit() {
    this.battleLog = ["Enemy ships identified, prepare to engage!"]
  }

}
