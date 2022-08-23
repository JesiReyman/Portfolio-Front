import { FieldsForm } from "./fieldsForm";

export class Proyecto {
  proyectoId: number;
  titulo: string;
  descripcion: string;
  urlImagen: string;
  urlProyecto: string;

  constructor(
    proyectoId: number,
    titulo: string,
    descripcion: string,
    urlImagen: string,
    urlProyecto: string
  ) {
    this.proyectoId = proyectoId;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.urlImagen = urlImagen;
    this.urlProyecto = urlProyecto;
  }

  static getFieldsForm(item?: Proyecto): FieldsForm[] {
    let formFields = [];
    if (item) {
      formFields = [
        {
          nombre: 'titulo',
          type: 'text',
          label: 'Nombre de Proyecto',
          value: item.titulo,
          required: true
        },
        {
          nombre: 'descripcion',
          type: 'text',
          label: 'Descripción del proyecto',
          value: item.descripcion,
          required: true
        },
        {
          nombre: 'urlImagen',
          type: 'text',
          label: 'URL de la vista del proyecto',
          value: item.urlImagen,
          required: false
        },
        {
          nombre: 'urlProyecto',
          type: 'text',
          label: 'URL del proyecto o repositorio del mismo',
          value: item.urlProyecto,
          required: false
        },
      ];
    } else {
      formFields = [
        {
          nombre: 'titulo',
          type: 'text',
          label: 'Nombre de Proyecto',
          value: '',
          required: true
        },
        {
          nombre: 'descripcion',
          type: 'text',
          label: 'Descripción del proyecto',
          value: '',
          required: true
        },
        {
          nombre: 'urlImagen',
          type: 'text',
          label: 'URL de la vista del proyecto',
          value: '',
          required: false
        },
        {
          nombre: 'urlProyecto',
          type: 'text',
          label: 'URL del proyecto o repositorio del mismo',
          value: '',
          required: false
        },
      ];
    }

    return formFields;
  }
}
