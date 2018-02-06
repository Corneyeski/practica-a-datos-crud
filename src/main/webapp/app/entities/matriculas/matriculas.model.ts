import { BaseEntity } from './../../shared';

export class Matriculas implements BaseEntity {
    constructor(
        public id?: number,
        public inicio?: any,
        public alumnos?: BaseEntity,
        public cursos?: BaseEntity,
    ) {
    }
}
