import { FieldsForm } from "./fieldsForm";

export class Experiencia{
    id_Experiencia: number;
    tituloExperiencia: string;
    fechaExperiencia: number;
    descripcionExperiencia: string;

    constructor(id_Experiencia: number, tituloExperiencia: string, fechaExperiencia: number, descripcionExperiencia: string){
        this.id_Experiencia = id_Experiencia;
        this.tituloExperiencia = tituloExperiencia;
        this.fechaExperiencia = fechaExperiencia;
        this.descripcionExperiencia = descripcionExperiencia;
    }

    static getFieldsForm(item?: Experiencia): FieldsForm[]{
        let formFields = [];
        if(item){
            formFields = [
                {
                  nombre:"tituloExperiencia",
                  type: "text",
                  label: "Título de la experiencia",
                  value: item.tituloExperiencia
                }
                ,  {
                  nombre: "fechaExperiencia",
                  type: "number",
                  label: "Fecha de la experiencia",
                  value: item.fechaExperiencia
                }
                , {
                  nombre:"descripcionExperiencia",
                  type: "text",
                  label: "Descripción",
                  value: item.descripcionExperiencia
                }
              ]   
        } else{
            formFields = [
                {
                  nombre:"tituloExperiencia",
                  type: "text",
                  label: "Título de la experiencia",
                  value: " "
                }
                ,  {
                  nombre: "fechaExperiencia",
                  type: "number",
                  label: "Feha de la experiencia",
                  value: null
                }
                , {
                  nombre:"descripcionExperiencia",
                  type: "text",
                  label: "Descripción",
                  value: " "
                }
              ]   
        }
        return formFields;
    }
     
}