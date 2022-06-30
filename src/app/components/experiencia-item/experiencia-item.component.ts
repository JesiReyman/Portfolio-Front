import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Experiencia } from 'src/app/models/experiencia';
import { ModalsService } from 'src/app/services/modals.service';
import { take } from 'rxjs'
import { FieldsForm } from 'src/app/models/fieldsForm';
 

@Component({
  selector: 'app-experiencia-item',
  templateUrl: './experiencia-item.component.html',
  styleUrls: ['./experiencia-item.component.css']
})
export class ExperienciaItemComponent implements OnInit {
  @Input() experienciaItem : Experiencia = <Experiencia>{};
  @Output() aceptoBorrar: EventEmitter<number> = new EventEmitter();
  @Output() editarExperiencia: EventEmitter<Experiencia> = new EventEmitter();
  
  
  
  constructor(public modalService: NgbModal, private servicioModal: ModalsService) {}

  ngOnInit(): void {
  }

  
     openModal(item: Experiencia){
  
      console.log("abro el modal")
      let tituloBorrar = "Está por eliminar la siguiente experiencia: ";
      this.servicioModal.openModal(tituloBorrar, item.tituloExperiencia);
      
      this.servicioModal.mensaje$
      .pipe(take(1))
        .subscribe((result: boolean)=> {
          console.log("esto es justo antes del if");
           if(result){
             this.aceptoBorrar.emit(item.id_Experiencia);
             console.log("se guardo en borrar: " + result + " y se manda a borrar: " + JSON.stringify(item));
            }
        })
    }

    editar(item: Experiencia){
      console.log("selecciono lo siguiente para editar: " + JSON.stringify(item));
     let formFields: FieldsForm[] =
      [
        {
          nombre:"tituloExperiencia",
          type: "text",
          label: "Título de la experiencia",
          value: item.tituloExperiencia
        }
        ,  {
          nombre: "fechaExperiencia",
          type: "number",
          label: "Feha de la experiencia",
          value: item.fechaExperiencia
        }
        , {
          nombre:"descripcionExperiencia",
          type: "text",
          label: "Descripción",
          value: item.descripcionExperiencia
        }
      ]   

      let titulo = "Editar experiencia: "
      this.servicioModal.openAddModal(formFields, titulo);
      this.servicioModal.resultado$
        .pipe(take(1))
          .subscribe((result: any)=> {
            console.log("esto es justo antes del if");
            if(result){
             result['id_Experiencia'] = item.id_Experiencia;
             this.editarExperiencia.emit(result);
             console.log("el objeto editado finalemte es " + JSON.stringify(result));
            }
          })
    }

}
