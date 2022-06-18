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

  mandoAlModal(item: Skill){
    this.emitirAlModal = item;
    console.log("desde skill paso al modal: " +  JSON.stringify(this.emitirAlModal));
  }

}
