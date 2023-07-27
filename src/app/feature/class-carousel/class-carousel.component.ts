import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Class } from 'src/app/core/entities/class';
import { Skills } from 'src/app/core/entities/skills';
import { ClassService } from 'src/app/services/class/class.service';

@Component({
  selector: 'app-class-carousel',
  templateUrl: './class-carousel.component.html',
  styleUrls: ['./class-carousel.component.scss']
})

export class ClassCarouselComponent {
  classes$: Observable<Class[]> | undefined;

  constructor(private classService: ClassService){
  }

  trackByClasseId(classe: any): string {
    return classe.id;
  }

  clicked(){
    console.log('click')
  }

  ngOnInit(): void{
    this.classes$ = this.classService.getClass();
    console.log(this.classes$)
  }
}
