import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from 'src/app/models/skill';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css']
})
export class SkillItemComponent implements OnInit {

  @Input() skillItem: Skill = <Skill>{};
  @Output() mandarSkill: EventEmitter<Skill> = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {
  }

  seleccion(item: Skill){
    this.mandarSkill.emit(item);
    console.log("Estoy seleccionando el siguiente skill: " + JSON.stringify(item));
    
    }

    
}


