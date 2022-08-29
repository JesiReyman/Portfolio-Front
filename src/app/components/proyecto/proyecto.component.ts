import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/models/proyecto';
import { ModalsService } from 'src/app/services/modals.service';
import { ProyectoService } from 'src/app/services/proyecto.service';
import { take } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css'],
})
export class ProyectoComponent implements OnInit {
  listaProyecto: Proyecto[] = [];
  @Input() nombreUsuario: string = '';

  constructor(
    private proyectoService: ProyectoService,
    private modalsService: ModalsService,
    private imagen: ImagenService
  ) {}

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

  borrar(item: Proyecto) {
    let urlOriginal = item.urlImagen;

    if (urlOriginal) {
      this.imagen.deleteImage(item.urlImagen);
      this.deleteProyecto(item);
    } else {
      this.deleteProyecto(item);
    }
  }

  deleteProyecto(proyecto: Proyecto) {
    const usuario = this.nombreUsuario;
    this.proyectoService
      .deleteProyecto(proyecto.proyectoId, usuario)
      .subscribe({
        next: () => {
          alert("Se eliminó correctamente");
          this.getProyectoList(usuario);
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
        let proyecto = result;
        proyecto['proyectoId'] = 0;

        if (proyecto.imagen) {
          let imagenFile = File;
          imagenFile = proyecto.imagenInput;

          this.imagen.subirImagen(imagenFile, this.nombreUsuario);

          this.imagen.url$.pipe(take(1)).subscribe((respuesta) => {
            proyecto['urlImagen'] = respuesta;
            this.addProyecto(proyecto);
          });
        } else {
          this.addProyecto(proyecto);
        }
      }
    });
  }

  addProyecto(proyecto: Proyecto) {
    const usuario = this.nombreUsuario;
    this.proyectoService.addProyecto(proyecto, usuario).subscribe({
      next: () => {
        alert("Se agregó correctamente");
        this.getProyectoList(usuario);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  editar(item: any) {
    if (item.imagen) {
      this.imagen.url$.pipe(take(1)).subscribe((url) => {
        item['urlImagen'] = url;
        this.editarProyecto(item);
      });
    } else {
      this.editarProyecto(item);
    }
  }

  editarProyecto(proyecto: Proyecto) {
    const usuario = this.nombreUsuario;
    this.proyectoService.updateProyecto(proyecto.proyectoId, proyecto, usuario).subscribe({
      next: (response: Proyecto) => {
        alert("Se guardó correctamente");
        this.getProyectoList(usuario);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
}
