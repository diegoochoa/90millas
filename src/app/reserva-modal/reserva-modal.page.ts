import { Component, OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatosService } from '../servicios/datos.service';

@Component({
  selector: 'app-reserva-modal',
  templateUrl: './reserva-modal.page.html',
  styleUrls: ['./reserva-modal.page.scss'],
})
export class ReservaModalPage implements OnInit {

  reserva = null;
  viewTitle = 'Reservar';
  usuario = {
    nombre: '',
    correo: '',
    telefono: 0,
  }
  constructor(private modalCtrl: ModalController, private router: Router,
              private toastCtrl: ToastController, private servicio: DatosService) { 

  (function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
  }(document, 'script', 'facebook-jssdk'));
              }

  ngOnInit() {
  }

  close(){
    this.modalCtrl.dismiss();
  }

  async toastSuccess(mensaje: string){
    const toast = await this.toastCtrl.create({
      message: mensaje,
      color: 'success',
      duration: 4000,
      keyboardClose: true,
    });
    await toast.present();
  }

  async toastFailed(mensaje: string){
    const toast = await this.toastCtrl.create({
      message: mensaje,
      color: 'danger',
      duration: 2000,
      keyboardClose: true,
    });
    await toast.present();
  }

  async save(correo) {   
    
    let startTime = this.reserva.startTime.toString();
    let endTime = this.reserva.endTime.toString();

    if(this.usuario.nombre != '' && this.usuario.correo != '' &&this.usuario.telefono != 0){
      await this.modalCtrl.dismiss({event: this.usuario}).then(() =>{
        console.log('inicio',startTime.toString())
        console.log('fin',endTime.toString())
        this.servicio.sendEmail({nombre:this.usuario.nombre, correo: this.usuario.correo, inicio: startTime, fin: endTime}).subscribe(res => {
          this.toastSuccess('Reserva creada con éxito, se ha enviado un correo de confirmación');
        }, err => {
          console.log('Error: ', err);
        })
        /* this.router.navigate(['/inicio']).then(() => {
          this.toastSuccess('Reserva creada con éxito, se ha enviado un correo de confirmación');
        }) */
      })
    }
    else
    {
      this.toastFailed('Favor de llenar todos los campos');
    }
    
  } 

 /*   save = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.modalCtrl.dismiss({event: this.usuario}).then(() =>
          this.router.navigate(['/inicio'])
        )
        }, 3000);
        
    })
} */
}
