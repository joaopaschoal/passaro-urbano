import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css']
})
export class OrdemCompraComponent implements OnInit {

  public endereco: string = '';
  public numero: string = '';
  public complemento: string = '';
  public formaPagamento: string = '';

  //controles de validação dos campos
  public enderecoValido: boolean;
  public numeroValido: boolean;
  public complementoValido: boolean;
  public formaPagamentoValido: boolean;

  //estados primitivos dos campos (pristine)
  public enderecoEstadoPrimitivo: boolean = true;
  public numeroEstadoPrimitivo: boolean = true;
  public complementoEstadoPrimitivo: boolean = true;
  public formaPagamentoEstadoPrimitivo: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  public atualizarEndereco(endereco: string): void {
    this.enderecoEstadoPrimitivo = false;
    this.enderecoValido = endereco && endereco.length > 3;
    this.endereco = endereco;
  }

  public atualizarNumero(numero: string): void {
    this.numeroEstadoPrimitivo = false;
    this.numeroValido = numero && !!numero.match(/^\d+$/);
    this.numero = numero;
  }

  public atualizarComplemento(complemento: string): void {
    this.complementoEstadoPrimitivo = false;
    this.complementoValido = !complemento || complemento.length > 3;
    this.complemento = complemento;
  }

  public atualizarFormaPagamento(formaPagamento: string): void {
    this.formaPagamentoEstadoPrimitivo = false;
    this.formaPagamentoValido = formaPagamento == 'dinheiro' || formaPagamento == 'debito';
    this.formaPagamento = formaPagamento;
  }

}
