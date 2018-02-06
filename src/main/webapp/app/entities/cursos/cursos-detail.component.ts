import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Cursos } from './cursos.model';
import { CursosService } from './cursos.service';

@Component({
    selector: 'jhi-cursos-detail',
    templateUrl: './cursos-detail.component.html'
})
export class CursosDetailComponent implements OnInit, OnDestroy {

    cursos: Cursos;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cursosService: CursosService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCursos();
    }

    load(id) {
        this.cursosService.find(id)
            .subscribe((cursosResponse: HttpResponse<Cursos>) => {
                this.cursos = cursosResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCursos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cursosListModification',
            (response) => this.load(this.cursos.id)
        );
    }
}
