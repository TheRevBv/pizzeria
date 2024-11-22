import { Component } from '@angular/core';
import { PedidoService } from '../pedido-service.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-captura-pedido',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pedido.component.html',
  styles: ``
})
export default class CapturaPedidoComponent {

  pedidoForm: FormGroup;

  constructor(private fb: FormBuilder, private pedidoService: PedidoService) {
    this.pedidoForm = this.fb.group({
      nombreCliente: [''],
      direccion: [''],
      telefono: [''],
      fechaCompra: [''],
      tamanoPizza: [''],
      jamon: [false],
      pina: [false],
      champinones: [false],
      cantidadPizzas: [1]
    });
  }

  agregarPizza() {
    const { nombreCliente, direccion, telefono, fechaCompra, tamanoPizza, cantidadPizzas } = this.pedidoForm.value;

    const ingredientesSeleccionados = ['jamon', 'pina', 'champinones']
      .filter(ing => this.pedidoForm.get(ing)?.value)
      .map(ing => ing.charAt(0).toUpperCase() + ing.slice(1));

    const pizza = {
      tamano: tamanoPizza,
      ingredientes2: ingredientesSeleccionados,
      cantidad: cantidadPizzas,
      subtotal: this.calcularSubtotal(tamanoPizza, ingredientesSeleccionados.length, cantidadPizzas)
    };

   
    this.pedidoService.agregarPizza(pizza);
    this.pedidoService.setDatosCliente(nombreCliente, direccion, telefono, fechaCompra);

    
    this.pedidoForm.reset({
      nombreCliente, direccion, telefono, fechaCompra,
      cantidadPizzas: 1, tamanoPizza: '', jamon: false, pina: false, champinones: false
    });
  }

  calcularSubtotal(tamano: 'Chica' | 'Mediana' | 'Grande', ingredientesCount: number, cantidad: number): number {
    const precios = { 'Chica': 40, 'Mediana': 80, 'Grande': 120 };
    const precioBase = precios[tamano] ?? 0; 
    const subtotal = (precioBase + ingredientesCount * 10) * cantidad;
    return subtotal;
  }
  
}
