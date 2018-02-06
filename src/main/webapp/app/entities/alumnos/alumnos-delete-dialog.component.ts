import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Alumnos } from './alumnos.model';
import { AlumnosPopupService } from './alumnos-popup.service';
import { AlumnosService } from './alumnos.service';

@Component({
    selector: 'jhi-alumnos-delete-dialog',
    templateUrl: './alumnos-delete-dialog.component.html'
})
export class AlumnosDeleteDialogComponent {

    alumnos: Alumnos;

    constructor(
        private alumnosService: AlumnosService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.alumnosService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'alumnosListModification',
                content: 'Deleted an alumnos'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-alumnos-delete-popup',
    template: ''
})
export class AlumnosDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private alumnosPopupService: AlumnosPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.alumnosPopupService
                .open(AlumnosDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
