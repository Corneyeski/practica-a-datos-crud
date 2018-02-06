import { BaseEntity } from './../../shared';

export class Cursos implements BaseEntity {
    constructor(
        public id?: number,
        public nombreCurso?: string,
        public matriculas?: BaseEntity[],
    ) {
    }
}
