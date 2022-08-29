import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Perfil } from 'src/app/models/perfil';
import { HeaderService } from 'src/app/services/header.service';
import { ModalsService } from 'src/app/services/modals.service';
import { take } from 'rxjs';
import { ImagenService } from 'src/app/services/imagen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public usuario: Perfil = {} as Perfil;

  @Input() nombreUsuario: string = '';

  constructor(
    private headerService: HeaderService,
    private servicioModal: ModalsService,
    private imagenService: ImagenService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.getUser(this.nombreUsuario);
  }

  public getUser(nombreUsuario: string): void {
    this.headerService.getUser(nombreUsuario).subscribe({
      next: (response: Perfil) => {
        this.usuario = response;
      },
      error: (error: HttpErrorResponse) => {
        //alert(error.message);
        this.router.navigate(['noencontrado/404']);
      },
    });
  }

  editar(item: Perfil) {
    let titulo = 'Editar perfil: ';
    let fields = Perfil.getFieldsForm(item);
    let urlPerfilOriginal = item.urlFoto;
    let urlBannerOriginal = item.urlBanner;

    this.servicioModal.openAddModal(fields, titulo);
    this.servicioModal.resultado$.pipe(take(1)).subscribe((result: any) => {
      if (result) {
        let perfil = result;
        perfil['id'] = item.id;
        
        if (perfil.imagenPerfil || perfil.imagenBanner) {
          if (perfil.imagenPerfil  && !perfil.imagenBanner ) {
            perfil.urlBanner = urlBannerOriginal;

            this.updateImagen(
              perfil.imagenPerfilInput,
              urlPerfilOriginal,
              perfil,
              'urlFoto'
            );
          } else if (!perfil.imagenPerfil && perfil.imagenBanner) {
            perfil.urlFoto = urlPerfilOriginal;

            this.updateImagen(
              perfil.imagenBannerInput,
              urlBannerOriginal,
              perfil,
              'urlBanner'
            );
          } else {
            let imagenDePerfil = perfil.imagenPerfilInput;
            this.imagenService.subirImagen(imagenDePerfil, this.nombreUsuario);
            
            if (urlPerfilOriginal) {
              this.imagenService.deleteImage(urlPerfilOriginal);
            }

            this.imagenService.url$.pipe(take(1)).subscribe((respuesta) => {
              perfil['urlFoto'] = respuesta;

              this.updateImagen(
                perfil.imagenBannerInput,
                urlBannerOriginal,
                perfil,
                'urlBanner'
              );
            });
          }
        }

        perfil.urlBanner = urlBannerOriginal;
        perfil.urlFoto = urlPerfilOriginal;

        this.updatePerfil(perfil);
      }
    });
  }

  updatePerfil(perfil: Perfil) {
    const usuario = this.nombreUsuario;

    this.headerService.updateUser(perfil.id, perfil, usuario).subscribe({
      next: (response: Perfil) => {
        alert("Se guardó correctamente");
        this.getUser(usuario);
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  updateImagen(
    imagenActualizar: any,
    urlOriginalDeImagen: string,
    perfil: any,
    campoDeLaUrl: string
  ) {
    let imagenParaActualizar = imagenActualizar;
    this.imagenService.subirImagen(imagenParaActualizar, this.nombreUsuario);
    
    if (urlOriginalDeImagen) {
      this.imagenService.deleteImage(urlOriginalDeImagen);
    }

    this.imagenService.url$.pipe(take(1)).subscribe((respuesta) => {
      perfil[campoDeLaUrl] = respuesta;
      
      this.updatePerfil(perfil);
    });
  }
}
