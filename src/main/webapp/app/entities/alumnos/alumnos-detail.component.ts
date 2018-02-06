import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Alumnos } from './alumnos.model';
import { AlumnosService } from './alumnos.service';

@Component({
    selector: 'jhi-alumnos-detail',
    templateUrl: './alumnos-detail.component.html'
})
export class AlumnosDetailComponent implements OnInit, OnDestroy {

    alumnos: Alumnos;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private alumnosService: AlumnosService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAlumnos();
    }

    load(id) {
        this.alumnosService.find(id)
            .subscribe((alumnosResponse: HttpResponse<Alumnos>) => {
                this.alumnos = alumnosResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAlumnos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'alumnosListModification',
            (response) => this.load(this.alumnos.id)
        );
    }
}
