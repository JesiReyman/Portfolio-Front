import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { Pagina404Component } from './components/pagina404/pagina404.component';


const routes: Routes = [
  {path: ':nombreUsuario', component: HomeComponent},
  {path: '', redirectTo: '/jesicamr', pathMatch: 'full'},
  { path: 'noencontrado/404', component: Pagina404Component },
  { path: '**', redirectTo: 'noencontrado/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
