import { FieldsForm } from "./fieldsForm";

export class Educacion {
    id_Edu: number;
    tituloEdu: string;
    anioInicio: number = new Date().getFullYear();
    descripcionEdu: string;
    estado: string;

    constructor(id_Edu: number, tituloEdu: string, anioInicio: number, descripcionEdu: string, estado: string){
        this.id_Edu = id_Edu;
        this.tituloEdu = tituloEdu;
        this.anioInicio = anioInicio;
        this.descripcionEdu = descripcionEdu;
        this.estado = estado;
    }

    static getFieldsForm(item?: Educacion): FieldsForm[]{
        let formFields = [];
        if(item){
            formFields = [
                {
                  nombre:"tituloEdu",
                  type: "text",
                  label: "Título de educación",
                  value: item.tituloEdu,
                  required: true
                }
                ,  {
                  nombre: "anioInicio",
                  type: "number",
                  label: "Año de inicio",
                  value: item.anioInicio,
                  required: true
                }
                , {
                  nombre:"descripcionEdu",
                  type: "text",
                  label: "Descripción",
                  value: item.descripcionEdu,
                  required: true
                }
                , {
                  nombre:"estado",
                  type: "text",
                  label: "Estado",
                  value: item.estado,
                  required: true
                }
              ]   
        } else{
            formFields = [
                {
                  nombre:"tituloEdu",
                  type: "text",
                  label: "Título de educación",
                  value: "",
                  required: true
                }
                ,  {
                  nombre: "anioInicio",
                  type: "number",
                  label: "Año de inicio",
                  value: null,
                  required: true
                }
                , {
                  nombre:"descripcionEdu",
                  type: "text",
                  label: "Descripción",
                  value: "",
                  required: true
                }
                , {
                  nombre:"estado",
                  type: "text",
                  label: "Estado",
                  value: "",
                  required: true
                }
              ]   
        }
        return formFields;
    }
     
}
