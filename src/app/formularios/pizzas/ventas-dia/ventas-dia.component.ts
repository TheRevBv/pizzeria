import { Component } from '@angular/core';
import { PedidoService } from '../pedido-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ventas-dia',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './ventas-dia.component.html',
  styles: ``,
})
export default class VentasDiaComponent {
  pedidosDia: any[] = [];
  ventasTotalesDia: number = 0;
  diaSeleccionado: string = '';

  constructor(private pedidoService: PedidoService) {}

  mostrarVentasPorDia(): void {
    if (this.diaSeleccionado) {

      this.pedidosDia = this.pedidoService.obtenerVentasTotalesPorDiaSemana(this.diaSeleccionado);


      this.ventasTotalesDia = this.pedidosDia.reduce((total, pedido) => total + (pedido.total || 0), 0);
    } else {
      alert("Por favor, selecciona un día.");
    }
  }
}
