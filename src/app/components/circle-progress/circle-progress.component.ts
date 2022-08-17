import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill';


@Component({
  selector: 'app-circle-progress',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.css']
})
export class CircleProgressComponent implements OnInit {

  @Input() skill: Skill = {} as Skill;

  constructor() { }

  ngOnInit(): void {
  }

}
