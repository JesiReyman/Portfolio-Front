import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil';
import { HeaderService } from 'src/app/services/header.service';
import { ModalsService } from 'src/app/services/modals.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //Inicializo usuario y editUsuario, de tipo usuario, o pueden ser indefinidos
  public usuario : Perfil = {} as Perfil;
  //public editUsuario : Perfil | undefined;
  @Input() nombreUsuario: string = "";

  //En el constructor instancio el servicio para poder usar sus métodos
  constructor(private headerService: HeaderService, private servicioModal: ModalsService) { }

  //Al inicio quiero que me traiga al usuario
  ngOnInit(): void {
    this.getUser(this.nombreUsuario);
  }

  //Defino al método getUser que a su vez llama al método de servicio. La repuesta de tipo Usuario
  //se guarda en usuario (que lo defino arriba), sino dará un mensaje de error
  public getUser(nombreUsuario: string):void{
    this.headerService.getUser(nombreUsuario).subscribe({
      next: (response: Perfil) => {
        this.usuario = response;
        console.log("el perfil cargado es el siguiente: " + JSON.stringify(this.usuario))
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    });
  }

  editar(item: Perfil){
    let titulo = "Editar perfil: "
      let fields = Perfil.getFieldsForm(item);

      this.servicioModal.openAddModal(fields, titulo);
      this.servicioModal.resultado$
        .pipe(take(1))
          .subscribe((result: any)=> {
            if(result){
             result['id'] = item.id;
             console.log("voy a mandar a updatear: " + JSON.stringify(result));
             this.headerService.updateUser(item.id, result, this.nombreUsuario).subscribe({
              next: (response: Perfil) => {
                console.log("esto es despues que se llama al servicio header: " + JSON.stringify(response));
                this.getUser(this.nombreUsuario);
              },
              error: (error: HttpErrorResponse) => {
                alert(error.message);
              },
            });
            }
          })
    
  }

}
