import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  //Defino los métodos 

  //El método que traer la lista de educaciones
  public getAllEducacion():Observable<Educacion[]>{
    return this.http.get<Educacion[]>(`${this.apiServerUrl}/educacion/lista`);
  }

  //El método que añade una educacion, pasamos la direccion y además el parámetro educacion que queremos añadir
  public addEducacion(educacion: Educacion):Observable<Educacion>{
    return this.http.post<Educacion>(`${this.apiServerUrl}/educacion/add`, educacion);
  }

  //El método que edita una educacion
  public updateEducacion(educacionId: number, educacion: Educacion):Observable<Educacion>{
    return this.http.put<Educacion>(`${this.apiServerUrl}/educacion/${educacionId}/edit`, educacion);
  }

  //El método que elimina una educacion
  public deleteEducacion(educacionId: number):Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/educacion/delete/${educacionId}`);
  }

  
}
