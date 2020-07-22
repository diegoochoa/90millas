import { Component, OnInit, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { domain } from 'process';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { DatosService } from '../servicios/datos.service';
import { map } from 'rxjs/operators';
import { Sesion } from '../interfaces/sesion';

import { ModalController } from '@ionic/angular';
import { CalModalPage } from '../cal-modal/cal-modal.page';
import { InfoModalPage } from '../info-modal/info-modal.page';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit{

  constructor(private alertCtrl: AlertController, @Inject(LOCALE_ID) private locale: string,
  private dataService: DatosService, private modalCtrl: ModalController) { }

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
      console.log(res);
      this.myCal.loadEvents();
      this.resetEvent();
    })
    console.log('eventSoucer: ',this.eventSource);
  
  }

  event = {
    title: '',
    capacidad: null,
    startTime: '',
    endTime: ''
  };

  minDate = new Date().toISOString();;

  eventSource = [];

  
  calendar = {
    mode: 'month',
    currenDate: new Date()
  }
 
  viewTitle = '';
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  
 
  addEvent(){
    let eventCopy = {
      title: this.event.title,
      startTime:  new Date(this.event.startTime),
      endTime: new Date(this.event.endTime),
      capacidad: this.event.capacidad,
      restantes: this.event.capacidad
    }
    
    
    this.dataService.agregarSesion(eventCopy);
    this.ngOnInit();
  }

  changeMode(mode){
    this.calendar.mode=mode;
  }

  back(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slidePrev();
  }

  next(){
    var swiper = document.querySelector('.swiper-container')['swiper'];
    swiper.slideNext();
  }

  today(){
    this.calendar.currenDate = new Date();
  }

  async onEventSelected(event){
    
    console.log('Modal event: ',event);
    let start = formatDate(event.startTime, 'medium', this.locale);
    let end = formatDate(event.endTime, 'medium', this.locale);
   

    const modal = await this.modalCtrl.create({
      component: InfoModalPage,
      cssClass: 'info-modal',
      backdropDismiss: false,
      componentProps: {
        'infoSesion': {
          title: event.title,
          startTime: event.startTime,
          endTime: event.endTime,
          capacidad: event.capacidad,
          restantes: event.restantes
        }
      }
    });
   
    await modal.present();

    /* const alert = await this.alertCtrl.create({
      header: event.title,
      subHeader: `Capacidad ${event.capacidad} \n
                  Restantes: ${event.restantes}`,
      message: 'Desde: ' + start + '<br><br>Hasta: ' + end + '<br><br>\n',
      buttons: ['OK']
    });
    alert.present(); */
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

  resetEvent(){
    this.event = {
      title: '',
      capacidad: null,
      startTime: new Date().toISOString(),
      endTime: new Date().toISOString()
    }
  }




  async openCalModal() {
    
    const modal = await this.modalCtrl.create({
      component: CalModalPage,
      cssClass: 'cal-modal',
      backdropDismiss: false,  
    });
   
    await modal.present();
   
    modal.onDidDismiss().then((result) => {
      if (result.data && result.data.event) {
        let event = result.data.event;
        let eventCopy = {
          title: event.title,
          startTime: new Date(event.startTime),
          endTime: new Date(event.endTime),
          capacidad: event.capacidad,
          restantes: event.capacidad
        }

        this.eventSource.push(eventCopy);
        this.dataService.agregarSesion(eventCopy);
        this.ngOnInit();
        this.myCal.loadEvents();
      }
    });
  }
}
