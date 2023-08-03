import { Component } from '@angular/core';

@Component({
  selector: 'app-play-menu',
  templateUrl: './play-menu.component.html',
  styleUrls: ['./play-menu.component.scss']
})
export class PlayMenuComponent {
  
  deconnexion(){
    localStorage.clear();
    sessionStorage.clear();
  }

  newGame(){
    sessionStorage.clear();
  }
}
