import { FieldsForm } from "./fieldsForm";

export class Perfil {
  id: number;
  nombre: string;
  apellido: string;
  descripcion: string;
  urlBanner: string;
  urlFoto: string;

  constructor(
    id: number,
    nombre: string,
    apellido: string,
    descripcion: string,
    urlBanner: string,
    urlFoto: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.apellido = apellido;
    this.descripcion = descripcion;
    this.urlBanner = urlBanner;
    this.urlFoto = urlFoto;
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
        },
        {
          nombre: 'apellido',
          type: 'text',
          label: 'Apellido',
          value: item.apellido,
        },
        {
          nombre: 'descripcion',
          type: 'text',
          label: 'Descripción',
          value: item.descripcion,
        },
        {
          nombre: 'urlBanner',
          type: 'text',
          label: 'URL de imagen de portada',
          value: item.urlBanner,
        },
        {
          nombre: 'urlFoto',
          type: 'text',
          label: 'URL de imagen de perfil',
          value: item.urlFoto,
        },
      ];
    } else {
      formFields = [
        {
          nombre: 'nombre',
          type: 'text',
          label: 'Nombre',
          value: '',
        },
        {
          nombre: 'apellido',
          type: 'text',
          label: 'Apellido',
          value: '',
        },
        {
          nombre: 'descripcion',
          type: 'text',
          label: 'Descripción',
          value: '',
        },
        {
          nombre: 'urlBanner',
          type: 'text',
          label: 'URL de imagen de portada',
          value: '',
        },
        {
          nombre: 'urlFoto',
          type: 'text',
          label: 'URL de imagen de perfil',
          value: '',
        },
      ];
    }
    return formFields;
  }
}