import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { AlertController, ModalController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { DatosService } from '../servicios/datos.service';
import { RouterLink, Router } from '@angular/router';
import { ReservaModalPage } from '../reserva-modal/reserva-modal.page';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})
export class ReservasPage implements OnInit {

  date1: Date;
  date2: Date;
  viewTitle = '';
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  calendar = {
    mode: 'month',
    currenDate: new Date()
  }

  eventSource = [];

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

  event = {
    title: '',
    capacidad: null,
    startTime: '',
    endTime: ''
  };
  constructor(private alertCtrl: AlertController,  @Inject(LOCALE_ID) private locale: string,
  private dataService: DatosService, public router: Router, private modalCtrl: ModalController) { }

  ngOnInit(){
    this.resetEvent();
    this.eventSource = [];
    this.dataService.getSesiones().subscribe(res => {
      res.forEach(element => {
        let eventCopy = {
          title: element.title,
          startTime: new Date(element.startTime.seconds * 1000),
          endTime: new Date(element.endTime.seconds * 1000),
          capacidad: element.capacidad,
          restantes: element.restantes,
          id: element.id
        }
        this.eventSource.push(eventCopy);
      }); 
      this.myCal.loadEvents();
      this.resetEvent();
    })
    //console.log('eventSoucer: ',this.eventSource);
  
  }


  resetEvent(){
    this.event = {
      title: '',
      capacidad: null,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString()
    }
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

   changeMode(mode){
    this.calendar.mode=mode;
  }
  async onEventSelected(event){
      
    console.log(event);
    console.log(event.id);
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
    this.date1 = event.startTime;
    this.date2 = event.endTime;
    const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: `Lugares restantes: ${event.restantes}`,
      message: 'Desde: ' + start + '<br><br>Hasta: ' + end,
      buttons: [
        {
          text: 'Reservar',
          handler: () => {
            if(event.id && event.restantes > 0){
              event.restantes -=1;
              console.log(event.restantes);
              this.openReservaModal();
              this.dataService.actulizarSesion(event,event.id).then(()=>{
                console.log('Reserva agregada y sesion actualizada');
              })
            }
          }
        },
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Cancelar going to google...');
          }
        }
      ]
    });
    alert.present();
  }
  today(){
    this.calendar.currenDate = new Date();
  }
  
  onViewTitleChanged(title){
    this.viewTitle = title;
  }
  
  onTimeSelected(ev){
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  }


  async openReservaModal() {
    
    const modal = await this.modalCtrl.create({
      component: ReservaModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false,  
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let reserva = result.data.event;
        let reservaCopy = {
          nombre: reserva.nombre,
          startTime: new Date(this.date1),
          endTime: new Date(this.date2),
          email: reserva.correo,
          celular: reserva.telefono,
          estado: 'reservado',
          sesiones: 1
        }
        this.dataService.agregarReserva(reservaCopy);
        this.ngOnInit();
      }
    });
  }

}
