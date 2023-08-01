import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from 'src/app/core/entities/class';
import { ClassService } from 'src/app/services/class/class.service';

@Component({
  selector: 'app-class-carousel',
  templateUrl: './class-carousel.component.html',
  styleUrls: ['./class-carousel.component.scss']
})

export class ClassCarouselComponent {
  classes$: Observable<Class[]> | undefined;
  classesTable!: Class[];

  constructor(private classService: ClassService){
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
    console.log(this.classesTable[id-1])
  }
}




