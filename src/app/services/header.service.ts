import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Perfil } from '../models/perfil';
import { environment } from 'src/environments/environment';
 

@Injectable({
  providedIn: 'root'
})

//Pongo la url que defini en environment, que es la que usamos para trabajar con la base
export class HeaderService {
  //private usuarioServerUrl = "http://localhost:8080/perfil";
  //private usuarioServerUrl = "https://apibackportfolio.herokuapp.com/perfil";
  private usuarioServerUrl = environment.apiUrl + '/perfil';

  constructor(private http: HttpClient) { }

  //Defino los métodos 
  public getUser(nombreUsuario: string):Observable<Perfil>{
    return this.http.get<Perfil>(this.usuarioServerUrl + `/${nombreUsuario}`);
  }

  public updateUser(id: number, usuario : Perfil, nombreUsuario: String):Observable<Perfil>{
    return this.http.put<Perfil>(this.usuarioServerUrl + `/${nombreUsuario}/edit/${id}`, usuario);
  }
}
