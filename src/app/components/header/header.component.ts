import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  //Inicializo usuario y editUsuario, de tipo usuario, o pueden ser indefinidos
  public usuario : Usuario | undefined;
  public editUsuario : Usuario | undefined;

  //En el constructor instancio el servicio para poder usar sus métodos
  constructor(private headerService: HeaderService) { }

  //Al inicio quiero que me traiga al usuario
  ngOnInit(): void {
    this.getUser();
  }

  //Defino al método getUser que a su vez llama al método de servicio. La repuesta de tipo Usuario
  //se guarda en usuario (que lo defino arriba), sino dará un mensaje de error
  public getUser():void{
    this.headerService.getUser().subscribe({
      next: (response: Usuario) => {
        this.usuario = response;
      },
      error:(error: HttpErrorResponse)=>{
        alert(error.message);
      }
    });
  }

}
