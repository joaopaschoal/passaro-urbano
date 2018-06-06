import { Pedido } from './shared/pedido.model';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { URL_API } from './shared/constantes'

@Injectable()
export class OrdemCompraService {

  constructor(
    private http: Http
  ) {}

  public efetivarCompra(pedido: Pedido): Observable<number> {

    let headers: Headers = new Headers();
    headers.append('content-type', 'application/json');

    return this.http.post(
      `${URL_API}/pedidos`,
      JSON.stringify(pedido),
      new RequestOptions({
        headers: headers
      })
    )
    .map((resposta: Response) => resposta.json().id);
  }

}
