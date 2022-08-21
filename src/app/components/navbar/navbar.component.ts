import { Component, Input, OnInit } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { ModalsService } from 'src/app/services/modals.service';
import { TokenService } from 'src/app/services/token.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogged = false;
  subscription?: Subscription;
  @Input() enlaceGithub: string = "";
  @Input() enlaceLinkedin: string = "";

  constructor(
    private modalsService: ModalsService,
    private tokenService: TokenService
  ) {
   // const merged = merge(this.modalsService.isLogged$, this.tokenService.logged$);

    this.subscription = this.tokenService.logged$.subscribe({
      next: (data: boolean) => {
        this.isLogged = data;
        console.log('el boton login escucho, y isLogged es: ' + this.isLogged);
      },
    });
  }

  ngOnInit(): void {
    this.checkToken();
  }

  openLoginModal() {
    this.modalsService.openLoginModal();
  }

  onLogOut() {
    this.tokenService.logOut();
    this.tokenService.isLogged();
    /*this.tokenService.logged$.subscribe({
      next: (estaLogueado) => {
        this.isLogged = estaLogueado;

        console.log('se ejecuta onlogout y isLogged es: ' + this.isLogged);
      },
    });*/
  }

  checkToken() {
    this.tokenService.isLogged();
  }
}
