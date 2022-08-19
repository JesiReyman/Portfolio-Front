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
        },
        {
          nombre: 'descripcion',
          type: 'text',
          label: 'Descripción del proyecto',
          value: item.descripcion,
        },
        {
          nombre: 'urlImagen',
          type: 'text',
          label: 'URL de la vista del proyecto',
          value: item.urlImagen,
        },
        {
          nombre: 'urlProyecto',
          type: 'text',
          label: 'URL del proyecto o repositorio del mismo',
          value: item.urlProyecto,
        },
      ];
    } else {
      formFields = [
        {
          nombre: 'titulo',
          type: 'text',
          label: 'Nombre de Proyecto',
          value: '',
        },
        {
          nombre: 'descripcion',
          type: 'text',
          label: 'Descripción del proyecto',
          value: '',
        },
        {
          nombre: 'urlImagen',
          type: 'text',
          label: 'URL de la vista del proyecto',
          value: '',
        },
        {
          nombre: 'urlProyecto',
          type: 'text',
          label: 'URL del proyecto o repositorio del mismo',
          value: '',
        },
      ];
    }

    return formFields;
  }
}
