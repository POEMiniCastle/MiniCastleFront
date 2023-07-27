import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  token!: string | null;
 
  ngOnInit(): void {
    this.tokenUser();
  }

  //Variables for the HTML 
  field1 : string | undefined;
  field2 : string | undefined;
  field3 : string | undefined;

  tokenUser(){
    if(this.token != null){
      this.field1 = 'New Game';
      this.field2 = 'Load Game';
      this.field3 = 'Quit';
    } else {
      this.field1 = 'Inscription';
      this.field2 = 'Connexion';
      this.field3 = 'Quit';
    }

  }
}
