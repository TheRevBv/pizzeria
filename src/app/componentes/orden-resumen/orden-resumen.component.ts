import { CommonModule } from '@angular/common';

import { OrdenServicio } from '../../orden.service';
import { FormsModule } from '@angular/forms';
import { Component, Output, EventEmitter, Input } from '@angular/core';
export interface Orden {
  tamanio: string;
  ingredientes: string[];
  cantidad: number;
  subtotal: number;
}
@Component({
  selector: 'app-orden-resumen',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './orden-resumen.component.html',
  styleUrl: './orden-resumen.component.css'
})

export class OrdenResumenComponent {
  constructor(public ordenServicio: OrdenServicio) {}
  guardaPedido(){
    this.ordenServicio.terminarPedido();
  }
  
  
}
