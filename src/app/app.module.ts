import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import CapturaPedidoComponent from "./formularios/pizzas/captura-pedido/pedido.component";
import DetallePedidoComponent from "./formularios/pizzas/detalle-pedido/detalle-pedido.component";
import VentasDiaComponent from "./formularios/pizzas/ventas-dia/ventas-dia.component";  // Importa tu componente principal

@NgModule({
  declarations: [
    AppComponent  // Asegúrate de declarar tu componente aquí
  ],
  imports: [
    BrowserModule // Importa BrowserModule, necesario para las aplicaciones Angular
    ,
    CapturaPedidoComponent,
    DetallePedidoComponent,
    VentasDiaComponent
],
  providers: [],
  bootstrap: [AppComponent]  // Define el componente que se debe cargar al inicio
})
export class AppModule { }
