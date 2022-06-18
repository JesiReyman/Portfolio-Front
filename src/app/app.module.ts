import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { EducationComponent } from './components/education/education.component';
import { EducationItemComponent } from './components/education-item/education-item.component';
import { ModalDeleteComponent } from './components/modal-delete/modal-delete.component';
import { DeleteButtonComponent } from './components/buttons/delete-button/delete-button.component';
import { EditButtonComponent } from './components/buttons/edit-button/edit-button.component';
import { AddButtonComponent } from './components/buttons/add-button/add-button.component';
import { AddModalComponent } from './components/modals/add-modal/add-modal.component';
import { EditModalComponent } from './components/modals/edit-modal/edit-modal.component';
import { SkillComponent } from './components/skill/skill.component';
import { SkillItemComponent } from './components/skill-item/skill-item.component';
import { DeleteSkillComponent } from './components/modals/delete-skill/delete-skill.component';
import { ExperienciaComponent } from './components/experiencia/experiencia.component';
import { ExperienciaItemComponent } from './components/experiencia-item/experiencia-item.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EducationComponent,
    EducationItemComponent,
    ModalDeleteComponent,
    DeleteButtonComponent,
    EditButtonComponent,
    AddButtonComponent,
    AddModalComponent,
    EditModalComponent,
    SkillComponent,
    SkillItemComponent,
    DeleteSkillComponent,
    ExperienciaComponent,
    ExperienciaItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
