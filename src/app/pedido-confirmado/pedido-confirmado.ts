import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-pedido-confirmado',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './pedido-confirmado.html'
})
export class PedidoConfirmado {
  readonly numero = inject(ActivatedRoute).snapshot.queryParamMap.get('numero') ?? 'MORGAM';
}
