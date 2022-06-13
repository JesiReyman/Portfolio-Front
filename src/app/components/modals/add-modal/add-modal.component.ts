import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Educacion } from 'src/app/models/educacion';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {
  @Output() onAddEducacion: EventEmitter<Educacion> = new EventEmitter();

  id_Edu : number = 0;
  tituloEdu: string = "";
  fechaEdu: number = NaN;
  descripcionEdu: string = ""; 
  

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(addForm: NgForm){
    
    const {id_Edu, tituloEdu, fechaEdu, descripcionEdu} = this
    const nuevaEducacion={id_Edu, tituloEdu, fechaEdu, descripcionEdu}
   
    this.onAddEducacion.emit(nuevaEducacion);
    addForm.resetForm();

    console.log("ya se emitio desde el modal: " + JSON.stringify(nuevaEducacion));
  }

}
