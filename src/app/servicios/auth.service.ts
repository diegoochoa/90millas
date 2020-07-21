import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private router: Router, private afs: AngularFirestore) { }

  login(email:string, password:string ){

    return new Promise((resolve,rejected) => {
      this.afAuth.auth.signInWithEmailAndPassword(email,password).then(res => {
        return resolve(res)
      }).catch(err => rejected('error' + err))
    });
    
  }
  
  logout(){
    this.afAuth.auth.signOut().then( () => {
      this.router.navigate(['/login']);
    });
  
  }

  register(email: string, password: string, name: string){
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(email,password).then(res => {
        const uid = res.user.uid;
        console.log(uid);
        this.afs.collection('users').doc(uid).set({
          nombre: name,
          uid: uid
        })
        resolve(res);
      }).catch(err => reject)
    })
    

  }
}
