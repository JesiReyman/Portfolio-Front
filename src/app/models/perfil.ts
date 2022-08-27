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
        {
          nombre: 'imagenPerfil',
          type: 'file',
          label: 'Imagen de perfil',
          value: '',
          required: false
        },
        {
          nombre: 'imagenPerfilInput',
          type: 'hidden',
          label: '',
          value: '',
          required: false
        },
        {
          nombre: 'imagenBanner',
          type: 'file',
          label: 'Imagen de portada',
          value: '',
          required: false
        },
        {
          nombre: 'imagenBannerInput',
          type: 'hidden',
          label: '',
          value: '',
          required: false
        }
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
        {
          nombre: 'imagenPerfil',
          type: 'file',
          label: 'Imagen de perfil',
          value: '',
          required: false
        },
        {
          nombre: 'imagenPerfilInput',
          type: 'hidden',
          label: '',
          value: '',
          required: false
        },
        {
          nombre: 'imagenBanner',
          type: 'file',
          label: 'Imagen de portada',
          value: '',
          required: false
        },
        {
          nombre: 'imagenBannerInput',
          type: 'hidden',
          label: '',
          value: '',
          required: false
        }
      ];
    }
    return formFields;
  }
}