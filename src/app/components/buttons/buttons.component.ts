import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { ModalsService } from 'src/app/services/modals.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css'],
})
export class ButtonsComponent implements OnInit {
  @Input() title: string = '';
  colorClass: string = '';
  icono: string = '';
  isAdmin: boolean = false;
  isLogged: boolean = false;
  subscription?: Subscription;

  constructor(
    private modalService: ModalsService,
    private tokenService: TokenService
  ) {
   /* const merged = merge(
      this.tokenService.logged$,
      this.modalService.loginData$
    );*/

    this.subscription = this.tokenService.logged$.subscribe({
      next: (estaLogueado) => {
        console.log('llego al boton : ' + estaLogueado);
        this.isLogged = estaLogueado;
        if (estaLogueado) {
          this.isAdmin = this.tokenService.isAdmin();
          console.log("es admin?: " + this.isAdmin);
        } 
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.inicioBoton(this.title);
    //this.checkIsLogged();
  }

  inicioBoton(title: string) {
    if (title === 'Edit') {
      this.colorClass = 'btn-primary';
      this.icono = 'fa fa-pencil';
    } else if (title === 'Add') {
      this.colorClass = 'btn-success';
      this.icono = 'fa fa-circle-plus';
    } else if (title === 'Delete') {
      this.colorClass = 'btn-secondary';
      this.icono = 'fa fa-trash-can';
    }
  }

  /*
  checkIsAdmin() {
    this.isAdmin = this.tokenService.isAdmin();
  }

  checkIsLogged() {
    this.tokenService.logged$.subscribe({
      next: (logueado) => {
        this.isLogged = logueado;
      },
    });
    console.log('se ejecuta checkIsLogged y su valor es: ' + this.isLogged);
  }*/
}
