import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  cliente = { nombre: '', direccion: '', tel: '', pizzas: '' };
  
  @Output() clienteData = new EventEmitter();

  guardaCliente() {
    this.clienteData.emit(this.cliente);
  }
}
