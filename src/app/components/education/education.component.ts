import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { EducationService } from 'src/app/services/education.service';
import { ModalsService } from 'src/app/services/modals.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  public listaEducacion: Educacion[] = [];

  constructor(
    private educacionService: EducationService,
    private modalsService: ModalsService
  ) {}

  ngOnInit(): void {
    this.getListaEducacion();
  }

  getListaEducacion(): void {
    this.educacionService.getAllEducacion().subscribe({
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

        this.educacionService.addEducacion(result).subscribe({
          next: () => {
            this.getListaEducacion();
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          },
        });
      }
    });
  }

  borrar(educacionId: number) {
    this.educacionService.deleteEducacion(educacionId).subscribe({
      next: () => {
        this.getListaEducacion();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }


  editar(item: Educacion) {
    this.educacionService.updateEducacion(item.id_Edu, item).subscribe({
      next: (response: Educacion) => {
        console.log(response);
        this.getListaEducacion();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
