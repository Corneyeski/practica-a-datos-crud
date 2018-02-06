/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PracticaADatosCrudTestModule } from '../../../test.module';
import { CursosDetailComponent } from '../../../../../../main/webapp/app/entities/cursos/cursos-detail.component';
import { CursosService } from '../../../../../../main/webapp/app/entities/cursos/cursos.service';
import { Cursos } from '../../../../../../main/webapp/app/entities/cursos/cursos.model';

describe('Component Tests', () => {

    describe('Cursos Management Detail Component', () => {
        let comp: CursosDetailComponent;
        let fixture: ComponentFixture<CursosDetailComponent>;
        let service: CursosService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PracticaADatosCrudTestModule],
                declarations: [CursosDetailComponent],
                providers: [
                    CursosService
                ]
            })
            .overrideTemplate(CursosDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CursosDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CursosService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Cursos(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.cursos).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
