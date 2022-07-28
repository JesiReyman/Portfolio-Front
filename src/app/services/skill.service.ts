import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Skill } from '../models/skill';

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private skillServerUrl = environment.apiBaseUrl + '/skill';

  constructor(private http: HttpClient) { }

  //Defino los métodos 

  //El método que traer la lista de skills
  public getAllSkill():Observable<Skill[]>{
    return this.http.get<Skill[]>(this.skillServerUrl + '/lista');
  }

  //El método que añade una skill, pasamos la direccion y además el parámetro skill que queremos añadir
  public addSkill(skill: Skill):Observable<Skill>{
    return this.http.post<Skill>(this.skillServerUrl+ '/add', skill);
  }

  //El método que edita una skill
  public updateSkill(skillId: number, skill: Skill):Observable<Skill>{
    return this.http.put<Skill>(this.skillServerUrl+ `/${skillId}/edit`, skill);
  }

  //El método que elimina una skill
  public deleteSkill(skillId: number):Observable<void>{
    return this.http.delete<void>(this.skillServerUrl+ `/delete/${skillId}`);
  }
}
