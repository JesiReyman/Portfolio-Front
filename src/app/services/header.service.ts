import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/usuario';
 

@Injectable({
  providedIn: 'root'
})

//Pongo la url que defini en environment, que es la que usamos para trabajar con la base
export class HeaderService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  //Defino los métodos 
  public getUser():Observable<Usuario>{
    return this.http.get<Usuario>(`${this.apiServerUrl}/usuario/1`);
  }

  public updateUser(usuario : Usuario):Observable<Usuario>{
    return this.http.put<Usuario>(`${this.apiServerUrl}/usuario/edit`, usuario);
  }
}
