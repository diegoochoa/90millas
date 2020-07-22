import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalendarioPageRoutingModule } from './calendario-routing.module';

import { CalendarioPage } from './calendario.page';

import { NgCalendarModule } from 'ionic2-calendar';
import { CalModalPageModule } from '../cal-modal/cal-modal.module';
import { InfoModalPageModule } from '../info-modal/info-modal.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarioPageRoutingModule,
    NgCalendarModule,
    CalModalPageModule,
    InfoModalPageModule
    
  ],
  declarations: [CalendarioPage]
})
export class CalendarioPageModule {}
