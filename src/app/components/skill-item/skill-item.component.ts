import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ModalsService } from 'src/app/services/modals.service';
import { take } from 'rxjs';
import { FieldsForm } from 'src/app/models/fieldsForm';


@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css']
})
export class SkillItemComponent implements OnInit {

  @Input() skillItem: Skill = <Skill>{};
  @Output() aceptoBorrar: EventEmitter<number> = new EventEmitter();
  @Output() editarSkill: EventEmitter<Skill> = new EventEmitter();
  
  constructor(public modalService: NgbModal, private servicioModal: ModalsService) {
  }

  ngOnInit(): void {
  }

  openModal(item: Skill){
    console.log("abro el modal")
      let tituloBorrar = "Está por eliminar el siguiente skill: ";
      this.servicioModal.openModal(tituloBorrar, item.nombreSkill);
     
      this.servicioModal.mensaje$
      .pipe(take(1))
        .subscribe((result: boolean)=> {
          console.log("esto es justo antes del if");
           if(result){
             this.aceptoBorrar.emit(item.id_Skill);
             console.log("se guardo en borrar: " + result + " y se manda a borrar: " + JSON.stringify(item));
            }
        })
    }

    openEditModal(item: Skill){
     console.log("selecciono lo siguiente para editar: " + JSON.stringify(item));
     let formFields: FieldsForm[] =
      [
       {
          nombre:"nombreSkill",
          type: "text",
          label: "Nombre de skill",
          value: item.nombreSkill
       }
       ,{
          nombre: "nivelSkill",
          type: "number",
          label: "Nivel de skill",
          value: item.nivelSkill
        }
      ]   

      let titulo = "Editar skill: "
      this.servicioModal.openAddModal(formFields, titulo);
      this.servicioModal.resultado$
        .pipe(take(1))
          .subscribe((result: any)=> {
            console.log("esto es justo antes del if");
            if(result){
             result['id_Skill'] = item.id_Skill;
             this.editarSkill.emit(result);
             console.log("el objeto editado finalemte es " + JSON.stringify(result));
            }
          })

    }

    
}


