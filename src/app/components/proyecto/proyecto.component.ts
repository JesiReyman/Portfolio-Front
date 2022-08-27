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
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  listaProyecto: Proyecto[] = [];
  @Input() nombreUsuario: string = "";

  constructor(private proyectoService: ProyectoService, private modalsService: ModalsService, private imagen: ImagenService) { }

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
    //console.log('a proyecto component llega para borrar: ' + JSON.stringify(item) );
    if(item.urlImagen !== '' && item.urlImagen !== null){
      this.imagen.deleteImage(item.urlImagen);
      this.deleteProyecto(item, this.nombreUsuario);
    } else{
      this.deleteProyecto(item, this.nombreUsuario);
    }
    
  }

  deleteProyecto(proyecto: Proyecto, usuario: string){
    this.proyectoService.deleteProyecto(proyecto.proyectoId, usuario).subscribe({
      next: () => {
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

        if (proyecto.imagen !== '') {
          let imagenFile = File;
          imagenFile = proyecto.imagenInput;
         
          this.imagen.subirImagen(imagenFile, this.nombreUsuario);

          this.imagen.url$.pipe(take(1)).subscribe((respuesta) => {
            console.log('esta es la url que le llego a proyecto: ' + respuesta);
            proyecto['urlImagen'] = respuesta;
            console.log(
              'finalmente el proyecto a agregar queda: ' + JSON.stringify(result)
            );
            this.addProyecto(proyecto, this.nombreUsuario);
          });

        } else{
          this.addProyecto(proyecto, this.nombreUsuario);
        }
      }
    });
  }

  addProyecto(proyecto: Proyecto, usuario: string){
    this.proyectoService.addProyecto(proyecto, usuario).subscribe({
      next: () => {
        this.getProyectoList(usuario);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  editar(item: any) {
    console.log("a proyecto llega el siguiente proyecto editado" + JSON.stringify(item))
    if(item.imagen !== ''){
      this.imagen.url$.pipe(take(1)).subscribe((url) => {
        item['urlImagen'] =  url;
       console.log(
         'el item editado queda: ' + JSON.stringify(item)
       );
        this.editarProyecto(item.proyectoId, item, this.nombreUsuario)
     });
    } else{
      this.editarProyecto(item.proyectoId, item, this.nombreUsuario)
    }
    
  }

  editarProyecto(id: number, proyecto: Proyecto, usuario: string){
    this.proyectoService.updateProyecto(id, proyecto, usuario).subscribe({
      next: (response: Proyecto) => {
        console.log(response);
        this.getProyectoList(usuario);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

}
