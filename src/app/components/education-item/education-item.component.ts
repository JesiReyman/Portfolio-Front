import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';


@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.css']
})
export class EducationItemComponent implements OnInit {

  @Input() educationItem: Educacion = <Educacion>{};
  @Output() educacionABorrar: EventEmitter<Educacion> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  seleccion(item: Educacion){
    this.educacionABorrar.emit(item)
    console.log("1 estoy seleccionando y emitiendo la siguiente educacion: " + JSON.stringify(item));
    
  }

}
