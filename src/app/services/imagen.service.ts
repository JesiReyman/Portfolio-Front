import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage'
import { url } from 'inspector';


@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private file = new Subject<any>();
  fileData$ = this.file.asObservable();

  private url = new Subject<string>();
  url$ = this.url.asObservable();

  constructor( private storage: Storage) { }

   mandarFile(file: any){
    //console.log( file);
    //const file = evento.target.files[0];
    console.log(file)
     this.file.next(file);
   // const file = evento.target.files[0];
    //const imgRef = ref(this.storage, `images/${file.name}`);
    //console.log(file);
  }

    subirImagen(imagen: any, usuario: string){
    
    console.log(imagen)
    const imageRef = ref(this.storage, `${usuario}/${imagen.name}`)
    let url = '';
    uploadBytes(imageRef, imagen)
      .then(async ( result) => {
        console.log(result);
        url = await getDownloadURL(imageRef);
        console.log("esta es la url: " + url)
        this.url.next(url);
      })
      .catch((error) => alert(error));

    
  }
  
}
