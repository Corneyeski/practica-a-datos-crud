/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PracticaADatosCrudTestModule } from '../../../test.module';
import { CursosComponent } from '../../../../../../main/webapp/app/entities/cursos/cursos.component';
import { CursosService } from '../../../../../../main/webapp/app/entities/cursos/cursos.service';
import { Cursos } from '../../../../../../main/webapp/app/entities/cursos/cursos.model';

describe('Component Tests', () => {

    describe('Cursos Management Component', () => {
        let comp: CursosComponent;
        let fixture: ComponentFixture<CursosComponent>;
        let service: CursosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PracticaADatosCrudTestModule],
                declarations: [CursosComponent],
                providers: [
                    CursosService
                ]
            })
            .overrideTemplate(CursosComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CursosComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CursosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Cursos(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.cursos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
