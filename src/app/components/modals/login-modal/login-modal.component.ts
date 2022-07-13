
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
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent implements OnInit {

  loginForm: UntypedFormGroup = {} as UntypedFormGroup;
  
  constructor(public activeModal: NgbActiveModal, private authService: AuthService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup ({
      nombreUsuario: new FormControl('', [Validators.required, Validators.minLength(3)]),
      password: new FormControl()
    })
  }

  login(loginData: LoginUsuario){
    console.log("esto trae el modal login: " + JSON.stringify(loginData));
    this.authService.login(loginData).subscribe((result)=>{
      console.log("al hacer la autenticación de obtiene: " + JSON.stringify(result));
      let token = result.token;
      console.log("el token es: " + JSON.stringify(token))
      //Guardo en el sessionStorage el token
      this.tokenService.setToken(token);
      console.log("esto trae cuando traigo el token desde el servicio: " + JSON.stringify(this.tokenService.getToken()))
    })
  }

}
