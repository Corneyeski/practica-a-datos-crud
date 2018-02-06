/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { PracticaADatosCrudTestModule } from '../../../test.module';
import { MatriculasDetailComponent } from '../../../../../../main/webapp/app/entities/matriculas/matriculas-detail.component';
import { MatriculasService } from '../../../../../../main/webapp/app/entities/matriculas/matriculas.service';
import { Matriculas } from '../../../../../../main/webapp/app/entities/matriculas/matriculas.model';

describe('Component Tests', () => {

    describe('Matriculas Management Detail Component', () => {
        let comp: MatriculasDetailComponent;
        let fixture: ComponentFixture<MatriculasDetailComponent>;
        let service: MatriculasService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [PracticaADatosCrudTestModule],
                declarations: [MatriculasDetailComponent],
                providers: [
                    MatriculasService
                ]
            })
            .overrideTemplate(MatriculasDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MatriculasDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatriculasService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Matriculas(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.matriculas).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
