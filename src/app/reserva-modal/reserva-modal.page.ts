import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-reserva-modal',
  templateUrl: './reserva-modal.page.html',
  styleUrls: ['./reserva-modal.page.scss'],
})
export class ReservaModalPage implements OnInit {

  viewTitle = 'Reservar';
  usuario = {
    nombre: '',
    correo: '',
    telefono: 0,
  }
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  close(){
    this.modalCtrl.dismiss();
  }

  save() {    
    this.modalCtrl.dismiss({event: this.usuario})
  }
}
