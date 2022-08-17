import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoUsuario } from 'src/app/models/nuevo-usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  registroForm: FormGroup = {} as FormGroup;
  constructor(public activeModal: NgbActiveModal, private authService: AuthService) { }

  ngOnInit(): void {
    this.registroForm = new FormGroup({
      nombre: new FormControl(),
      email: new FormControl(),
      nombreUsuario: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
      ]),
      password: new FormControl(),
    });
  }

  registro(datos: NuevoUsuario){
    this.authService.nuevo(datos).subscribe({
      next: (result) => {
        console.log("se agregó el sieguiente registro de usuario: " + JSON.stringify(result));
        this.activeModal.close();
      },
      error: (error: HttpErrorResponse) => {
        alert(error);
      }
    })
  }

}
