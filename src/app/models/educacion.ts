import { FieldsForm } from "./fieldsForm";

export class Educacion {
    id_Edu: number;
    tituloEdu: string;
    fechaEdu: number;
    descripcionEdu: string;

    constructor(id_Edu: number, tituloEdu: string, fechaEdu: number, descripcionEdu: string){
        this.id_Edu = id_Edu;
        this.tituloEdu = tituloEdu;
        this.fechaEdu = fechaEdu;
        this.descripcionEdu = descripcionEdu;
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
                  nombre: "fechaEdu",
                  type: "number",
                  label: "Feha de la educación",
                  value: item.fechaEdu
                }
                , {
                  nombre:"descripcionEdu",
                  type: "text",
                  label: "Descripción",
                  value: item.descripcionEdu
                }
              ]   
        } else{
            formFields = [
                {
                  nombre:"tituloEdu",
                  type: "text",
                  label: "Título de educación",
                  value: " "
                }
                ,  {
                  nombre: "fechaEdu",
                  type: "number",
                  label: "Feha de la educación",
                  value: 0
                }
                , {
                  nombre:"descripcionEdu",
                  type: "text",
                  label: "Descripción",
                  value: " "
                }
              ]   
        }
        return formFields;
    }
     
}
