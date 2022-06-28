import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ModalDeleteComponent } from '../components/modal-delete/modal-delete.component';
import { AddModalComponent } from '../components/modals/add-modal/add-modal.component';
import { FieldsForm } from '../models/fieldsForm';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(private modalService: NgbModal) { }
  mensajeEnviado = new Subject<boolean>();
  mensaje$ = this.mensajeEnviado.asObservable();

  resultadoFormulario = new Subject<object>();
  resultado$ = this.resultadoFormulario.asObservable();

  openModal(titulo: string, nombreItem: string):void{
    //ModalComponent is component name where modal is declare
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.nombreItem = nombreItem;
    modalRef.componentInstance.titulo = titulo;
    modalRef.result.then((result) => {
      this.mensajeEnviado.next(result);
      console.log("voy a mandar lo siguiente a item: " + result);
    }).catch((error) => {
      console.log(error);
    })
  }

  openAddModal(formFields: FieldsForm[], titulo: string){
    const modalRef = this.modalService.open(AddModalComponent);
    modalRef.componentInstance.formFields = formFields;
    modalRef.componentInstance.titulo = titulo;

    modalRef.result.then((result) => {
      this.resultadoFormulario.next(result);
      console.log("voy a mandar lo siguiente para agregar: " + JSON.stringify(result));
    }).catch((error) => {
      console.log(error);
    })
  }

}
