import { AfterViewChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FieldsForm } from 'src/app/models/fieldsForm';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css'],
})
export class AddModalComponent implements OnInit, AfterViewChecked {
  @Input() formFields: FieldsForm[] = [];
  @Input() titulo: string = '';
  formulario: FormGroup = {} as FormGroup;
  estado: string[] = ['Finalizado', 'En Curso', 'Incompleto'];

  group: any = {};
  imagenSeleccionada: any = null;

  constructor(
    public activeModal: NgbActiveModal,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    
    this.formFields.forEach(
      (question: {
        nombre: string;
        value: string | number | null | Date | boolean;
        required: boolean;
      }) => {
        this.group[question.nombre] = question.required
          ? new FormControl(question.value, Validators.required)
          : new FormControl(question.value);
      }
    );

    this.formulario = new FormGroup(this.group);

    this.formulario.get('actualidad')?.valueChanges.subscribe({
      next: (value) => {
        if (value) {
          this.formulario.get('anioFin')?.disable();
        }
        if (!value) {
          this.formulario.get('anioFin')?.enable();
        }
      },
    });
  }

  ngAfterViewChecked(): void {
    this.changeDetectorRef.detectChanges();
  }

  tieneDescripcion(nombrePropidad: string) {
    return nombrePropidad.includes('descripcion');
  }

  onCheckboxValueChange(evento: any) {
    let valor = evento.target.checked;

    if (valor) {
      this.formulario.patchValue({ actualidad: valor });
    } else {
      this.formulario.patchValue({ actualidad: valor });
    }
  }

  isValid(nombreDelCampo: string) {
    return this.formulario.controls[nombreDelCampo].valid;
  }

  subirArchivo(evento: any, nombreDelCampo: string) {
    let campoInput = nombreDelCampo + 'Input';

    if (evento.target.files.length > 0) {
      this.imagenSeleccionada = evento.target.files[0];
      this.formulario.patchValue({ [campoInput]: this.imagenSeleccionada });
    }
  }
}
