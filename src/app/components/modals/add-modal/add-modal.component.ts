import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FieldsForm } from 'src/app/models/fieldsForm';


@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit, AfterViewChecked {
  @Input() formFields: FieldsForm[] = [];
  @Input() titulo: string = "";
  formulario: FormGroup = {} as FormGroup;
      
  group: any = {};
             

  constructor(public activeModal: NgbActiveModal, private readonly changeDetectorRef: ChangeDetectorRef) {}
    
  ngOnInit(): void {

    console.log("Llego al modal los campos para el formulario: " + JSON.stringify(this.formFields))

    this.formFields.forEach((question: { nombre: string; value: any; }) => {
      this.group[question.nombre] =  new FormControl(question.value || '');
      console.log(question.nombre);
      console.log(question.nombre.includes('descripcion'));
    });

    this.formulario = new FormGroup(this.group);

  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

}
