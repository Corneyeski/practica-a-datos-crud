import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Alumnos } from './alumnos.model';
import { AlumnosService } from './alumnos.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-alumnos',
    templateUrl: './alumnos.component.html'
})
export class AlumnosComponent implements OnInit, OnDestroy {
alumnos: Alumnos[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private alumnosService: AlumnosService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.alumnosService.query().subscribe(
            (res: HttpResponse<Alumnos[]>) => {
                this.alumnos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAlumnos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Alumnos) {
        return item.id;
    }
    registerChangeInAlumnos() {
        this.eventSubscriber = this.eventManager.subscribe('alumnosListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
