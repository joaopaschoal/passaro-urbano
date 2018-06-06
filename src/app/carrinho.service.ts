import { ItemCarrinho } from './shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

export class CarrinhoService {
  private itens: Array<ItemCarrinho> = [];

  public getItens(): ItemCarrinho[] {
    return this.itens;
  }

  public getValorTotalCarrinho(): number {
    var total: number = 0;
    this.itens.forEach((item) => total += (item.valor * item.quantidade));
    return total;
  }

  public adicionarItem(oferta: Oferta): void {
    let itemCarrinho = new ItemCarrinho(
      oferta.id,
      oferta.imagens[0],
      oferta.titulo,
      oferta.descricao_oferta,
      oferta.valor,
      1
    );

    let itemExistente = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);

    if (itemExistente) {
      this.incrementarQuantidade(itemExistente);
    } else {
      this.itens.push(itemCarrinho);
    }
  }

  public incrementarQuantidade(itemCarrinho: ItemCarrinho): void {
    let itemExistente = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    if (itemExistente) {
      itemExistente.quantidade++;
    }
  }

  public decrementarQuantidade(itemCarrinho: ItemCarrinho): void {
    let itemExistente = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
    if (itemExistente) {
      itemExistente.quantidade--;
      if (itemExistente.quantidade === 0) {
        var idxItem = this.itens.indexOf(itemExistente);

        this.itens.splice(idxItem, 1);
      }
    }
  }

  public limparItens(): void {
    this.itens = [];
  }
}
