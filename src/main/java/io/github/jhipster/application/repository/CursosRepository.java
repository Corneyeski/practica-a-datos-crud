package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Cursos;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Cursos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CursosRepository extends JpaRepository<Cursos, Long> {

}
