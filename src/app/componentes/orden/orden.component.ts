import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { OrdenServicio } from '../../orden.service';
import { BrowserModule } from '@angular/platform-browser';


export interface Orden {
  tamanio: string;
  ingredientes: string[];
  cantidad: number;
  subtotal: number;
}

@Component({
  selector: 'app-orden',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './orden.component.html',
  styleUrls: ['./orden.component.css']
})
export class OrdenComponent {
  pizza = { tamanio: '', ingredientes: '', cantidad: 1, subtotal: 0 };
  formGroup !: FormGroup;


  ingredientes = [
    { nombre: 'Jamón', precio: 10 },
    { nombre: 'Piña', precio: 10 },
    { nombre: 'Champiñones', precio: 10 }
  ];
  constructor(public ordenServicio: OrdenServicio, private fb: FormBuilder) {

  }
  orden: string = "";
  subtotalCalculo: number = 0;
  total: number = 0;
  extras: number = 0;
  ngOnInit(): void {
    this.formGroup = this.initForm();

  }


  initForm(): FormGroup {
    return this.fb.group({
      nombre: [''],
      direccion: [''],
      tel: [''],
      tamanio: ['']?.values(),
      ingrediente1: [''],
      ingrediente2: [''],
      ingrediente3: [''],
      cantidad: [''],
      subtotal: [''],
    })
  }
  guardarPizza() {
    let { nombre, direccion, tel, tamanio, ingrediente1, ingrediente2, ingrediente3, cantidad, subtotal } = this.formGroup.value;
    const ingredienteSeleccionado = ingrediente1 ? 'Jamon' : '';
    const ingredienteSeleccionado2 = ingrediente2 ? 'Piña' : '';
    const ingredienteSeleccionado3 = ingrediente3 ? 'Champiñon' : '';
    const totalIngredientes = ingredienteSeleccionado + " " + ingredienteSeleccionado2 + " " + ingredienteSeleccionado3;
    let ingredientesSeleccionados = [ingredienteSeleccionado, ingredienteSeleccionado2, ingredienteSeleccionado3];
    let precioBase = 10;
    let cuentaIngredientes = ingredientesSeleccionados.filter(ingrediente =>
      ingrediente === 'Jamon' || ingrediente === 'Piña' || ingrediente === 'Champiñon'
    ).length;
    this.extras = cantidad * precioBase * cuentaIngredientes;
    console.log('Ingrediente seleccionado:', this.extras);

    switch (tamanio) {
      case 'Chica':
        this.subtotalCalculo = 40 * cantidad;
        break;
      case 'Mediana':
        this.subtotalCalculo = 80 * cantidad;
        break;
      case 'Grande':
        this.subtotalCalculo = 120 * cantidad;
        break;

      default:
        this.subtotalCalculo = 0;
        break;
    }
    this.total = this.subtotalCalculo + this.extras;
    console.log({ nombre, direccion, tel, tamanio, ingrediente1, cantidad });
    this.ordenServicio.add(nombre, direccion, tel, tamanio, totalIngredientes, cantidad, this.total);
    this.formGroup.reset();
  }
}
