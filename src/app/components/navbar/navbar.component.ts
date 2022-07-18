import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalsService } from 'src/app/services/modals.service';
import { TokenService } from 'src/app/services/token.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogged = false;
  subscription?: Subscription;

  constructor(
    private modalsService: ModalsService,
    private tokenService: TokenService
  ) {
    this.subscription = this.modalsService.isLogged$.subscribe((value) => {
      this.isLogged = value;
      console.log('el boton login escucho');
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
    this.tokenService.logged$.subscribe({
      next: (estaLogueado) => {
        this.isLogged = estaLogueado;

        console.log('se ejecuta onlogout y isLogged es: ' + this.isLogged);
      },
    });
  }

  checkToken() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }
}
