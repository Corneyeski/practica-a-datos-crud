/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PracticaADatosCrudTestModule } from '../../../test.module';
import { AlumnosDetailComponent } from '../../../../../../main/webapp/app/entities/alumnos/alumnos-detail.component';
import { AlumnosService } from '../../../../../../main/webapp/app/entities/alumnos/alumnos.service';
import { Alumnos } from '../../../../../../main/webapp/app/entities/alumnos/alumnos.model';

describe('Component Tests', () => {

    describe('Alumnos Management Detail Component', () => {
        let comp: AlumnosDetailComponent;
        let fixture: ComponentFixture<AlumnosDetailComponent>;
        let service: AlumnosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PracticaADatosCrudTestModule],
                declarations: [AlumnosDetailComponent],
                providers: [
                    AlumnosService
                ]
            })
            .overrideTemplate(AlumnosDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlumnosDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlumnosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Alumnos(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.alumnos).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
