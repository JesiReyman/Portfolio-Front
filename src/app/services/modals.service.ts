import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ModalDeleteComponent } from '../components/modals/modal-delete/modal-delete.component';
import { AddModalComponent } from '../components/modals/add-modal/add-modal.component';
import { FieldsForm } from '../models/fieldsForm';
import { LoginModalComponent } from '../components/modals/login-modal/login-modal.component';
import { TokenService } from './token.service';
import { RegistroComponent } from '../components/modals/registro/registro.component';

@Injectable({
  providedIn: 'root',
})
export class ModalsService {
  constructor(
    private modalService: NgbModal,
    private tokenService: TokenService
  ) {}

  private _delete = new Subject<boolean>();
  delete$ = this._delete.asObservable();

  resultadoFormulario = new Subject<object>();
  resultado$ = this.resultadoFormulario.asObservable();

  nombreDeUsuario = new Subject<string>();
  nombre$ = this.nombreDeUsuario.asObservable();

  openDeleteModal(titulo: string, nombreItem: string): void {
    const modalRef = this.modalService.open(ModalDeleteComponent);
    modalRef.componentInstance.nombreItem = nombreItem;
    modalRef.componentInstance.titulo = titulo;
    modalRef.result
      .then((result) => {
        this._delete.next(result);
      })
      .catch((error) => {
       // alert(error);
      });
  }

  openAddModal(formFields: FieldsForm[], titulo: string) {
    const modalRef = this.modalService.open(AddModalComponent);
    modalRef.componentInstance.formFields = formFields;
    modalRef.componentInstance.titulo = titulo;

    modalRef.result
      .then((result) => {
        this.resultadoFormulario.next(result);
      })
      .catch((error) => {
       // alert(error);
      });
  }

  openLoginModal(): void {
    const modalRef = this.modalService.open(LoginModalComponent);

    modalRef.result.then((result) => {
      this.nombreDeUsuario.next(result);
      this.tokenService.isLogged();
    })
    .catch((error) => {

    });
    
  }

  openRegistro() {
    this.modalService.open(RegistroComponent, { windowClass: 'dark-modal' });
  }
}
