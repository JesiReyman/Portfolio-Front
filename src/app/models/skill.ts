import { FieldsForm } from "./fieldsForm";

export class Skill {
    skillId: number;
    nombreSkill: string;
    nivelSkill: number;

    constructor(skillId: number, nombreSkill: string, nivelSkill: number){
        this.skillId = skillId;
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
           value: item.nombreSkill,
           required: true
            }
            ,{
           nombre: "nivelSkill",
           type: "number",
           label: "Nivel de skill",
           value: item.nivelSkill,
           required: true
            }
            ] 
        } else {
            formFields = [
            {
          nombre:"nombreSkill",
          type: "text",
          label: "Nombre de skill",
          value: "",
          required: true
            }
            ,  {
          nombre: "nivelSkill",
          type: "number",
          label: "Nivel de skill",
          value: 0,
          required: true
            }
            ]  
        }

        return formFields;
    }
}




    