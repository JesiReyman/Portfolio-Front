import { FieldsForm } from "./fieldsForm";

export class Skill {
    id_Skill: number;
    nombreSkill: string;
    nivelSkill: number;

    constructor(id_Skill: number, nombreSkill: string, nivelSkill: number){
        this.id_Skill = id_Skill;
        this.nombreSkill = nombreSkill;
        this.nivelSkill = nivelSkill;
    }

    static  getFieldsForm(item?: Skill): FieldsForm[] {
        let formFields = [];
        if(item){
            formFields = [
            {
           nombre:"nombreSkill",
           type: "text",
           label: "Nombre de skill",
           value: item.nombreSkill
            }
            ,{
           nombre: "nivelSkill",
           type: "number",
           label: "Nivel de skill",
           value: item.nivelSkill
            }
            ] 
        } else {
            formFields = [
            {
          nombre:"nombreSkill",
          type: "text",
          label: "Nombre de skill",
          value: " "
            }
            ,  {
          nombre: "nivelSkill",
          type: "number",
          label: "Nivel de skill",
          value: 0
            }
            ]  
        }

        return formFields;
    }
}




    