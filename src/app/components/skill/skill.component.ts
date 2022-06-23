import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  listaSkill: Skill[] = [];
  emitirAlModal: Skill = <Skill>{};

  constructor(private skillService: SkillService) { }

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
    //this.emitirAlModal = item;
    console.log("a skill component llega para borrar: " +  id);
   /* this.skillService.deleteSkill(id).subscribe({
      next:(response: void)=>{
        console.log(response);
        this.getSkillList();
      },
      error:(error: HttpErrorResponse)=> {
        alert(error.message);
      }
    })*/
  }

}
