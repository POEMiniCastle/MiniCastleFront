import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationFormComponent } from './feature/registration-form/registration-form.component';
import { HomeComponent } from './feature/home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { ClassCarouselComponent } from './feature/class-carousel/class-carousel.component';
import { TableComponent } from './shared/table/table.component';
import { CreationCardComponent } from './feature/creation-card/creation-card.component';
import { MapComponent } from './feature/map/map.component';
import { TestComponent } from './feature/test/test.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'Inscription',
    component: RegistrationFormComponent
  },
  {
    path: 'Connexion',
    component: HeaderComponent
  },
  {
    path: 'Register',
    component: RegistrationFormComponent
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
    path: 'creation-card',
    component: CreationCardComponent
  },
  {
    path: 'play',
    component: MapComponent
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }