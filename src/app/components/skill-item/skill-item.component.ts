import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ModalsService } from 'src/app/services/modals.service';
import { take } from 'rxjs';

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

  openDeleteModal(item: Skill){
    console.log("abro el modal")
      let tituloBorrar = "Está por eliminar el siguiente skill: ";
      this.servicioModal.openDeleteModal(tituloBorrar, item.nombreSkill);
     
      this.servicioModal.delete$
      .pipe(take(1))
        .subscribe((result: boolean)=> {
           if(result){
             this.aceptoBorrar.emit(item.id_Skill);
             
            }
        })
    }

    openEditModal(item: Skill){
     
     let titulo = "Editar skill: "
     let fields = Skill.getFieldsForm(item);
      

      this.servicioModal.openAddModal(fields, titulo);
      this.servicioModal.resultado$
        .pipe(take(1))
          .subscribe((result: any)=> {
            if(result){
             result['id_Skill'] = item.id_Skill;
             this.editarSkill.emit(result);
            }
          })

    }

    
}


