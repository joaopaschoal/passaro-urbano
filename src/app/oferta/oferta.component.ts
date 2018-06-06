import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Oferta } from '../shared/oferta.model';
import { ItemCarrinho } from '../shared/item-carrinho.model';
import { OfertasService } from '../ofertas.service';
import { CarrinhoService } from '../carrinho.service';
import 'rxjs/Rx';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit {

  public oferta: Oferta;

  constructor(
    private route: ActivatedRoute,
    private ofertasService: OfertasService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    console.log(this.carrinhoService.getItens());
    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertaPorId(parametros.id).then((oferta: Oferta) => {
        this.oferta = oferta;
      });
    });
  }

  ngOnDestroy() {
  }

  public adicionarAoCarrinho(oferta: Oferta): void {
    this.carrinhoService.adicionarItem(oferta);
    console.log(this.carrinhoService.getItens());
  }

}
