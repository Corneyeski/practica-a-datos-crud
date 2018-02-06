/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PracticaADatosCrudTestModule } from '../../../test.module';
import { AlumnosComponent } from '../../../../../../main/webapp/app/entities/alumnos/alumnos.component';
import { AlumnosService } from '../../../../../../main/webapp/app/entities/alumnos/alumnos.service';
import { Alumnos } from '../../../../../../main/webapp/app/entities/alumnos/alumnos.model';

describe('Component Tests', () => {

    describe('Alumnos Management Component', () => {
        let comp: AlumnosComponent;
        let fixture: ComponentFixture<AlumnosComponent>;
        let service: AlumnosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PracticaADatosCrudTestModule],
                declarations: [AlumnosComponent],
                providers: [
                    AlumnosService
                ]
            })
            .overrideTemplate(AlumnosComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AlumnosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AlumnosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Alumnos(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.alumnos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
