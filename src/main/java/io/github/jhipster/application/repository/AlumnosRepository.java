package io.github.jhipster.application.repository;

import io.github.jhipster.application.domain.Alumnos;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Alumnos entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AlumnosRepository extends JpaRepository<Alumnos, Long> {

}
