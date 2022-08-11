import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private skillServerUrl = "http://localhost:8080/skill";

  constructor(private http: HttpClient) { }

  //Defino los métodos 

  //El método que traer la lista de skills
  public getAllSkill(usuario: String):Observable<Skill[]>{
    return this.http.get<Skill[]>(this.skillServerUrl + `/${usuario}/lista`);
  }

  //El método que añade una skill, pasamos la direccion y además el parámetro skill que queremos añadir
  public addSkill(skill: Skill, usuario: String):Observable<Skill>{
    return this.http.post<Skill>(this.skillServerUrl+ `/${usuario}/add`, skill);
  }

  //El método que edita una skill
  public updateSkill(skillId: number, skill: Skill, usuario: String):Observable<Skill>{
    return this.http.put<Skill>(this.skillServerUrl+ `/${usuario}/edit/${skillId}`, skill);
  }

  //El método que elimina una skill
  public deleteSkill(skillId: number, usuario: String):Observable<void>{
    return this.http.delete<void>(this.skillServerUrl+ `/${usuario}/delete/${skillId}`);
  }
}
