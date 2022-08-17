import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { ModalDeleteComponent } from '../components/modals/modal-delete/modal-delete.component';
import { AddModalComponent } from '../components/modals/add-modal/add-modal.component';
import { FieldsForm } from '../models/fieldsForm';
import { LoginModalComponent } from '../components/modals/login-modal/login-modal.component';
import { AuthService } from './auth.service';
import { LoginUsuario } from '../models/login-usuario';
import { TokenService } from './token.service';
import { JwtDto } from '../models/jwt-dto';
import { Router } from '@angular/router';
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
        console.log('voy a mandar lo siguiente a item: ' + result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openAddModal(formFields: FieldsForm[], titulo: string) {
    const modalRef = this.modalService.open(AddModalComponent);
    modalRef.componentInstance.formFields = formFields;
    modalRef.componentInstance.titulo = titulo;

    modalRef.result
      .then((result) => {
        this.resultadoFormulario.next(result);
        console.log(
          'voy a mandar lo siguiente para agregar: ' + JSON.stringify(result)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }

  openLoginModal(): void {
    console.log('esto abre el login modal');
    const modalRef = this.modalService.open(LoginModalComponent);

    modalRef.result.then((result) => {
      console.log(
        'al servicio llego el siguiente nombre de usuario: ' + result
      );
      this.nombreDeUsuario.next(result);

      console.log('llamo al metodo isLogged');
      this.tokenService.isLogged();
    });
  }

  openRegistro(){
     this.modalService.open(RegistroComponent, { windowClass: 'dark-modal' });
    
  }
}
