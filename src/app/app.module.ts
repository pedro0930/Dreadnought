import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpService } from './http.service';
import { FleetService } from './fleet.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // <-- import FormsModule.

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { BuyMenuComponent } from './buy-menu/buy-menu.component';
import { ShipDetailComponent } from './ship-detail/ship-detail.component';
import { FleetDisplayComponent } from './fleet-display/fleet-display.component';
import { BattleLogComponent } from './battle-log/battle-log.component';
import { ResolutionComponent } from './resolution/resolution.component';
import { ShipBuilderComponent } from './ship-builder/ship-builder.component';
import { ParallaxDirective } from './parallax.directive';


const routes: Routes = [

]

@NgModule({
  declarations: [
    AppComponent,
    MainMenuComponent,
    BuyMenuComponent,
    ShipDetailComponent,
    FleetDisplayComponent,
    BattleLogComponent,
    ResolutionComponent,
    ShipBuilderComponent,
    ParallaxDirective,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule
  ],
  providers: [HttpService, FleetService],
  bootstrap: [AppComponent]
})
export class AppModule { }
