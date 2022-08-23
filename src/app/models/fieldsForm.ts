export class FieldsForm {
    nombre: string;
    value: string | number | null | Date | boolean;
    label: string;
    type: string;
    required: boolean;

    constructor(nombre: string, value: string | number | null | Date | boolean, label: string, type: string, required: boolean){
        this.nombre = nombre;
        this.value = value;
        this.label = label;
        this.type = type; 
        this.required = required;
    }
}