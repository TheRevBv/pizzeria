import { Component } from '@angular/core';
import CapturaPedidoComponent from './captura-pedido/pedido.component';
import DetallePedidoComponent from './detalle-pedido/detalle-pedido.component';
import VentasDiaComponent from './ventas-dia/ventas-dia.component';

@Component({
  selector: 'app-pizzas',
  standalone: true,
  imports: [CapturaPedidoComponent, DetallePedidoComponent, VentasDiaComponent],
  templateUrl: './pizzas.component.html',
  styleUrl: './pizzas.component.css',
})
export default class PizzasComponent {}
