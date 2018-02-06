import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Matriculas } from './matriculas.model';
import { MatriculasService } from './matriculas.service';

@Component({
    selector: 'jhi-matriculas-detail',
    templateUrl: './matriculas-detail.component.html'
})
export class MatriculasDetailComponent implements OnInit, OnDestroy {

    matriculas: Matriculas;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private matriculasService: MatriculasService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMatriculas();
    }

    load(id) {
        this.matriculasService.find(id)
            .subscribe((matriculasResponse: HttpResponse<Matriculas>) => {
                this.matriculas = matriculasResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMatriculas() {
        this.eventSubscriber = this.eventManager.subscribe(
            'matriculasListModification',
            (response) => this.load(this.matriculas.id)
        );
    }
}
