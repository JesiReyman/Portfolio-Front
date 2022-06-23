import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ModalDeleteComponent } from '../components/modal-delete/modal-delete.component';

@Injectable({
  providedIn: 'root'
})
export class ModalsService {

  constructor(private modalService: NgbModal) { }
  mensajeEnviado = new Subject<boolean>();
  mensaje$ = this.mensajeEnviado.asObservable();

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

    /*modalRef.componentInstance.emito.susbscribe(
      ($event: any)=> {
        this.mensajeEnviado.next("vuelve a la experiencia item: " + JSON.stringify($event))})*/
        
    }

}
