import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { ModalsService } from 'src/app/services/modals.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-experiencia-item',
  templateUrl: './experiencia-item.component.html',
  styleUrls: ['./experiencia-item.component.css'],
})
export class ExperienciaItemComponent implements OnInit {
  @Input() experienciaItem: Experiencia = <Experiencia>{};
  @Output() aceptoBorrar: EventEmitter<number> = new EventEmitter();
  @Output() editarExperiencia: EventEmitter<Experiencia> = new EventEmitter();

  constructor(private servicioModal: ModalsService) {}

  ngOnInit(): void {}

  openDeleteModal(item: Experiencia) {
    let tituloBorrar = 'Está por eliminar la siguiente experiencia: ';
    this.servicioModal.openDeleteModal(tituloBorrar, item.tituloExperiencia);

    this.servicioModal.delete$.pipe(take(1)).subscribe((result: boolean) => {
      if (result) {
        this.aceptoBorrar.emit(item.experienciaId);
      }
    });
  }

  editar(item: Experiencia) {
    let titulo = 'Editar experiencia: ';
    let fields = Experiencia.getFieldsForm(item);

    this.servicioModal.openAddModal(fields, titulo);
    this.servicioModal.resultado$.pipe(take(1)).subscribe((result: any) => {
      if (result) {
        result['experienciaId'] = item.experienciaId;
        this.editarExperiencia.emit(result);
      }
    });
  }
}
