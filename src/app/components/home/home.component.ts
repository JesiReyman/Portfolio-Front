import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalsService } from 'src/app/services/modals.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nombreUsuario: string = "";
  subscription?: Subscription;

  constructor(private route: ActivatedRoute, private router: Router, private modalService: ModalsService) {
    this.subscription = this.modalService.nombre$.subscribe({
      next: (nombre) => {
        if(nombre){
          this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
            this.router.navigate([nombre]);
            });
        }
        
        //this.router.navigate([nombre]);
        //window.location.reload();
        //this.nombreUsuario = this.route.snapshot.params['nombreUsuario'];
      },
      error: (error) => {
        console.log(error);
      },
    })
   }

  ngOnInit(): void {
    this.nombreUsuario = this.route.snapshot.params['nombreUsuario'];
  }

}
