import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { ModalsService } from 'src/app/services/modals.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css'],
})
export class ExperienciaComponent implements OnInit {
  public listaExperiencia: Experiencia[] = [];

  constructor(
    private experienciaService: ExperienciaService,
    private modalsService: ModalsService
  ) {}

  ngOnInit(): void {
    this.getListaExperiencia();
  }

  getListaExperiencia(): void {
    this.experienciaService.getAllExperiencia().subscribe({
      next: (response: Experiencia[]) => {
        this.listaExperiencia = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  borrar(experienciaId: number) {
    this.experienciaService.deleteExperiencia(experienciaId).subscribe({
      next: () => {
        this.getListaExperiencia();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  openAddModal() {
    let titulo = 'Agregar experiencia:';
    let fields = Experiencia.getFieldsForm();
    this.modalsService.openAddModal(fields, titulo);

    this.modalsService.resultado$.pipe(take(1)).subscribe((result: any) => {
      if (result) {
        result['id_Experiencia'] = 0;

        this.experienciaService.addExperiencia(result).subscribe({
          next: () => {
            this.getListaExperiencia();
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          },
        });
      }
    });
  }

  editar(item: Experiencia) {
    this.experienciaService
      .updateExperiencia(item.id_Experiencia, item)
      .subscribe({
        next: (response: Experiencia) => {
          console.log(response);
          this.getListaExperiencia();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      });
  }
}
