import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrdemCompraService } from '../ordem-compra.service'
import { CarrinhoService } from '../carrinho.service'; // in this case didnt use {} bcs of the 'default' export, just to practice
import { Pedido } from '../shared/pedido.model';
import { ItemCarrinho } from '../shared/item-carrinho.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [ OrdemCompraService ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedido: number;
  public itensCarrinho: ItemCarrinho[] = [];

  public formulario: FormGroup = new FormGroup({
    endereco: new FormControl(null, [ Validators.required, Validators.minLength(3), Validators.maxLength(120) ]),
    numero: new FormControl(null, [ Validators.required, Validators.minLength(1), Validators.maxLength(20) ]),
    complemento: new FormControl(null),
    formaDePagamento: new FormControl(null, [ Validators.required ])
  });


  constructor(
    private ordemCompraService: OrdemCompraService,
    private carrinhoService: CarrinhoService
  ) { }

  ngOnInit() {
    this.itensCarrinho = this.carrinhoService.getItens();
  }

  public incrementarQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.incrementarQuantidade(item);
  }

  public decrementarQuantidade(item: ItemCarrinho): void {
    this.carrinhoService.decrementarQuantidade(item);
  }

  public confirmarCompra(): void {
    console.log(this.formulario);
    if (!this.formulario.valid) {
      this.destacarCamposInvalidosForm();
    } else {
      if (this.carrinhoService.getItens().length > 0) {
        let pedido: Pedido = new Pedido(
          this.formulario.value.endereco,
          this.formulario.value.numero,
          this.formulario.value.complemento,
          this.formulario.value.formaDePagamento,
          this.carrinhoService.getItens()
        );

        this.ordemCompraService.efetivarCompra(pedido)
          .subscribe((idPedido: number) => {
            this.idPedido = idPedido;
            this.carrinhoService.limparItens();
          });
      } else {
        alert('Você não incluiu nenhum item ao seu carrinho.');
      }

    }
  }

  public destacarCamposInvalidosForm(): void {
    this.formulario.get('endereco').markAsTouched();
    this.formulario.get('numero').markAsTouched();
    this.formulario.get('complemento').markAsTouched();
    this.formulario.get('formaDePagamento').markAsTouched();
  }
}
