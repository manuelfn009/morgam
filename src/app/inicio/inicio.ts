import { Component, HostListener, AfterViewInit } from '@angular/core';
import { RevealDirective } from '../shared/directives/reveal';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './inicio.html',
  styleUrls: ['./inicio.css'],
})
export class Inicio implements AfterViewInit {

  isScrolled = false;

  // 🔥 Detectar scroll para navbar
  @HostListener('window:scroll', [])
  onScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // 🔥 Parallax del hero
  ngAfterViewInit() {
    const image = document.getElementById('heroImage');

    window.addEventListener('scroll', () => {
      const scroll = window.scrollY;
      if (image) {
        image.style.transform = `scale(1.1) translateY(${scroll * 0.2}px)`;
      }
    });
  }

}