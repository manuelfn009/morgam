import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CarritoService } from '../core/services/carrito.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html'
})
export class Checkout {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly carrito = inject(CarritoService);
  enviado = false;

  readonly formulario = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    apellidos: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9+\s()-]{7,20}$/)]],
    direccion: ['', [Validators.required, Validators.minLength(5)]],
    localidad: ['', Validators.required],
    provincia: ['', Validators.required],
    codigoPostal: ['', [Validators.required, Validators.pattern(/^[0-9]{5}$/)]],
    notas: [''],
    metodoPago: ['transferencia', Validators.required],
    privacidad: [false, Validators.requiredTrue]
  });

  finalizarPedido(): void {
    this.enviado = true;
    if (this.formulario.invalid || !this.carrito.lineas().length) {
      this.formulario.markAllAsTouched();
      return;
    }

    const numero = `MOR-${Date.now().toString().slice(-8)}`;
    const pedido = {
      numero,
      fecha: new Date().toISOString(),
      cliente: this.formulario.getRawValue(),
      lineas: this.carrito.lineas(),
      total: this.carrito.total()
    };

    localStorage.setItem('morgam_ultimo_pedido', JSON.stringify(pedido));
    this.carrito.vaciar();
    void this.router.navigate(['/pedido-confirmado'], { queryParams: { numero } });
  }

  campoInvalido(nombre: keyof typeof this.formulario.controls): boolean {
    const campo = this.formulario.controls[nombre];
    return campo.invalid && (campo.touched || this.enviado);
  }
}
