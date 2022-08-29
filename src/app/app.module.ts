import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { DialogModule } from '@angular/cdk/dialog';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EducationComponent } from './components/education/education.component';
import { EducationItemComponent } from './components/education-item/education-item.component';
import { ModalDeleteComponent } from './components/modals/modal-delete/modal-delete.component';
import { AddModalComponent } from './components/modals/add-modal/add-modal.component';
import { SkillComponent } from './components/skill/skill.component';
import { SkillItemComponent } from './components/skill-item/skill-item.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { ExperienciaItemComponent } from './components/experiencia-item/experiencia-item.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CircleProgressComponent } from './components/circle-progress/circle-progress.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginModalComponent } from './components/modals/login-modal/login-modal.component';
import { HomeComponent } from './components/home/home.component';
import { InterceptorService } from './services/interceptor.service';
import { RegistroComponent } from './components/modals/registro/registro.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProyectoComponent } from './components/proyecto/proyecto.component';
import { ProyectoItemComponent } from './components/proyecto-item/proyecto-item.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideStorage,getStorage } from '@angular/fire/storage';
import { Pagina404Component } from './components/pagina404/pagina404.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EducationComponent,
    EducationItemComponent,
    ModalDeleteComponent,
    AddModalComponent,
    SkillComponent,
    SkillItemComponent,
    ExperienciaComponent,
    ExperienciaItemComponent,
    ButtonsComponent,
    CircleProgressComponent,
    NavbarComponent,
    LoginModalComponent,
    HomeComponent,
    RegistroComponent,
    FooterComponent,
    ProyectoComponent,
    ProyectoItemComponent,
    Pagina404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    DialogModule,
    DragDropModule,
    NgCircleProgressModule.forRoot({}),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage())
  ],
  providers: [
    {
     provide: HTTP_INTERCEPTORS,
     useClass: InterceptorService,
     multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
