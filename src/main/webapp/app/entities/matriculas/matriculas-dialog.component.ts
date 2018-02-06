import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Matriculas } from './matriculas.model';
import { MatriculasPopupService } from './matriculas-popup.service';
import { MatriculasService } from './matriculas.service';
import { Alumnos, AlumnosService } from '../alumnos';
import { Cursos, CursosService } from '../cursos';

@Component({
    selector: 'jhi-matriculas-dialog',
    templateUrl: './matriculas-dialog.component.html'
})
export class MatriculasDialogComponent implements OnInit {

    matriculas: Matriculas;
    isSaving: boolean;

    alumnos: Alumnos[];

    cursos: Cursos[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private matriculasService: MatriculasService,
        private alumnosService: AlumnosService,
        private cursosService: CursosService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.alumnosService.query()
            .subscribe((res: HttpResponse<Alumnos[]>) => { this.alumnos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cursosService.query()
            .subscribe((res: HttpResponse<Cursos[]>) => { this.cursos = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.matriculas.id !== undefined) {
            this.subscribeToSaveResponse(
                this.matriculasService.update(this.matriculas));
        } else {
            this.subscribeToSaveResponse(
                this.matriculasService.create(this.matriculas));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Matriculas>>) {
        result.subscribe((res: HttpResponse<Matriculas>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Matriculas) {
        this.eventManager.broadcast({ name: 'matriculasListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAlumnosById(index: number, item: Alumnos) {
        return item.id;
    }

    trackCursosById(index: number, item: Cursos) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-matriculas-popup',
    template: ''
})
export class MatriculasPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private matriculasPopupService: MatriculasPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.matriculasPopupService
                    .open(MatriculasDialogComponent as Component, params['id']);
            } else {
                this.matriculasPopupService
                    .open(MatriculasDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
