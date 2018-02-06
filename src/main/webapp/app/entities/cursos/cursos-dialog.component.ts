import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cursos } from './cursos.model';
import { CursosPopupService } from './cursos-popup.service';
import { CursosService } from './cursos.service';

@Component({
    selector: 'jhi-cursos-dialog',
    templateUrl: './cursos-dialog.component.html'
})
export class CursosDialogComponent implements OnInit {

    cursos: Cursos;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cursosService: CursosService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cursos.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cursosService.update(this.cursos));
        } else {
            this.subscribeToSaveResponse(
                this.cursosService.create(this.cursos));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Cursos>>) {
        result.subscribe((res: HttpResponse<Cursos>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Cursos) {
        this.eventManager.broadcast({ name: 'cursosListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cursos-popup',
    template: ''
})
export class CursosPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cursosPopupService: CursosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cursosPopupService
                    .open(CursosDialogComponent as Component, params['id']);
            } else {
                this.cursosPopupService
                    .open(CursosDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
