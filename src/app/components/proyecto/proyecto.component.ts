import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ModalsService } from 'src/app/services/modals.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  listaProyecto: Proyecto[] = [];
  @Input() nombreUsuario: string = "";

  constructor(private proyectoService: ProyectoService, private modalsService: ModalsService) { }

  ngOnInit(): void {
    this.getProyectoList(this.nombreUsuario);
  }

  getProyectoList(nombreUsuario: string) {
    this.proyectoService.getAllProyecto(nombreUsuario).subscribe({
      next: (response: Proyecto[]) => {
        this.listaProyecto = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  borrar(id: number) {
    console.log('a proyecto component llega para borrar: ' + id);
    this.proyectoService.deleteProyecto(id, this.nombreUsuario).subscribe({
      next: () => {
        this.getProyectoList(this.nombreUsuario);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  openAddModal() {
    let titulo = 'Agregar proyecto: ';
    let campos = Proyecto.getFieldsForm();
    this.modalsService.openAddModal(campos, titulo);

    this.modalsService.resultado$.pipe(take(1)).subscribe((result: any) => {
      if (result) {
        result['proyectoId'] = 0;
        console.log('esto llego para agregarse: ' + JSON.stringify(result));

        this.proyectoService.addProyecto(result, this.nombreUsuario).subscribe({
          next: () => {
            this.getProyectoList(this.nombreUsuario);
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          },
        });
      }
    });
  }

  editar(item: Proyecto) {
    this.proyectoService.updateProyecto(item.proyectoId, item, this.nombreUsuario).subscribe({
      next: (response: Proyecto) => {
        console.log(response);
        this.getProyectoList(this.nombreUsuario);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

}
