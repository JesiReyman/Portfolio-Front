import { Component, Input, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';

@Component({
  selector: 'app-experiencia-item',
  templateUrl: './experiencia-item.component.html',
  styleUrls: ['./experiencia-item.component.css']
})
export class ExperienciaItemComponent implements OnInit {
  @Input() experienciaItem : Experiencia = <Experiencia>{}

  constructor() { }

  ngOnInit(): void {
  }

  editar(item: Experiencia){}
  seleccion(item: Experiencia){}

}
