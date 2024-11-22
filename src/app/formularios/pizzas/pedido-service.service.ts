import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Pizza {
  tamano: string;
  ingredientes2: string[];
  cantidad: number;
  subtotal: number;
}

export interface Pedido {
  id?: string;
  nombreCliente: string;
  direccion: string;
  telefono: string;
  fechaCompra: string;
  pizzas: Pizza[];
  total: number;
}

@Injectable({
  providedIn: 'root',
})
export class PedidoService {
  // private pedidosSubject = new BehaviorSubject<Pedido[]>([]);
  // pedidos$ = this.pedidosSubject.asObservable();

  private pizzas: Pizza[] = [];

  private pizzasSubject = new BehaviorSubject<Pizza[]>([]);
  pizzas$ = this.pizzasSubject.asObservable();

  private apiUrl = 'http://localhost:3000/pedidos';

  private clienteInfo = {
    nombreCliente: '',
    direccion: '',
    telefono: '',
    fechaCompra: '',
  };

  constructor(private http: HttpClient) {
    // this.cargarPedidos();
  }

  // private cargarPedidos() {
  //   this.http.get<Pedido[]>(this.apiUrl).subscribe(
  //     (pedidos) => this.pedidosSubject.next(pedidos),
  //     (error) => console.error(error)
  //   );
  // }

  setDatosCliente(
    nombre: string,
    direccion: string,
    telefono: string,
    fecha: string
  ) {
    this.clienteInfo = {
      nombreCliente: nombre,
      direccion: direccion,
      telefono: telefono,
      fechaCompra: fecha,
    };
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
    this.pizzas = this.pizzas.filter((p) => p !== pizza);
    this.pizzasSubject.next(this.pizzas);
  }

  //Pedidos

  finalizarPedido() {
    const total = this.pizzas.reduce((acc, pizza) => acc + pizza.subtotal, 0);
    const pedido: Pedido = {
      ...this.clienteInfo,
      pizzas: this.pizzas,
      total: total,
    };
    this.agregarPedido(pedido);
    // this.pedidos.push(pedido);
    // this.guardarPedidos();
    // this.pedidosSubject.next(this.pedidos);
    this.pizzas = [];
    this.pizzasSubject.next(this.pizzas);
  }

  agregarPedido(pedido: Pedido) {
    return this.http.post<Pedido>(this.apiUrl, pedido);
  }

  eliminarPedido(id: string) {
    const url = `${this.apiUrl}/${id}`;
    this.http.delete(url);
  }

  obtenerVentasTotalesPorDiaSemana(dia: string): Observable<Pedido[]> {
    const url = `${this.apiUrl}/ventas/dia?dia=${dia}`;
    return this.http.get<Pedido[]>(url);
  }
}
