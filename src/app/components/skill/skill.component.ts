import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { ModalsService } from 'src/app/services/modals.service';
import { SkillService } from 'src/app/services/skill.service';
import { take } from 'rxjs';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent implements OnInit {
  listaSkill: Skill[] = [];
  @Input() nombreUsuario: string = "";

  constructor(
    private skillService: SkillService,
    private modalsService: ModalsService
  ) {}

  ngOnInit(): void {
    this.getSkillList(this.nombreUsuario);
  }

  getSkillList(nombreUsuario: string) {
    this.skillService.getAllSkill(nombreUsuario).subscribe({
      next: (response: Skill[]) => {
        this.listaSkill = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  borrar(id: number) {
    this.skillService.deleteSkill(id, this.nombreUsuario).subscribe({
      next: () => {
        alert("Se eliminó correctamente");
        this.getSkillList(this.nombreUsuario);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  openAddModal() {
    let titulo = 'Agregar skill: ';
    let campos = Skill.getFieldsForm();
    this.modalsService.openAddModal(campos, titulo);

    this.modalsService.resultado$.pipe(take(1)).subscribe((result: any) => {
      if (result) {
        result['skillId'] = 0;
        
        this.skillService.addSkill(result, this.nombreUsuario).subscribe({
          next: () => {
            alert("Se agregó correctamente");
            this.getSkillList(this.nombreUsuario);
          },
          error: (error: HttpErrorResponse) => {
            alert(error.message);
          },
        });
      }
    });
  }

  editar(item: Skill) {
    this.skillService.updateSkill(item.skillId, item, this.nombreUsuario).subscribe({
      next: (response: Skill) => {
        alert("Se guardó correctamente");
        this.getSkillList(this.nombreUsuario);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  drop(event: CdkDragDrop<any>) {
    this.listaSkill[event.previousContainer.data.index] = event.container.data.item;
    this.listaSkill[event.container.data.index] = event.previousContainer.data.item;
  }

  
}
