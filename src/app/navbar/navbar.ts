import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isScrolled = false;

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollTop = window.scrollY;

    if (scrollTop > 50 && !this.isScrolled) {
      this.isScrolled = true;
    } else if (scrollTop <= 50 && this.isScrolled) {
      this.isScrolled = false;
    }
  }

}