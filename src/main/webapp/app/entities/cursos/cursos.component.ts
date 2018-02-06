import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Cursos } from './cursos.model';
import { CursosService } from './cursos.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cursos',
    templateUrl: './cursos.component.html'
})
export class CursosComponent implements OnInit, OnDestroy {
cursos: Cursos[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cursosService: CursosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cursosService.query().subscribe(
            (res: HttpResponse<Cursos[]>) => {
                this.cursos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCursos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Cursos) {
        return item.id;
    }
    registerChangeInCursos() {
        this.eventSubscriber = this.eventManager.subscribe('cursosListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
