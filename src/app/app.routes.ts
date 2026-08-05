import { Routes } from '@angular/router';
import { Inicio } from './inicio/inicio';
import { Productos } from './productos/productos';

export const routes: Routes = [
   
 {
    path: '',
    component: Inicio   
  },
  {
    path: 'productos',
    component: Productos
  }
]