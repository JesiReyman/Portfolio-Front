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
          label: 'Breve descripción del proyecto',
          value: item.descripcion,
          required: true
        },
        {
          nombre: 'urlProyecto',
          type: 'text',
          label: 'URL del proyecto o repositorio del mismo',
          value: item.urlProyecto,
          required: false
        },
        {
          nombre: 'imagen',
          type: 'file',
          label: 'Vista previa del proyecto',
          value: '',
          required: false
        },
        {
          nombre: 'imagenInput',
          type: 'hidden',
          label: '',
          value: '',
          required: false
        }
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
          label: 'Breve descripción del proyecto',
          value: '',
          required: true
        },
        {
          nombre: 'urlProyecto',
          type: 'text',
          label: 'URL del proyecto o repositorio del mismo',
          value: '',
          required: false
        },
        {
          nombre: 'imagen',
          type: 'file',
          label: 'Vista previa del proyecto',
          value: '',
          required: false
        },
        {
          nombre: 'imagenInput',
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
