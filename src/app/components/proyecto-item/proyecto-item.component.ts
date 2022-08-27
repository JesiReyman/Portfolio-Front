import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/models/proyecto';
import { ModalsService } from 'src/app/services/modals.service';
import { take } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';

@Component({
  selector: 'app-proyecto-item',
  templateUrl: './proyecto-item.component.html',
  styleUrls: ['./proyecto-item.component.css']
})
export class ProyectoItemComponent implements OnInit {

  @Input() proyectoItem: Proyecto = <Proyecto>{};
  @Input() nombreUsuario: string = "";
  @Output() aceptoBorrar: EventEmitter<Proyecto> = new EventEmitter();
  @Output() editarProyecto: EventEmitter<Proyecto> = new EventEmitter();

  constructor(public modalService: NgbModal, private servicioModal: ModalsService,  private imagen: ImagenService) { }

  ngOnInit(): void {
  }

  openDeleteModal(item: Proyecto){
    //console.log("abro el modal para eliminar: " + JSON.stringify(item))
      let tituloBorrar = "Está por eliminar el siguiente Proyecto: ";
      this.servicioModal.openDeleteModal(tituloBorrar, item.titulo);
     
      this.servicioModal.delete$
      .pipe(take(1))
        .subscribe((result: boolean)=> {
           if(result){
             //this.aceptoBorrar.emit(item.proyectoId);
             this.aceptoBorrar.emit(item);
             
            }
        })
    }

    openEditModal(item: Proyecto){
     
     let titulo = "Editar Proyecto: "
     let fields = Proyecto.getFieldsForm(item);
     let urlOriginal = item.urlImagen
     //let imagenFile = File;
     // console.log("voy a mandar lo siguiente al modal para editar: " + JSON.stringify(item))
      this.servicioModal.openAddModal(fields, titulo);

      this.servicioModal.resultado$
        .pipe(take(1))
          .subscribe((result: any)=> {
            if (result) {
              result['proyectoId'] = item.proyectoId;
              if (result.imagen !== '') {
                let imagenFile = result.imagenInput;
                this.imagen.subirImagen(imagenFile, this.nombreUsuario);

                if(urlOriginal !== '' && urlOriginal !== null){
                  this.imagen.deleteImage(urlOriginal);
                }
              }

              this.editarProyecto.emit(result);
            }
          })

    }

}
