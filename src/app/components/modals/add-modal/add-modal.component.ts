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
  nuevaEducacion: Educacion = <Educacion>{};
  
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(addForm: NgForm){
    addForm.value["id_Edu"] = 0;
    this.nuevaEducacion = addForm.value
    
    console.log("ya se emitio desde el modal: " + JSON.stringify(addForm.value));
    this.onAddEducacion.emit(this.nuevaEducacion);
    addForm.resetForm();

  }

}
