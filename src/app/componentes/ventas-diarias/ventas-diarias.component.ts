import { Component } from '@angular/core';
import { OrdenServicio } from '../../orden.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ventas-diarias',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './ventas-diarias.component.html',
  styleUrl: './ventas-diarias.component.css'
})
export class VentasDiariasComponent {
  constructor(public ordenServicio: OrdenServicio) {}
  ventasPorNombre: { [nombre: string]: number } = {};
  dameVentas() {
    this.ventasPorNombre = this.ordenServicio.dameVentasDia();
    console.log(this.ventasPorNombre); 
  }
}
