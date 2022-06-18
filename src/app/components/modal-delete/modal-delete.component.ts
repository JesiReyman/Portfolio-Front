import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { Skill } from 'src/app/models/skill';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {
  
  @Input() educacionIn:  Educacion = <Educacion>{};
  @Input() set skill(val: Skill){
    this.skill = val;
    console.log("justo cuando llega al input: " + JSON.stringify(val) )
   }
  
  @Output() deleteEducacion: EventEmitter<Educacion> = new EventEmitter();
  
  
  constructor() { }

  ngOnInit(): void {
    
  }

  llego(item: any){
    console.log("llego al modal: " +  JSON.stringify(item))
  }

  onDelete(educacionIn: Educacion){
    this.deleteEducacion.emit(educacionIn);
    console.log("3 el modal pudo emitir: " + JSON.stringify(educacionIn));
    
  }

}
