import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Experiencia } from 'src/app/models/experiencia';
import { ModalsService } from 'src/app/services/modals.service';
import { ModalDeleteComponent } from '../modal-delete/modal-delete.component';
import { take } from 'rxjs'
 

@Component({
  selector: 'app-experiencia-item',
  templateUrl: './experiencia-item.component.html',
  styleUrls: ['./experiencia-item.component.css']
})
export class ExperienciaItemComponent implements OnInit {
  @Input() experienciaItem : Experiencia = <Experiencia>{};
  @Output() aceptoBorrar: EventEmitter<number> = new EventEmitter();
  
  
  
  constructor(public modalService: NgbModal, private servicioModal: ModalsService) {}

  ngOnInit(): void {
  }

  editar(item: Experiencia){}
  seleccion(item: Experiencia){}

  /*openModal(item: Experiencia){
    //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.item = item;
    let titulo: string = "Está por eliminar la siguiente experiencia: ";
    modalRef.componentInstance.titulo = titulo;
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
    modalRef.componentInstance.emito.subscribe(
      ($event: any)=> {
        console.log("vuelve a la experiencia item: " + JSON.stringify($event))})

    }*/

     openModal(item: Experiencia){
  
      console.log("abro el modal")
      let tituloBorrar = "Está por eliminar la siguiente experiencia: ";
      this.servicioModal.openModal(tituloBorrar, item.tituloExperiencia);
      
      this.servicioModal.mensaje$
      .pipe(take(1))
        .subscribe((result: boolean)=> {
          console.log("esto es justo antes del if");
           if(result){
             this.aceptoBorrar.emit(item.id_Experiencia);
             console.log("se guardo en borrar: " + result + " y se manda a borrar: " + JSON.stringify(item));
            }
        })
    }

    

}
