import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Matriculas } from './matriculas.model';
import { MatriculasService } from './matriculas.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-matriculas',
    templateUrl: './matriculas.component.html'
})
export class MatriculasComponent implements OnInit, OnDestroy {
matriculas: Matriculas[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private matriculasService: MatriculasService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.matriculasService.query().subscribe(
            (res: HttpResponse<Matriculas[]>) => {
                this.matriculas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMatriculas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Matriculas) {
        return item.id;
    }
    registerChangeInMatriculas() {
        this.eventSubscriber = this.eventManager.subscribe('matriculasListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
