import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Editable } from 'src/app/models/editable';
import { Educacion } from 'src/app/models/educacion';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  @Input() educacionIn: Educacion = <Educacion>{};
  @Output() onEditEducacion: EventEmitter<Educacion> = new EventEmitter();
  educacionEditada: Educacion = <Educacion>{};

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(editForm: NgForm){
    editForm.value["id_Edu"] = this.educacionIn.id_Edu ;
    this.educacionEditada = editForm.value;
    this.onEditEducacion.emit(this.educacionEditada)
    console.log("ya se emitio desde el modal la educacion editada: " + JSON.stringify(this.educacionEditada));
  
  }

}
