import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PracticaADatosCrudSharedModule } from '../../shared';
import {
    AlumnosService,
    AlumnosPopupService,
    AlumnosComponent,
    AlumnosDetailComponent,
    AlumnosDialogComponent,
    AlumnosPopupComponent,
    AlumnosDeletePopupComponent,
    AlumnosDeleteDialogComponent,
    alumnosRoute,
    alumnosPopupRoute,
} from './';

const ENTITY_STATES = [
    ...alumnosRoute,
    ...alumnosPopupRoute,
];

@NgModule({
    imports: [
        PracticaADatosCrudSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AlumnosComponent,
        AlumnosDetailComponent,
        AlumnosDialogComponent,
        AlumnosDeleteDialogComponent,
        AlumnosPopupComponent,
        AlumnosDeletePopupComponent,
    ],
    entryComponents: [
        AlumnosComponent,
        AlumnosDialogComponent,
        AlumnosPopupComponent,
        AlumnosDeleteDialogComponent,
        AlumnosDeletePopupComponent,
    ],
    providers: [
        AlumnosService,
        AlumnosPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PracticaADatosCrudAlumnosModule {}
