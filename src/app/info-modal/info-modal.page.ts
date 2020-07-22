import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-info-modal',
  templateUrl: './info-modal.page.html',
  styleUrls: ['./info-modal.page.scss'],
})
export class InfoModalPage implements OnInit {

  public usuarios:[
    {
      nombre: 'Diego Ochoa',
      codigo: '12445',
      telefono: '44444444'
    },
    {
      nombre: 'Angel Mares',
      codigo: '12445',
      telefono: '44444444'
    }
  ];

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }


  close(){
    this.modalCtrl.dismiss();
  }
}
