import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalsService } from 'src/app/services/modals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  nombreUsuario: string = '';
  subscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalsService
  ) {
    this.subscription = this.modalService.nombre$.subscribe({
      next: (nombre) => {
        if (nombre) {
          if (nombre == this.nombreUsuario) {
            // console.log("estoy en el caso de que el usuario logueado coincidia con el de ruta")
            this.router
              .navigateByUrl('/', { skipLocationChange: true })
              .then(() => {
                this.router.navigate([nombre]);
              });
          } else {
            // console.log("los usuario no coinciden")
            this.router.navigate([nombre]).then(() => {
              window.location.reload();
            });
          }
        }
      },
      error: (error) => {
        alert(error);
      },
    });
  }

  ngOnInit(): void {
    this.nombreUsuario = this.route.snapshot.params['nombreUsuario'];
  }
}
