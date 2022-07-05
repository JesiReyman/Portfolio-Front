import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-circle-progress',
  templateUrl: './circle-progress.component.html',
  styleUrls: ['./circle-progress.component.css']
})
export class CircleProgressComponent implements OnInit {

  @Input() nivel: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
