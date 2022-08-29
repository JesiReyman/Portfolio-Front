import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //private authUrl = "http://localhost:8080/auth"; 
  //private authUrl = "https://apibackportfolio.herokuapp.com/auth"; 
  private authUrl = environment.apiUrl + '/auth';

  constructor(private http: HttpClient) { }

  public nuevo(nuevoUsuario: NuevoUsuario):Observable<any>{
    return this.http.post<any>(this.authUrl + '/nuevo', nuevoUsuario );
  }

  public login(loginUsuario: LoginUsuario):Observable<JwtDto>{
    return this.http.post<JwtDto>(this.authUrl + '/login', loginUsuario );
  }
}
