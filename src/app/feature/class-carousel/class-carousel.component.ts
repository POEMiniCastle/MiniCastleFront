import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from 'src/app/core/entities/Character';
import { Player } from 'src/app/core/entities/Player';
import { Class } from 'src/app/core/entities/class';
import { ClassService } from 'src/app/services/class/class.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-class-carousel',
  templateUrl: './class-carousel.component.html',
  styleUrls: ['./class-carousel.component.scss']
})

export class ClassCarouselComponent {
  classes$: Observable<Class[]> | undefined;
  classesTable!: Class[];
  player!:Player;

  constructor(private classService: ClassService, private router:Router){
  }

  trackByClasseId(classe: Class): number {
    return classe.id;
  }

  clicked(){
    console.log('click')
  }

  ngOnInit(): void{
    //this.classes$ = this.classService.getClass();
    this.getClasses();
    
    // this.classes$.forEach( (toto:Class) => {
    //   if(toto.id == 1){
    //   }
    // })
  }

  getClasses(): any{
    this.classService.getClass()
      .subscribe(classes => this.classesTable = classes)
      
  }

  getClass(id:number){
    //console.log(this.classesTable[id-1]);

    // On ajoute les stats de base de la classe choisi par le joueur dans le stockage de session
    this.player = JSON.parse(localStorage.getItem("player") as string);
    this.player.character = this.classesTable[id-1];
    this.player.character.level = 1;
    this.player.character.xp = 0;
    localStorage.setItem("player", JSON.stringify(this.player));

    // Redirection vers la map
    this.router.navigate(['/play'])
  }
}




