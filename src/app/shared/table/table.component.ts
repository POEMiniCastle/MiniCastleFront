import { Component, OnInit } from '@angular/core';
import { Class } from 'src/app/core/entities/class';
import { Skills } from 'src/app/core/entities/skills';
import { TableService } from 'src/app/shared/table/table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit{

classes: Class[] = [];
skills: Skills[] = [];

constructor(private classService: TableService) { }

ngOnInit(): void {
  this.classService.getClasses().subscribe((classes: Class[]) => {
    this.classes = classes;
  });
}
}