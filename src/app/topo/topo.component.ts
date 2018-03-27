import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import '../shared/rxjs-extensions';

import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
    selector: 'app-topo',
    templateUrl: './topo.component.html',
    styleUrls: ['./topo.component.css'],
    providers: [OfertasService]
})
export class TopoComponent implements OnInit {

    public ofertas: Observable<Oferta[]>;
    // public ofertasEncontradas: Array<Oferta>;
    private subjectPesquisa: Subject<string> = new Subject<string>();

    constructor(
        private ofertasService: OfertasService
        ) { }

    ngOnInit() {
        this.ofertas = this.subjectPesquisa
            .debounceTime(1000) //aguarda 1s antes de executar o switchMap
            .distinctUntilChanged()
            .switchMap((termo: string) => {
                if (termo.trim() === '') {
                    return Observable.of<Array<Oferta>>([]);
                }
                return this.ofertasService.getOfertasPorTermo(termo);
            })
            .catch((erro: any) => {
                console.log(erro);
                return Observable.of<Array<Oferta>>([]);
            });
    }

    public pesquisar(termoDaBusca: string): void {

        // console.log((<HTMLInputElement>(event.target)).value);

        // this.ofertas = this.ofertasService.getOfertasPorTermo(termo);
        // this.ofertas.subscribe(
        //   (ofertas: Oferta[]) => console.log(ofertas),
        //   (erro: any) => console.log('Erro status: ' + erro.status),
        //   () => console.log('Fluxo de eventos completo')
        // );

        this.subjectPesquisa.next(termoDaBusca);
    }

    public limparResultadosPesquisa(): void {
        this.subjectPesquisa.next(' ');
    }

}
