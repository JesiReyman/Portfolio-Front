import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyecto } from 'src/app/models/proyecto';
import { ModalsService } from 'src/app/services/modals.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-proyecto-item',
  templateUrl: './proyecto-item.component.html',
  styleUrls: ['./proyecto-item.component.css']
})
export class ProyectoItemComponent implements OnInit {

  @Input() proyectoItem: Proyecto = <Proyecto>{};
  @Output() aceptoBorrar: EventEmitter<number> = new EventEmitter();
  @Output() editarProyecto: EventEmitter<Proyecto> = new EventEmitter();

  constructor(public modalService: NgbModal, private servicioModal: ModalsService) { }

  ngOnInit(): void {
  }

  openDeleteModal(item: Proyecto){
    console.log("abro el modal")
      let tituloBorrar = "Está por eliminar el siguiente Proyecto: ";
      this.servicioModal.openDeleteModal(tituloBorrar, item.titulo);
     
      this.servicioModal.delete$
      .pipe(take(1))
        .subscribe((result: boolean)=> {
           if(result){
             this.aceptoBorrar.emit(item.proyectoId);
             
            }
        })
    }

    openEditModal(item: Proyecto){
     
     let titulo = "Editar Proyecto: "
     let fields = Proyecto.getFieldsForm(item);
      

      this.servicioModal.openAddModal(fields, titulo);
      this.servicioModal.resultado$
        .pipe(take(1))
          .subscribe((result: any)=> {
            if(result){
             result['proyectoId'] = item.proyectoId;
             this.editarProyecto.emit(result);
            }
          })

    }

}
