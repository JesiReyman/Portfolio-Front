import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, take } from 'rxjs';
import { Storage, ref, uploadBytes, getDownloadURL, deleteObject } from '@angular/fire/storage'
import { url } from 'inspector';
import { ModalsService } from './modals.service';


@Injectable({
  providedIn: 'root',
})
export class ImagenService {
 
  private url = new Subject<string>();
  url$ = this.url.asObservable();

  constructor(private storage: Storage, private modalService: ModalsService) {}

  subirImagen(imagen: any, usuario: string) {
    console.log("estoy en subirImagen y voy a subir:")
    console.log(imagen);
    const imageRef = ref(this.storage, `${usuario}/${imagen.name}`);
    let url = '';
    uploadBytes(imageRef, imagen)
      .then(async (result) => {
        console.log(result);
        url = await getDownloadURL(imageRef);
        console.log('esta es la url: ' + url);
        this.url.next(url);
      })
      .catch((error) => alert(error));
  }

  deleteImage(url: string){
    
    let pictureRef = ref(this.storage, url);
   //2.
    deleteObject(pictureRef)
      .then(() => {
        //3.
       // alert("Picture is deleted successfully!");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  
}
