import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { HeaderComponent } from './layout/header/header.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list'



import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MapComponent } from './feature/map/map.component';
import { RegistrationFormComponent } from './feature/registration-form/registration-form.component';
import { HomeComponent } from './feature/home/home.component';
import { ClassCarouselComponent } from './feature/class-carousel/class-carousel.component';
import { CardComponent } from './shared/card/card.component';
import { TestComponent } from './feature/test/test.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { BodyComponent } from './body/body.component';
import { CardHolderComponent } from './shared/card-holder/card-holder.component';
import { CreationCardComponent } from './feature/creation-card/creation-card.component';
import { FormulaireComponent } from './shared/formulaire/formulaire.component';
import { PlayerCombatInterfaceComponent } from './layout/player-combat-interface/player-combat-interface.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    RegistrationFormComponent,
    HomeComponent,
    HeaderComponent,
    ClassCarouselComponent,
    CardComponent,
    TestComponent,
    NavbarComponent,
    BodyComponent,
    CardHolderComponent,
    CreationCardComponent,
    FormulaireComponent,
    PlayerCombatInterfaceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    MatSlideToggleModule,
    NgbModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
