import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Experiencia } from '../models/experiencia';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  //Defino los métodos 

  //El método que traer la lista de experiencias
  public getAllExperiencia():Observable<Experiencia[]>{
    return this.http.get<Experiencia[]>(`${this.apiServerUrl}/experiencia/lista`);
  }

  //El método que añade una experiencia, pasamos la direccion y además el parámetro experiencia que queremos añadir
  public addExperiencia(experiencia: Experiencia):Observable<Experiencia>{
    return this.http.post<Experiencia>(`${this.apiServerUrl}/experiencia/add`, experiencia);
  }

  //El método que edita una experiencia
  public updateExperiencia(experienciaId: number, experiencia: Experiencia):Observable<Experiencia>{
    return this.http.put<Experiencia>(`${this.apiServerUrl}/experiencia/${experienciaId}/edit`, experiencia);
  }

  //El método que elimina una experiencia
  public deleteExperiencia(experienciaId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/experiencia/delete/${experienciaId}`);
  }
}
