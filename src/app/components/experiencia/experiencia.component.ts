import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/services/experiencia.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {

  public listaExperiencia: Experiencia[] = [];

  constructor(private experienciaService: ExperienciaService) { }

  ngOnInit(): void {
    this.getListaExperiencia();
  }

  getListaExperiencia(): void{
    this.experienciaService.getAllExperiencia().subscribe({
      next: (response: Experiencia[]) => {
        this.listaExperiencia = response;
        console.log("trae todas las experiencias")
    },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
  })
  }

}
