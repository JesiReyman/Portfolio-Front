import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
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
  formulario: UntypedFormGroup = {} as UntypedFormGroup;
      
  group: any = {};
             

  constructor(public activeModal: NgbActiveModal, private readonly changeDetectorRef: ChangeDetectorRef) {}
    
  ngOnInit(): void {

    console.log("Llego al modal los campos para el formulario: " + JSON.stringify(this.formFields))

    this.formFields.forEach((question: { nombre: string; value: any; }) => {
      this.group[question.nombre] =  new UntypedFormControl(question.value || '');
      console.log(question.nombre);
      console.log(question.nombre.includes('descripcion'));
    });

    this.formulario = new UntypedFormGroup(this.group);

  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  tieneDescripcion(nombrePropidad: string){
    return nombrePropidad.includes('descripcion');
  }

}
