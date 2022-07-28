export class FieldsForm {
    nombre: string;
    value: string | number | null;
    label: string;
    type: string;

    constructor(nombre: string, value: string | number | null, label: string, type: string){
        this.nombre = nombre;
        this.value = value;
        this.label = label;
        this.type = type; 
    }
}