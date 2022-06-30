import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap'


@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css']
})
export class ModalDeleteComponent implements OnInit {
  
  @Input() nombreItem:  string = "";
  @Input() titulo: string = "";
  
  //@Output() emito : EventEmitter<any> = new EventEmitter(); 
 
  
  //@Output() deleteEducacion: EventEmitter<Educacion> = new EventEmitter();
  
  
  constructor(public activeModal: NgbActiveModal, config: NgbModalConfig) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
   }

  ngOnInit(): void {
  // this.seleccion(this.item);
  }
  
  /*
  seleccion(item: any){
    if(this.item.hasOwnProperty('tituloExperiencia')){
      this.itemName = item.tituloExperiencia;
    } else if (this.item.hasOwnProperty('nombreSkill')){
      this.itemName = item.nombreSkill;
    }

    return this.itemName;
  }*/

  /*
  acepto(){
    //this.emito.emit(this.item);
    this.servicioModal.mandarMensaje(true);
    this.activeModal.dismiss();
  }*/
  

 /* onDelete(educacionIn: Educacion){
    this.deleteEducacion.emit(educacionIn);
    console.log("3 el modal pudo emitir: " + JSON.stringify(educacionIn));
    
  }*/

}
