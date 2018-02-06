import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PracticaADatosCrudSharedModule } from '../../shared';
import {
    MatriculasService,
    MatriculasPopupService,
    MatriculasComponent,
    MatriculasDetailComponent,
    MatriculasDialogComponent,
    MatriculasPopupComponent,
    MatriculasDeletePopupComponent,
    MatriculasDeleteDialogComponent,
    matriculasRoute,
    matriculasPopupRoute,
} from './';

const ENTITY_STATES = [
    ...matriculasRoute,
    ...matriculasPopupRoute,
];

@NgModule({
    imports: [
        PracticaADatosCrudSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        MatriculasComponent,
        MatriculasDetailComponent,
        MatriculasDialogComponent,
        MatriculasDeleteDialogComponent,
        MatriculasPopupComponent,
        MatriculasDeletePopupComponent,
    ],
    entryComponents: [
        MatriculasComponent,
        MatriculasDialogComponent,
        MatriculasPopupComponent,
        MatriculasDeleteDialogComponent,
        MatriculasDeletePopupComponent,
    ],
    providers: [
        MatriculasService,
        MatriculasPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PracticaADatosCrudMatriculasModule {}
