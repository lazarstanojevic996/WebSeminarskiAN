import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StartComponent } from './Components/start/start.component';
import { PocetnaComponent } from "./Components/pocetna/pocetna.component";
import { DodajComponent } from './Components/dodaj/dodaj.component';
import { IzmeniComponent } from './Components/izmeni/izmeni.component';

const routes: Routes = [
  { path:'', redirectTo:'start', pathMatch:'full' },
  { path:'start', component:StartComponent },
  { path: 'pocetna',  component: PocetnaComponent},
  {path: 'izmeni/:ID', component:IzmeniComponent},
  { path: 'dodaj', component: DodajComponent}

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
