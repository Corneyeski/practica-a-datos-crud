package io.github.jhipster.application.web.rest;

import com.codahale.metrics.annotation.Timed;
import io.github.jhipster.application.domain.Cursos;

import io.github.jhipster.application.repository.CursosRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Cursos.
 */
@RestController
@RequestMapping("/api")
public class CursosResource {

    private final Logger log = LoggerFactory.getLogger(CursosResource.class);

    private static final String ENTITY_NAME = "cursos";

    private final CursosRepository cursosRepository;

    public CursosResource(CursosRepository cursosRepository) {
        this.cursosRepository = cursosRepository;
    }

    /**
     * POST  /cursos : Create a new cursos.
     *
     * @param cursos the cursos to create
     * @return the ResponseEntity with status 201 (Created) and with body the new cursos, or with status 400 (Bad Request) if the cursos has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/cursos")
    @Timed
    public ResponseEntity<Cursos> createCursos(@RequestBody Cursos cursos) throws URISyntaxException {
        log.debug("REST request to save Cursos : {}", cursos);
        if (cursos.getId() != null) {
            throw new BadRequestAlertException("A new cursos cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Cursos result = cursosRepository.save(cursos);
        return ResponseEntity.created(new URI("/api/cursos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /cursos : Updates an existing cursos.
     *
     * @param cursos the cursos to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated cursos,
     * or with status 400 (Bad Request) if the cursos is not valid,
     * or with status 500 (Internal Server Error) if the cursos couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/cursos")
    @Timed
    public ResponseEntity<Cursos> updateCursos(@RequestBody Cursos cursos) throws URISyntaxException {
        log.debug("REST request to update Cursos : {}", cursos);
        if (cursos.getId() == null) {
            return createCursos(cursos);
        }
        Cursos result = cursosRepository.save(cursos);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, cursos.getId().toString()))
            .body(result);
    }

    /**
     * GET  /cursos : get all the cursos.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of cursos in body
     */
    @GetMapping("/cursos")
    @Timed
    public List<Cursos> getAllCursos() {
        log.debug("REST request to get all Cursos");
        return cursosRepository.findAll();
        }

    /**
     * GET  /cursos/:id : get the "id" cursos.
     *
     * @param id the id of the cursos to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the cursos, or with status 404 (Not Found)
     */
    @GetMapping("/cursos/{id}")
    @Timed
    public ResponseEntity<Cursos> getCursos(@PathVariable Long id) {
        log.debug("REST request to get Cursos : {}", id);
        Cursos cursos = cursosRepository.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(cursos));
    }

    /**
     * DELETE  /cursos/:id : delete the "id" cursos.
     *
     * @param id the id of the cursos to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/cursos/{id}")
    @Timed
    public ResponseEntity<Void> deleteCursos(@PathVariable Long id) {
        log.debug("REST request to delete Cursos : {}", id);
        cursosRepository.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
