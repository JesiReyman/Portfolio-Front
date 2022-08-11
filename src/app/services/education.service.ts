import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Educacion } from '../models/educacion';

@Injectable({
  providedIn: 'root'
})
export class EducationService {

  private educacionServerUrl = "http://localhost:8080/educacion";

  constructor(private http: HttpClient) { }

  //Defino los métodos 

  //El método que traer la lista de educaciones
  public getAllEducacion(usuario: String):Observable<Educacion[]>{
    return this.http.get<Educacion[]>(this.educacionServerUrl + `/${usuario}/lista`);
  }

  //El método que añade una educacion, pasamos la direccion y además el parámetro educacion que queremos añadir
  public addEducacion(educacion: Educacion, usuario: String):Observable<Educacion>{
    return this.http.post<Educacion>(this.educacionServerUrl + `/${usuario}/add`, educacion);
  }

  //El método que edita una educacion
  public updateEducacion(educacionId: number, educacion: Educacion, usuario: String):Observable<Educacion>{
    return this.http.put<Educacion>(this.educacionServerUrl + `/${usuario}/edit/${educacionId}`, educacion);
  }

  //El método que elimina una educacion
  public deleteEducacion(educacionId: number, usuario: String):Observable<void>{
    return this.http.delete<void>(this.educacionServerUrl + `/${usuario}/delete/${educacionId}`);
  }

  
}
