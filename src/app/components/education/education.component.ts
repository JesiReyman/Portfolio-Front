import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { EducationService } from 'src/app/services/education.service';
import { ModalsService } from 'src/app/services/modals.service';
import { take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  public listaEducacion: Educacion[] = [];
  //userName: string = "";
  @Input() nombreUsuario: string = "";

  constructor(
    private educacionService: EducationService,
    private modalsService: ModalsService
  ) {}

  ngOnInit(): void {

    //this.userName = this.route.snapshot.params['nombreUsuario'];  
    this.getListaEducacion(this.nombreUsuario);
  }

  getListaEducacion(nombreUsuario: string): void {
    this.educacionService.getAllEducacion(nombreUsuario).subscribe({
      next: (response: Educacion[]) => {
        this.listaEducacion = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  openAddModal() {
    let titulo = 'Agregar educación:';
    let fields = Educacion.getFieldsForm();
    this.modalsService.openAddModal(fields, titulo);

    this.modalsService.resultado$.pipe(take(1)).subscribe((result: any) => {
      if (result) {
        result['id_Edu'] = 0;

        this.educacionService.addEducacion(result, this.nombreUsuario).subscribe({
          next: () => {
            this.getListaEducacion(this.nombreUsuario);
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          },
        });
      }
    });
  }

  borrar(educacionId: number) {
    this.educacionService.deleteEducacion(educacionId, this.nombreUsuario).subscribe({
      next: () => {
        this.getListaEducacion(this.nombreUsuario);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }


  editar(item: Educacion) {
    this.educacionService.updateEducacion(item.id_Edu, item, this.nombreUsuario).subscribe({
      next: (response: Educacion) => {
        this.getListaEducacion(this.nombreUsuario);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
