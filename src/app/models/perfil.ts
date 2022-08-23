import { FieldsForm } from "./fieldsForm";

export class Perfil {
  id: number;
  nombre: string;
  apellido: string;
  descripcion: string;
  urlBanner: string;
  urlFoto: string;
  urlGitHub: string;
  urlLinkedIn: string;


  constructor(
    id: number,
    nombre: string,
    apellido: string,
    descripcion: string,
    urlBanner: string,
    urlFoto: string,
    urlGitHub: string,
    urlLinkedIn: string,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.descripcion = descripcion;
    this.urlBanner = urlBanner;
    this.urlFoto = urlFoto;
    this.urlGitHub = urlGitHub;
    this.urlLinkedIn = urlLinkedIn;
  }

  static getFieldsForm(item?: Perfil): FieldsForm[] {
    let formFields = [];
    if (item) {
      formFields = [
        {
          nombre: 'nombre',
          type: 'text',
          label: 'Nombre',
          value: item.nombre,
          required: true
        },
        {
          nombre: 'apellido',
          type: 'text',
          label: 'Apellido',
          value: item.apellido,
          required: true
        },
        {
          nombre: 'descripcion',
          type: 'text',
          label: 'Descripción',
          value: item.descripcion,
          required: true
        },
        {
          nombre: 'urlBanner',
          type: 'text',
          label: 'URL de imagen de portada',
          value: item.urlBanner,
          required: false
        },
        {
          nombre: 'urlFoto',
          type: 'text',
          label: 'URL de imagen de perfil',
          value: item.urlFoto,
          required: false
        },
        {
          nombre: 'urlGitHub',
          type: 'text',
          label: 'Enlace a GitHub',
          value: item.urlGitHub,
          required: false
        },
        {
          nombre: 'urlLinkedIn',
          type: 'text',
          label: 'Enlace a LinkedIn',
          value: item.urlLinkedIn,
          required: false
        },
      ];
    } else {
      formFields = [
        {
          nombre: 'nombre',
          type: 'text',
          label: 'Nombre',
          value: '',
          required: true
        },
        {
          nombre: 'apellido',
          type: 'text',
          label: 'Apellido',
          value: '',
          required: true
        },
        {
          nombre: 'descripcion',
          type: 'text',
          label: 'Descripción',
          value: '',
          required: true
        },
        {
          nombre: 'urlBanner',
          type: 'text',
          label: 'URL de imagen de portada',
          value: '',
          required: false
        },
        {
          nombre: 'urlFoto',
          type: 'text',
          label: 'URL de imagen de perfil',
          value: '',
          required: false
        },
        {
          nombre: 'urlGitHub',
          type: 'text',
          label: 'Enlace a GitHub',
          value: '',
          required: false
        },
        {
          nombre: 'urlLinkedIn',
          type: 'text',
          label: 'Enlace a LinkedIn',
          value: '',
          required: false
        },
      ];
    }
    return formFields;
  }
}