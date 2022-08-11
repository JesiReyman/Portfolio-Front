
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject } from 'rxjs';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  loginForm: UntypedFormGroup = {} as UntypedFormGroup;
 // isLogged: boolean = false;
 // isAdmin: boolean = false;

  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      nombreUsuario: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(),
    });
  }

  login(loginData: LoginUsuario): void {
    console.log("esto trae el modal login: " + JSON.stringify(loginData));
    this.authService.login(loginData).subscribe({
      next: (result) => {
        console.log(
          'al hacer la autenticación de obtiene: ' + JSON.stringify(result)
        );
        let token = result.token;
        //Guardo en el sessionStorage el token
        this.tokenService.setToken(token);

       // this.isLogged = true;
        //this.isAdmin = this.tokenService.isAdmin();
       // console.log('es admin?: ' + this.isAdmin);
       // let loginData = [this.isLogged, this.isAdmin];
        this.activeModal.close(loginData.nombreUsuario);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.activeModal.close();
      },
    });
    //console.log("llamo al metodo isLogged")
    //this.tokenService.isLogged();
   
  }

  /*
  isLogged(): boolean{
    if(this.tokenService.getToken()){
      return true;
    }
    return false;
  }*/
}
