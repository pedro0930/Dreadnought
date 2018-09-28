import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { BuyMenuComponent } from './buy-menu/buy-menu.component';
import { ShipBuilderComponent } from './ship-builder/ship-builder.component';
import { FleetDisplayComponent } from './fleet-display/fleet-display.component';






const routes: Routes = [
  { path: "", component: MainMenuComponent},
  { path: "BuyMenu", component: BuyMenuComponent},
  { path: "ShipBuilder", component: ShipBuilderComponent},
  { path: "Game", component: FleetDisplayComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
