import { BaseEntity } from './../../shared';

export class Alumnos implements BaseEntity {
    constructor(
        public id?: number,
        public nombreAlumno?: string,
        public matriculas?: BaseEntity[],
    ) {
    }
}
