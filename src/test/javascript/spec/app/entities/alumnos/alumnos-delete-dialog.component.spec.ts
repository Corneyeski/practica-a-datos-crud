/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { PracticaADatosCrudTestModule } from '../../../test.module';
import { AlumnosDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/alumnos/alumnos-delete-dialog.component';
import { AlumnosService } from '../../../../../../main/webapp/app/entities/alumnos/alumnos.service';

describe('Component Tests', () => {

    describe('Alumnos Management Delete Component', () => {
        let comp: AlumnosDeleteDialogComponent;
        let fixture: ComponentFixture<AlumnosDeleteDialogComponent>;
        let service: AlumnosService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PracticaADatosCrudTestModule],
                declarations: [AlumnosDeleteDialogComponent],
                providers: [
                    AlumnosService
                ]
            })
            .overrideTemplate(AlumnosDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlumnosDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlumnosService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
