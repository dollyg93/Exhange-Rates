import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConverterRoutingModule } from './converter.routing.module';
import { ConverterComponent } from './converter.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ConverterRoutingModule
  ],
  declarations: [ConverterComponent]
})
export class ConverterModule { }
