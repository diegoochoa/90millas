import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaModalPageRoutingModule } from './reserva-modal-routing.module';

import { ReservaModalPage } from './reserva-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaModalPageRoutingModule
  ],
  declarations: [ReservaModalPage]
})
export class ReservaModalPageModule {}
