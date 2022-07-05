import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { ModalsService } from 'src/app/services/modals.service';
import { take } from 'rxjs';


@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.css']
})
export class EducationItemComponent implements OnInit {

  @Input() educationItem: Educacion = <Educacion>{};
  @Output() aceptoBorrar: EventEmitter<number> = new EventEmitter();
  @Output() editarEducacion: EventEmitter<Educacion> = new EventEmitter();
  
  constructor(private servicioModal: ModalsService) { }

  ngOnInit(): void {
  }

  borrar(item: Educacion){
    console.log("abro el modal")
      let tituloBorrar = "Está por eliminar la siguiente educación: ";
      this.servicioModal.openModal(tituloBorrar, item.tituloEdu);
      
      this.servicioModal.mensaje$
      .pipe(take(1))
        .subscribe((result: boolean)=> {
          console.log("esto es justo antes del if");
           if(result){
             this.aceptoBorrar.emit(item.id_Edu);
            }
        })
    
  }

  editar(item: Educacion){
    let titulo = "Editar educación: "
      let fields = Educacion.getFieldsForm(item);

      this.servicioModal.openAddModal(fields, titulo);
      this.servicioModal.resultado$
        .pipe(take(1))
          .subscribe((result: any)=> {
            if(result){
             result['id_Edu'] = item.id_Edu;
             this.editarEducacion.emit(result);
            }
          })
    
  }

}
