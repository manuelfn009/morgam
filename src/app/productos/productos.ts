import {
  Component,
  HostListener,
  AfterViewInit
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { RevealDirective } from '../shared/directives/reveal';

import productosJson from '../../assets/productos.json';

@Component({
  selector: 'app-productos',
   imports: [
    CommonModule,
    RevealDirective
  ],
  templateUrl: './productos.html',
  styleUrl: './productos.css',
})
export class Productos implements AfterViewInit{

  isScrolled = false;

  productos = productosJson;
agregarAlCarrito(producto: any): void {
  console.log('Producto añadido al carrito:', producto);
}
  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isScrolled = window.scrollY > 50;
  }

  ngAfterViewInit(): void {
    const image = document.getElementById('heroImage');

    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;

      if (image) {
        image.style.transform =
          `scale(1.1) translateY(${scroll * 0.2}px)`;
      }
    });
  }
}
