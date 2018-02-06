import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Alumnos } from './alumnos.model';
import { AlumnosPopupService } from './alumnos-popup.service';
import { AlumnosService } from './alumnos.service';

@Component({
    selector: 'jhi-alumnos-dialog',
    templateUrl: './alumnos-dialog.component.html'
})
export class AlumnosDialogComponent implements OnInit {

    alumnos: Alumnos;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private alumnosService: AlumnosService,
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
        if (this.alumnos.id !== undefined) {
            this.subscribeToSaveResponse(
                this.alumnosService.update(this.alumnos));
        } else {
            this.subscribeToSaveResponse(
                this.alumnosService.create(this.alumnos));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Alumnos>>) {
        result.subscribe((res: HttpResponse<Alumnos>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Alumnos) {
        this.eventManager.broadcast({ name: 'alumnosListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-alumnos-popup',
    template: ''
})
export class AlumnosPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alumnosPopupService: AlumnosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.alumnosPopupService
                    .open(AlumnosDialogComponent as Component, params['id']);
            } else {
                this.alumnosPopupService
                    .open(AlumnosDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
