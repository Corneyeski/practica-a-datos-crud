/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { PracticaADatosCrudTestModule } from '../../../test.module';
import { MatriculasComponent } from '../../../../../../main/webapp/app/entities/matriculas/matriculas.component';
import { MatriculasService } from '../../../../../../main/webapp/app/entities/matriculas/matriculas.service';
import { Matriculas } from '../../../../../../main/webapp/app/entities/matriculas/matriculas.model';

describe('Component Tests', () => {

    describe('Matriculas Management Component', () => {
        let comp: MatriculasComponent;
        let fixture: ComponentFixture<MatriculasComponent>;
        let service: MatriculasService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PracticaADatosCrudTestModule],
                declarations: [MatriculasComponent],
                providers: [
                    MatriculasService
                ]
            })
            .overrideTemplate(MatriculasComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MatriculasComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatriculasService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Matriculas(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.matriculas[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
