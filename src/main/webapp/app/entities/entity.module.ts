import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { PracticaADatosCrudAlumnosModule } from './alumnos/alumnos.module';
import { PracticaADatosCrudCursosModule } from './cursos/cursos.module';
import { PracticaADatosCrudMatriculasModule } from './matriculas/matriculas.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        PracticaADatosCrudAlumnosModule,
        PracticaADatosCrudCursosModule,
        PracticaADatosCrudMatriculasModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PracticaADatosCrudEntityModule {}
