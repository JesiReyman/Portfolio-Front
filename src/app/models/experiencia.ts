import { FieldsForm } from "./fieldsForm";

export class Experiencia{
    experienciaId: number;
    tituloExperiencia: string;
    anioInicio: number = new Date().getFullYear();
    anioFin: number = new Date().getFullYear();
    actualidad: boolean;
    descripcionExperiencia: string;

    constructor(experienciaId: number, tituloExperiencia: string, anioInicio: number, anioFin: number, actualidad: boolean, descripcionExperiencia: string){
        this.experienciaId = experienciaId;
        this.tituloExperiencia = tituloExperiencia;
        this.anioInicio = anioInicio;
        this.descripcionExperiencia = descripcionExperiencia;
        this.anioFin = anioFin;
        this.actualidad = actualidad;
    }

    static getFieldsForm(item?: Experiencia): FieldsForm[]{
        let formFields = [];
        if(item){
            formFields = [
                {
                  nombre:"tituloExperiencia",
                  type: "text",
                  label: "Título de la experiencia",
                  value: item.tituloExperiencia,
                  required: true
                }
                ,  {
                  nombre: "anioInicio",
                  type: "number",
                  label: "Año de inicio de la actividad",
                  value: item.anioInicio,
                  required: true
                }
                ,  {
                  nombre: "anioFin",
                  type: "number",
                  label: "Año de finalización de la actividad",
                  value: item.anioFin,
                  required: true
                }
                ,  {
                  nombre: "actualidad",
                  type: "checkbox",
                  label: "En la actualidad",
                  value: item.actualidad,
                  required: false
                }
                , {
                  nombre:"descripcionExperiencia",
                  type: "text",
                  label: "Descripción",
                  value: item.descripcionExperiencia,
                  required: true
                }
              ]   
        } else{
            formFields = [
                {
                  nombre:"tituloExperiencia",
                  type: "text",
                  label: "Título de la experiencia",
                  value: "",
                  required: true

                }
                ,  {
                  nombre: "anioInicio",
                  type: "number",
                  label: "Año de inicio de la actividad",
                  value: null,
                  required: true
                }
                ,  {
                  nombre: "anioFin",
                  type: "number",
                  label: "Año de finalización de la actividad",
                  value: "",
                  required: true
                }
                ,  {
                  nombre: "actualidad",
                  type: "checkbox",
                  label: "En la actualidad",
                  value: false,
                  required: false
                }
                , {
                  nombre:"descripcionExperiencia",
                  type: "text",
                  label: "Descripción",
                  value: "",
                  required: true
                }
              ]   
        }
        return formFields;
    }
     
}