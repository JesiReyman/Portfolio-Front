import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { EducationService } from 'src/app/services/education.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent implements OnInit {

  public listaEducacion: Educacion[] = [];
  educacionItem: Educacion = <Educacion>{};
  educacionBorrar: Educacion = <Educacion>{};

  constructor(private educacionService: EducationService) { }

  ngOnInit(): void {
    this.getListaEducacion();
  }

  getListaEducacion():void{
    this.educacionService.getAllEducacion().subscribe({
      next: (response: Educacion[]) => {
        this.listaEducacion = response;
    },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
  })
  }

  pasoAlModal(item: Educacion){
    this.educacionBorrar = item;
    console.log("2 recibo y voy a pasar al modal: " + JSON.stringify(this.educacionBorrar))
  }

  eliminarEducacion(educacion: Educacion): void{
    console.log("4 al componente educacion llego lo siguiente para eliminar: " + JSON.stringify(educacion));
    let id = educacion.id_Edu;
    this.educacionService.deleteEducacion(id).subscribe({
      next:(response: void)=>{
        console.log(response);
        this.getListaEducacion();
      },
      error:(error: HttpErrorResponse)=> {
        alert(error.message);
      }
    })
  }

}
