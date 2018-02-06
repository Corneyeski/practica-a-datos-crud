import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cursos } from './cursos.model';
import { CursosPopupService } from './cursos-popup.service';
import { CursosService } from './cursos.service';

@Component({
    selector: 'jhi-cursos-delete-dialog',
    templateUrl: './cursos-delete-dialog.component.html'
})
export class CursosDeleteDialogComponent {

    cursos: Cursos;

    constructor(
        private cursosService: CursosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cursosService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cursosListModification',
                content: 'Deleted an cursos'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cursos-delete-popup',
    template: ''
})
export class CursosDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cursosPopupService: CursosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cursosPopupService
                .open(CursosDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
