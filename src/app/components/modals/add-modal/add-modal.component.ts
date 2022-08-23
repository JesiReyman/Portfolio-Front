import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  estado: string[] = [];
  //field: FieldsForm = {} as FieldsForm;
      
  group: any = {};
             

  constructor(public activeModal: NgbActiveModal, private readonly changeDetectorRef: ChangeDetectorRef) {}
    
  ngOnInit(): void {

    console.log("Llego al modal los campos para el formulario: " + JSON.stringify(this.formFields))
    this.estado = ["Finalizado", "En Curso", "Incompleto"];

    this.formFields.forEach((question: { nombre: string; value: string | number | null | Date | boolean; required: boolean}) => {
      this.group[question.nombre] = question.required ? new FormControl(question.value, Validators.required) : new FormControl(question.value) ;
      console.log(question.nombre);
      console.log(question.nombre.includes('descripcion'));
    });

    this.formulario = new FormGroup(this.group);

    console.log(this.formulario);

    
    this.formulario.get('actualidad')?.valueChanges
      .subscribe({
        next: (value) => {
          console.log("aca leyo el checkbox: " + value);
          if(value){
            this.formulario.get('anioFin')?.disable();
          } if(!value){
            this.formulario.get('anioFin')?.enable();
          }
        }
      })

  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  tieneDescripcion(nombrePropidad: string){
    return nombrePropidad.includes('descripcion');
  }

  onCheckboxValueChange(evento: any){
    let valor = evento.target.checked;
    console.log("el valor del checkbox es: " + valor )

    if(valor){
      console.log("esto se guarda en actualidad: " + valor);
      this.formulario.patchValue({'actualidad': valor});

    }else {
      console.log("esto deberia m,ostrarse si no esta tildado: " + valor);
      this.formulario.patchValue({'actualidad': valor});
    }

  }

  isValid(nombreDelCampo: string) { return this.formulario.controls[nombreDelCampo].valid; }

  onFormSubmit(formulario: any){
    console.log("esttos son los valores del formulario: " + JSON.stringify(formulario))
    
  }
}
