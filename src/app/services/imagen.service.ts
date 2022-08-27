import { Injectable } from '@angular/core';
import {  Subject } from 'rxjs';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ImagenService {
  private url = new Subject<string>();
  url$ = this.url.asObservable();

  constructor(private storage: Storage) {}

  subirImagen(imagen: any, usuario: string) {
    const imageRef = ref(this.storage, `${usuario}/${imagen.name}`);
    let url = '';
    uploadBytes(imageRef, imagen)
      .then(async (result) => {
        url = await getDownloadURL(imageRef);
        this.url.next(url);
      })
      .catch((error) => alert(error));
  }

  deleteImage(url: string) {
    let pictureRef = ref(this.storage, url);

    deleteObject(pictureRef)
      .then(() => {})
      .catch((err) => {
        alert(err);
      });
  }
}
