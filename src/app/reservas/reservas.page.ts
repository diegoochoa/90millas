import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  totalReservas = 7;
  public reservas = [
    {
      fecha: '20/07/2020',
      hora: '18:00 hrs',
      folio: '0001',
      id: 1
    },
    {
      fecha: '21/07/2020',
      hora: '19:00 hrs',
      folio: '0002',
      id: 2
    },
    {
      fecha: '22/07/2020',
      hora: '18:00 hrs',
      folio: '0002',
      id: 3
    }
  ];
  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
    console.log(this.reservas.length)
  }


  async borrarSitio(id){
    const alert = await this.alertCtrl.create({
      header: 'Confirmar borrado',
      message: '¿Estás seguro de que deseas eliminar esta reserva?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            // Ha respondido que no así que no hacemos nada
          }
        },
        {
          text: 'Si',
          handler: () => {
            for(var i = this.reservas.length - 1; i >= 0; i--) {
              if(this.reservas[i].id === id) {
                 this.reservas.splice(i, 1);
                 this.totalReservas += 1;
              }
          }

           }
        }
      ]
    });

    await alert.present();

 }

}
