import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { ModalsService } from 'src/app/services/modals.service';
import { SkillService } from 'src/app/services/skill.service';
import { take } from 'rxjs';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  listaSkill: Skill[] = [];
   
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

  openAddModal(){
    let titulo = "Agregar skill: ";
    let campos = Skill.getFieldsForm();
    this.modalsService.openAddModal(campos, titulo);

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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listaSkill, event.previousIndex, event.currentIndex);
  }

}
