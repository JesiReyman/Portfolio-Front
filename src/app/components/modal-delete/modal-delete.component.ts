import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {
  @Input() educacionIn: Educacion = <Educacion>{};
  @Output() deleteEducacion: EventEmitter<Educacion> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
    
  }

  onDelete(educacionIn: Educacion){
    this.deleteEducacion.emit(educacionIn);
    console.log("3 el modal pudo emitir: " + JSON.stringify(educacionIn));
  }

}
