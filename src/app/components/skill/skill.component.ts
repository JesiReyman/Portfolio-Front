import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FieldsForm } from 'src/app/models/fieldsForm';
import { Skill } from 'src/app/models/skill';
import { ModalsService } from 'src/app/services/modals.service';
import { SkillService } from 'src/app/services/skill.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  listaSkill: Skill[] = [];
  
  formFields: FieldsForm[] =
   [
      {
        nombre:"nombreSkill",
        type: "text",
        label: "Nombre de skill",
        value: " "
      }
      ,  {
        nombre: "nivelSkill",
        type: "number",
        label: "Nivel de skill",
        value: 0
      }
    ]   

  constructor(private skillService: SkillService, private modalsService: ModalsService) { }

  ngOnInit(): void {
    this.getSkillList();
  }

  getSkillList(){
    this.skillService.getAllSkill().subscribe({
      next: (response: Skill[])=> {
        this.listaSkill = response;
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    })
  }

  borrar(id: number){
    
    console.log("a skill component llega para borrar: " +  id);
    this.skillService.deleteSkill(id).subscribe({
      next:(response: void)=>{
        console.log(response);
        this.getSkillList();
      },
      error:(error: HttpErrorResponse)=> {
        alert(error.message);
      }
    })
  }

  openAddModal(fields: FieldsForm[]){
    let titulo = "Agregar skill: "
    this.modalsService.openAddModal(fields, titulo);

    this.modalsService.resultado$
      .pipe(take(1))
       .subscribe((result: any) => {

        if(result){
          result['id_Skill'] = 0;
          console.log("esto llego para agregarse: " + JSON.stringify(result));

          this.skillService.addSkill(result).subscribe({
            next:(response: Skill) => {
              this.listaSkill.push(response);
            },
            error:(error: HttpErrorResponse)=>{
              alert(error.message)
            } 
        });
        }
          
        })
    
  }

  editar(item: Skill){
    this.skillService.updateSkill(item.id_Skill, item)
      .subscribe({
        next:(response: Skill) => {
          console.log(response);
          this.getSkillList();
        },
        error:(error: HttpErrorResponse)=>{
          alert(error.message);
        }
      })
  }

}
