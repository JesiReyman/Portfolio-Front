import { Component, OnInit } from '@angular/core';
import { ModalsService } from 'src/app/services/modals.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private modalsService: ModalsService) { }

  ngOnInit(): void {
  }

  openLoginModal(){
    this.modalsService.openLoginModal();
  }

}
