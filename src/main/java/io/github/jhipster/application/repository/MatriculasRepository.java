package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Matriculas;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Matriculas entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MatriculasRepository extends JpaRepository<Matriculas, Long> {

}
