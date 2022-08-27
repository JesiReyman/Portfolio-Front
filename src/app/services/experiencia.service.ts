import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private experienciaServerUrl = "http://localhost:8080/experiencia";
  //private experienciaServerUrl = "https://apibackportfolio.herokuapp.com/experiencia";

  constructor(private http: HttpClient) { }

  //Defino los métodos 

  //El método que traer la lista de experiencias
  public getAllExperiencia(usuario: String):Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(this.experienciaServerUrl + `/${usuario}/lista`);
  }

  //El método que añade una experiencia, pasamos la direccion y además el parámetro experiencia que queremos añadir
  public addExperiencia(experiencia: Experiencia, usuario: String):Observable<Experiencia>{
    return this.http.post<Experiencia>(this.experienciaServerUrl + `/${usuario}/add`, experiencia);
  }

  //El método que edita una experiencia
  public updateExperiencia(experienciaId: number, experiencia: Experiencia, usuario: String):Observable<Experiencia>{
    return this.http.put<Experiencia>(this.experienciaServerUrl + `/${usuario}/edit/${experienciaId}`, experiencia);
  }

  //El método que elimina una experiencia
  public deleteExperiencia(experienciaId: number, usuario: String):Observable<void>{
    return this.http.delete<void>(this.experienciaServerUrl + `/${usuario}/delete/${experienciaId}`);
  }
}
