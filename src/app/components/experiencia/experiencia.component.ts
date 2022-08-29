import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
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
  @Input() nombreUsuario: string = '';

  constructor(
    private experienciaService: ExperienciaService,
    private modalsService: ModalsService
  ) {}

  ngOnInit(): void {
    this.getListaExperiencia(this.nombreUsuario);
  }

  getListaExperiencia(nombreUsuario: string): void {
    this.experienciaService.getAllExperiencia(nombreUsuario).subscribe({
      next: (response: Experiencia[]) => {
        this.listaExperiencia = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  borrar(experienciaId: number) {
    this.experienciaService
      .deleteExperiencia(experienciaId, this.nombreUsuario)
      .subscribe({
        next: () => {
          alert("Se eliminó correctamente");
          this.getListaExperiencia(this.nombreUsuario);
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
        result['experienciaId'] = 0;

        this.experienciaService
          .addExperiencia(result, this.nombreUsuario)
          .subscribe({
            next: () => {
              alert("Se agregó correctamente");
              this.getListaExperiencia(this.nombreUsuario);
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
      .updateExperiencia(item.experienciaId, item, this.nombreUsuario)
      .subscribe({
        next: (response: Experiencia) => {
          alert("Se guardó correctamente");
          this.getListaExperiencia(this.nombreUsuario);
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      });
  }
}
