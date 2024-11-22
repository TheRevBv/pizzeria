import { Component, OnInit, OnDestroy } from '@angular/core';
import { PedidoService } from '../pedido-service.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detalle-pedido',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './detalle-pedido.component.html',
  styles: ``
})
export default class DetallePedidoComponent implements OnInit, OnDestroy {

  pizzas: any[] = [];
  totalPedido: number = 0;
  private subscription: Subscription = new Subscription();

  constructor(public pedidoService: PedidoService) {}

  ngOnInit(): void {
   
    this.subscription = this.pedidoService.pizzas$.subscribe((pizzas) => {
      this.pizzas = pizzas;
      this.calcularTotalPedido();
    });
  }

  ngOnDestroy(): void {
    
    this.subscription.unsubscribe();
  }

  quitarUltimoPedido(): void {
    if (this.pizzas.length) {
      const ultimaPizza = this.pizzas[this.pizzas.length - 1];
      this.pedidoService.eliminarPizza(ultimaPizza);
    }
  }

  finalizarPedido(): void {
    const confirmacion = window.confirm(`El total del pedido es $${this.totalPedido}. ¿Deseas confirmar el pedido?`);
    if (confirmacion) {
      this.pedidoService.finalizarPedido();
      alert('Pedido guardado con éxito');
    } else {
      alert('Puedes editar tu pedido');
    }
  }

  private calcularTotalPedido(): void {
 
    this.totalPedido = this.pizzas.reduce((total, pizza) => total + (pizza.subtotal || 0), 0);
  }
}
