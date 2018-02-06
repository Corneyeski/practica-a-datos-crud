import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Matriculas } from './matriculas.model';
import { MatriculasService } from './matriculas.service';

@Injectable()
export class MatriculasPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private matriculasService: MatriculasService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.matriculasService.find(id)
                    .subscribe((matriculasResponse: HttpResponse<Matriculas>) => {
                        const matriculas: Matriculas = matriculasResponse.body;
                        matriculas.inicio = this.datePipe
                            .transform(matriculas.inicio, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.matriculasModalRef(component, matriculas);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.matriculasModalRef(component, new Matriculas());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    matriculasModalRef(component: Component, matriculas: Matriculas): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.matriculas = matriculas;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
