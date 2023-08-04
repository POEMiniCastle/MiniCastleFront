import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './feature/registration-form/registration-form.component';
import { HomeComponent } from './feature/home/home.component';
import { ClassCarouselComponent } from './feature/class-carousel/class-carousel.component';
import { TableComponent } from './shared/table/table.component';
import { CreationCardComponent } from './feature/creation-card/creation-card.component';
import { MapComponent } from './feature/map/map.component';
import { TestComponent } from './feature/test/test.component';
import { CombatPageComponent } from './feature/combat-page/combat-page.component';
import { ConnexionFormComponent } from './feature/connexion-form/connexion-form.component';
import { PlayMenuComponent } from './feature/play-menu/play-menu.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'register',
    component: RegistrationFormComponent
  },
  {
    path: 'connexion',
    component: ConnexionFormComponent
  },
  {
    path: 'classes',
    component: ClassCarouselComponent
  },
  {
    path: 'table',
    component: TableComponent
  },
  {
    path: 'play-menu',
    component: PlayMenuComponent
  },
  {
    path: 'creation-card',
    component: CreationCardComponent
  },
  {
    path: 'play',
    component: MapComponent
  },
  {
    path: 'combat',
    component: CombatPageComponent
  },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }