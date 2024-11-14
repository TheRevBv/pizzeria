// src/app/order.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrdenServicio {
  ordenes: any[] = [];
  pedido: any[] = [];

  constructor() { }

  add(nombre: string, direccion: string, tel: string, tamanio: string, ingredientes: string, cantidad: number, subtotal: number) {
    const nuevaOrden = {
      nombre,
      direccion,
      tel,
      tamanio,
      ingredientes,
      cantidad,
      subtotal
    };
    this.ordenes.push(nuevaOrden);
  }
  terminarPedido() {
    const pedidoGuardado = JSON.parse(localStorage.getItem('pedido') || '[]');

    pedidoGuardado.push(...this.ordenes);

    localStorage.setItem('pedido', JSON.stringify(pedidoGuardado));

    this.ordenes = [];

    pedidoGuardado.forEach((orden: any) => {
      console.log(orden.nombre);
      console.log(orden.direccion);
    });

  }
  dameVentasDia() {
    const pedidoGuardado = JSON.parse(localStorage.getItem('pedido') || '[]');


    const ventasPorNombre = pedidoGuardado.reduce((totales: any, orden: any) => {
      if (!totales[orden.nombre]) {
        totales[orden.nombre] = 0;
      }
      totales[orden.nombre] += orden.subtotal;
      return totales;
    }, {});

    return ventasPorNombre;
  }
  quitarOrden(index: number) {
    this.ordenes.splice(index, 1);
  }

}