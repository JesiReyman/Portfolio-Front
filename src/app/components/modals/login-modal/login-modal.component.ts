import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/services/auth.service';
import { ModalsService } from 'src/app/services/modals.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.css'],
})
export class LoginModalComponent implements OnInit {
  loginForm: FormGroup = {} as FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private modalsService: ModalsService,
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
    this.authService.login(loginData).subscribe({
      next: (result) => {
        let token = result.token;

        this.tokenService.setToken(token);
        this.activeModal.close(loginData.nombreUsuario);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        this.activeModal.close();
      },
    });
  }

  openModalDeRegistro() {
    this.modalsService.openRegistro();
  }
}
