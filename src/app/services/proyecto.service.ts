import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proyecto } from '../models/proyecto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  //private proyectoServerUrl = "http://localhost:8080/proyecto";
  //private proyectoServerUrl = "https://apibackportfolio.herokuapp.com/proyecto";
  private proyectoServerUrl = environment.apiUrl + '/proyecto';

  constructor(private http: HttpClient) { }

  public getAllProyecto(usuario: String):Observable<Proyecto[]>{
    return this.http.get<Proyecto[]>(this.proyectoServerUrl + `/${usuario}/lista`);
  }

  public addProyecto(proyecto: Proyecto, usuario: String):Observable<Proyecto>{
    return this.http.post<Proyecto>(this.proyectoServerUrl+ `/${usuario}/add`, proyecto);
  }

  public updateProyecto(proyectoId: number, proyecto: Proyecto, usuario: String):Observable<Proyecto>{
    return this.http.put<Proyecto>(this.proyectoServerUrl+ `/${usuario}/edit/${proyectoId}`, proyecto);
  }

  public deleteProyecto(proyectoId: number, usuario: String):Observable<void>{
    return this.http.delete<void>(this.proyectoServerUrl+ `/${usuario}/delete/${proyectoId}`);
  }

}
