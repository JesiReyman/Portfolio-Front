import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill';

@Component({
  selector: 'app-delete-skill',
  templateUrl: './delete-skill.component.html',
  styleUrls: ['./delete-skill.component.css']
})
export class DeleteSkillComponent implements OnInit {

  @Input() skillIn:  Skill = <Skill>{};
  constructor() { }

  ngOnInit(): void {
  }

  tipo(item: Skill){
    console.log("al modal DELETE SKILL llego : " + JSON.stringify(item));
  }

}
