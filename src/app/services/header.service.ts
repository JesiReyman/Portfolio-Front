import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Perfil } from '../models/perfil';
 

@Injectable({
  providedIn: 'root'
})

//Pongo la url que defini en environment, que es la que usamos para trabajar con la base
export class HeaderService {
  private usuarioServerUrl = "http://localhost:8080/perfil";

  constructor(private http: HttpClient) { }

  //Defino los métodos 
  public getUser(nombreUsuario: string):Observable<Perfil>{
    return this.http.get<Perfil>(this.usuarioServerUrl + `/${nombreUsuario}`);
  }

  public updateUser(usuario : Perfil):Observable<Perfil>{
    return this.http.put<Perfil>(this.usuarioServerUrl + '/edit', usuario);
  }
}
