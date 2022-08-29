import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Skill } from 'src/app/models/skill';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ModalsService } from 'src/app/services/modals.service';
import { Subscription, take } from 'rxjs';
import { TokenService } from 'src/app/services/token.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css'],
})
export class SkillItemComponent implements OnInit {
  @Input() skillItem: Skill = <Skill>{};
  @Output() aceptoBorrar: EventEmitter<number> = new EventEmitter();
  @Output() editarSkill: EventEmitter<Skill> = new EventEmitter();
  isAdmin: boolean = false;
  isLogged: boolean = false;
  subscription?: Subscription;
  esUsuarioValido: boolean = false;
  dragDesahabilitado: boolean = true;

  constructor(
    public modalService: NgbModal,
    private servicioModal: ModalsService,
    private tokenService: TokenService,
    private route: ActivatedRoute
  ) {
    this.subscription = this.tokenService.logged$.subscribe({
      next: (estaLogueado) => {
       
        this.isLogged = estaLogueado;
        if (estaLogueado) {
          this.isAdmin = this.tokenService.isAdmin();
          const currentUserName = this.tokenService.getUserName();
          const currentRouteName = this.route.snapshot.params['nombreUsuario'];
          this.esUsuarioValido = this.checkUsuario(currentUserName, currentRouteName);
        } 
        if(this.isLogged && (this.isAdmin || this.esUsuarioValido)){
          this.dragDesahabilitado = false;
        } else{
          this.dragDesahabilitado = true;
        }
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  ngOnInit(): void {}

  openDeleteModal(item: Skill) {
    let tituloBorrar = 'Está por eliminar el siguiente skill: ';
    this.servicioModal.openDeleteModal(tituloBorrar, item.nombreSkill);

    this.servicioModal.delete$.pipe(take(1)).subscribe((result: boolean) => {
      if (result) {
        this.aceptoBorrar.emit(item.skillId);
      }
    });
  }

  openEditModal(item: Skill) {
    let titulo = 'Editar skill: ';
    let fields = Skill.getFieldsForm(item);

    this.servicioModal.openAddModal(fields, titulo);
    this.servicioModal.resultado$.pipe(take(1)).subscribe((result: any) => {
      if (result) {
        result['skillId'] = item.skillId;
        this.editarSkill.emit(result);
      }
    });
  }

  checkUsuario(usuarioLogueado: string, usuarioRuta: string): boolean{
    if(usuarioLogueado==usuarioRuta){
      this.esUsuarioValido = true;
    }
    return this.esUsuarioValido;
  }
}


