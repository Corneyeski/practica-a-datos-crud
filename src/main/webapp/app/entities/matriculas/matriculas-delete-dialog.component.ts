import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Matriculas } from './matriculas.model';
import { MatriculasPopupService } from './matriculas-popup.service';
import { MatriculasService } from './matriculas.service';

@Component({
    selector: 'jhi-matriculas-delete-dialog',
    templateUrl: './matriculas-delete-dialog.component.html'
})
export class MatriculasDeleteDialogComponent {

    matriculas: Matriculas;

    constructor(
        private matriculasService: MatriculasService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.matriculasService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'matriculasListModification',
                content: 'Deleted an matriculas'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-matriculas-delete-popup',
    template: ''
})
export class MatriculasDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private matriculasPopupService: MatriculasPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.matriculasPopupService
                .open(MatriculasDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
