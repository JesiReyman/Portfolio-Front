import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent implements OnInit {
  @Input() title: string = "";
  colorClass: string = "";
  icono: string = "";

  constructor() { }

  ngOnInit(): void {

    this.inicioBoton(this.title);
  }

  inicioBoton(title: string){
    if(title === "Edit"){
      this.colorClass = "btn-primary";
      this.icono = "fa fa-pencil";
    } else if (title === "Add"){
      this.colorClass = "btn-success";
      this.icono = "fa fa-circle-plus";
    } else if (title === "Delete"){
      this.colorClass = "btn-secondary";
      this.icono = "fa fa-trash-can";
    }


  }

}
