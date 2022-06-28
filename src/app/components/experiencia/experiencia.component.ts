import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { FieldsForm } from 'src/app/models/fieldsForm';
import { ExperienciaService } from 'src/app/services/experiencia.service';
import { ModalsService } from 'src/app/services/modals.service';


@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  public listaExperiencia: Experiencia[] = [];

  formFields: FieldsForm[] =
   [
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
        value: 0
      }
      , {
        nombre:"descripcionExperiencia",
        type: "text",
        label: "Descripción",
        value: " "
      }
    ]   

  constructor(private experienciaService: ExperienciaService, private modalsService: ModalsService) { }

  ngOnInit(): void {
    this.getListaExperiencia();
  }

  getListaExperiencia(): void{
    this.experienciaService.getAllExperiencia().subscribe({
      next: (response: Experiencia[]) => {
        this.listaExperiencia = response;
    },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
  })
  }

  delete(experienciaId: number){
   /* console.log("voy a borrar la siguiente experiencia: " + JSON.stringify(experienciaId));
    this.experienciaService.deleteExperiencia(experienciaId).subscribe({
      next:(response: void)=>{
        console.log(response);
        this.getListaExperiencia();
      },
      error:(error: HttpErrorResponse)=> {
        alert(error.message);
      }
    })*/
  }


  openAddModal(fields: FieldsForm[]){
    let titulo = "Agregar experiencia:";
    this.modalsService.openAddModal(fields, titulo);
  }

}
