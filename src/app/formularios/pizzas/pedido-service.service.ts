import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface Pizza {
  tamano: string;
  ingredientes2: string[];
  cantidad: number;
  subtotal: number;
}

interface Pedido {
  nombreCliente: string;
  direccion: string;
  telefono: string;
  fechaCompra: string;
  pizzas: Pizza[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private pedidos: Pedido[] = [];
  private pizzas: Pizza[] = [];
  
  private clienteInfo = {
    nombreCliente: '',
    direccion: '',
    telefono: '',
    fechaCompra: ''
  };
  

  private pedidosSubject = new BehaviorSubject<Pedido[]>([]);  
  pedidos$ = this.pedidosSubject.asObservable();  
  
  private pizzasSubject = new BehaviorSubject<Pizza[]>([]);
  pizzas$ = this.pizzasSubject.asObservable();

  constructor() {
    this.inicializarPedidos();
  }

  private inicializarPedidos() {
    const pedidosGuardados = localStorage.getItem('pedidos');
    this.pedidos = pedidosGuardados ? JSON.parse(pedidosGuardados) : [];
    this.pedidosSubject.next(this.pedidos);  
  }

  setDatosCliente(nombre: string, direccion: string, telefono: string, fecha: string) {
    this.clienteInfo = { nombreCliente: nombre, direccion: direccion, telefono: telefono, fechaCompra: fecha };
  }

  getDatosCliente() {
    return this.clienteInfo;
  }

  agregarPizza(pizza: Pizza) {
    this.pizzas.push(pizza);
    this.pizzasSubject.next(this.pizzas);
  }

  obtenerPizzas(): Pizza[] {
    return this.pizzas;
  }

  eliminarPizza(pizza: Pizza) {
    this.pizzas = this.pizzas.filter(p => p !== pizza);
    this.pizzasSubject.next(this.pizzas);
  }

  finalizarPedido() {
    const total = this.pizzas.reduce((acc, pizza) => acc + pizza.subtotal, 0);
    const pedido: Pedido = {
      ...this.clienteInfo,
      pizzas: this.pizzas,
      total: total
    };
    this.pedidos.push(pedido);
    this.guardarPedidos(); 
    this.pedidosSubject.next(this.pedidos);  
    this.pizzas = [];  
    this.pizzasSubject.next(this.pizzas);  
  }

  obtenerVentasTotalesPorDiaSemana(dia: string): Pedido[] {
    const diasDeLaSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  
    
    const indiceDia = diasDeLaSemana.indexOf(dia);
    
    if (indiceDia === -1) {
      return []; 
    }
  
    return this.pedidos.filter(pedido => {
      const fechaPedido = new Date(pedido.fechaCompra);
 
      return fechaPedido.getDay() === indiceDia;
    });
  }
  
  
  private guardarPedidos() {
    localStorage.setItem('pedidos', JSON.stringify(this.pedidos));
  }
}
