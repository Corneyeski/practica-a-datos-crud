import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PracticaADatosCrudSharedModule } from '../../shared';
import {
    CursosService,
    CursosPopupService,
    CursosComponent,
    CursosDetailComponent,
    CursosDialogComponent,
    CursosPopupComponent,
    CursosDeletePopupComponent,
    CursosDeleteDialogComponent,
    cursosRoute,
    cursosPopupRoute,
} from './';

const ENTITY_STATES = [
    ...cursosRoute,
    ...cursosPopupRoute,
];

@NgModule({
    imports: [
        PracticaADatosCrudSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CursosComponent,
        CursosDetailComponent,
        CursosDialogComponent,
        CursosDeleteDialogComponent,
        CursosPopupComponent,
        CursosDeletePopupComponent,
    ],
    entryComponents: [
        CursosComponent,
        CursosDialogComponent,
        CursosPopupComponent,
        CursosDeleteDialogComponent,
        CursosDeletePopupComponent,
    ],
    providers: [
        CursosService,
        CursosPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PracticaADatosCrudCursosModule {}
