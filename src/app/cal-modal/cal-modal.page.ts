import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements OnInit {

  @Input() startTime: Date;
  @Input() endTime: Date;
  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  viewTitle: string;
  
  event = {
    title: '',
    capacidad: null,
    startTime: null,
    endTime: ''
  };

  modalReady = false;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.modalReady = true;
    }, 0);
  }

  save() {    
    this.modalCtrl.dismiss({event: this.event})
  }
 
  onViewTitleChanged(title) {
    this.viewTitle = title;
  }
 
  onTimeSelected(ev) {    
    console.log('ev', ev);
    this.event.startTime = new Date(ev.selectedTime);
    let selected = new Date(ev.selectedTime);
    this.event.startTime = selected.toISOString();
    selected.setHours(selected.getHours() + 1);
    this.event.endTime = (selected.toISOString());
  
  }
 
  close() {
    this.modalCtrl.dismiss();
  }
}
