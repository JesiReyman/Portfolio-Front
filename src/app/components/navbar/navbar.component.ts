import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
   
    this.subscription = this.tokenService.logged$.subscribe({
      next: (data: boolean) => {
        this.isLogged = data;
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
  }

  checkToken() {
    this.tokenService.isLogged();
  }
}
