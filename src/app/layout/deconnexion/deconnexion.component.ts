import { Component } from '@angular/core';

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.component.html',
  styleUrls: ['./deconnexion.component.scss']
})
export class DeconnexionComponent {

  ngOnInit():void{
    if(localStorage.getItem("player") !== null){
      localStorage.removeItem("player");
      window.location.href="";
    }
  }
  
}
