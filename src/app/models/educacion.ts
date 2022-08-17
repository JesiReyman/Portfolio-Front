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
                  value: item.tituloEdu
                }
                ,  {
                  nombre: "anioInicio",
                  type: "number",
                  label: "Fecha de inicio",
                  value: item.anioInicio
                }
                , {
                  nombre:"descripcionEdu",
                  type: "text",
                  label: "Descripción",
                  value: item.descripcionEdu
                }
                , {
                  nombre:"estado",
                  type: "text",
                  label: "Estado",
                  value: item.estado
                }
              ]   
        } else{
            formFields = [
                {
                  nombre:"tituloEdu",
                  type: "text",
                  label: "Título de educación",
                  value: ""
                }
                ,  {
                  nombre: "anioInicio",
                  type: "number",
                  label: "Fecha de inicio",
                  value: null
                }
                , {
                  nombre:"descripcionEdu",
                  type: "text",
                  label: "Descripción",
                  value: ""
                }
                , {
                  nombre:"estado",
                  type: "text",
                  label: "Estado",
                  value: ""
                }
              ]   
        }
        return formFields;
    }
     
}
