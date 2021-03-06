import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Sesion } from '../interfaces/sesion';
import { Observable, throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';


 @Injectable({
  providedIn: 'root'
})
export class DatosService {

  private sesionCollection: AngularFirestoreCollection<any>;
  private sesiones: Observable<any[]>;

  private reservasCollection: AngularFirestoreCollection<any>;
  private reservas: Observable<any[]>;
  constructor(private afs: AngularFirestore,
              private http: HttpClient) {

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

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  handleError(error: HttpErrorResponse){
    return throwError(error);
  }

  sendEmail(datos): Observable<any>{
    return this.http.post<any>(`https://us-central1-millas-5614c.cloudfunctions.net/emailSender`, datos, this.httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }
}
