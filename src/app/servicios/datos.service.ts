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

  private reservasCollection: AngularFirestoreCollection<any>;
  private reservas: Observable<any[]>;
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

    this.reservasCollection = afs.collection<Sesion>('reservas');

    this.reservas = this.sesionCollection.snapshotChanges().pipe(
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
    return this.sesionCollection.doc<any>(id).valueChanges();
  }

  agregarSesion(sesion){
    return this.sesionCollection.add(sesion);
  }

  agregarReserva(reserva){
    return this.reservasCollection.add(reserva);
  }
  actulizarSesion(sesion: any, id: string){
    return this.sesionCollection.doc(id).update(sesion);
  }
}
