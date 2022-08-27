import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup = {} as FormGroup;
  constructor(
    public activeModal: NgbActiveModal,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.registroForm = new FormGroup({
      nombre: new FormControl(),
      email: new FormControl('', [Validators.email]),
      nombreUsuario: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl(),
    });
  }

  get nombreUsuario() {
    return this.registroForm.get('nombreUsuario');
  }

  registro(datos: NuevoUsuario) {
    this.authService.nuevo(datos).subscribe({
      next: (result) => {
        this.activeModal.close();
      },
      error: (error: HttpErrorResponse) => {
        alert(error);
      },
    });
  }
}
