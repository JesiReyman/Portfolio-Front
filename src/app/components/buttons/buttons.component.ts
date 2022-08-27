import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
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
  esUsuarioValido: boolean = false;

  constructor(
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {
   

    this.subscription = this.tokenService.logged$.subscribe({
      next: (estaLogueado) => {
       // console.log('llego al boton : ' + estaLogueado);
        this.isLogged = estaLogueado;
        if (estaLogueado) {
          this.isAdmin = this.tokenService.isAdmin();
        //  console.log("es admin?: " + this.isAdmin);
          const currentUserName = this.tokenService.getUserName();
         // console.log("el usuario loggeado es: " + currentUserName);
          const currentRouteName = this.route.snapshot.params['nombreUsuario'];
         // console.log("la ruta actual es de: " + currentRouteName);
          this.esUsuarioValido = this.checkUsuario(currentUserName, currentRouteName);
          //console.log("son el mismo usuario?: " + this.esUsuarioValido);
        } 
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  ngOnInit(): void {
    this.inicioBoton(this.title);
    
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

  checkUsuario(usuarioLogueado: string, usuarioRuta: string): boolean{
    if(usuarioLogueado==usuarioRuta){
      this.esUsuarioValido = true;
    }
    return this.esUsuarioValido;
  }
  
}
