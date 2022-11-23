import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RestorePageRoutingModule } from './restore-routing.module';

import { RestorePage } from './restore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RestorePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [RestorePage]
})
export class RestorePageModule { }
