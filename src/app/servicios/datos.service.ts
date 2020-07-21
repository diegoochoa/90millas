import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Sesion } from '../interfaces/sesion';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

 @Injectable({
  providedIn: 'root'
})
export class DatosService {

  private sesionCollection: AngularFirestoreCollection<any>;

  private sesiones: Observable<any[]>;
  constructor(private afs: AngularFirestore) {

    this.sesionCollection = afs.collection<Sesion>('sesiones');

    this.sesiones = this.sesionCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data}
        });
      })
    );
   }
  
  getSesiones(){
    return this.sesiones;
  }

  getSesion(id){
    return this.sesionCollection.doc<Sesion>(id).valueChanges();
  }

  agregarSesion(sesion){
    return this.sesionCollection.add(sesion);
    
  }
}
