import { Component } from '@angular/core';
import { Monster } from 'src/app/core/entities/monster';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {

  private Monster: Monster[] = [];
  

}
